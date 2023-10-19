import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes } from '@/constants';
import { Params } from '@/types';

import { TranslationModel } from '@/models/translation';

import { connectToDB } from '@/utils/database';
import { generateLocale } from '@/utils/i18n';
import { getReasonPhrase } from '@/utils/response';

export async function GET(
  _: NextRequest,
  { params: { lang, country } }: { params: { lang: string; country: string } }
) {
  try {
    await connectToDB();

    console.log(lang, country);

    const pipeline = [
      {
        $project: {
          _id: 0,
          key: '$key',
          translation: '$translations.' + generateLocale(lang, country)
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

    return NextResponse.json(dictionary[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
