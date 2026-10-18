import React from 'react';
import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import WorkGallery from '@/components/WorkGallery';
import ApproachDeck from '@/components/ApproachDeck';
import Recognition from '@/components/Recognition';
import AboutIntro from '@/components/AboutIntro';
import BehindCanvas from '@/components/BehindCanvas';
import ContactCta from '@/components/ContactCta';
import PageFooter from '@/components/PageFooter';

export default function HomePage() {
  return (
    <div className="page">
      <SiteNav />
      <Hero />
      <main>
        <WorkGallery />
        <ApproachDeck />
        <Recognition />
        <AboutIntro />
        <BehindCanvas />
        <ContactCta />
      </main>
      <PageFooter />
    </div>
  );
}
