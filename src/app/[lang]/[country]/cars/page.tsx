import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';
import { Params, SearchParams } from '@/types';
import { getTranslator } from '@/utils/dictionary';
import { generateFetchURL } from '@/helpers';
import { REVALIDATE_DICT_TIME } from '@/constants';

const fetchDictionary = async (url: string) => {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE_DICT_TIME } });

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

const fetchCars = async (searchParams: SearchParams, params: Params) => {
  try {
    const fetchURL = generateFetchURL('/cars', params, searchParams);
    const response = await fetch(fetchURL);

    const data = await response.json();

    return data[0];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export default async function Page({
  searchParams,
  params
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const dictionary = await fetchDictionary(
    generateFetchURL('/i18n', { lang: params.lang, country: params.country })
  );
  const t = getTranslator(dictionary);
  const carsData = await fetchCars(searchParams, params);
  const { data, metadata } = carsData || {};

  return (
    <div className="h-full">
      <CatalogComponent cars={data} />
      <Suspense>
        <FiltersComponent />
      </Suspense>
    </div>
  );
}
