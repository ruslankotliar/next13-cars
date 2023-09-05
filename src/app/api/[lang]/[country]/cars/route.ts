import { NextRequest, NextResponse } from 'next/server';
import { getReasonPhrase } from '@/utils';
import { StatusCodes } from '@/constants';
import { Car } from '@/models';

import { generateFilters } from '@/helpers';

import { connectToDB } from '@/utils/database';

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
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: Number(3) } },
          ],
          data: [{ $skip: 20 }, { $limit: 10 }], // add projection here wish you re-shape the docs
        },
      },
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
