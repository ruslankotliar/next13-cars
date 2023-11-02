import './globals.css';
import { Params } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { REVALIDATE_DICT_TIME, locales } from '@/constants';
import { LangPickerComponent } from './_components';
import { Suspense } from 'react';
import { getLocalePartsFrom } from '@/utils/i18n';
import { getTranslator } from '@/utils/dictionary';
import { generateFetchURL } from '@/helpers';

const fetchDictionary = async (url: string) => {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE_DICT_TIME } });

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cars App',
  description: 'Application to find a car'
};

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Params;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent params={params} />
        <main className="absolute top-0 w-full z-19">{children}</main>
      </body>
    </html>
  );
}

async function HeaderComponent({ params: { lang, country } }: { params: Params }) {
  const dictionary = await fetchDictionary(generateFetchURL('/i18n', { lang, country }));
  const t = getTranslator(dictionary);

  return (
    <header className="absolute top-0 w-full z-20 py-5 bg-white border-b">
      <nav className="flex justify-around items-center h-10 text-xl">
        <div>
          <Link href={`/${lang}/${country}`}>
            <b data-editable="main-layout-logo">{t('main-layout-logo')}</b>
          </Link>
        </div>
        <Suspense fallback={<div>Loading</div>}>
          <LangPickerComponent />
        </Suspense>
      </nav>
    </header>
  );
}
