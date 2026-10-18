import React from 'react';
import Link from 'next/link';

export default function WorkGallery() {
  return (
    <section className="work-gallery" id="work" aria-labelledby="work-heading">
      <img
        className="work-gallery__shape"
        src="/assets/work-border-one.svg"
        alt=""
        aria-hidden="true"
        width={1099}
        height={1480}
      />
      <img
        className="work-gallery__stroke"
        src="/assets/work-border-two.svg"
        alt=""
        aria-hidden="true"
        width={1104}
        height={1484}
      />
      <div className="work-gallery__content">
        <h2 id="work-heading">Work gallery</h2>

        <article className="work-card work-card--featured">
          <div className="work-card__media">
            <img
              src="/assets/work-feature.webp"
              alt="Bugv enterprise security website redesign displayed on a laptop"
              loading="lazy"
              width={1400}
              height={933}
            />
            <span className="work-card__featured">Featured case study</span>
          </div>
          <div className="work-card__details">
            <div>
              <div className="work-tags">
                <span>B2B SaaS</span>
                <span>Research &amp; strategy</span>
                <span>Website redesign</span>
              </div>
              <h3>Bugv - clarity for two audiences.</h3>
              <p>Reshaping a cybersecurity website around enterprise buyers and security researchers.</p>
            </div>
            <Link
              className="work-card__link"
              href="/case-study/website"
              aria-label="Read the Bugv website redesign case study"
            >
              View case study{' '}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
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

        <div className="work-gallery__grid">
          <article className="work-card">
            <div className="work-card__media work-card__media--small">
              <img
                className="work-card__background"
                src="/assets/work-kyc-background.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={1400}
                height={788}
              />
              <img
                className="work-card__foreground work-card__foreground--kyc"
                src="/assets/work-kyc-foreground.webp"
                alt="Bugv KYC verification form with step-by-step progress"
                loading="lazy"
                width={1400}
                height={1149}
              />
            </div>
            <div className="work-tags">
              <span>KYC Verification</span>
              <span>Product Design</span>
            </div>
            <h3>Making verification easier to complete.</h3>
            <p>
              Transforming a long form into a guided four-step flow with clear progress, feedback, and
              recovery.
            </p>
            <Link
              className="work-card__link"
              href="/case-study/kyc"
              aria-label="Read the Bugv KYC redesign case study"
            >
              View case study{' '}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                  d="M5 19 19 5M8 5h11v11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </article>

          <article className="work-card">
            <div className="work-card__media work-card__media--small">
              <img
                className="work-card__background"
                src="/assets/work-b2b-background.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={1400}
                height={788}
              />
              <img
                className="work-card__foreground work-card__foreground--b2b"
                src="/assets/work-b2b-foreground.webp"
                alt="Bugv dashboards and workflow screens"
                loading="lazy"
                width={1400}
                height={933}
              />
            </div>
            <div className="work-tags">
              <span>B2B SaaS</span>
              <span>Product Design</span>
              <span>Workflow Design</span>
            </div>
            <h3>Simplifying everyday B2B workflows.</h3>
            <p>
              Designing clearer dashboards, submission flows, data tables, and integrations for faster
              operational decisions.
            </p>
            <Link
              className="work-card__link"
              href="/case-study/product"
              aria-label="View selected Bugv product interfaces"
            >
              View case study{' '}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                  d="M5 19 19 5M8 5h11v11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
