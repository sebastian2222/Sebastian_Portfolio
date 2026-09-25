/**
 * Work history, newest first. `highlights` are recruiter-facing bullets;
 * `projects` link to case studies in projects.js by slug.
 */
export const experience = [
  {
    id: 'mosaic',
    role: 'Chief Technology Officer',
    org: 'MOSAIC: Monash Students for AI with Communities',
    location: 'Melbourne, Australia',
    start: '2026-01',
    end: null,
    summary:
      'Lead engineering for a student-run organisation building AI and web platforms for humanitarian partners, including the IFRC.',
    highlights: [
      'Directed the production launch of the IFRC World Disasters Report platform (wdr26.org), launched globally in Geneva on 5 March and serving 30,000+ users on day one.',
      'Top-three contributor to the report platform (110+ commits): newsletter sign-up via Brevo and Next.js server actions, in-app bug reporting, Arabic/Russian/French localisation and launch-day UI.',
      'Traced a broken preview-deployment pipeline to its root cause and fixed it, and moved the platform onto a patched Next.js release.',
      'Rolled out AI-assisted development (Claude, GitHub Copilot, Cursor) and Notion onboarding playbooks to standardise practice across student developers.',
      'Contributed to Ctrl+Alt+Prebunk, an IFRC game that trains players to spot misinformation (feed interactions, persistence fixes, large-screen layout).',
    ],
    stack: ['Next.js', 'React', 'Cloudflare Workers', 'GitHub Actions', 'Claude Code'],
    links: [
      { label: 'wdr26.org', href: 'https://wdr26.org' },
      { label: 'Ctrl+Alt+Prebunk', href: 'https://ctrl-alt-prebunk.wdr26.org/en' },
    ],
    projects: ['ifrc-world-disasters-report'],
  },
  {
    id: 'monash-ta',
    role: 'Teaching Associate',
    org: 'Monash University',
    location: 'Melbourne, Australia',
    start: '2025-07',
    end: null,
    summary:
      'Teach FIT5046 Mobile & Distributed Computing Systems and FIT1056 Introduction to Software Engineering.',
    highlights: [
      'Mentor 100+ students in Android development with Jetpack Compose, MVVM and REST API integration.',
      'Designed a multi-agent Claude Code marking harness: five specialised sub-agents produce evidence-bound rubric scores, then an independent verifier classifies every mismatch.',
      'Rated 91% for student satisfaction (SETU) through structured mentoring and technical support.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Claude Code', 'Multi-agent orchestration'],
    links: [],
    projects: ['ai-marking-harness'],
  },
  {
    id: 'ncr',
    role: 'Software Engineer',
    org: 'NCR Corporation / Global Payments',
    location: 'Hyderabad, India',
    start: '2022-07',
    end: '2024-07',
    summary:
      'Built and supported mission-critical C++ services in a payment-switch platform used by global card networks.',
    highlights: [
      'Engineered C++ backend services for ATM and payment-switch systems carrying Mastercard and American Express traffic.',
      'Implemented and extended ISO 8583 messaging pipelines that route high-volume transactions between card networks, acquirers and issuing banks.',
      'On the L4 escalation team, root-caused the hardest production incidents and shipped hotfixes under live constraints, improving system reliability by 20%.',
      'Built Splunk dashboards and queries for pipeline observability, cutting mean time to detect anomalies by 30%.',
      'Tuned Oracle SQL queries and stored procedures behind transaction records, reducing peak-load processing latency by 25%.',
    ],
    stack: ['C++', 'ISO 8583', 'Oracle SQL', 'Splunk', 'Linux'],
    links: [],
    projects: [],
    note: 'Corporate code is proprietary, so there is no public source for this role.',
  },
]
