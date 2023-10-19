import { generateFetchURL } from '@/helpers';
import { getLocalePartsFrom } from './i18n';
import { defaultLocale } from '@/constants';

const fetchDictionary = async (lang: string, country: string) => {
  try {
    const fetchURL = generateFetchURL('/i18n', { lang, country });
    const response = await fetch(fetchURL);

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

const getTranslator = async (lang?: string, country?: string) => {
  const { lang: defaultLang, country: defaultCountry } = getLocalePartsFrom({
    locale: defaultLocale
  });

  const dictionary = await fetchDictionary(lang || defaultLang, country || defaultCountry);

  return (key: string, params?: { [key: string]: string | number }) => {
    let translation = key.split('.').reduce((obj, key) => obj && obj[key], dictionary);
    if (!translation) {
      return key;
    }
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation!.replace(`{{ ${key} }}`, String(value));
      });
    }
    return translation;
  };
};

export { getTranslator };
