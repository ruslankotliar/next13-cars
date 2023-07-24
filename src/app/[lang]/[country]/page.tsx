import Image from 'next/image';
import Link from 'next/link';
import bgImage from '../../../../public/car-bg.jpg';

export default function Page({
  params: { lang, country },
}: {
  params: { lang: string; country: string };
}) {
  return (
    <div className='flex justify-center items-center h-screen w-screen relative'>
      <Image src={bgImage} alt='Picture of the car' fill />
      <Link
        className='border-2 hover:scale-110 transition-all absolute text-2xl p-4'
        href={`/${lang}/${country}/cars`}
      >
        See Catalog
      </Link>
    </div>
  );
}
