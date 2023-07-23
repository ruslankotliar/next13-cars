import { Suspense } from 'react';
import { FiltersComponent, CatalogComponent } from './_components';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FiltersComponent />
      </Suspense>

      <CatalogComponent searchParams={searchParams} />
    </div>
  );
}
