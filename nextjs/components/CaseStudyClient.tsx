'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { projects, CaseStudyProject } from '@/data/caseStudies';
import { imageSizes } from '@/data/imageSizes';
import CaseImageViewer, { CaseImage } from '@/components/CaseImageViewer';

const arrowSvg = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 19 19 5M8 5h11v11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const backSvg = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m14 5-7 7 7 7M7 12h14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CaseStudyView({ projectKey }: { projectKey: string }) {
  const project: CaseStudyProject = projects[projectKey] || projects.website;
  const nextProject: CaseStudyProject = projects[project.next];

  const [activeSection, setActiveSection] = useState({ projectId: '', id: '' });
  const [selectedImage, setSelectedImage] = useState<CaseImage | null>(null);
  const activeId = activeSection.projectId === project.id
    ? activeSection.id
    : project.sections[0].id;

  useEffect(() => {
    if (window.location.hash) {
      const targetEl = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      targetEl?.scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection({ projectId: project.id, id: entry.target.id });
            }
          });
        },
        { rootMargin: '-10% 0px -68% 0px' }
      );

      const sectionEls = document.querySelectorAll('.case-section');
      sectionEls.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, [project]);

  return (
    <div className="case-page" data-project={project.id} onClick={event => {
      const trigger = (event.target as Element).closest<HTMLButtonElement>('button[data-image-src]');
      if (trigger?.dataset.imageSrc) setSelectedImage({ src: trigger.dataset.imageSrc, title: trigger.dataset.imageTitle || 'Design preview' });
    }}>
      <a className="skip-link" href="#case-content">
        Skip to case study
      </a>

      <header className="site-header">
        <Link className="brand" href="/#top" aria-label="Dipesh Shrestha, back to portfolio">
          <img src="/assets/nav-logo.webp" alt="Dipesh Shrestha" width={577} height={223} />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work gallery</Link>
          <Link href="/#approach">Approach</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <main id="case-content">
        <div className="case-shell">
          <Link className="back-link" href="/#work">
            {backSvg} Back to work gallery
          </Link>

          <header className="case-hero">
            <div className="eyebrow">
              {project.eyebrow} · {project.index} / 03
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: project.title }} />
            <p>{project.lead}</p>
            <div className="meta">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>

          <figure className="hero-media">
            <button className="case-image-trigger" type="button" data-image-src={`/assets/${project.hero}`}
              data-image-title={project.heroAlt} aria-label={`Expand image: ${project.heroAlt}`}>
              <img src={`/assets/${project.hero}`} alt={project.heroAlt}
                width={imageSizes[project.hero][0]} height={imageSizes[project.hero][1]}
                fetchPriority="high" decoding="async" />
              <span className="case-image-trigger__label">Expand image {arrowSvg}</span>
            </button>
            <figcaption>Bugv · selected design work by Dipesh Shrestha</figcaption>
          </figure>

          <div className="case-layout">
            <aside className="case-toc" aria-label="Case study contents">
              <strong>In this story</strong>
              {project.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  aria-current={activeId === sec.id ? 'location' : undefined}
                >
                  {sec.label}
                </a>
              ))}
            </aside>

            <div className="case-flow">
              {project.sections.map((sec) => (
                <section
                  key={sec.id}
                  className="case-section"
                  id={sec.id}
                  aria-labelledby={`${sec.id}-heading`}
                  dangerouslySetInnerHTML={{ __html:
                    `<div class="section-kicker">${sec.number} / ${sec.label}</div>` +
                    `<h2 id="${sec.id}-heading">${sec.title}</h2>` + sec.body
                  }}
                />
              ))}

              <Link className="next-project" href={`/case-study/${project.next}`}>
                <span>
                  <small>Next project</small>
                  <strong>{nextProject.title.replace(/<[^>]*>/g, '')}</strong>
                </span>
                {arrowSvg}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <Link href="/#work" className="back-link">
          Back to work gallery {backSvg}
        </Link>
        <span>© 2026 Dipesh Shrestha · Made with care in Kathmandu.</span>
      </footer>
      <CaseImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default function CaseStudyClient({ projectKey }: { projectKey: string }) {
  return <CaseStudyView projectKey={projectKey} />;
}
