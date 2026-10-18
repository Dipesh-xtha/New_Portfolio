import React from 'react';

export default function Recognition() {
  return (
    <section aria-labelledby="recognition-heading">
      <div className="eyebrow">Recognition along the way</div>
      <h2 className="heading" id="recognition-heading">
        A six-hour idea. <em>A winning moment.</em>
      </h2>
      <article className="feature" aria-labelledby="award-title">
        <div className="media">
          <div className="recognition-collage" aria-label="Four moments from the UI/UX Showdown">
            <figure className="recognition-shot recognition-shot--award">
              <span className="recognition-shot__oriented">
              <img
                src="/assets/recognition-award.webp"
                alt="Dipesh receiving his UI/UX Showdown award on stage"
                loading="lazy"
                width={1400}
                height={1050}
              />
              </span>
            </figure>
            <figure className="recognition-shot recognition-shot--event">
              <span className="recognition-shot__oriented">
              <img
                src="/assets/recognition-event.webp"
                alt="A moment at the competition event"
                loading="lazy"
                width={1400}
                height={1050}
              />
              </span>
            </figure>
            <figure className="recognition-shot recognition-shot--payment">
              <img
                src="/assets/recognition-payment.webp"
                alt="The pending payment problem explored during the challenge"
                loading="lazy"
                width={1154}
                height={1280}
              />
            </figure>
            <figure className="recognition-shot recognition-shot--design">
              <img
                src="/assets/recognition-design.webp"
                alt="The UI design work created for the challenge"
                loading="lazy"
                width={960}
                height={1280}
              />
            </figure>
          </div>
          <div className="media__caption">
            <span>At the award ceremony</span>
            <span>UI/UX Showdown</span>
          </div>
        </div>

        <div className="story">
          <span className="award-label">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 3h10v4a5 5 0 0 1-10 0V3ZM7 5H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4m-4 1v5m-4 3h8m-9 0h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            First position
          </span>
          <h2 id="award-title">
            UI/UX <span>Showdown</span>
          </h2>
          <p className="topic">
            <span>Design topic</span>
            <strong>Making eSewa pending payments easier to understand</strong>
          </p>
          <div className="story-beats">
            <div className="story-beat">
              <span className="beat-label">The issue</span>
              <p>
                Money may be deducted while the merchant has not received it. Users are left unsure
                whether to wait, retry, or seek help.
              </p>
            </div>
            <div className="story-beat">
              <span className="beat-label">My solution</span>
              <p>
                I explored clearer payment feedback, safeguards against duplicate payments, and
                visible support-case progress.
              </p>
            </div>
          </div>
          <div className="facts" aria-label="Competition at a glance">
            <div className="fact">
              <small>When</small>
              <strong>6-hour challenge</strong>
            </div>
            <div className="fact">
              <small>Event</small>
              <strong>ICT Meetup v8.0</strong>
            </div>
            <div className="fact">
              <small>Organized by</small>
              <strong>Prime IT Club</strong>
            </div>
          </div>
          <details className="disclosure">
            <summary>
              How I won - the short process <span className="plus" aria-hidden="true">+</span>
            </summary>
            <div className="disclosure__body">
              <ol>
                <li>
                  <strong>Frame:</strong> focus on the uncertainty after a payment is deducted but not
                  received by the merchant.
                </li>
                <li>
                  <strong>Clarify:</strong> make payment status and the safe next step easier to
                  understand.
                </li>
                <li>
                  <strong>Support:</strong> reduce accidental repeat payments and show how a support case
                  is progressing.
                </li>
              </ol>
              <p>
                I brought this journey together within the six-hour challenge, and the entry earned
                first position.
              </p>
            </div>
          </details>
        </div>
      </article>

      <p className="preview-note">
        <span>A six-hour design challenge at ICT Meetup v8.0 · Dipesh Shrestha</span>
        <a className="section-jump" href="#about-intro">
          Meet the designer
        </a>
      </p>
    </section>
  );
}
