import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';
import { Params, SearchParams } from '@/types';

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  return (
    <div className='h-full'>
      <CatalogComponent searchParams={searchParams} params={params} />
      <Suspense>
        <FiltersComponent />
      </Suspense>
    </div>
  );
}
