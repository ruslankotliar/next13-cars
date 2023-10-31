import { defaultLocale } from '@/constants';
import { Params, SearchParams } from '@/types';
import { getLocalePartsFrom } from '@/utils/i18n';

export const generateFetchURL = (
  url: string,
  params: Params,
  searchParams?: SearchParams
): string => {
  const currSearchParams = new URLSearchParams(searchParams);
  const { lang: defaultLang, country: defaultCountry } = getLocalePartsFrom({
    locale: defaultLocale
  });
  const locales = `/${params.lang || defaultLang}/${params.country || defaultCountry}`;

  const modifiedURL = `${process.env.NEXT_PUBLIC_HOST_URL}/api${locales}${url}?${currSearchParams}`;
  return modifiedURL;
};
