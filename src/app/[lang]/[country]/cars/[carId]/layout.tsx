import { generateFetchURL } from '@/helpers';
import { Car, Params, SearchParams } from '@/types';
import { Metadata } from 'next';

const fetchSingleCar = async (searchParams: SearchParams, params: Params) => {
  try {
    console.log(params.carId);
    const fetchURL = generateFetchURL(
      `/cars/${params.carId}`,
      searchParams,
      params
    );
    const response = await fetch(fetchURL);

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  // language should match the params
  const car: Car = await fetchSingleCar(searchParams, params);

  const carProperties = car
    ? Object.entries(car).reduce(
        (acc, [key, value]) =>
          key !== '_id' && key !== 'owners' ? acc + `${key} – ${value} ` : acc,
        ''
      )
    : '';
  return {
    title: `${car?.brand}: ${car?.model}`,
    description: `Car with the following properties: ${carProperties}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
