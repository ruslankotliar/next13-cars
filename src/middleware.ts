import { NextRequest, NextResponse } from 'next/server';

import { StatusCodes, defaultLocale } from '@/constants';
import {
  getLocalePartsFrom,
  pathnameIsMissingValidLocale,
  findBestMatchingLocale
} from '@/utils/i18n';
import { getReasonPhrase } from './utils/response';

export async function middleware(request: NextRequest) {
  try {
    // fetch locales from database
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/iso-locales`);
    const locales = await res.json();
    // get the current pathname and search params
    const { pathname, searchParams } = request.nextUrl;
    console.info('Requesting route ', pathname + '?' + searchParams);
    // get the default locale and the current locale from the pathname
    const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
    const currentPathnameParts = getLocalePartsFrom({ pathname });

    if (pathnameIsMissingValidLocale(pathname, locales)) {
      // get locale from user browser settings
      const matchedLocale = findBestMatchingLocale(request.headers.get('Accept-Language'), locales);
      if (matchedLocale !== defaultLocale) {
        const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
        const newUrl = new URL(
          `/${matchedLocaleParts.lang}/${matchedLocaleParts.country}${pathname}?${searchParams}`,
          request.url
        );
        console.info('Redirecting to: ', newUrl.href);
        return NextResponse.redirect(newUrl);
      } else {
        const newUrl = new URL(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}?${searchParams}`,
          request.url
        );
        console.info('Rewriting to: ', newUrl.href);
        return NextResponse.rewrite(newUrl);
      }
    }
    // Check if the default locale is in the pathname
    if (
      currentPathnameParts.lang === defaultLocaleParts.lang &&
      currentPathnameParts.country === defaultLocaleParts.country
    ) {
      // we want to REMOVE the default locale from the pathname,
      // and later use a rewrite so that Next will still match
      // the correct code file as if there was a locale in the pathname
      const newUrl = new URL(
        `${pathname.replace(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}`,
          pathname === '/en/us' ? '/' : ''
        )}?${searchParams}`,
        request.url
      );
      console.info('Redirecting to: ', newUrl.href);
      return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
