import { NextRequest, NextResponse } from 'next/server';
import { findBestMatchingLocale, getLocalePartsFrom, pathnameIsMissingValidLocale } from './utils';
import { defaultLocale } from './constants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
  const currentPathnameParts = getLocalePartsFrom({ pathname });

  if (pathnameIsMissingValidLocale(pathname)) {
    // rewrite it so next.js will render `/` as if it was `/en/us`

    const matchedLocale = findBestMatchingLocale(
      request.headers.get('Accept-Language') || defaultLocale
    );

    if (matchedLocale !== defaultLocale) {
      const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
      return NextResponse.redirect(
        new URL(
          `/${matchedLocaleParts.lang}/${matchedLocaleParts.country}${pathname}`,
          request.url
        )
      );
    } else {
      return NextResponse.rewrite(
        new URL(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}`,
          request.url
        )
      );
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
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}`,
          pathname.startsWith('/') ? '/' : ''
        ),
        request.url
      )
    );
  }
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
