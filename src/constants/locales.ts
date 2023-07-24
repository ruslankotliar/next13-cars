import { ValidLocale } from '@/types';

const defaultLocale = 'en-US' as const;
let locales = ['en-US', 'uk-UA'] as const;

const dictionaries: Record<ValidLocale, () => Promise<any>> = {
  ...locales.reduce(
    (acc, locale: ValidLocale) => ({
      ...acc,
      [locale]: () =>
        import(`../dictionaries/${locale}.json`).then(
          (module) => module.default
        ),
    }),
    {} as Record<ValidLocale, () => Promise<any>>
  ),
} as const;

export { defaultLocale, locales, dictionaries };
