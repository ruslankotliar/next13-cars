import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes, TARGET_WEBSITE_ID } from '@/constants';
import { LanguageModel } from '@/models';

import { connectToDB } from '@/utils/database';
import { getReasonPhrase } from '@/utils/response';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const targetWebsiteId = new mongoose.Types.ObjectId(TARGET_WEBSITE_ID);
    if (!TARGET_WEBSITE_ID) {
      throw new Error('TARGET_WEBSITE_ID is not defined');
    }
    const languages = await LanguageModel.find({ targetWebsiteId }, { _id: 0, __v: 0 });
    return NextResponse.json(languages);
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}
