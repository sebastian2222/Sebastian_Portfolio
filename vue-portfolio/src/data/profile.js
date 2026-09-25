import portrait from '@/assets/images/portrait.webp'

export const profile = {
  name: 'Sebastian Parakal Jose',
  shortName: 'Sebastian',
  initials: 'SPJ',
  role: 'Software Engineer',
  focus: ['Backend systems', 'Cloud infrastructure', 'Mobile'],
  location: 'Melbourne, Australia',
  workRights: 'Unlimited work rights in Australia',
  availability: 'Open to full-time software engineering roles',
  headline: 'I build dependable backends, cloud systems and products that real people use.',
  intro:
    'Two years shipping C++ payment services at NCR, then a Master of IT at Monash with a 4.0 GPA. ' +
    'Today I lead engineering at MOSAIC, where our team launched the IFRC World Disasters Report ' +
    'platform to 30,000+ users on day one, and I teach Android development to 100+ students.',
  about: [
    'I started my career on the L4 escalation team for a payment switch that routes Mastercard and ' +
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
  stats: [
    { value: '30k+', label: 'users on launch day for wdr26.org' },
    { value: '2 yrs', label: 'C++ payments engineering at NCR' },
    { value: '4.0', label: 'GPA, Master of IT at Monash' },
    { value: '100+', label: 'students mentored in Android' },
  ],
}
