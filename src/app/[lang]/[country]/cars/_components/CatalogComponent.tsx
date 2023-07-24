import { Car } from '@/types';

import { CarComponent } from './CarComponent';

const fetchCars = async (searchParams: any) => {
  try {
    const params = new URLSearchParams(searchParams);
    const response = await fetch(`${process.env.URL}/api/cars?${params}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function CatalogComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cars = await fetchCars(searchParams);

  return (
    <section className='flex flex-wrap justify-between gap-8 px-10'>
      {cars.map((car: Car) => (
        <CarComponent key={car._id + ''} car={car} />
      ))}
    </section>
  );
}
