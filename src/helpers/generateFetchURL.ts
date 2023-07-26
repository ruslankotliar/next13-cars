import { defaultLocale } from '@/constants';
import { Params, SearchParams } from '@/types';
import { getLocalePartsFrom } from '@/utils';

export const generateFetchURL = (
  url: string,
  searchParams: SearchParams,
  params: Params
): string => {
  const currSearchParams = new URLSearchParams(searchParams);
  const { lang: defaultLang, country: defaultCountry } = getLocalePartsFrom({
    locale: defaultLocale,
  });
  const locales = `/${params.lang || defaultLang}/${
    params.country || defaultCountry
  }`;

  const modifiedURL = `${process.env.URL}/api${locales}${url}?${currSearchParams}`;
  return modifiedURL;
};
