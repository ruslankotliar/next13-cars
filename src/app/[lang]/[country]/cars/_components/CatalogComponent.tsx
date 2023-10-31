import { CarDocument } from '@/types';
import { CarComponent } from './CarComponent';

export async function CatalogComponent({ cars }: { cars: CarDocument[] }) {
  return (
    <section className="flex flex-row flex-wrap justify-between gap-10 p-10 bg-gray-100 rounded-lg shadow-xl h-full">
      {cars?.map((car: CarDocument) => (
        <CarComponent key={car._id + ''} car={car} />
      ))}
    </section>
  );
}
