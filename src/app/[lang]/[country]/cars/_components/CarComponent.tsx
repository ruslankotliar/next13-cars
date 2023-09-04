'use client';

import { Car } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { DetailsComponent } from '../../_components';

export function CarComponent({ car }: { car: Car }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className='w-40 h-auto hover:cursor-pointer'
      onClick={() => router.push(`${pathname}/${car._id}`)}
    >
      <DetailsComponent car={car} />
    </div>
  );
}
