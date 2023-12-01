import { NextResponse } from 'next/server';

import { connectToDB } from '@/utils/database';
import { StatusCodes } from '@/constants';

import { Params } from '@/types';
import { getReasonPhrase } from '@/utils/response';
import CarModel from '@/models/car';

export async function GET(_: Request, { params }: { params: Params }) {
  try {
    await connectToDB();

    const car = await CarModel.findById(params.carId);

    return NextResponse.json(car);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
