import { Params, SearchParams } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  // language should match the params
  const carsProperties = searchParams
    ? Object.entries(searchParams).reduce(
        (acc, [key, value]) => acc + `${key} – ${value} `,
        ''
      )
    : '';
  return {
    title: 'Find a car by properties',
    description: `Cars with the following properties: ${carsProperties}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='absolute top-20'>{children}</div>;
}
