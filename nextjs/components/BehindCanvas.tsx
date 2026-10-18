'use client';

import React, { useEffect, useRef, useState } from 'react';

const journeySteps = [
  {
    era: 'Early in college',
    title: 'One workshop opened the door.',
    desc: 'A senior introduced me to Figma. That first hands-on session made me curious about designing digital experiences.',
    pose: '/assets/journey-01.webp',
  },
  {
    era: '2024 · UI/UX internship',
    title: 'I learned the tools, then saw the gap.',
    desc: 'I grew comfortable in Figma, but knew I needed stronger UX foundations. I stepped away to find a better way forward.',
    pose: '/assets/journey-02.webp',
  },
  {
    era: 'L1 technical support',
    title: 'People changed the question.',
    desc: 'Handling customer issues showed me what I enjoy most: understanding a problem and helping someone through it.',
    pose: '/assets/journey-03.webp',
  },
  {
    era: 'A second internship',
    title: 'I returned with a reason.',
    desc: 'I rejoined design, learned UX principles on my own, and put them into practice during another internship.',
    pose: '/assets/journey-04.webp',
  },
  {
    era: 'Today · product design',
    title: 'Now I design full time.',
    desc: 'That time in support still shapes how I listen, frame problems, and make products clearer for people.',
    pose: '/assets/journey-05.webp',
  },
];

const offClockPhotos = [
  { src: '/assets/offclock/childphoto.webp?v=2', alt: 'A childhood memory', width: 1080, height: 1418, caption: 'A childhood memory' },
  { src: '/assets/offclock/dhime.webp', alt: 'Playing the Newari Dhime', width: 552, height: 828, caption: 'The Newari Dhime' },
  { src: '/assets/offclock/dhime2.webp', alt: 'A moment with the Dhime', width: 2700, height: 1800, caption: 'A moment with the Dhime' },
  { src: '/assets/offclock/dhime3.webp', alt: 'Dhime music with friends', width: 2700, height: 1800, caption: 'Dhime music with friends' },
  { src: '/assets/offclock/img_3558.webp', alt: 'A personal moment away from work', width: 3024, height: 4032, caption: 'Away from work' },
  { src: '/assets/offclock/tabletennise.webp', alt: 'Playing table tennis', width: 3024, height: 4032, caption: 'Table tennis' },
  { src: '/assets/offclock/travel.webp', alt: 'A travel memory', width: 2268, height: 4032, caption: 'Travel' },
  { src: '/assets/offclock/trekk1.webp', alt: 'A trekking memory', width: 1280, height: 1280, caption: 'Trekking' },
  { src: '/assets/offclock/trekk2.webp', alt: 'A moment outdoors', width: 4032, height: 3024, caption: 'Outdoors' },
  { src: '/assets/offclock/trekk3.webp', alt: 'On a trek', width: 3072, height: 4096, caption: 'On a trek' },
  { src: '/assets/offclock/trekk4.webp', alt: 'A mountain view', width: 960, height: 1280, caption: 'A mountain view' },
];

