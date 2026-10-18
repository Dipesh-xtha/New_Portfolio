import React from 'react';

export default function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="page-footer__row">
        <nav className="page-footer__links" aria-label="Social and contact links">
          <a
            href="https://www.instagram.com/deepesh_xtha/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M5 19 19 5M8 5h11v11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/dipesh-shrestha-7ab9a6277/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M5 19 19 5M8 5h11v11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="mailto:dipeshshresthaa70@gmail.com">
            Email{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M5 19 19 5M8 5h11v11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
        <a className="page-footer__top" href="#top">
          Back to top <span className="page-footer__top-icon" aria-hidden="true">↑</span>
        </a>
      </div>
      <p className="page-footer__note">
        © 2026 Dipesh Shrestha <span aria-hidden="true">·</span> Made with care in Kathmandu.
      </p>
    </footer>
  );
}
