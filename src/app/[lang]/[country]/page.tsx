import Image from 'next/image';
import Link from 'next/link';
import bgImage from '../../../../public/car-bg.jpg';
import { Params } from '@/types';

export default function Page({
  params: { lang, country },
}: {
  params: Params;
}) {
  return (
    <div className='relative w-full h-full min-h-[calc(100vh-3rem)]'>
      <Image
        src={bgImage}
        alt='Picture of the car'
        layout='fill'
        objectFit='cover'
        className='absolute z-0'
      />

      <div className='flex justify-center items-center h-full w-full z-10'>
        <Link
          href={`/${lang}/${country}/cars/`}
          className='border-2 hover:scale-110 transform transition-transform duration-300 text-2xl p-4'
          data-editable='see-catalog-button'
        >
          See Catalog
        </Link>
      </div>
    </div>
  );
}
