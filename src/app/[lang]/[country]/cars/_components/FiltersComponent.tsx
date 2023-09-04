'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function FiltersComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()! as any;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <section>
      <button
        onClick={() => {
          router.push(`${pathname}?${createQueryString('model', 'Mustang')}`);
        }}
        data-editable='filters-fetch-button'
      >
        Fetch All Data with Filters!
      </button>
    </section>
  );
}
