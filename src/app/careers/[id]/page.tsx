import type { Metadata } from 'next';
import { JobDetail } from '@/components/pages/JobDetail';

export const metadata: Metadata = {
  title: 'Job Details | Spark Pro',
  description: 'View job details and apply to join the Spark Pro team.',
};

export default async function JobDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobId = parseInt(id, 10);
  return <JobDetail jobId={jobId} />;
}
