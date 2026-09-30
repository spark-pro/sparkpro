import type { Metadata } from 'next';
import Contact from '@/components/pages/Contact';

export const metadata: Metadata = {
  title: 'Contact | Spark Pro',
  description: 'Check your HR independence. Talk to the Spark Pro team.',
};

export default function ContactPage() {
  return <Contact />;
}
