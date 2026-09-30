import type { Metadata } from 'next';
import ForSMEs from '@/components/pages/ForSMEs';

export const metadata: Metadata = {
  title: 'For SMEs | Spark Pro',
  description: 'HR systems for SMEs that have outgrown founder-led people management.',
};

export default function Page() {
  return <ForSMEs />;
}
