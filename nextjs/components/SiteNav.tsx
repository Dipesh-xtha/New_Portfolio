'use client';

import React, { useState, useEffect } from 'react';

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <header className="site-nav" id="top">
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#top" aria-label="Dipesh Shrestha - back to top">
          <img src="/assets/nav-logo.webp" alt="Dipesh Shrestha" width={577} height={223} />
        </a>
        <button
          className="site-nav__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>
        <nav
          className={`site-nav__links ${isOpen ? 'is-open' : ''}`}
          id="site-menu"
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setIsOpen(false)}>
            Work
          </a>
          <a href="#about-intro" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a
            href="/Dipesh_Shrestha_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Dipesh's resume (PDF, new tab)"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
