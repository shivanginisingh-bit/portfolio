// content.js
window.CASESTUDIES = window.CASESTUDIES || {};
window.CASESTUDIES.riskControls = {
  meta: {
    slug: "risk-controls",
    title: "Risk & Controls",
    leftPad: 140,          // px
    contentMax: 1040       // px – unified width for boxed rows & grids
  },
  hero: {
    svg: "assets/rc/banner-bg.png" // was hero.svg
  },
  impact: [
    {
      kpi: "60% reduction",
      body: "in critical accessibility defects → WCAG 2.1 compliance achieved."
    },
    {
      kpi: "290K+",
      body: "employees using redesigned experience daily."
    },
    {
      bullets: [
        "20–30% faster verification time → measurable productivity gain.",
        "Improved user confidence — employees reported flows as “intuitive, clear, and compliant.”"
      ]
    }
  ],
  challenge: [
    "Employees faced complex, outdated flows in risk & control tasks.",
    "Accessibility gaps → flagged in audits and compliance reviews.",
    "Verification tasks were time-consuming and error-prone, creating productivity loss."
  ],
  vision: [
    { num: "01", title: "Accessible by default", body: "Ensure all employees, regardless of ability, can complete verification tasks." },
    { num: "02", title: "Efficiency at scale", body: "Simplify flows so information is organised and errors are reduced." },
    { num: "03", title: "Compliance-first design", body: "Ensure adherence to WCAG 2.1 and enterprise standards." },
    { num: "04", title: "Value to users", body: "Reduce risk and turn checks into a seamless part of daily workflows." }
  ],
  process: {
    points: [
      "<strong>Research & Discovery:</strong> Heuristics evaluation, accessibility audits, workshops, task flows.",
      "<strong>Design & Iteration:</strong> Wireframes, prototypes, UI design, micro-animations.",
      "<strong>Collaboration:</strong> Compliance/legal + engineering alignment on WCAG & content.",
      "<strong>Validation:</strong> Guerrilla testing; set research objectives; ongoing validation."
    ],
    image: "assets/rc/process.png",
    imageAlt: "Process flow"
  },

  accessibility: {
    title: "Accessibility uplift",
    rows: [
      { label: "Screen reader support", before: 42, after: 96 },
      { label: "Keyboard navigation",  before: 55, after: 98 },
      { label: "ARIA & semantics",     before: 38, after: 96 },
      { label: "Contrast & legibility",before: 61, after: 94 },
      { label: "Consistency & compliance", before: 57, after: 95 }
    ],
    note: "Accessibility uplift across critical WCAG checkpoints — measurable improvements post-redesign."
  },
  beforeAfter: {
    title: "The fun stuff!",
    subtitle: "A small pop-up redesign used native constraints and micro-animations to add delight.",
    before: "assets/rc/before.png",
    after:  "assets/rc/after.png"
  },

  visualFlow: { image: "assets/rc/visual-flow.png", imageAlt: "Visual design flow" },

  funStuff: {
    title: "the fun stuff!",
    beforeImage: "assets/rc/before.png",
    afterImage: "assets/rc/after.png"
  },
  usability: {
    title: "Usability testing insights",
    bullets: [
      "Quick guerrilla sessions across two regions to validate concept usability across workflows.",
      "Measured comprehension, navigation flow, and interaction efficiency to reduce friction.",
      "Insights informed the next iteration, improving clarity, consistency, and confidence."
    ],
    image: "assets/rc/usability.png",
    imageAlt: "Usability summary board"
  },
  learnings: [
    "Designing for scale required balancing compliance, accessibility, and speed.",
    "Learned the importance of compliance-driven environments.",
    "Delight can be factored in—even in the smallest interactions."
  ],
  disclaimer: "All screens are either recreated or blurred to comply with NDA. Sensitive information has been anonymized, and the visuals are intended solely to illustrate design thinking and evolution.",
  watermark: {
    text: "© Shivangini Singh — Risk & Controls"
  }
};

// content.js
const IMPACT_CARDS = [
  {
    metric: "60% reduction",
    sub: "in critical accessibility defects → WCAG 2.1 compliance achieved."
  },
  {
    metric: "290K+",
    sub: "employees using redesigned experience daily."
  },
  {
    bullets: [
      "<strong>20–30%</strong> faster verification time → measurable productivity gain.",
      'Improved user confidence: employees reported flows as "intuitive, clear, and compliant."'
    ]
  }
];

function mountImpactCards() {
  const grid = document.getElementById("impactGrid");
  if (!grid) return;
  grid.innerHTML = IMPACT_CARDS.map(c => {
    const body = c.bullets
      ? `<ul>${c.bullets.map(x=>`<li>${x}</li>`).join("")}</ul>`
      : `<div><div class="metric">${c.metric}</div><p>${c.sub}</p></div>`;
    return `
      <article class="card">
        ${body}
      </article>`;
  }).join("");
}
document.addEventListener("DOMContentLoaded", mountImpactCards);
