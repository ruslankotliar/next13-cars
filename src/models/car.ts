import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    owners: {
      type: [String],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual', 'CVT', 'Other'],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'],
      required: true,
    },
    enginePower: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);
