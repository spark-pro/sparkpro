import type { Metadata } from 'next';
import HrScore from '@/components/pages/HrScore';

export const metadata: Metadata = {
  title: 'Check Your HR Score | Spark Pro',
  description: 'Thanks for your request. Work out your HR score and see what to build first.',
  robots: { index: false },
};

export default function HrScorePage() {
  return <HrScore />;
}
