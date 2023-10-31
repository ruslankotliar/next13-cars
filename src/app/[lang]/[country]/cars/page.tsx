import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';
import { Params, SearchParams } from '@/types';
import { getTranslator } from '@/utils/dictionary';
import { generateFetchURL } from '@/helpers';

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
  const t = await getTranslator(params.lang, params.country);
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
