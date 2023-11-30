'use client';

import { ChangeEvent } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getLocalePartsFrom, pathnameIsMissingValidLocale } from '@/utils/i18n';
import { Language } from '@/types';

interface LangPickerComponentProps {
  locales: Language[];
}

export function LangPickerComponent({ locales }: LangPickerComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, country } = useParams();
  const searchParams = useSearchParams()! as any;
  const handleChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const { lang: newLang, country: newCountry } = getLocalePartsFrom({
      locale: e.target.value
    });

    const newPath = pathnameIsMissingValidLocale(pathname)
      ? `/${newLang}/${newCountry}${pathname}`
      : pathname.replace(lang as string, newLang).replace(country as string, newCountry);

    router.push(`${newPath}?${searchParams}`);
  };
  const getCurrentLocale = (): string =>
    lang && country ? `${lang}-${(country + '').toUpperCase()}` : locales[0].code;

  return (
    <div>
      <select
        defaultValue={getCurrentLocale()}
        onChange={handleChangeLocale}
        name="lang-picker"
        id="lang"
      >
        {locales.map(({ code, name }: Language) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
