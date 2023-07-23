import { Car } from '@/types';
import Image from 'next/image';
import carImg from '../../../../../public/car-single.jpg';

export function DetailsComponent({ car }: { car: Car }) {
  return (
    <div>
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
        <p>{`${car.make} ${car.model}`}</p>
        <p>{`Price: $${car.price}`}</p>
      </div>
    </div>
  );
}
