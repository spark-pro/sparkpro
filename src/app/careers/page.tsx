import type { Metadata } from 'next';
import { Careers } from '@/components/pages/Careers';

export const metadata: Metadata = {
  title: 'Careers | Spark Pro',
  description: 'Join the Spark Pro team — explore open positions in HR, IT, and AI. Build the future with us.',
};

export default function CareersPage() {
  return <Careers />;
}
