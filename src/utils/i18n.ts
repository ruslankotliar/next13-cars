import langParser from 'accept-language-parser';
import { defaultLocale, locales } from '@/constants';
import { LocaleSource } from '@/types';

const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split('-');
    return {
      lang: localeParts[0],
      country: localeParts[1]
    };
  } else {
    const pathnameParts = pathname!.toLowerCase().split('/');
    return {
      lang: pathnameParts[1],
      country: pathnameParts[2]
    };
  }
};

const pathnameIsMissingValidLocale = (pathname: string) =>
  locales.every((locale) => {
    const localeParts = getLocalePartsFrom({ locale });
    return !pathname.startsWith(`/${localeParts.lang}/${localeParts.country}`);
  });

const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  // find the first locale that matches a locale in our list
  for (let i = 0; i < parsedLangs.length; i++) {
    const parsedLang = parsedLangs[i];
    // attempt to match both the language and the country
    const matchedLocale = locales.find((locale) => {
      const localeParts = getLocalePartsFrom({ locale });
      return parsedLang.code === localeParts.lang && parsedLang.region === localeParts.country;
    });
    if (matchedLocale) {
      return matchedLocale;
    }
    // if we didn't find a match for both language and country, try just the language
    else {
      const matchedLanguage = locales.find((locale) => {
        const localeParts = getLocalePartsFrom({ locale });
        return parsedLang.code === localeParts.lang;
      });
      if (matchedLanguage) {
        return matchedLanguage;
      }
    }
  }
  // if we didn't find a match, return the default locale
  return defaultLocale;
};

const generateLocale = (lang: string, country: string) => `${lang}-${country.toUpperCase()}`;

export { getLocalePartsFrom, pathnameIsMissingValidLocale, findBestMatchingLocale, generateLocale };
