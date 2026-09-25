import portrait from '@/assets/images/portrait.webp'

export const profile = {
  name: 'Sebastian Parakal Jose',
  shortName: 'Sebastian',
  initials: 'SPJ',
  role: 'Software Engineer',
  focus: ['Backend', 'Cloud', 'Mobile'],
  location: 'Melbourne, Australia',
  workRights: 'Full Australian work rights',
  availability: 'Open to full-time SWE roles',
  headline: 'I build backends, cloud systems & apps people actually use.',
  intro:
    'Two years shipping C++ services for a payment processor at NCR, then a Master of IT at Monash ' +
    'with a 4.0 GPA. As CTO of MOSAIC I led the launch of the IFRC World Disasters Report platform ' +
    'to 30,000+ people on day one, and today I teach 100+ students across three Monash units.',
  about: [
    'I started my career on the L4 escalation team for a payment processor handling Mastercard and ' +
      'American Express traffic. That is where I learnt to respect production: read the logs first, ' +
      'reproduce before you patch, and leave a system more observable than you found it.',
    'At Monash I have gone broad on cloud, serverless and mobile, and deep where it counts: load-testing ' +
      'a Kubernetes inference service until I understood exactly why latency rose, or modelling a ' +
      'data warehouse from dirty source tables.',
    'I care about the unglamorous parts of engineering that make teams fast: CI gates, preview ' +
      'environments, runbooks, and onboarding that gets a new developer shipping in their first week.',
  ],
  portrait,
  resume: 'files/Sebastian_Parakal_Jose_Resume.pdf',
  email: 'sebastianparakal@gmail.com',
  links: {
    github: 'https://github.com/sebastian2222',
    linkedin: 'https://www.linkedin.com/in/sebastian-jose-720256187/',
  },
  // Sticker stats under the hero. `tone` maps to a palette colour in tokens.css.
  stats: [
    {
      kicker: 'IFRC WDR platform',
      value: '30k+ users',
      label: 'on launch day in Geneva',
      tone: 'yellow',
    },
    { kicker: 'NCR', value: '2 yrs C++', label: 'payment processor engineering', tone: 'navy' },
    {
      kicker: 'Monash University',
      value: '4.0 GPA',
      label: 'Master of Information Technology',
      tone: 'mint',
    },
    {
      kicker: 'Teaching Associate',
      value: '100+ students',
      label: 'across three Monash units',
      tone: 'pink',
    },
  ],
  // "My journey" route map, oldest first.
  journey: [
    {
      tag: 'Origin',
      years: '2018–22',
      place: 'Calicut, India',
      title: 'NIT Calicut',
      subtitle: 'B.Tech, Computer Science',
      text: 'Where I fell for systems programming and wrote an operating system kernel from scratch.',
      tone: 'mint',
    },
    {
      tag: 'Industry',
      years: '2022–24',
      place: 'Hyderabad, India',
      title: 'NCR / Global Payments',
      subtitle: 'C++ software engineer',
      text: 'Payment processor services for Mastercard & Amex, ISO 8583 pipelines, automation and L4 escalations.',
      tone: 'pink',
    },
    {
      tag: 'Study',
      years: '2024–26',
      place: 'Melbourne, Australia',
      title: 'Monash University',
      subtitle: 'Master of IT · GPA 4.0',
      text: 'Cloud, distributed and mobile systems. Led MOSAIC as CTO (Jan–Jul 2026) through the IFRC launch.',
      tone: 'yellow',
    },
    {
      tag: 'Now',
      years: 'Present',
      place: 'Melbourne, Australia',
      title: 'Teaching & building',
      subtitle: 'Teaching Associate · Monash',
      text: 'Teaching FIT5046, FIT5032 and FIT1056, building agentic tooling, and looking for my next full-time role.',
      tone: 'navy',
    },
  ],
}
