import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes, TARGET_WEBSITE_ID } from '@/constants';

import { connectToDB } from '@/utils/database';
import { getReasonPhrase } from '@/utils/response';
import mongoose from 'mongoose';
import LanguageModel from '@/models/language';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const targetWebsiteId = new mongoose.Types.ObjectId(TARGET_WEBSITE_ID);
    if (!TARGET_WEBSITE_ID) {
      throw new Error('TARGET_WEBSITE_ID is not defined');
    }
    const aggregatedLocales: { id: null; codeValues: string[] }[] = await LanguageModel.aggregate([
      { $match: { targetWebsiteId } },
      { $group: { _id: null, codeValues: { $addToSet: '$code' } } }
    ]);
    // get existing locales from database
    const locales: string[] = aggregatedLocales.length > 0 ? aggregatedLocales[0].codeValues : [];

    return NextResponse.json(locales);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
