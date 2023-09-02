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
    <div>
      <Suspense>
        <FiltersComponent />
      </Suspense>

      <CatalogComponent searchParams={searchParams} params={params} />
    </div>
  );
}
