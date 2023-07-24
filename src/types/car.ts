import { ObjectId } from 'mongodb';

enum Transmission {
  Automatic,
  Manual,
  CVT,
  Other,
}

enum FuelType {
  Gasoline,
  Diesel,
  Electric,
  Hybrid,
  Other,
}

type Car = {
  _id: ObjectId;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owners: string[];
  transmission: Transmission;
  fuelType: FuelType;
  enginePower: number;
  price: number;
};

export type { Car };
