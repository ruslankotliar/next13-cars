import './globals.css';
import { Params, ValidLocale } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getLocalePartsFrom, getTranslator } from '@/utils';
import { locales } from '@/constants';
import { LangPickerComponent } from './_components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cars App',
  description: 'Application to find a car',
};

export default async function Layout({
  children,
  params: { lang, country },
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const translate = await getTranslator(
    `${lang}-${country?.toUpperCase()}` as ValidLocale // our middleware ensures this is valid
  );

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='relative'>
          <header className='absolute top-0 flex justify-around w-screen py-5 text-xl z-10 bg-primary-color'>
            <div>
              <Link href={`/${lang}/${country}`}>
                <b>CarExpert</b>{' '}
                {translate('header.title', { year: new Date().getFullYear() })}
              </Link>
            </div>
            <LangPickerComponent />
          </header>
          <main className='h-screen pt-16'>{children}</main>
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }));
}
