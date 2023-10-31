import { CarDocument, Params, SearchParams } from '@/types';
import { CarComponent } from './CarComponent';
import { generateFetchURL } from '@/helpers';

const fetchCars = async (searchParams: SearchParams, params: Params) => {
  try {
    const fetchURL = generateFetchURL('/cars', params, searchParams);
    const response = await fetch(fetchURL);

    const data = await response.json();

    return data[0];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export async function CatalogComponent({
  searchParams,
  params
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const cars = await fetchCars(searchParams, params);

  return (
    <section className="flex flex-row flex-wrap justify-between gap-10 p-10 bg-gray-100 rounded-lg shadow-xl h-full">
      {cars?.data.map((car: CarDocument) => (
        <CarComponent key={car._id + ''} car={car} />
      ))}
    </section>
  );
}
