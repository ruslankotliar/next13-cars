import mongoose from 'mongoose';

const mongoDB = process.env.MONGO_URI;

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    if (!mongoDB) throw Error('MongodDB URI is missing.');

    await mongoose.connect(mongoDB);

    isConnected = true;

    console.log('MongoDB connected');
  } catch (e) {
    console.error(e);
  }
};
