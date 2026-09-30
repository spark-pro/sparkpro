import type { Metadata } from 'next';
import Solutions from '@/components/pages/Solutions';

export const metadata: Metadata = {
  title: 'Solutions | Spark Pro',
  description: 'HR infrastructure solutions that reduce founder dependency.',
};

export default function Page() {
  return <Solutions />;
}
