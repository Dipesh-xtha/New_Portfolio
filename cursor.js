(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const portrait = document.querySelector('.hero__portrait');
  const dogStates = ['default', 'hover', 'click', 'idle'];
  const dogSources = Object.fromEntries(dogStates.map(state => [state, `assets/cursor-dog-${state}.png`]));
  const portraitAlpha = document.createElement('canvas');
  const portraitContext = portraitAlpha.getContext('2d', { willReadFrequently: true });
  let portraitReady = false;
  let cursor;
  let dot;
  let dog;
  let carouselCharacter;
  let intro;
  let x = 0;
  let y = 0;
  let dogX = 0;
  let dogY = 0;
  let visible = false;
  let pressed = false;
  let idle = false;
  let frame = 0;
  let idleTimer = 0;

  const enabled = () => finePointer.matches && !reducedMotion.matches;

  // The portrait spans a transparent rectangle. Sample alpha so the greeting
  // appears only over the illustrated person, not the empty part of the image.
  const preparePortrait = () => {
    if (!portrait || !portraitContext || !portrait.naturalWidth) return;
    portraitAlpha.width = 320;
    portraitAlpha.height = Math.round(320 * portrait.naturalHeight / portrait.naturalWidth);
    portraitContext.drawImage(portrait, 0, 0, portraitAlpha.width, portraitAlpha.height);
    portraitReady = true;
  };

  const overPortrait = (clientX, clientY) => {
    if (!portraitReady) return false;
    const rect = portrait.getBoundingClientRect();
    const scale = Math.min(rect.width / portrait.naturalWidth, rect.height / portrait.naturalHeight);
    const imageWidth = portrait.naturalWidth * scale;
    const imageHeight = portrait.naturalHeight * scale;
    const imageLeft = rect.right - imageWidth;
    const imageTop = rect.bottom - imageHeight;
    if (clientX < imageLeft || clientX >= imageLeft + imageWidth || clientY < imageTop || clientY >= imageTop + imageHeight) return false;
    const sampleX = Math.floor((clientX - imageLeft) / imageWidth * portraitAlpha.width);
    const sampleY = Math.floor((clientY - imageTop) / imageHeight * portraitAlpha.height);
    return portraitContext.getImageData(sampleX, sampleY, 1, 1).data[3] > 72;
  };

  const draw = () => {
    frame = 0;
    const dx = x - dogX;
    const dy = y - dogY;
    dogX += dx * .32;
    dogY += dy * .32;
    const tilt = Math.max(-9, Math.min(9, dx * .11));
    const dogLeft = x + 102 > innerWidth ? dogX - 102 : dogX + 16;
    const dogTop = y + 103 > innerHeight ? dogY - 103 : dogY + 17;
    const introLeft = Math.max(8, Math.min(x + 16, innerWidth - intro.offsetWidth - 8));
    const introTop = Math.max(8, Math.min(y + 20, innerHeight - intro.offsetHeight - 8));
    const characterLeft = x + 108 > innerWidth ? x - 108 : x + 16;
    const characterTop = y + 109 > innerHeight ? y - 109 : y + 17;
    dog.style.transform = `translate3d(${dogLeft}px, ${dogTop}px, 0) rotate(${tilt}deg)`;
    carouselCharacter.style.transform = `translate3d(${characterLeft}px, ${characterTop}px, 0) rotate(${Math.max(-6, Math.min(6, tilt))}deg)`;
    intro.style.transform = `translate3d(${introLeft}px, ${introTop}px, 0)`;
    if (visible && (Math.abs(dx) > .2 || Math.abs(dy) > .2 || Math.abs(tilt) > .2)) frame = requestAnimationFrame(draw);
  };

  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };

  const setState = target => {
    if (!(target instanceof Element)) return;
    const action = target.closest('a, button, summary, [role="button"]');
    const text = !action && target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, input, textarea, [contenteditable="true"]');
    const hero = !action && !text && Boolean(target.closest('.hero')) && overPortrait(x, y);
    const carousel = !action && Boolean(target.closest('.off-clock .image-loop__viewport'));
    cursor.classList.toggle('is-visible', !text);
    cursor.dataset.mode = hero ? 'intro' : carousel ? 'carousel' : 'dog';
    cursor.dataset.dog = pressed ? 'click' : action ? 'hover' : idle ? 'idle' : 'default';
  };

  const onMove = event => {
    if (!enabled() || event.pointerType === 'touch') return;
    x = event.clientX;
    y = event.clientY;
    if (!visible) { dogX = x; dogY = y; visible = true; }
    idle = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      idle = true;
      setState(document.elementFromPoint(x, y));
    }, 1800);
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    setState(document.elementFromPoint(x, y));
    schedule();
  };

  const hide = () => {
    visible = false;
    clearTimeout(idleTimer);
    cursor.classList.remove('is-visible');
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const setEnabled = () => {
    const active = enabled();
    root.classList.toggle('ink-cursor-enabled', active);
    if (!active) hide();
  };

  cursor = document.createElement('div');
  cursor.className = 'ink-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.dataset.mode = 'dog';
  cursor.dataset.dog = 'default';
  cursor.innerHTML = `<span class="ink-cursor__dot"></span><span class="ink-cursor__dog">${dogStates.map(state => `<img class="ink-cursor__dog-image" data-dog-image="${state}" src="${dogSources[state]}" alt="" draggable="false">`).join('')}</span><img class="ink-cursor__carousel-character" src="assets/cursor-dog-heart-glasses.png" alt="" draggable="false"><span class="ink-cursor__intro">Yo, I’m Dipesh Shrestha</span>`;
  document.body.append(cursor);
  dot = cursor.querySelector('.ink-cursor__dot');
  dog = cursor.querySelector('.ink-cursor__dog');
  carouselCharacter = cursor.querySelector('.ink-cursor__carousel-character');
  intro = cursor.querySelector('.ink-cursor__intro');

  if (portrait) {
    if (portrait.complete) preparePortrait();
    else portrait.addEventListener('load', preparePortrait, { once: true });
  }
  setEnabled();
  finePointer.addEventListener('change', setEnabled);
  reducedMotion.addEventListener('change', setEnabled);
  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', event => {
    if (enabled() && visible) setState(event.target);
  });
  document.addEventListener('pointerdown', event => {
    if (!enabled() || event.pointerType === 'touch') return;
    pressed = true;
    setState(event.target);
  });
  document.addEventListener('pointerup', event => {
    pressed = false;
    if (enabled()) setState(event.target);
  });
  document.addEventListener('pointercancel', () => { pressed = false; });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) hide(); });
  addEventListener('blur', hide);
})();
