import { Schema, model, models } from 'mongoose';

import { CarDocument } from '@/types';

const carSchema = new Schema<CarDocument>({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vin: {
    type: String,
    required: true,
    unique: true
  },
  lot: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  title_status: {
    type: String,
    required: true
  }
});

const CarModel = models.Car || model<CarDocument>('Car', carSchema);

export default CarModel;
