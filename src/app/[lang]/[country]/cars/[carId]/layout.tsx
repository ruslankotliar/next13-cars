import { generateFetchURL } from '@/helpers';
import { Car, Params, SearchParams } from '@/types';
import { Metadata } from 'next';

const fetchSingleCar = async (searchParams: SearchParams, params: Params) => {
  try {
    const fetchURL = generateFetchURL(
      `/cars/${params.carId}`,
      searchParams,
      params
    );
    const response = await fetch(fetchURL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
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

  const carProperties = Object.entries(car).reduce(
    (acc, [key, value]) =>
      key !== '_id' && key !== 'owners' ? acc + `${key} – ${value} ` : acc,
    ''
  );
  return {
    title: `${car.make}: ${car.model}`,
    description: `Car with the following properties: ${carProperties}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
