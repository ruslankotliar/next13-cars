import Image from 'next/image';
import Link from 'next/link';
import { Params } from '@/types';

export default function MainPage({
  params: { lang, country } = {},
}: {
  params?: Params;
}) {
  // Decompose Image URL for clarity and maintainability
  const backgroundImageUrl =
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf';

  return (
    <div className='relative w-full h-screen'>
      {/* Background Image */}
      <Image
        src={backgroundImageUrl}
        alt='Picture of the car'
        layout='fill'
        objectFit='cover'
        className='absolute z-1'
      />

      <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full z-10'>
        <Link
          href={`/${lang}/${country}/cars/`}
          className='border-2 border-black-500 hover:border-black-700 text-black-500 hover:text-black-700 hover:bg-black-100 hover:scale-110 transform transition-transform duration-300 text-2xl px-6 py-4 rounded'
          data-editable='see-catalog-button'
        >
          See Catalog
        </Link>
      </div>
    </div>
  );
}
