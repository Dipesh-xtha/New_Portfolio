'use client';

import React, { useEffect, useRef, useState } from 'react';

const tools = [
  { name: 'Figma', icon: '/assets/logo-figma.webp', width: 160, height: 160 },
  { name: 'Photoshop', icon: '/assets/logo-photoshop.webp', width: 160, height: 160 },
  { name: 'Framer', icon: '/assets/logo-framer.svg', width: 24, height: 24 },
  { name: 'Claude', icon: '/assets/logo-claude.webp', width: 160, height: 159 },
  { name: 'ChatGPT', icon: '/assets/logo-chatgpt.webp', width: 160, height: 160 },
  { name: 'Notion', icon: '/assets/logo-notion.webp', width: 160, height: 160 },
  { name: 'Jira', icon: '/assets/logo-jira.svg', width: 24, height: 24 },
  { name: 'HTML', icon: '/assets/logo-html5.svg', width: 24, height: 24 },
  { name: 'CSS', icon: '/assets/logo-css.svg', width: 128, height: 128 },
  { name: 'GitHub', icon: '/assets/logo-github.svg', width: 24, height: 24 },
];

type Introduction =
  | {
      id: string;
      kind: 'text';
      lang: string;
      lead: string;
      name: string;
    }
  | {
      id: string;
      kind: 'artwork';
      lang: string;
      src: string;
    };

const introductions: Introduction[] = [
  {
    id: 'english',
    kind: 'text',
    lang: 'en',
    lead: 'Oh hey—',
    name: 'Dipesh here.',
  },
  {
    id: 'nepali',
    kind: 'text',
    lang: 'ne',
    lead: 'ए, नमस्ते! म ',
    name: 'दिपेश।',
  },
  {
    id: 'ranjana',
    kind: 'artwork',
    lang: 'new',
    src: '/assets/ranjana-greeting.svg',
  },
];

export default function AboutIntro() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const originalRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [introductionIndex, setIntroductionIndex] = useState(0);
  const introduction = introductions[introductionIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const intervalId = window.setInterval(() => {
      setIntroductionIndex((current) => (current + 1) % introductions.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    const original = originalRef.current;
    if (!carousel || !track || !original) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isPaused = paused || reducedMotion.matches;
    let hovering = false;
    let visible = true;
    let offset = offsetRef.current;
    let speed = 30;
    let lastTime = 0;
    let animationId = 0;

    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;

      if (!isPaused && visible && !document.hidden) {
        const targetSpeed = hovering ? 10 : 30;
        speed += (targetSpeed - speed) * Math.min(1, elapsed / 260);
        const loopWidth = original.getBoundingClientRect().width;
        if (loopWidth > 0) {
          offset = (offset + (speed * elapsed) / 1000) % loopWidth;
          offsetRef.current = offset;
          track.style.transform = `translate3d(${-offset}px,0,0)`;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const handlePointerEnter = () => {
      hovering = true;
    };
    const handlePointerLeave = () => {
      hovering = false;
    };
    const handleFocusIn = () => {
      hovering = true;
    };
    const handleFocusOut = () => {
      hovering = false;
    };

    carousel.addEventListener('pointerenter', handlePointerEnter);
    carousel.addEventListener('pointerleave', handlePointerLeave);
    carousel.addEventListener('focusin', handleFocusIn);
    carousel.addEventListener('focusout', handleFocusOut);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(carousel);
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      isPaused = event.matches;
      if (isPaused) track.style.transform = '';
      setPaused(isPaused);
    };
    reducedMotion.addEventListener('change', handleMotionChange);

    animationId = requestAnimationFrame(animate);

    return () => {
      carousel.removeEventListener('pointerenter', handlePointerEnter);
      carousel.removeEventListener('pointerleave', handlePointerLeave);
      carousel.removeEventListener('focusin', handleFocusIn);
      carousel.removeEventListener('focusout', handleFocusOut);
      reducedMotion.removeEventListener('change', handleMotionChange);
      observer?.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [paused]);

  return (
    <section className="about-intro" id="about-intro" aria-labelledby="about-heading">
      <div>
        <div className="eyebrow">The person behind the work</div>
        <h2 id="about-heading" aria-label="Oh hey—Dipesh here.">
          <span
            key={introduction.id}
            className={`about-intro__greeting${introduction.kind === 'artwork' ? ' about-intro__greeting--artwork' : ''}`}
            lang={introduction.lang}
            aria-hidden="true"
          >
            {introduction.kind === 'artwork' ? (
              <img src={introduction.src} alt="" width={1400} height={150} />
            ) : (
              <>
                {introduction.lead}
                <em>{introduction.name}</em>
              </>
            )}
          </span>
        </h2>
        <p>
          I’m a product designer in Kathmandu. I turn complicated journeys into clear, useful
          experiences by listening closely, finding the real problem, and shaping thoughtful
          interfaces.
        </p>
      </div>

      <div className="toolkit" aria-labelledby="toolkit-heading">
        <div className="toolkit-top">
          <h3 id="toolkit-heading" aria-label="In my toolkit">
            In my{' '}
            <span className="tool-word" aria-hidden="true">
              <span className="tool-glyph tool-glyph--t">
                <img src="/assets/tool-word.webp" alt="" width={1100} height={391} />
              </span>
              <span className="tool-glyph tool-glyph--nut">
                <img src="/assets/tool-word.webp" alt="" width={1100} height={391} />
              </span>
              <span className="tool-glyph tool-glyph--gear">
                <img src="/assets/tool-word.webp" alt="" width={1100} height={391} />
              </span>
              <span className="tool-glyph tool-glyph--l">
                <img src="/assets/tool-word.webp" alt="" width={1100} height={391} />
              </span>
              kit
            </span>
          </h3>
          <div className="toolkit-top__meta">
            <span>Design · thinking · AI</span>
            <button
              className="tool-marquee__toggle"
              type="button"
              data-tool-toggle
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="tool-marquee"
          data-tool-carousel
          role="region"
          aria-label="Tools I use"
        >
          <div className="tool-marquee__viewport">
            <div ref={trackRef} className="tool-marquee__track" data-tool-track>
              <ul ref={originalRef} className="tool-list" data-tool-set>
                {tools.map((tool) => (
                  <li key={tool.name}>
                    <img
                      className="tool-logo"
                      src={tool.icon}
                      alt=""
                      aria-hidden="true"
                      width={tool.width}
                      height={tool.height}
                    />
                    {tool.name}
                  </li>
                ))}
              </ul>
              {/* Duplicated track for continuous seamless loop */}
              <ul className="tool-list" aria-hidden="true">
                {tools.map((tool, idx) => (
                  <li key={`clone-${idx}`}>
                    <img
                      className="tool-logo"
                      src={tool.icon}
                      alt=""
                      aria-hidden="true"
                      width={tool.width}
                      height={tool.height}
                    />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
