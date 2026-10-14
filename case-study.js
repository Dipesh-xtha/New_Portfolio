const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const asset = (n) => 'assets/' + n;
const shot = (name, title, detail = '', wide = false) => `<figure class="shot${wide ? ' shot--wide' : ''}"><img src="${asset(name)}" alt="${title}" loading="lazy"><figcaption><strong>${title}</strong>${detail}</figcaption></figure>`;
const section = (id, number, label, title, body) => `<section class="case-section" id="${id}" aria-labelledby="${id}-heading"><div class="section-kicker">${number} / ${label}</div><h2 id="${id}-heading">${title}</h2>${body}</section>`;
const facts = (items) => `<div class="fact-grid">${items.map(([label, value]) => `<div class="fact"><small>${label}</small><strong>${value}</strong></div>`).join('')}</div>`;
const decisions = (items) => `<div class="decision-grid">${items.map(([title, description], i) => `<div class="decision"><small>Decision ${String(i + 1).padStart(2, '0')}</small><h3>${title}</h3><p>${description}</p></div>`).join('')}</div>`;
const states = (items) => `<div class="state-grid">${items.map(([title, description]) => `<div class="state"><h3>${title}</h3><p>${description}</p></div>`).join('')}</div>`;

const projects = {
  website: {
    index: '01', eyebrow: 'Selected work · Cybersecurity platform', title: 'Bugv B2B <em>Website Redesign.</em>',
    lead: "Making Bugv’s security offerings easier for organizations to understand and explore, while keeping a distinct path for researchers.",
    tags: ['UI/UX · Product Designer', 'B2B SaaS', 'Website redesign'],
    hero: 'case-0-imgChatGptImageAug62026020838Pm1.png',
    heroAlt: 'Bugv website redesign presented on a laptop',
    next: 'kyc',
    sections: [
      section('overview','01','Project at a glance','A clearer route through a two-sided platform.',
        '<p class="intro">Bugv connects organizations seeking security testing with researchers who find and report vulnerabilities. This case study focuses on the B2B website experience.</p>' +
        facts([['Context','Website redesign for a cybersecurity platform with organization and researcher audiences.'],['Primary audience','Organizations evaluating Bug Bounty, PTaaS, and VDP.'],['Secondary audience','Security researchers who need a separate, discoverable route.'],['Scope','Homepage, product, researcher, and pricing page directions.']]) +
        '<p class="design-note">Design handoff and launch status are not yet verified.</p>'),
      section('problem','02','The problem','Two audiences, one unclear journey.',
        '<p class="intro">The research document’s review of the earlier site described messaging and navigation friction. These are heuristic observations, not findings from user interviews or usability tests.</p><div class="quote-panel"><p>A prospective buyer needed to answer three questions quickly.</p></div><ol class="number-list"><li>What does Bugv offer my organization?</li><li>Which security model fits my need?</li><li>Where do I go to discuss it?</li></ol><p>General feature-led messaging, blended audience navigation, and scattered technical explanations made that sequence less direct in the review. The redesign organizes the buyer’s evaluation path and keeps a researcher route visible.</p>'),
      section('research','03','Research & insights','From review to design direction.',
        '<p class="intro">Inputs: the supplied research document, its heuristic reading of the earlier site, and its competitive information architecture review. Its proposals and unverified claims are not treated as measured user behavior.</p>' +
        decisions([
          ['Separate the audiences','The earlier site mixed organization and researcher content in the same navigation context. Give organizations a product route and researchers their own entry point.'],
          ['Name each offering','General security language made engagement models harder to distinguish. Introduce Bug Bounty, PTaaS, and VDP as distinct choices with dedicated pages.'],
          ['Reveal detail at the right moment','Technical explanations were dispersed. Move from a simple overview to deeper product-specific details.'],
          ['Connect proof to action','The competitive review highlighted trust cues and clear next steps. Place verifiable proof and contact actions near relevant explanations.']
        ])),
      section('architecture','04','Information architecture','Route by intent, then deepen the detail.',
        '<p class="intro">The new structure gives each audience a distinct path. A verified before-and-after sitemap was not available in the supplied material.</p><div class="route-grid"><div class="route"><h3>For organizations</h3><p>Understand → compare → contact</p><ol><li>Homepage overview</li><li>Bug Bounty, PTaaS, or VDP</li><li>Product detail and pricing</li><li>Request pricing or contact Bugv</li></ol></div><div class="route"><h3>For researchers</h3><p>Discover the researcher experience</p><ol><li>Researcher entry point</li><li>Researcher page</li><li>Explore relevant programs</li></ol></div></div>'),
      section('decisions','05','Design decisions','What changed, and why.',
        decisions([
          ['Start with the buyer’s question','The homepage moves from what Bugv does to the problem, product choices, and next step. A first-time buyer can orient before going deeper.'],
          ['Make the products comparable','A shared discovery area introduces Bug Bounty, PTaaS, and VDP; dedicated pages explain how each works.'],
          ['Build trust without overclaiming','Process and credibility content support evaluation. Any public proof or product claim needs verification before publication.'],
          ['Make the next action clear','Contact actions sit near relevant explanations. Pricing uses “Request pricing” rather than unverified prices.'],
          ['Keep a visible researcher path','Researchers have a route that does not interrupt the organization’s product evaluation journey.']
        ]) + '<div class="screen-grid">' + shot('case-0-imgImage48.png','Product choice section','A focused introduction to distinct security offerings.') + shot('case-0-imgImage49.png','Audience navigation','Separate paths for buyers and researchers.') + '</div>'),
      section('screens','06','Design direction','The page-by-page experience.',
        '<p class="intro">The Figma case study defines six intended pages. These selected design crops show the direction; final exports and handoff confirmation are still needed.</p><div class="screen-grid">' +
        shot('case-0-imgImage1.png','Homepage','Introduces the platform, product choices, trust cues, and next step.') +
        shot('case-0-imgImage53.png','Bug Bounty','Explains the program model and its fit for an organization.') +
        shot('case-0-imgImage54.png','PTaaS','Shows the structured testing journey and what the service includes.') +
        shot('case-0-imgImage55.png','VDP','Explains a channel for receiving vulnerability reports.') +
        shot('case-0-imgImage52.png','Researcher page','A dedicated route and relevant reasons to participate.') +
        '</div><div class="route"><h3>Pricing</h3><p>Four plans with contact actions and no displayed prices.</p></div>'),
      section('pricing','07','Pricing decision','A conversation-led pricing page.',
        '<p class="intro">The design direction is four plans, each with a “Request pricing” action and no displayed price. The older three-tier and $100/month proposals in the research document do not represent this design.</p>' +
        facts([['04','Plans to compare'],['Each plan','Request pricing'],['Displayed prices','None'],['To verify','Final plan names, features, and copy']]) +
        shot('case-0-imgImage51.png','Pricing exploration','A plan comparison concept from the Figma file.',true)),
      section('reflection','08','Outcome & reflection','What the work establishes — and what needs proof.',
        '<p class="intro">The case study documents the design rationale and intended pages. Final exports and handoff confirmation are needed before claiming completed deliverables or implementation.</p>' +
        facts([['Design output','A connected B2B journey across offerings, researcher access, and pricing.'],['After launch, measure','Homepage-to-product movement, product-to-contact clicks, pricing inquiries, and researcher-route engagement.'],['Next iteration','Test whether buyers can distinguish Bug Bounty, PTaaS, and VDP, find the next step, and recognize the researcher path.']]))
    ]
  },
  kyc: {
    index: '02', eyebrow: 'Product design case study · Bugv', title: 'Making identity verification <em>clear, recoverable and trustworthy.</em>',
    lead: 'I redesigned Bugv’s single-page KYC form into a guided four-step journey with visible progress, clearer document requirements, review states and targeted correction.',
    tags: ['UI/UX · Product Design', 'End-to-end KYC flow', 'Responsive web'],
    hero: 'work-kyc-foreground.png',
    heroAlt: 'Bugv KYC redesign with guided verification steps',
    next: 'product',
    sections: [
      section('overview','01','At a glance','A focused redesign of a high-trust product moment.',
        '<p class="intro">KYC is not only a data-entry task. Users need to know why information is required, what evidence is acceptable, what is happening after submission and how to recover when verification fails.</p>' +
        facts([['Context','An identity-verification journey inside Bugv’s researcher experience.'],['Role','UI/UX · Product Designer'],['Scope','Initial KYC, progress, submission, review status, correction and resubmission.'],['Design work','Flow audit, information architecture, interaction design, UI states and prototype.']]) +
        '<p class="design-note">Project duration and launch status need confirmation before publishing a timeline or business impact.</p>'),
      section('problem','02','The problem','The old experience looked like a profile form, not a verification journey.',
        '<p class="intro">Everything happened on one long page: identity details, contact information, uploads, processing messages and submission actions. The interface did not clearly communicate sequence, status or recovery.</p>' +
        shot('case-1-imgImageOldBugVKycPageShowingALongSinglePageForm.png','Before · supplied product screen','A dense form with conflicting Save, Submit and processing cues.',true) +
        decisions([['No visible sequence','A long page made the task feel heavier and gave users no sense of progress.'],['Generic document request','“Upload document file” did not explain which evidence was accepted or how to prepare it.'],['Conflicting actions and status','Save, Submit and Under process competed without a clear primary next step.'],['No recovery route','The interface did not show what happens if only one document cannot be verified.']]) +
        '<div class="quote-panel"><p>How might we turn KYC from a dense administrative form into a clear journey that prevents errors and helps users recover?</p></div>'),
      section('journey','03','Information architecture','A four-step journey, followed by meaningful status.',
        '<p class="intro">The structure separates data collection from system review. Bugv does not use biometric or liveness checks, so the flow focuses on information, documents, consent and transparent verification feedback.</p><div class="flow-steps"><div class="flow-step"><strong>01</strong><span>Personal information</span><p>Core legal and contact details.</p></div><div class="flow-step"><strong>02</strong><span>Identity verification</span><p>ID type and document evidence.</p></div><div class="flow-step"><strong>03</strong><span>Address verification</span><p>Residential information and evidence.</p></div><div class="flow-step"><strong>04</strong><span>Review & consent</span><p>Check, edit, consent, submit.</p></div></div><div class="route"><h3>After submission</h3><p>Under review → wait &nbsp;·&nbsp; Verified → continue &nbsp;·&nbsp; Action required → fix affected step → resubmit</p></div>'),
      section('decisions','04','Design decisions','Each decision responds to a weakness in the old flow.',
        decisions([
          ['Progressive disclosure','Personal, Identity, Address and Review reduce what users must interpret at once, with one clear goal and primary action per step.'],
          ['Document-specific guidance','Explicit requirements, front/back uploads where applicable, previews and validation feedback help users prepare usable evidence.'],
          ['Review before commitment','A dedicated review stage groups information by step, offers direct Edit actions, and connects consent to submission.'],
          ['Targeted correction','The experience names the exact issue, preserves accepted information, and returns the user to the affected step.']
        ])),
      section('states','05','System states','The interface explains what happened and what comes next.',
        '<p class="intro">The experience does not end at Submit. Dedicated states keep the system understandable while Bugv reviews the information.</p>' +
        states([['Not started','Explain what is required before the user begins.'],['In progress','Preserve work and show the next unfinished step.'],['Under review','Confirm receipt and avoid duplicate submission.'],['Verified','Confirm completion and unlock the next action.'],['Action required','Name the issue and route to the affected section.'],['Re-verification','Confirm corrected evidence has returned to review.']])),
      section('screens','06','Final designs','The complete interface story.',
        '<p class="intro">The Figma file shows the key screens for the redesigned journey. They are presented here as design screens; implementation and outcome claims still need confirmation.</p><div class="screen-grid">' +
        shot('case-1-imgImage57.png','Entry & orientation','Sets expectations and explains the work ahead.') +
        shot('case-1-imgImage58.png','Guided evidence collection','Turns requirements into focused, manageable actions.') +
        shot('case-1-imgImage60.png','Review & submission','Lets users check their data and understand what happens next.') +
        shot('case-1-imgImage59.png','Correction & recovery','Provides specific feedback without forcing a full restart.') +
        '</div>'),
      section('reflection','07','Outcome & reflection','A complete design system for verification.',
        '<p class="intro">The design deliverable covers initial verification, progress, document submission, review, verification status, correction requests and resubmission. Launch, handoff and measured business impact should only be added when confirmed.</p>' +
        facts([['Measure after launch','Completion and drop-off by step'],['Measure after launch','Document-upload error rate'],['Measure after launch','Correction and resubmission rate'],['Measure after launch','Verification-related support requests']]) +
        '<div class="quote-panel"><p>“I didn’t only redesign the form. I designed the complete verification lifecycle.”</p></div><p>For the next iteration, I would usability-test document guidance and correction messages, validate the mobile camera-upload experience and improve accessibility and localized identity formats.</p>')
    ]
  },
  product: {
    index: '03', eyebrow: 'Additional product work · Bugv', title: 'Selected <em>product interfaces.</em>',
    lead: 'A concise view of dashboards, program submission, data-heavy tables and integration workflows designed for Bugv’s B2B platform.',
    tags: ['B2B SaaS', 'Admin workflows', 'Operational UI'],
    hero: 'case-2-imgMockups1.png',
    heroAlt: 'Selected Bugv product interface mockups',
    next: 'website',
    sections: [
      section('dashboards','01','Dashboards','Operational clarity at a glance.',
        '<p class="intro">Priority, SLA, program health and platform operations—organized for fast decisions.</p><div class="screen-grid">' +
        shot('case-2-imgImage6.png','Organization dashboard','Priority · SLA · Program health',true) +
        shot('case-2-imgImage5.png','Super Admin overview','Platform operations') +
        shot('case-2-imgImage4.png','Program health','Trends · Performance') +
        '</div>'),
      section('submission','02','Program submission flow','From setup to program submission.',
        '<p class="intro">A connected sequence for defining the program, adding scope, configuring rewards, and submitting for review.</p><div class="flow-steps"><div class="flow-step"><strong>01</strong><span>Basics</span></div><div class="flow-step"><strong>02</strong><span>Scope</span></div><div class="flow-step"><strong>03</strong><span>Rewards</span></div><div class="flow-step"><strong>04</strong><span>Review</span></div></div><div class="screen-grid">' +
        shot('case-2-imgImage7.png','Program basics','Step 01') +
        shot('case-2-imgImage8.png','Scope & assets','Step 02') +
        shot('case-2-imgImage9.png','Rewards & policy','Step 03') +
        shot('case-2-imgImage10.png','Review & submit','Step 04') +
        '</div>'),
      section('tables','03','Data tables','Dense information, easy to act on.',
        '<p class="intro">Compact tables keep status, dates, amounts, filters and actions visible without pushing detail into every row.</p><div class="screen-grid">' +
        shot('case-2-imgImage11.png','Billing & invoices','Invoice · Billing period · Amount · Due date · Status') +
        shot('case-2-imgImage13.png','Payments & reconciliation','Method · Reference · Submitted date · Verification status') +
        '</div>'),
      section('integrations','04','Integration flow','Connect once, stay inside the workflow.',
        '<p class="intro">A short path from selecting an integration to configuring access and confirming the connection.</p><div class="flow-steps"><div class="flow-step"><strong>01</strong><span>Choose</span></div><div class="flow-step"><strong>02</strong><span>Configure</span></div><div class="flow-step"><strong>03</strong><span>Verify</span></div></div><div class="screen-grid">' +
        shot('case-2-imgImage14.png','Integration library','Choose the service to connect.') +
        shot('case-2-imgImage15.png','Configuration','Permissions, workspace and connection details.') +
        '</div>')
    ]
  }
};

