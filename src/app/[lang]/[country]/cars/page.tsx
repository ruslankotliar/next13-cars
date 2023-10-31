import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';
import { Params, SearchParams } from '@/types';
import { getTranslator } from '@/utils/dictionary';

export default async function Page({
  searchParams,
  params
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const t = await getTranslator(params.lang, params.country);

  return (
    <div className="h-full">
      <CatalogComponent searchParams={searchParams} params={params} />
      <Suspense>
        <FiltersComponent />
      </Suspense>
    </div>
  );
}
