import type { Metadata } from 'next';
import ForStartups from '@/components/pages/ForStartups';

export const metadata: Metadata = {
  title: 'For Startups | Spark Pro',
  description: 'HR foundations for startups that need to scale without founder dependency.',
};

export default function Page() {
  return <ForStartups />;
}
