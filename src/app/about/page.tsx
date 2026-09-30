import type { Metadata } from 'next';
import About from '@/components/pages/About';

export const metadata: Metadata = {
  title: 'About | Spark Pro',
  description: 'Spark Pro is a people infrastructure company helping growing businesses scale without founder dependency.',
};

export default function AboutPage() {
  return <About />;
}
