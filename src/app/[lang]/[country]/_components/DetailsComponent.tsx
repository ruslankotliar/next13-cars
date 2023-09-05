import { Car } from '@/types';
import Image from 'next/image';

export function DetailsComponent({ car }: { car: Car }) {
  return (
    <div className='transition-transform transform hover:scale-105'>
      <div className='relative h-52 w-full overflow-hidden rounded-lg shadow-md group'>
        <Image
          src='https://images.unsplash.com/photo-1533473359331-0135ef1b58bf'
          alt={`Image of ${car.make} ${car.model}`}
          fill
          className='object-cover h-full w-full'
        />
        <div className='absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent group-hover:bg-opacity-60'>
          <h3 className='text-white text-xl font-semibold mb-2'>{`${car.make} ${car.model}`}</h3>
        </div>
      </div>
      <div className='mt-4'>
        <div className='flex items-center space-x-2'>
          <span
            className='text-gray-600 font-medium'
            data-editable='car-details-price'
          >
            Price: $
          </span>
          <span className='text-gray-900 font-semibold'>{car.price}</span>
        </div>
      </div>
    </div>
  );
}