const key = new URLSearchParams(location.search).get('project') || 'website';
const project = projects[key] || projects.website;
document.title = project.title.replace(/<[^>]*>/g, '') + ' — Dipesh Shrestha';
const nav = project.sections.map((html) => {
  const id = html.match(/id="([^"]+)"/)?.[1];
  const label = html.match(/<div class="section-kicker">[^<]*\/ ([^<]+)<\/div>/)?.[1] || id;
  return `<a href="#${id}">${label}</a>`;
}).join('');
const next = projects[project.next];
document.querySelector('main').innerHTML = `
  <div class="case-shell">
    <a class="back-link" href="index.html#work"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7M7 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to work gallery</a>
    <header class="case-hero"><div class="eyebrow">${project.eyebrow} · ${project.index} / 03</div><h1>${project.title}</h1><p>${project.lead}</p><div class="meta">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></header>
    <figure class="hero-media"><img src="${asset(project.hero)}" alt="${project.heroAlt}"><figcaption>Bugv · selected design work by Dipesh Shrestha</figcaption></figure>
    <div class="case-layout"><aside class="case-toc" aria-label="Case study contents"><strong>In this story</strong>${nav}</aside><div class="case-flow">${project.sections.join('')}<a class="next-project" href="case-study.html?project=${project.next}"><span><small>Next project</small><strong>${next.title.replace(/<[^>]*>/g, '')}</strong></span>${arrow}</a></div></div>
  </div>`;
if (location.hash) {
  requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
}
const links = [...document.querySelectorAll('.case-toc a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.removeAttribute('aria-current'));
      document.querySelector(`.case-toc a[href="#${entry.target.id}"]`)?.setAttribute('aria-current','location');
    });
  }, {rootMargin:'-10% 0px -68% 0px'});
  document.querySelectorAll('.case-section').forEach(el => observer.observe(el));
}
