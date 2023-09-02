import './globals.css';
import { Params, ValidLocale } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getLocalePartsFrom, getTranslator } from '@/utils';
import { locales } from '@/constants';
import { LangPickerComponent } from './_components';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cars App',
  description: 'Application to find a car',
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  return (
    <html lang='en'>
      <body
        className={(inter.className = ' w-screen min-h-[calc(100vh-4rem)]')}
      >
        <div className='relative h-max'>
          <HeaderComponent params={params} />
          <main className='absolute top-[calc(4rem)] h-full right-0 w-full'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

async function HeaderComponent({
  params: { lang, country },
}: {
  params: Params;
}) {
  const translate = await getTranslator(
    `${lang}-${country?.toUpperCase()}` as ValidLocale // our middleware ensures this is valid
  );
  return (
    <header className='absolute top-0 flex justify-around w-full py-5 text-xl z-20 bg-primary-color'>
      <div>
        <Link href={`/${lang}/${country}`}>
          <b>CarExpert</b>{' '}
          {translate('header.title', {
            year: new Date().getFullYear(),
          })}
        </Link>
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <LangPickerComponent />
      </Suspense>
    </header>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }));
}
