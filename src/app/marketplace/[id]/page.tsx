import { ProjectDetailPage } from '@/presentation/pages/ProjectDetailPage/ProjectDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Details - InventorX',
  description: 'View detailed information about this innovative project including technical specifications, investment opportunities, and inventor details.',
};

export default function ProjectDetail({ params }: { params: { id: string } }) {
  return <ProjectDetailPage projectId={params.id} />;
}

