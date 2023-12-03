import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// constants
import { StatusCodes, TARGET_WEBSITE_ID } from '@/constants';

// utils
import { connectToDB } from '@/utils/database';
import { getReasonPhrase } from '@/utils/response';

// models
import LanguageModel from '@/models/language';

interface LocalesAggregation {
  allLocales: string[];
  defaultLocale: string;
  targetWebsiteId: mongoose.Types.ObjectId;
}

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const targetWebsiteId = new mongoose.Types.ObjectId(TARGET_WEBSITE_ID);
    if (!TARGET_WEBSITE_ID) {
      throw new Error('TARGET_WEBSITE_ID is not defined');
    }
    const pipeline = [
      { $match: { targetWebsiteId } },
      {
        $group: {
          _id: '$targetWebsiteId',
          allLocales: { $addToSet: '$code' },
          defaultLocale: {
            $max: { $cond: { if: { $eq: ['$isDefault', true] }, then: '$code', else: null } }
          }
        }
      },
      {
        $project: {
          _id: 0,
          allLocales: 1,
          defaultLocale: 1
        }
      }
    ];
    const aggregatedLocales: LocalesAggregation[] =
      await LanguageModel.aggregate<LocalesAggregation>(pipeline);

    if (aggregatedLocales.length === 0) {
      throw new Error('No locales found');
    }

    return NextResponse.json(aggregatedLocales[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
