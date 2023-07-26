import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';
import { Params, SearchParams } from '@/types';

export default function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  console.log('Params in page: ', searchParams);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FiltersComponent />
      </Suspense>

      <CatalogComponent searchParams={searchParams} params={params} />
    </div>
  );
}
