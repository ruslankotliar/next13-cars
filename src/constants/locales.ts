import { ValidLocale } from '@/types';

const defaultLocale = 'en-US' as const;
let locales = ['en-US', 'uk-UA'] as const;

const dictionaries: Record<ValidLocale, () => any> = {
  'en-US': () =>
    import('../dictionaries/en-US.json').then((module) => module.default),
  'uk-UA': () =>
    import('../dictionaries/uk-UA.json').then((module) => module.default),
} as const;

export { defaultLocale, locales, dictionaries };
