'use client';

import { Car } from '@/types';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import carImg from '../../../../public/car-single.jpg';

export function CarComponent({ car }: { car: Car }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className='w-40 h-auto hover:cursor-pointer'
      onClick={() => router.push(`${pathname}/${car._id}`)}
    >
      <div className='relative'>
        <Image
          src={carImg}
          alt={`Image of a single car, ${car.model}`}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div>
        <p>
          {car.make} {car.model}
        </p>
        <p>{`Price: $${car.price}`}</p>
      </div>
    </div>
  );
}
