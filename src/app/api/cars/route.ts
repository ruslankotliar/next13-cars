import { NextRequest, NextResponse } from 'next/server';
import { getReasonPhrase, connectToDB } from '@/utils';
import { StatusCodes } from '@/constants';
import { Car } from '@/models';

import { generateFilters } from '@/helpers';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const cars = await Car.aggregate([
      {
        $match: {
          ...generateFilters(request.nextUrl.searchParams),
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    return NextResponse.json(cars);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}
