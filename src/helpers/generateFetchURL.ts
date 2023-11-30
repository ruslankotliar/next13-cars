import { Params, SearchParams } from '@/types';

export const generateFetchURL = (
  url: string,
  params: Params,
  searchParams?: SearchParams
): string => {
  const currSearchParams = new URLSearchParams(searchParams);
  const locales = `/${params.lang || ''}/${params.country || ''}`;
  const modifiedURL = `${process.env.NEXT_PUBLIC_HOST_URL}/api${locales}${url}?${currSearchParams}`;
  return modifiedURL;
};
