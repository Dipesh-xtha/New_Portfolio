'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface CardState {
  expanded: boolean;
}

export default function ApproachDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];

  const [cardsState, setCardsState] = useState<CardState[]>([
    { expanded: false },
    { expanded: false },
    { expanded: false },
  ]);

  const hasExpanded = cardsState.some((c) => c.expanded);

  const toggleExpand = (index: number) => {
    setCardsState((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], expanded: !next[index].expanded };
      return next;
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    const count = countRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const clamp = (val: number) => Math.max(0, Math.min(1, val));
    const smoothstep = (value: number, start: number, end: number) => {
      const t = clamp((value - start) / (end - start));
      return t * t * (3 - 2 * t);
    };

    const getGeometry = () => {
      const width = window.innerWidth;
      const step = width <= 560 ? 169 : width <= 760 ? 181 : 203;
      const stackGap = width <= 560 ? 13 : 16;
      return { step, stackGap };
    };

    let { step, stackGap } = getGeometry();
    let positions = [0, step, step * 2];
    let rotations = [-1.25, 2.4, -2.25];
    let scales = [1, 1, 1];
    let target = [...positions];
    let targetRotations = [...rotations];
    let targetScales = [...scales];
    let frame = 0;
    let lastTime = 0;

    const render = () =>
      cards.forEach((card, index) => {
        card.style.setProperty('--card-y', `${positions[index]}px`);
        card.style.setProperty('--card-r', `${rotations[index]}deg`);
        card.style.setProperty('--card-scale', String(scales[index]));
      });

    const animate = (time: number) => {
      frame = 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;
      const blend = 1 - Math.exp(-elapsed / 75);
      let unsettled = false;

      positions = positions.map((position, index) => {
        const next = position + (target[index] - position) * blend;
        if (Math.abs(next - target[index]) > 0.08) unsettled = true;
        return next;
      });
      rotations = rotations.map((rotation, index) => {
        const next = rotation + (targetRotations[index] - rotation) * blend;
        if (Math.abs(next - targetRotations[index]) > 0.015) unsettled = true;
        return next;
      });
      scales = scales.map((scale, index) => {
        const next = scale + (targetScales[index] - scale) * blend;
        if (Math.abs(next - targetScales[index]) > 0.001) unsettled = true;
        return next;
      });

      if (!unsettled) {
        positions = [...target];
        rotations = [...targetRotations];
        scales = [...targetScales];
      }
      render();
      if (unsettled) frame = requestAnimationFrame(animate);
      else lastTime = 0;
    };

    const update = () => {
      if (reducedMotion.matches) {
        cards.forEach((card) => {
          card.inert = false;
          card.removeAttribute('aria-hidden');
          card.style.removeProperty('--card-y');
          card.style.removeProperty('--card-r');
          card.style.removeProperty('--card-scale');
        });
        return;
      }

      if (hasExpanded) {
        cards.forEach((card) => {
          card.inert = false;
          card.removeAttribute('aria-hidden');
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      ({ step, stackGap } = getGeometry());

      const second = smoothstep(progress, 0.12, 0.46);
      const third = smoothstep(progress, 0.55, 0.9);
      const thirdResting = step * 2 + (step + stackGap - step * 2) * second;

      target = [
        0,
        step + (stackGap - step) * second,
        thirdResting + (stackGap * 2 - (step + stackGap)) * third,
      ];
      targetRotations = [
        -1.25 + 0.65 * second,
        2.4 - 1.65 * second,
        -2.25 + 1.55 * third,
      ];
      targetScales = [1 - 0.022 * second, 1 - 0.02 * third, 1];

      const active = progress >= 0.87 ? 2 : progress >= 0.39 ? 1 : 0;
      if (count) {
        count.textContent = String(active + 1).padStart(2, '0');
      }

      cards.forEach((card, index) => {
        const covered = index === 0 ? second > 0.94 : index === 1 ? third > 0.94 : false;
        card.inert = covered;
        if (covered) card.setAttribute('aria-hidden', 'true');
        else card.removeAttribute('aria-hidden');
      });

      if (!frame) frame = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    reducedMotion.addEventListener('change', update);

    render();
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      reducedMotion.removeEventListener('change', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hasExpanded]);

  return (
    <section
      ref={sectionRef}
      className={`approach ${hasExpanded ? 'has-expanded' : ''}`}
      id="approach"
      aria-labelledby="approach-heading"
      data-approach
    >
      <div className="approach__layout">
        <div className="approach__intro">
          <div className="eyebrow">My design approach</div>
          <h2 id="approach-heading">
            How I <em>approach</em>
            <br /> product design.
          </h2>
          <p>
            Three principles that guide how I simplify problems, build systems and shape product
            experiences.
          </p>
          <button className="approach__hint approach__explore" type="button"
            aria-expanded={hasExpanded} aria-controls="approach-cards"
            onClick={() => {
              setCardsState(cardsState.map(() => ({ expanded: !hasExpanded })));
              requestAnimationFrame(() => {
                const target = hasExpanded ? sectionRef.current : document.getElementById('approach-cards');
                target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
              });
            }}>
            {hasExpanded ? 'Back to scroll view' : 'Explore all 3 principles'}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div className="approach__deck" id="approach-cards" aria-label="Three product design principles">
          {/* Card 01 */}
          <article
            ref={cardRefs[0]}
            className={`approach__card ${cardsState[0].expanded ? 'is-expanded' : ''}`}
            data-approach-card
          >
            <div className="approach__meta">
              <span>01</span>
              <img
                src="/assets/approach-clarity.svg"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
              />
            </div>
            <h3>Clarity in complexity</h3>
            <p>Simplifying dense workflows and information into focused, understandable experiences.</p>
            <button
              className="approach__plus"
              type="button"
              aria-label={`${cardsState[0].expanded ? 'Collapse' : 'Expand'} Clarity in complexity`}
              aria-expanded={cardsState[0].expanded}
              aria-controls="approach-detail-1"
              data-approach-expand
              onClick={() => toggleExpand(0)}
            >
              {cardsState[0].expanded ? '×' : '+'}
            </button>
            <div className="approach__detail" id="approach-detail-1" hidden={!cardsState[0].expanded}>
              <span className="approach__applied">Applied in: KYC verification redesign</span>
              <Link className="approach__case-link" href="/case-study/kyc">
                View KYC case study{' '}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 19 19 5M8 5h11v11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>

          {/* Card 02 */}
          <article
            ref={cardRefs[1]}
            className={`approach__card ${cardsState[1].expanded ? 'is-expanded' : ''}`}
            data-approach-card
          >
            <div className="approach__meta">
              <span>02</span>
              <img
                src="/assets/approach-systems.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <h3>Systems that scale</h3>
            <p>Creating reusable components and patterns that keep products consistent as they grow.</p>
            <button
              className="approach__plus"
              type="button"
              aria-label={`${cardsState[1].expanded ? 'Collapse' : 'Expand'} Systems that scale`}
              aria-expanded={cardsState[1].expanded}
              aria-controls="approach-detail-2"
              data-approach-expand
              onClick={() => toggleExpand(1)}
            >
              {cardsState[1].expanded ? '×' : '+'}
            </button>
            <div className="approach__detail" id="approach-detail-2" hidden={!cardsState[1].expanded}>
              <span className="approach__applied">
                Applied in: Bugv dashboards, tables and operational workflows
              </span>
              <Link className="approach__case-link" href="/case-study/product">
                View additional product work{' '}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 19 19 5M8 5h11v11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>

          {/* Card 03 */}
          <article
            ref={cardRefs[2]}
            className={`approach__card ${cardsState[2].expanded ? 'is-expanded' : ''}`}
            data-approach-card
          >
            <div className="approach__meta">
              <span>03</span>
              <img
                src="/assets/approach-purpose.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <h3>Purposeful interaction</h3>
            <p>Designing feedback, recovery paths and states that help users move confidently.</p>
            <button
              className="approach__plus"
              type="button"
              aria-label={`${cardsState[2].expanded ? 'Collapse' : 'Expand'} Purposeful interaction`}
              aria-expanded={cardsState[2].expanded}
              aria-controls="approach-detail-3"
              data-approach-expand
              onClick={() => toggleExpand(2)}
            >
              {cardsState[2].expanded ? '×' : '+'}
            </button>
            <div className="approach__detail" id="approach-detail-3" hidden={!cardsState[2].expanded}>
              <span className="approach__applied">
                Applied in: guided verification and program-submission flows
              </span>
              <Link className="approach__case-link" href="/case-study/kyc#decisions">
                Explore interaction decisions{' '}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 19 19 5M8 5h11v11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>

          <div className="approach__counter" aria-hidden="true">
            <span ref={countRef} data-approach-count>
              01
            </span>{' '}
            / 03
          </div>
        </div>
      </div>
    </section>
  );
}
