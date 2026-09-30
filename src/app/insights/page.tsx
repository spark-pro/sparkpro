import type { Metadata } from 'next';
import Insights from '@/components/pages/Insights';

export const metadata: Metadata = {
  title: 'Insights | Spark Pro',
  description: 'Perspectives on HR infrastructure and founder dependency.',
};

export default function Page() {
  return <Insights />;
}
