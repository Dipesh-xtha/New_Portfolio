'use client';

import React, { useState } from 'react';

export default function ContactCta() {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const email = 'dipeshshresthaa70@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFeedback('Ready to paste into your email app.');
      setTimeout(() => {
        setCopied(false);
        setFeedback('');
      }, 3000);
    } catch {
      setFeedback('Copy is unavailable here. You can select the email address above.');
    }
  };

  return (
    <section className="contact-cta" id="contact" aria-labelledby="contact-heading">
      <div className="contact-cta__copy">
        <span className="contact-cta__eyebrow">Your turn to say hello</span>
        <h2 id="contact-heading">
          Have something <span>in mind?</span>
          <br />
          <em>Let&apos;s talk.</em>
        </h2>
        <p className="contact-cta__lead">
          Tell me what you&apos;re building or where the experience feels stuck. I&apos;d love to
          hear about it.
        </p>
        <div className="contact-cta__actions">
          <a
            className="contact-cta__primary"
            href="mailto:dipeshshresthaa70@gmail.com?subject=Let%27s%20talk%20about%20a%20project"
          >
            Send me a message{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 19 19 5M7 5h12v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button className="contact-cta__copy-button" type="button" onClick={handleCopy}>
            {copied ? 'Email copied' : 'Copy email address'}
          </button>
        </div>
        <p className="contact-cta__email">{email}</p>
        <span className="contact-cta__feedback" aria-live="polite">
          {feedback}
        </span>
      </div>

      <div className="contact-cta__visual">
        <div className="contact-cta__figure">
          <img
            src="/assets/contact-waiting-level-v2.webp"
            alt="Illustration of Dipesh looking ahead and welcoming a conversation"
            loading="lazy"
            decoding="async"
            width={700}
            height={1050}
          />
          <img
            className="contact-cta__reaction"
            src="/assets/contact-waiting-glance-v2.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={700}
            height={1050}
          />
        </div>
      </div>
    </section>
  );
}
