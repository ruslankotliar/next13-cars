import { NextResponse } from 'next/server';
import { getReasonPhrase, connectToDB } from '@/utils';
import { StatusCodes } from '@/constants';
import { Car } from '@/models';

export async function GET(
  _: Request,
  { params }: { params: { carId: string } }
) {
  try {
    await connectToDB();

    const car = await Car.findById(params.carId);

    return NextResponse.json(car);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}
