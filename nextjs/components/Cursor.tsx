'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const dogStates = ['default', 'hover', 'click', 'idle'] as const;
type DogState = typeof dogStates[number];
type CursorMode = 'dog' | 'intro' | 'carousel';

const dogSources: Record<DogState, string> = {
  default: '/assets/cursor-dog-default.webp',
  hover: '/assets/cursor-dog-hover.webp',
  click: '/assets/cursor-dog-click.webp',
  idle: '/assets/cursor-dog-idle.webp',
};

export default function Cursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const dogRef = useRef<HTMLSpanElement>(null);
  const carouselCharRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    const portraitAlpha = document.createElement('canvas');
    const portraitContext = portraitAlpha.getContext('2d', { willReadFrequently: true });
    let portraitReady = false;

    let x = 0;
    let y = 0;
    let dogX = 0;
    let dogY = 0;
    let visible = false;
    let pressed = false;
    let idle = false;
    let frame = 0;
    let idleTimer: NodeJS.Timeout | number = 0;

    const enabled = () => finePointer.matches && !reducedMotion.matches;

    const preparePortrait = () => {
      const portrait = document.querySelector<HTMLImageElement>('.hero__portrait');
      if (!portrait || !portraitContext || !portrait.naturalWidth) return;
      portraitAlpha.width = 320;
      portraitAlpha.height = Math.round((320 * portrait.naturalHeight) / portrait.naturalWidth);
      portraitContext.drawImage(portrait, 0, 0, portraitAlpha.width, portraitAlpha.height);
      portraitReady = true;
    };

    const overPortrait = (clientX: number, clientY: number) => {
      const portrait = document.querySelector<HTMLImageElement>('.hero__portrait');
      if (!portrait || !portraitReady || !portraitContext) return false;
      const rect = portrait.getBoundingClientRect();
      const scale = Math.min(rect.width / portrait.naturalWidth, rect.height / portrait.naturalHeight);
      const imageWidth = portrait.naturalWidth * scale;
      const imageHeight = portrait.naturalHeight * scale;
      const imageLeft = rect.right - imageWidth;
      const imageTop = rect.bottom - imageHeight;
      if (
        clientX < imageLeft ||
        clientX >= imageLeft + imageWidth ||
        clientY < imageTop ||
        clientY >= imageTop + imageHeight
      ) {
        return false;
      }
      const sampleX = Math.floor(((clientX - imageLeft) / imageWidth) * portraitAlpha.width);
      const sampleY = Math.floor(((clientY - imageTop) / imageHeight) * portraitAlpha.height);
      return portraitContext.getImageData(sampleX, sampleY, 1, 1).data[3] > 72;
    };

    const draw = () => {
      frame = 0;
      const dx = x - dogX;
      const dy = y - dogY;
      dogX += dx * 0.32;
      dogY += dy * 0.32;
      const tilt = Math.max(-9, Math.min(9, dx * 0.11));
      const dogLeft = x + 102 > window.innerWidth ? dogX - 102 : dogX + 16;
      const dogTop = y + 103 > window.innerHeight ? dogY - 103 : dogY + 17;
      const introEl = introRef.current;
      const introLeft = introEl
        ? Math.max(8, Math.min(x + 16, window.innerWidth - introEl.offsetWidth - 8))
        : x + 16;
      const introTop = introEl
        ? Math.max(8, Math.min(y + 20, window.innerHeight - introEl.offsetHeight - 8))
        : y + 20;
      const characterLeft = x + 108 > window.innerWidth ? x - 108 : x + 16;
      const characterTop = y + 109 > window.innerHeight ? y - 109 : y + 17;

      if (dogRef.current) {
        dogRef.current.style.transform = `translate3d(${dogLeft}px, ${dogTop}px, 0) rotate(${tilt}deg)`;
      }
      if (carouselCharRef.current) {
        carouselCharRef.current.style.transform = `translate3d(${characterLeft}px, ${characterTop}px, 0) rotate(${Math.max(
          -6,
          Math.min(6, tilt)
        )}deg)`;
      }
      if (introEl) {
        introEl.style.transform = `translate3d(${introLeft}px, ${introTop}px, 0)`;
      }

      if (visible && (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2 || Math.abs(tilt) > 0.2)) {
        frame = requestAnimationFrame(draw);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const setState = (target: Element | null) => {
      const cursor = cursorRef.current;
      if (!cursor || !(target instanceof Element)) return;
      const action = target.closest('a, button, summary, [role="button"]');
      const text =
        !action &&
        target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, input, textarea, [contenteditable="true"]');
      const hero = !action && !text && Boolean(target.closest('.hero')) && overPortrait(x, y);
      const carousel = !action && Boolean(target.closest('.off-clock .image-loop__viewport'));

      cursor.classList.toggle('is-visible', !text);
      cursor.dataset.mode = hero ? 'intro' : carousel ? 'carousel' : 'dog';
      cursor.dataset.dog = pressed ? 'click' : action ? 'hover' : idle ? 'idle' : 'default';
    };

    const onMove = (event: PointerEvent) => {
      if (!enabled() || event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        dogX = x;
        dogY = y;
        visible = true;
      }
      idle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        idle = true;
        setState(document.elementFromPoint(x, y));
      }, 1800);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      setState(document.elementFromPoint(x, y));
      schedule();
    };

    const hide = () => {
      visible = false;
      clearTimeout(idleTimer);
      cursorRef.current?.classList.remove('is-visible');
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const setEnabled = () => {
      const active = enabled();
      root.classList.toggle('ink-cursor-enabled', active);
      if (!active) hide();
    };

    const portrait = document.querySelector<HTMLImageElement>('.hero__portrait');
    if (portrait) {
      if (portrait.complete) preparePortrait();
      else portrait.addEventListener('load', preparePortrait, { once: true });
    }

    setEnabled();
    finePointer.addEventListener('change', setEnabled);
    reducedMotion.addEventListener('change', setEnabled);
    document.addEventListener('pointermove', onMove, { passive: true });

    const handlePointerOver = (event: PointerEvent) => {
      if (enabled() && visible) setState(event.target as Element);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!enabled() || event.pointerType === 'touch') return;
      pressed = true;
      setState(event.target as Element);
    };
    const handlePointerUp = () => {
      pressed = false;
      if (enabled()) setState(document.elementFromPoint(x, y));
    };
    const handlePointerCancel = () => {
      pressed = false;
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    document.addEventListener('pointerover', handlePointerOver as EventListener);
    document.addEventListener('pointerdown', handlePointerDown as EventListener);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerCancel);
    document.addEventListener('pointerout', handlePointerOut as EventListener);
    window.addEventListener('blur', hide);

    return () => {
      hide();
      portrait?.removeEventListener('load', preparePortrait);
      root.classList.remove('ink-cursor-enabled');
      finePointer.removeEventListener('change', setEnabled);
      reducedMotion.removeEventListener('change', setEnabled);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', handlePointerOver as EventListener);
      document.removeEventListener('pointerdown', handlePointerDown as EventListener);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerCancel);
      document.removeEventListener('pointerout', handlePointerOut as EventListener);
      window.removeEventListener('blur', hide);
    };
  }, [pathname]);

  return (
    <div ref={cursorRef} className="ink-cursor" aria-hidden="true" data-mode="dog" data-dog="default">
      <span ref={dotRef} className="ink-cursor__dot" />
      <span ref={dogRef} className="ink-cursor__dog">
        {dogStates.map((state) => (
          <img
            key={state}
            className="ink-cursor__dog-image"
            data-dog-image={state}
            src={dogSources[state]}
            width={256}
            height={state === 'default' ? 233 : 234}
            alt=""
            draggable={false}
          />
        ))}
      </span>
      <img
        ref={carouselCharRef}
        className="ink-cursor__carousel-character"
        src="/assets/cursor-dog-heart-glasses.webp"
        width={256}
        height={214}
        alt=""
        draggable={false}
      />
      <span ref={introRef} className="ink-cursor__intro">
        Yo, I’m Dipesh Shrestha
      </span>
    </div>
  );
}
