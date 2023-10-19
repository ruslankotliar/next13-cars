import { Document } from "mongoose";

enum CarPropsEnum {
  None, // default value for the undefined in the array
  Price = 'price',
  Brand = 'brand',
  Model = 'model',
  Year = 'year',
  TitleStatus = 'title_status',
  Mileage = 'mileage',
  Color = 'color',
  VIN = 'vin',
  Lot = 'lot',
  State = 'state',
  Country = 'country',
  Condition = 'condition'
}
interface CarProps {
  price: number;
  brand: string;
  model: string;
  year: number;
  title_status: string;
  mileage: number;
  color: string;
  vin: string;
  lot: string;
  state: string;
  country: string;
  condition: string;
}

interface CarDocument extends Document, CarProps {}

export type { CarProps, CarDocument };

export { CarPropsEnum };
