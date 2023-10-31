import { Params, SearchParams } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // language should match the params

  return {
    title: 'Find a car',
    description: `Cars with the specific filter properties`
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-20">{children}</div>;
}
