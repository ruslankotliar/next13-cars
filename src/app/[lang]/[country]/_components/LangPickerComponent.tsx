'use client';

import { locales } from '@/constants';
import { ValidLocale } from '@/types';
import { getLocalePartsFrom, pathnameIsMissingValidLocale } from '@/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export function LangPickerComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const { lang: newLang, country: newCountry } = getLocalePartsFrom({
      locale: e.target.value,
    });

    const newPath = pathnameIsMissingValidLocale(pathname)
      ? `/${newLang}/${newCountry}${pathname}`
      : pathname
          .replace(params.lang as string, newLang)
          .replace(params.country as string, newCountry);

    router.push(newPath);
  };

  const getCurrentLocale = (): string =>
    params.lang && params.country
      ? `${params.lang}-${(params.country + '').toUpperCase()}`
      : locales[0];

  return (
    <div>
      <select
        defaultValue={getCurrentLocale()}
        onChange={handleChangeLocale}
        name='lang-picker'
        id='lang'
      >
        {locales.map((locale: ValidLocale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  );
}
