import type { Metadata } from 'next';
import HowWeWork from '@/components/pages/HowWeWork';

export const metadata: Metadata = {
  title: 'How We Work | Spark Pro',
  description: 'How Spark Pro builds HR systems, processes and managers.',
};

export default function Page() {
  return <HowWeWork />;
}