export default function BehindCanvas() {

  // Journey state
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Off-the-clock gallery
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const originalRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  // Journey scroll listener
  useEffect(() => {
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const line = window.innerHeight * (window.innerWidth <= 700 ? 0.7 : 0.55);
      let index = 0;
      stepRefs.current.forEach((step, i) => {
        if (step && step.getBoundingClientRect().top <= line) {
          index = i;
        }
      });
      setActiveStep(index);
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Off-the-clock gallery loop
  useEffect(() => {
    const gallery = galleryRef.current;
    const track = trackRef.current;
    const original = originalRef.current;
    if (!gallery || !track || !original) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isPaused = galleryPaused || reducedMotion.matches;
    let allowMotion = !reducedMotion.matches;
    let hovering = false;
    let visible = true;
    let offset = offsetRef.current;
    let speed = 38;
    let lastTime = 0;
    let frame = 0;

    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;

      if (!isPaused && visible && !document.hidden && allowMotion) {
        const targetSpeed = hovering ? 9 : 38;
        speed += (targetSpeed - speed) * Math.min(1, elapsed / 230);
        const loopWidth = original.getBoundingClientRect().width;
        if (loopWidth > 0) {
          offset = (offset + (speed * elapsed) / 1000) % loopWidth;
          offsetRef.current = offset;
          track.style.transform = `translate3d(${-offset}px,0,0)`;
        }
      }
      frame = requestAnimationFrame(animate);
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

    gallery.addEventListener('pointerenter', handlePointerEnter);
    gallery.addEventListener('pointerleave', handlePointerLeave);
    gallery.addEventListener('focusin', handleFocusIn);
    gallery.addEventListener('focusout', handleFocusOut);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(gallery);
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isPaused = e.matches;
      allowMotion = !e.matches;
      setGalleryPaused(isPaused);
    };
    reducedMotion.addEventListener('change', handleMotionChange);

    frame = requestAnimationFrame(animate);

    return () => {
      gallery.removeEventListener('pointerenter', handlePointerEnter);
      gallery.removeEventListener('pointerleave', handlePointerLeave);
      gallery.removeEventListener('focusin', handleFocusIn);
      gallery.removeEventListener('focusout', handleFocusOut);
      reducedMotion.removeEventListener('change', handleMotionChange);
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [galleryPaused]);

  return (
    <section className="behind" id="behind-canvas" aria-labelledby="behind-heading">
      <img
        className="behind__wave"
        src="/assets/work-border-two.svg"
        alt=""
        aria-hidden="true"
        width={1104}
        height={1484}
      />

      <div className="behind-top">
        <div className="eyebrow">Behind the canvas</div>
        <span className="section-number">02 / THE JOURNEY</span>
      </div>

      <div className="journey-heading">
        <h2 id="behind-heading">
          A winding path.
          <br />
          <em>A clearer purpose.</em>
        </h2>
        <p>
          A workshop sparked the interest. Helping people made it stick. Scroll through the moments
          that brought me here.
        </p>
      </div>

      <div className="journey-layout">
        <div
          className="journey-stage"
          data-journey-stage
          data-scene={activeStep}
          aria-label="Illustrations of Dipesh reacting to each stage of his journey"
        >
          <div className="journey-stage__top">
            <span>The story so far</span>
            <span className="journey-count" data-journey-count>
              {String(activeStep + 1).padStart(2, '0')} / {String(journeySteps.length).padStart(2, '0')}
            </span>
          </div>

          <div className="journey-stage__art" aria-hidden="true">
            {journeySteps.map((step, idx) => (
              <img
                key={step.era}
                className={`journey-pose ${activeStep === idx ? 'is-active' : ''}`}
                src={step.pose}
                alt=""
                data-journey-pose
                loading="lazy"
                decoding="async"
                width={700}
                height={1050}
              />
            ))}
          </div>

          <div className="journey-stage__bottom">
            <strong data-journey-caption>{journeySteps[activeStep].title}</strong>
            <span>Scroll to follow ↓</span>
          </div>

          <span
            className="journey-progress"
            data-journey-progress
            aria-hidden="true"
            style={{ width: `${((activeStep + 1) / journeySteps.length) * 100}%` }}
          />
        </div>

        <div className="journey-steps" aria-label="Five moments in Dipesh's design journey">
          {journeySteps.map((step, idx) => (
            <article
              key={step.era}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={`journey-step ${activeStep === idx ? 'is-active' : ''}`}
              data-journey-step
            >
              <span className="journey-step__index">{String(idx + 1).padStart(2, '0')}</span>
              <div>
                <span className="journey-step__era">{step.era}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="off-clock">
        <div className="off-clock__heading">
          <h3>When I close Figma...</h3>
          <p>You’ll find me at the table, on a trail, or keeping a Newari rhythm alive.</p>
        </div>

        <div
          ref={galleryRef}
          className="image-loop"
          data-carousel
          role="region"
          aria-label="Looping photo gallery of Dipesh's life outside design"
        >
          <div className="image-loop__viewport" data-loop-viewport>
            <div ref={trackRef} className="image-loop__track" data-loop-track>
              <div ref={originalRef} className="image-loop__set" data-loop-set>
                {offClockPhotos.map((photo) => (
                  <figure key={photo.src} className="image-loop__slide">
                    <img
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      loading="lazy"
                    />
                    <figcaption className="sr-only">{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {/* Duplicate track for seamless infinite scroll */}
              <div className="image-loop__set" aria-hidden="true">
                {offClockPhotos.map((photo, i) => (
                  <figure key={`dup-${i}`} className="image-loop__slide">
                    <img
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt=""
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="image-loop__footer">
            <span className="image-loop__hint">Hover to slow</span>
            <button
              className="image-loop__toggle"
              data-loop-toggle
              type="button"
              aria-pressed={galleryPaused}
              onClick={() => setGalleryPaused(!galleryPaused)}
            >
              {galleryPaused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
