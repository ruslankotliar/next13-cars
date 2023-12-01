import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes, TARGET_WEBSITE_ID, defaultLocale } from '@/constants';
import {
  getLocalePartsFrom,
  pathnameIsMissingValidLocale,
  findBestMatchingLocale
} from '@/utils/i18n';
import { getReasonPhrase } from './utils/response';
import { connectToDB } from './utils/database';

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  // try {
  //    await connectToDB();
  //   const targetWebsiteId = new mongoose.Types.ObjectId(TARGET_WEBSITE_ID);
  //   if (!TARGET_WEBSITE_ID) {
  //     throw new Error('TARGET_WEBSITE_ID is not defined');
  //   }
  //   const aggregatedLocales: { id: null; codeValues: string[] }[] = await LanguageModel.aggregate([
  //     { $match: { targetWebsiteId } },
  //     { $group: { _id: null, codeValues: { $addToSet: '$code' } } }
  //   ]);
  //   // get existing locales from database
  //   const locales: string[] = aggregatedLocales.length > 0 ? aggregatedLocales[0].codeValues : [];
  //   const { pathname, searchParams } = request.nextUrl;
  //   console.log(searchParams);
  //   console.info('Requesting route ', pathname + '?' + searchParams);
  //   const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
  //   const currentPathnameParts = getLocalePartsFrom({ pathname });
  //   if (pathnameIsMissingValidLocale(pathname, locales)) {
  //     // get locale from user browser settings
  //     const matchedLocale = findBestMatchingLocale(request.headers.get('Accept-Language'), locales);
  //     if (matchedLocale !== defaultLocale) {
  //       const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
  //       return NextResponse.redirect(
  //         new URL(
  //           `/${matchedLocaleParts.lang}/${matchedLocaleParts.country}${pathname}?${searchParams}`,
  //           request.url
  //         )
  //       );
  //     } else {
  //       console.log(
  //         'rewriting ',
  //         new URL(
  //           `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}?${searchParams}`,
  //           request.url
  //         ).href
  //       );
  //       return NextResponse.rewrite(
  //         new URL(
  //           `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}?${searchParams}`,
  //           request.url
  //         )
  //       );
  //     }
  //   }
  //   // Check if the default locale is in the pathname
  //   if (
  //     currentPathnameParts.lang === defaultLocaleParts.lang &&
  //     currentPathnameParts.country === defaultLocaleParts.country
  //   ) {
  //     // we want to REMOVE the default locale from the pathname,
  //     // and later use a rewrite so that Next will still match
  //     // the correct code file as if there was a locale in the pathname
  //     return NextResponse.redirect(
  //       new URL(
  //         `${pathname.replace(
  //           `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}`,
  //           pathname === '/en/us' ? '/' : ''
  //         )}?${searchParams}`,
  //         request.url
  //       )
  //     );
  //   }
  //   return NextResponse.next();
  // } catch (e) {
  //   console.error(e);
  //   return NextResponse.json(null, {
  //     status: StatusCodes.INTERNAL_SERVER_ERROR,
  //     statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
  //   });
  // }
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
