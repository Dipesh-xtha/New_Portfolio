'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Preserve links shared before the case studies received their own URLs.
export default function LegacyCaseStudy() {
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('project');
    const project = key && ['website', 'kyc', 'product'].includes(key) ? key : 'website';
    window.location.replace(`/case-study/${project}/${window.location.hash}`);
  }, []);

  return (
    <main className="case-page">
      <h1>Explore the case studies</h1>
      <p>Opening your case study…</p>
      <nav aria-label="Case studies">
        <Link href="/case-study/website/">Website redesign</Link>{' · '}
        <Link href="/case-study/kyc/">KYC verification</Link>{' · '}
        <Link href="/case-study/product/">Product interfaces</Link>
      </nav>
    </main>
  );
}
