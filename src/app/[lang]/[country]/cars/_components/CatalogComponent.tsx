import { Car, Params, SearchParams } from '@/types';
import { CarComponent } from './CarComponent';
import { generateFetchURL } from '@/helpers';

const fetchCars = async (searchParams: SearchParams, params: Params) => {
  try {
    const fetchURL = generateFetchURL('/cars', searchParams, params);
    const response = await fetch(fetchURL, { cache: 'no-cache' });

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error(error);
  }
};

export async function CatalogComponent({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const cars = await fetchCars(searchParams, params);

  console.group('Fetched cars');
  console.log('Pagination: ', cars.metadata);
  console.log('List: ', cars.data);

  return (
    <section className='flex flex-wrap justify-between gap-8 px-10'>
      {cars.data?.map((car: Car) => (
        <CarComponent key={car._id + ''} car={car} />
      ))}
    </section>
  );
}
