export const dynamicParams = false;
import { Car, Params, SearchParams } from '@/types';
import { DetailsComponent } from './_components';
import { generateFetchURL } from '@/helpers';

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

export default async function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const car: Car = await fetchSingleCar(searchParams, params);

  return (
    <section className='w-40 h-auto'>
      <DetailsComponent car={car} />
    </section>
  );
}

export async function generateStaticParams() {
  const fetchURL = generateFetchURL('/cars', {}, {});
  const response = await fetch(fetchURL);

  const cars = await response.json();

  return cars.map((car: Car) => ({
    carId: car._id + '',
  }));
}
