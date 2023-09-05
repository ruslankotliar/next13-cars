'use client';

import { Car } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { DetailsComponent } from '../../_components';

export function CarComponent({ car }: { car: Car }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className='hover:cursor-pointer bg-white w-96 p-6 shadow-md rounded-lg'
      onClick={() => router.push(`${pathname}/${car._id}`)}
    >
      <DetailsComponent car={car} />
    </div>
  );
}
