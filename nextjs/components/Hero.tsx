import React from 'react';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <img
        className="hero__portrait"
        src="/assets/hero-portrait.webp"
        fetchPriority="high"
        decoding="async"
        alt=""
        aria-hidden="true"
        width={1600}
        height={843}
      />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="hero__tag">Dipesh Shrestha · Product Designer</span>
          <h1 id="hero-heading" aria-label="Clarity and Purpose">
            <span className="hero__line">
              Clarity{' '}
              <img
                src="/assets/hero-frame-icon.webp"
                alt=""
                aria-hidden="true"
                width={192}
                height={192}
              />
              <i>&amp;</i>
            </span>
            <span className="hero__line hero__line--purpose">
              Purpose{' '}
              <img
                src="/assets/hero-pencil-icon.webp"
                alt=""
                aria-hidden="true"
                width={192}
                height={192}
              />
              <b>.</b>
            </span>
          </h1>
          <p>
            Crafting meticulous, user-centered digital experiences that balance aesthetic elegance
            with rigorous functionality.
          </p>
          <a className="hero__jump" href="#work">
            Selected work <span aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
