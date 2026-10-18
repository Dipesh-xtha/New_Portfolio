import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyClient from '@/components/CaseStudyClient';
import { projects } from '@/data/caseStudies';

type Props = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(projects).map((project) => ({ project }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: key } = await params;
  const project = projects[key];
  if (!project) notFound();

  const title = project.title.replace(/<[^>]*>/g, '').replace(/\.$/, '');
  const description = project.lead;
  const url = `/case-study/${project.id}`;
  const image = `/assets/${project.hero}`;

  return {
    title: `${title} | Dipesh Shrestha`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, alt: project.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { project: key } = await params;
  if (!projects[key]) notFound();
  return <CaseStudyClient projectKey={key} />;
}
