import './globals.css';
import { Params } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getLocalePartsFrom } from '@/utils';
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
      <body className={inter.className}>
        <HeaderComponent params={params} />
        <main className='absolute top-0 w-full z-19'>{children}</main>
      </body>
    </html>
  );
}

async function HeaderComponent({
  params: { lang, country },
}: {
  params: Params;
}) {
  return (
    <header className='absolute top-0 w-full z-20 py-5 bg-white border-b'>
      <nav className='flex justify-around items-center h-10 text-xl'>
        <div>
          <Link href={`/${lang}/${country}`}>
            <b data-editable='main-layout-logo'>CarExpert</b>
          </Link>
        </div>
        <Suspense fallback={<div>Loading</div>}>
          <LangPickerComponent />
        </Suspense>
      </nav>
    </header>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }));
}
