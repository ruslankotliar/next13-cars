import { locales } from '@/constants';

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

type ValidLocale = (typeof locales)[number];

export type { PathnameLocale, ISOLocale, LocaleSource, ValidLocale };
