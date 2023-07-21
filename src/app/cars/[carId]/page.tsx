export const dynamicParams = false;
import { Car } from '@/types';
import { DetailsComponent } from './_components';

const fetchSingleCar = async (carId: string) => {
  try {
    const response = await fetch(`${process.env.URL}/api/cars/${carId}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page({ params }: { params: { carId: string } }) {
  const { carId } = params;
  const car = await fetchSingleCar(carId);

  return (
    <section className='w-40 h-auto'>
      <DetailsComponent car={car} />
    </section>
  );
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.URL}/api/cars?`);

  const cars = await response.json();

  return cars.map((car: Car) => ({
    carId: car._id + '',
  }));
}
