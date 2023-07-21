import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cars App',
  description: 'Application to find a car',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='relative'>
          <header className='absolute top-0 flex justify-center w-screen py-5 text-xl z-10 bg-primary-color'>
            <div>
              <Link href={'/'}>Car Expert</Link>
            </div>
          </header>
          <main className='h-screen pt-16'>{children}</main>
        </div>
      </body>
    </html>
  );
}
