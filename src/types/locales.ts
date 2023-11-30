type LocaleKey = 'lang' | 'country';

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

export type { PathnameLocale, ISOLocale, LocaleSource, LocaleKey };
