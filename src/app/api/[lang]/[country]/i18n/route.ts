import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes, TARGET_WEBSITE_ID } from '@/constants';

import TranslationModel from '@/models/translation';

import { connectToDB } from '@/utils/database';
import { generateLocale } from '@/utils/i18n';
import { getReasonPhrase } from '@/utils/response';
import mongoose, { Schema } from 'mongoose';

export async function GET(
  _: NextRequest,
  { params: { lang, country } }: { params: { lang: string; country: string } }
) {
  try {
    await connectToDB();

    const targetWebsiteId = new mongoose.Types.ObjectId(TARGET_WEBSITE_ID);

    if (!TARGET_WEBSITE_ID) {
      throw new Error('TARGET_WEBSITE_ID is not defined');
    }

    const pipeline = [
      {
        $match: {
          targetWebsiteId
        }
      },
      {
        $project: {
          _id: 0,
          key: '$key',
          translation: '$translations.' + generateLocale(lang, country)
        }
      },
      {
        $match: {
          translation: { $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          translations: {
            $push: {
              k: '$key',
              v: '$translation'
            }
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: '$translations'
          }
        }
      }
    ];

    const dictionary = await TranslationModel.aggregate(pipeline);

    return NextResponse.json(dictionary[0] || {});
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
