/**
 * Project case studies. Each entry renders as a card on the home page and
 * as a full page at /projects/:slug.
 *
 * Shape:
 *   slug, title, tagline, year, context, team ('Solo' | 'Team of N' | 'Team'),
 *   role, categories[], featured, stack[], links[{ label, href, kind }],
 *   media?: { video, poster }, summary, problem, built[], architecture?:
 *   { lanes: [{ name, steps[] }], caption }, decisions[{ title, detail }],
 *   results?: { metrics?[{ value, label }], table?, notes?[] }, contribution?
 *
 * `kind` is one of: live | repo | demo | docs.
 */

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data', label: 'Data' },
  { id: 'systems', label: 'Systems' },
]

export const projects = [
  {
    slug: 'ifrc-world-disasters-report',
    title: 'IFRC World Disasters Report 2026',
    tagline: 'The digital home of the IFRC’s flagship report, launched in Geneva to 30,000+ users on day one.',
    year: '2026',
    context: 'MOSAIC × International Federation of Red Cross and Red Crescent Societies',
    team: 'Team',
    role: 'CTO & engineer',
    categories: ['fullstack', 'cloud'],
    featured: true,
    stack: [
      'Next.js 16',
      'React 19',
      'MDX',
      'next-intl',
      'Tailwind CSS',
      'Cloudflare Workers',
      'Cloudflare D1',
      'FlexSearch',
      'HLS.js',
      'Jest',
      'GitHub Actions',
      'CodeQL',
    ],
    links: [
      { label: 'Live site', href: 'https://wdr26.org', kind: 'live' },
      { label: 'Source', href: 'https://github.com/Monash-Mosaic/IFRC_Report', kind: 'repo' },
    ],
    summary:
      'Multilingual report platform for the IFRC, served from Cloudflare’s edge with full-text search, adaptive video and gated release pipelines.',
    problem:
      'The World Disasters Report 2026 (“Truth, Trust and Humanitarian Action in the Age of Harmful Information”) is read by humanitarian workers and policymakers worldwide, often on slow or expensive connections. It had to launch on a fixed date at a live event in Geneva, in several languages, and stay up when traffic spiked.',
    built: [
      'An MDX-driven report reader with generated tables of contents, deep-linkable headings and per-language downloads, localised with next-intl (including right-to-left Arabic).',
      'Full-text search with FlexSearch, persisting the index in Cloudflare D1 and namespacing it per preview and release.',
      'An HLS adaptive-bitrate hero video (480p/1080p ladder plus a muted MP4 fallback) so the landing page stays light on constrained networks.',
      'Deployed to Cloudflare Workers via OpenNext, with separate preview, staging and production environments.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Delivery',
          steps: ['Pull request', 'Lint · tests · audit · CodeQL', 'Preview Worker', 'Release tag', 'Staging', 'Manual prod deploy'],
        },
        {
          name: 'Runtime',
          steps: ['Reader', 'Cloudflare edge', 'Next.js on Workers (OpenNext)', 'D1 search index', 'Static assets & HLS'],
        },
      ],
      caption:
        'Every PR gets its own preview Worker and search namespace, which CI deletes when the PR closes. Production deploys need a published release and manual approval.',
    },
    decisions: [
      {
        title: 'Edge-first hosting',
        detail:
          'Running Next.js on Cloudflare Workers puts pages close to readers everywhere without managing regions or servers, which suited a global launch-day spike.',
      },
      {
        title: 'Environments as a safety net',
        detail:
          'Per-PR previews, release-driven staging and manually approved production deploys meant content editors could review real builds before anything went live.',
      },
      {
        title: 'Security gates block deploys',
        detail:
          'Linting, unit tests, dependency audit, CodeQL and Bearer SAST all have to pass before a deployment can run.',
      },
    ],
    contribution:
      'As CTO I directed the production launch and coordinated the student engineering team. Hands-on, I was a top-three contributor (110+ commits): I built newsletter sign-up with the Brevo SDK through Next.js server actions (localised confirmation emails, modal UX, tests), built an in-app bug-report flow, delivered Arabic, Russian and French localisation and download work, and shipped launch-day UI (hero banner, carousels, sticky header, mobile layout). I also traced broken preview deployments to their root cause and moved the platform onto a patched Next.js release.',
    results: {
      metrics: [
        { value: '30,000+', label: 'users on launch day' },
        { value: '5 Mar 2026', label: 'global launch in Geneva' },
        { value: '110+', label: 'commits authored' },
      ],
    },
  },
  {
    slug: 'hush',
    title: 'Hush',
    tagline: 'Sensory-friendly navigation for Melbourne’s CBD: live crowd density and the quietest route, not just the fastest.',
    year: '2026',
    context: 'Monash Industry Experience capstone (team TE22) · City of Melbourne open data',
    team: 'Team',
    role: 'Backend, cloud & CI/CD',
    categories: ['cloud', 'fullstack', 'ai'],
    featured: true,
    stack: [
      'Vue 3',
      'Pinia',
      'Mapbox GL',
      'Python',
      'AWS Lambda',
      'API Gateway',
      'RDS PostgreSQL',
      'PostGIS',
      'pgRouting',
      'ECR',
      'EventBridge',
      'S3',
      'scikit-learn',
      'Amplify',
      'Vitest',
      'Playwright',
      'GitHub Actions',
    ],
    links: [{ label: 'hushapp.live', href: 'https://www.hushapp.live', kind: 'live' }],
    summary:
      'Serverless map app for neurodivergent and sensory-sensitive people: real-time crowd and noise layers, 24-hour crowd forecasts and a “quietest route” planner.',
    problem:
      'For neurodivergent and sensory-sensitive people, a walk through the CBD can mean crowds, noise and overload. Mainstream maps only optimise for speed. Hush lets people see how busy and loud the city is now and in the next 24 hours, and choose a calmer way to get where they are going.',
    built: [
      'A Sense Map (Vue 3 + Mapbox GL) that layers live pedestrian density, noise-sensor readings, quiet spaces and sensory-friendly cafés with live opening status.',
      'Fastest and quietest walking routes computed side by side in PostgreSQL with PostGIS and pgRouting, with the time cost of choosing the quiet option shown up front.',
      'A 24-hour crowd forecast: a scikit-learn pedestrian model, packaged as a container-image Lambda in ECR, runs every hour and writes forecasts for every sensor to S3, which drives a +1h to +24h prediction slider.',
      'Scheduled loader Lambdas that pull City of Melbourne open data (pedestrian counters, microclimate/noise sensors) into RDS.',
      'Grounding tools (box breathing, a 5-4-3-2-1 senses exercise) and step-by-step scenarios for rehearsing a trip.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Request path',
          steps: ['Vue SPA on Amplify', 'API Gateway', 'Python Lambdas', 'RDS · PostGIS · pgRouting'],
        },
        {
          name: 'Ingestion',
          steps: ['EventBridge schedule', 'Loader Lambdas', 'City of Melbourne Open Data', 'RDS'],
        },
        {
          name: 'Forecasting',
          steps: ['Hourly trigger', 'ECR container Lambda (scikit-learn)', 'S3 forecast JSON', 'Prediction slider'],
        },
      ],
      caption:
        'Synchronous lookups go through API Gateway to Lambda and PostGIS. Heavy work (ingestion, ML inference) runs on schedules and publishes static output the frontend just reads.',
    },
    decisions: [
      {
        title: 'Precompute forecasts, serve static JSON',
        detail:
          'Inference runs once an hour whatever the traffic, and the browser fetches one S3 object. Cost stays flat and the map never waits on a model.',
      },
      {
        title: 'Routing inside the database',
        detail:
          'pgRouting computes both route variants next to the spatial data, so a single Lambda call returns fastest and quietest paths with no extra services.',
      },
      {
        title: 'Hardened Lambda responses',
        detail:
          'CORS is limited to an allow-list of origins. Every response sets nosniff, frame-deny, no-referrer and no-store headers, and bad coordinates get a 400 before touching the database.',
      },
      {
        title: 'Handover-grade documentation',
        detail:
          'The repo ships an OpenAPI 3 spec, onboarding checklist, AWS runbook and cookbook, risk register and an infrastructure decision record for the next team.',
      },
    ],
    results: {
      notes: [
        'CI on every pull request runs Vitest unit tests, a high-severity npm audit and linting. Playwright E2E suites run locally or in Docker.',
        'Demoed at the Monash FIT Industry Experience Expo.',
      ],
    },
    contribution:
      'Team capstone. My focus was the serverless backend, AWS infrastructure and the CI/CD pipeline.',
  },
  {
    slug: 'ai-marking-harness',
    title: 'Multi-agent marking harness',
    tagline: 'Claude Code sub-agents that score group projects against a rubric, citing evidence and checked by an independent verifier.',
    year: '2025',
    context: 'Monash University · Teaching Associate, FIT5046',
    team: 'Solo',
    role: 'Designer & builder',
    categories: ['ai'],
    featured: true,
    stack: ['Claude Code', 'Sub-agents', 'Prompt engineering', 'Harness engineering'],
    links: [],
    summary:
      'An orchestrated team of five specialised AI agents that grounds every rubric score in cited evidence, then independently verifies it.',
    problem:
      'Marking a group Android project means cross-checking a codebase, a written report and a detailed rubric, for many teams. Doing it by hand is slow and hard to keep consistent. A single LLM prompt is fast but prone to confident, unsupported claims.',
    built: [
      'An orchestrator that sends each submission through five specialised sub-agents: code-inspector, report-auditor, rubric-scorer, uniqueness-checker and verifier.',
      'Evidence-bound scoring: each criterion’s score must cite the files and report sections it relies on, so a human marker can check it quickly.',
      'An independent verifier that re-checks scores and sorts any mismatch as hallucination, wrong file, arithmetic error or scope creep.',
      'A full audit log of agent inputs, evidence and decisions for moderation and appeals.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Pipeline',
          steps: ['Submission', 'code-inspector', 'report-auditor', 'uniqueness-checker', 'rubric-scorer', 'verifier', 'Human review'],
        },
      ],
      caption: 'Agents gather and score evidence. A separate verifier challenges the result before a human signs off.',
    },
    decisions: [
      {
        title: 'Separate the scorer from the checker',
        detail:
          'The verifier gets the evidence, not the scorer’s reasoning, so it can’t just agree with a wrong answer.',
      },
      {
        title: 'A taxonomy of mismatches',
        detail:
          'Labelling mismatches (hallucination, wrong file, arithmetic, scope creep) turns vague “the AI was wrong” into feedback you can fix in the prompts and context.',
      },
      {
        title: 'Humans stay accountable',
        detail: 'The harness cuts down cross-checking. Final marks are always set by teaching staff.',
      },
    ],
    results: {
      notes: ['Cut manual cross-checking time while keeping a complete audit trail.'],
    },
    privateNote: 'Source is private because it works on student submissions.',
  },
  {
    slug: 'cloudpose',
    title: 'CloudPose',
    tagline: 'Human pose estimation as a web service, containerised and load-tested on Kubernetes under tight CPU and memory limits.',
    year: '2025',
    context: 'Monash · FIT5225 Cloud Computing & Security',
    team: 'Solo',
    role: 'Engineer',
    categories: ['cloud', 'backend', 'ai'],
    featured: true,
    stack: ['Python', 'FastAPI', 'YOLO11-pose', 'ONNX Runtime', 'OpenCV', 'Docker', 'Kubernetes', 'Locust'],
    links: [{ label: 'Demo video', href: 'media/cloudpose-demo.mp4', kind: 'demo' }],
    media: { video: 'media/cloudpose-demo.mp4', poster: 'media/cloudpose-demo-poster.webp' },
    summary:
      'A FastAPI pose-detection API on a Kubernetes cluster, tuned to stay stable at 0.5 CPU and 1 GiB per pod, with a load-testing study that explains where the latency comes from.',
    problem:
      'Fitness and physiotherapy apps need to analyse human movement from images, but running a pose model is CPU- and memory-heavy. The aim was a service that scales horizontally and survives heavy load on deliberately small pods.',
    built: [
      'Two REST endpoints: one returns keypoints, bounding boxes and per-stage timings as JSON; the other returns an annotated image.',
      'A YOLO11 pose model exported to ONNX and statically INT8-quantised with ONNX Runtime, served from a slim Python image.',
      'Kubernetes Deployment and NodePort Service on a Nectar research-cloud cluster, with resource requests and limits of 500m CPU and 1 GiB.',
      'Locust experiments scaling from 1 to 8 pods, driven both from inside the cluster and from an external VM.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Serving',
          steps: ['Client (base64 image)', 'NodePort Service', 'Pod: FastAPI', 'Bounded queue', 'Single inference worker', 'ONNX INT8 model'],
        },
      ],
      caption: 'Each pod runs one inference at a time. Extra requests wait in a bounded queue or get a fast 429, not an out-of-memory kill.',
    },
    decisions: [
      {
        title: 'One inference worker per pod',
        detail:
          'Early load tests crashed pods because each request spawned threads and OpenCV/BLAS fanned out further. A single-worker executor plus OMP_NUM_THREADS=1 kept CPU inside the 0.5-core limit.',
      },
      {
        title: 'Fail softly, not fatally',
        detail:
          'Decode, inference and post-processing errors map to 400, 507 or 500 instead of crashing the worker. If annotation fails, the service still returns the image. restartPolicy: Always covers the rest.',
      },
      {
        title: 'Measure memory, then cut it',
        detail:
          'psutil RSS logging at every stage, explicit garbage collection and in-memory image handling kept each pod inside its 1 GiB budget.',
      },
      {
        title: 'Make benchmarks repeatable',
        detail:
          'Images were side-loaded (imagePullPolicy: Never) and each test started with a rollout restart, so every pod registered with kube-proxy at the same moment. That removed skew from the results.',
      },
    ],
    results: {
      table: {
        caption: 'Average response time (ms) as pods and users scale together',
        columns: ['Pods', 'Users', 'In-cluster client', 'External VM client'],
        rows: [
          [1, 2, '6,596', '7,617'],
          [2, 4, '8,038', '9,466'],
          [4, 8, '9,252', '12,055'],
          [8, 16, '10,334', '13,205'],
        ],
      },
      notes: [
        'Each pod completes roughly two inferences per second, so scaling pods and users together keeps every pod at capacity and queueing delay grows. More pods just means more small queues.',
        'The external client adds 1 to 3 seconds of public-network and NAT overhead. Cold model loads and kube-proxy endpoint lag explain the warm-up spike in the first 10 to 30 seconds.',
      ],
    },
  },
  {
    slug: 'signalstack',
    title: 'SignalStack',
    tagline: 'A self-hosted tech-trend radar that streams GitHub and Hacker News activity through Kafka to score what’s trending in CS.',
    year: '2026',
    context: 'Personal project',
    team: 'Solo',
    role: 'Engineer',
    categories: ['backend', 'cloud', 'data'],
    featured: true,
    stack: ['Python', 'Apache Kafka (KRaft)', 'PostgreSQL', 'Redis', 'FastAPI', 'Next.js', 'Terraform', 'AWS EC2', 'Prometheus', 'Grafana', 'GitHub Actions'],
    links: [],
    summary:
      'An event-streaming pipeline on a single free-tier EC2 instance: partitioned Kafka topics, batched writes and Redis deduplication feed a 9-endpoint API.',
    problem:
      'Trending lists on any one site are noisy and narrow. SignalStack combines activity from GitHub and Hacker News into one topic score, and was built to run cheaply on one small machine.',
    built: [
      'Producers that pull GitHub and Hacker News activity into partitioned Kafka topics (KRaft mode, no ZooKeeper).',
      'Fault-tolerant consumers that batch PostgreSQL writes and deduplicate events in Redis. That raised throughput about 250× at no extra infrastructure cost.',
      'A 9-endpoint FastAPI service with Redis caching, and a Next.js frontend.',
      'Terraform-provisioned AWS infrastructure, GitHub Actions CI/CD, and self-hosted Prometheus and Grafana monitoring.',
    ],
    architecture: {
      lanes: [
        { name: 'Ingest', steps: ['GitHub + HN APIs', 'Producers', 'Kafka topics (partitioned)'] },
        { name: 'Process', steps: ['Consumer group', 'Redis dedup', 'Batched writes', 'PostgreSQL', 'Trend scoring'] },
        { name: 'Serve', steps: ['FastAPI (9 endpoints)', 'Redis cache', 'Next.js UI'] },
      ],
      caption: 'Everything runs on one free-tier EC2 host, provisioned with Terraform and monitored with Prometheus and Grafana.',
    },
    decisions: [
      {
        title: 'Batch, then deduplicate',
        detail: 'Writing row by row was the bottleneck. Batched inserts plus Redis-based dedup delivered about a 250× throughput gain.',
      },
      {
        title: 'Kafka in KRaft mode',
        detail: 'Dropping ZooKeeper frees enough memory to run the whole stack on a single free-tier instance.',
      },
    ],
    results: { metrics: [{ value: '~250×', label: 'consumer throughput gain' }, { value: '$0', label: 'extra infrastructure' }] },
    privateNote: 'Source available on request.',
  },
  {
    slug: 'birdtag',
    title: 'BirdTag',
    tagline: 'A serverless media library that automatically tags bird species in uploaded photos, videos and audio.',
    year: '2025',
    context: 'Monash · FIT5225 Cloud Computing & Security',
    team: 'Team of 4',
    role: 'Backend engineer',
    categories: ['cloud', 'backend', 'ai'],
    featured: true,
    stack: ['AWS Lambda', 'S3', 'DynamoDB', 'Cognito', 'API Gateway', 'SNS', 'ECR', 'YOLO (ONNX)', 'BirdNET', 'OpenCV', 'Python'],
    links: [{ label: 'Live app (sign-up required)', href: 'https://fit-5225-a3-frontend.vercel.app/', kind: 'live' }],
    summary:
      'Uploads trigger Lambda-based species detection (YOLO for images and video, BirdNET for audio). Researchers can then search, bulk-tag and subscribe to species alerts.',
    problem:
      'A university birdwatching group (Monash Birdy Buddies) kept thousands of observation files in folders with no metadata. Finding “every video with at least three crows” meant opening files one at a time.',
    built: [
      'Upload to S3 triggers auto-tagging Lambdas: a YOLO ONNX model for images and video, BirdNET (TFLite + librosa layers) for audio, and OpenCV thumbnail generation.',
      'Per-file species counts stored in DynamoDB, with Cognito sign-up and login in front of API Gateway.',
      'Query endpoints: search by species and minimum count, by species name, by thumbnail URL, or by uploading a file to find similar media.',
      'Bulk add/remove of tags, safe deletion and SNS email alerts when new media matches a subscribed species.',
    ],
    architecture: {
      lanes: [
        { name: 'Ingest', steps: ['Upload', 'S3', 'Tagging Lambda (YOLO / BirdNET)', 'Thumbnail Lambda', 'DynamoDB'] },
        { name: 'Query', steps: ['Web app', 'Cognito', 'API Gateway', 'Query Lambdas', 'DynamoDB / S3'] },
        { name: 'Notify', steps: ['New tags', 'SNS topic', 'Subscriber email'] },
      ],
      caption: 'Model runtimes ship as Lambda layers and ECR images, so inference scales with uploads and there are no model servers to run.',
    },
    decisions: [
      {
        title: 'Models as Lambda layers and images',
        detail: 'Packaging TFLite, librosa and ONNX runtimes as layers and container images kept inference serverless and pay-per-use.',
      },
      {
        title: 'Consistent deletes',
        detail: 'Deleting a file removes the original, its thumbnail and the metadata record, and reports what was deleted and what was skipped, so storage and index never drift apart.',
      },
    ],
    contribution:
      'I built three of the query Lambdas: search by species with minimum counts (“≥3 crows and ≥2 pigeons”), bulk add/remove of tags across many file URLs with validated input, and consistent deletion across S3 and DynamoDB. I also wrote the user guide.',
  },
  {
    slug: 'pantrypals',
    title: 'PantryPals',
    tagline: 'An Android app that cuts household food waste with barcode and expiry-date scanning, shared pantries and smart reminders.',
    year: '2025',
    context: 'Monash · FIT5046 Mobile & Distributed Computing Systems',
    team: 'Team',
    role: 'Android engineer',
    categories: ['mobile'],
    featured: true,
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'CameraX', 'ML Kit', 'WorkManager', 'AlarmManager', 'Firebase Auth', 'Coroutines & Flow'],
    links: [],
    summary:
      'Scan a barcode to fill in a product, OCR the use-by date, share a pantry board with your household, and get reminded before things go off.',
    problem:
      'Australian households throw away an estimated $2,500 of food a year, mostly because nobody remembers what’s in the fridge or when it expires. The problem is worse in shared houses.',
    built: [
      'Barcode scanning (CameraX + ML Kit) that auto-fills product details from the OpenFoodFacts API via Retrofit.',
      'On-device OCR of expiry dates with ML Kit Text Recognition.',
      'Shared pantry boards joined by invite code, backed by an offline-first Room database and a clear item state machine (in use → use soon → discard).',
      'A nightly WorkManager rollover and exact AlarmManager reminders, with notification preferences.',
      'An experimental power-outage monitor that replays real appliance data (UK-DALE) and applies FSANZ 2-hour/4-hour food-safety rules to flag fridge items automatically.',
    ],
    architecture: {
      lanes: [
        { name: 'Capture', steps: ['CameraX', 'ML Kit barcode / OCR', 'OpenFoodFacts (Retrofit)', 'Room'] },
        { name: 'Background', steps: ['WorkManager rollover', 'AlarmManager', 'Notifications'] },
        { name: 'Context', steps: ['Power readings (Flow)', 'Outage detector', 'FSANZ rules', 'Item state update'] },
      ],
      caption: 'One-way data flow: repositories feed ViewModels, which expose StateFlow to Compose.',
    },
    decisions: [
      {
        title: 'Offline-first',
        detail: 'Room is the source of truth, so the app works in a kitchen with bad reception and syncs details when it can.',
      },
      {
        title: 'Rules decoupled from sensors',
        detail: 'Sensor detection, food-safety rules and state changes are separate stages, so each can be tested with virtual time.',
      },
    ],
  },
  {
    slug: 'expos-kernel',
    title: 'eXpOS operating system kernel',
    tagline: 'A multitasking OS kernel written from scratch for a simulated machine: scheduler, virtual memory, file system and system calls.',
    year: '2021',
    context: 'NIT Calicut · B.Tech CSE · eXpOS project',
    team: 'Solo',
    role: 'Kernel developer',
    categories: ['systems'],
    featured: false,
    stack: ['SPL', 'ExpL', 'XSM simulator', 'Assembly', 'C toolchain (Lex/Yacc)'],
    links: [
      { label: 'eXpOS platform', href: 'https://exposnitc.github.io/', kind: 'docs' },
      { label: 'Roadmap I followed', href: 'https://exposnitc.github.io/Roadmap.html', kind: 'docs' },
    ],
    summary:
      'About 3,200 lines of kernel code covering boot, interrupts, round-robin scheduling, demand paging, a file system and a process/semaphore API.',
    problem:
      'Most students learn operating systems from diagrams. eXpOS makes you build one: you write the kernel yourself and run it on the XSM machine simulator, stage by stage, until it runs a shell and concurrent user programs.',
    built: [
      'OS start-up and boot module, loading the kernel, interrupt vectors and the first user processes.',
      'Timer-driven round-robin scheduler with context switching and a process table.',
      'Exception handler with demand paging, plus a memory-manager module for page allocation.',
      'System calls for file create/delete/open/close/read/write/seek, fork, exec, exit, wait/signal, getpid and semaphores.',
      'Resource, process, memory, file and device-manager kernel modules, and console and disk interrupt handlers.',
      'User programs in ExpL (ls, cat, cp, rm, a shell, and sequential vs concurrent merge sort) that exercise the kernel.',
    ],
    architecture: {
      lanes: [
        { name: 'User space', steps: ['ExpL programs', 'Library calls', 'Software interrupts'] },
        { name: 'Kernel', steps: ['Syscall handlers', 'Process / memory / file / device managers', 'Scheduler', 'XSM hardware'] },
      ],
      caption: 'Layered like a real Unix-style kernel: user programs trap into handlers, which call manager modules that own the hardware.',
    },
    decisions: [
      {
        title: 'Concurrency you can see',
        detail: 'Writing merge sort in sequential and concurrent (fork + semaphore) versions was a practical test of the scheduler and synchronisation primitives.',
      },
    ],
  },
  {
    slug: 'mate-aws-architecture',
    title: 'Cloud architecture for AI fitness coaching',
    tagline: 'An AWS architecture for real-time video pose analysis, global competitions and payments at the scale of a million users.',
    year: '2025',
    context: 'Monash · FIT5225 Cloud Computing & Security',
    team: 'Solo',
    role: 'Solutions architect',
    categories: ['cloud'],
    featured: false,
    stack: ['Kinesis Video Streams', 'SageMaker', 'Lambda', 'DynamoDB', 'Aurora', 'ElastiCache', 'Cognito', 'WAF', 'CloudFront', 'Route 53', 'Glue', 'EventBridge', 'CodePipeline', 'Secrets Manager'],
    links: [],
    summary:
      'A design for 1M+ concurrent users covering scalability, GDPR/PCI-DSS security, 99.9% availability, global performance and cost.',
    problem:
      'A fitness company wanted AI-driven form feedback, injury prevention and global competitions, all in real time and under strict privacy and payment regulation.',
    built: [
      'Real-time pipeline: camera streams go through Kinesis Video Streams and preprocessing Lambdas to SageMaker pose and exercise models, with post-processing and SNS injury alerts.',
      'Continuous improvement: Glue ETL strips personal data and builds training sets, with weekly or accuracy-triggered SageMaker retraining deployed through CodePipeline.',
      'Edge and security: latency-based routing with Route 53, then WAF, CloudFront, a single API Gateway with Cognito MFA, and private subnets with VPC endpoints.',
      'Competition platform with ElastiCache leaderboards backed by DynamoDB, and an isolated payments subnet using Stripe keys from Secrets Manager.',
    ],
    decisions: [
      {
        title: 'Serverless by default',
        detail: 'Lambda and on-demand DynamoDB scale to zero between peaks, keeping cost proportional to use.',
      },
      {
        title: 'Isolate the blast radius',
        detail: 'Payments and user management each sit in dedicated private subnets with least-privilege IAM.',
      },
    ],
  },
  {
    slug: 'equipment-data-warehouse',
    title: 'Equipment sales & hire data warehouse',
    tagline: 'Cleaning messy operational data and modelling a star schema that answers what sells, where and when.',
    year: '2025',
    context: 'Monash · FIT5137 Advanced Database Technology',
    team: 'Solo',
    role: 'Data engineer / analyst',
    categories: ['data'],
    featured: false,
    stack: ['Oracle SQL', 'Star schema', 'Dimensional modelling', 'Data cleaning', 'BI reporting'],
    links: [],
    summary:
      'Found and fixed seven classes of data-quality problems in SQL, then built a star schema with two fact tables for sales and hire analysis.',
    problem:
      'An equipment sales and hire business had inconsistent operational tables and no reliable way to compare branches, categories or seasons.',
    built: [
      'SQL detection and repair of duplicates, constraint violations, inconsistent and incorrect values, nulls, logically impossible dates and outliers.',
      'A star schema with FACT_SALES and FACT_HIRE, plus branch, category, customer-type, equipment, price-scale and time dimensions, at more than one granularity.',
      'A findings report and poster: sales jumped in 2020 while hire stayed flat; Clayton leads every branch; earthmoving dominates; spring and winter are the peaks.',
    ],
    decisions: [
      {
        title: 'Recommendations, not just charts',
        detail: 'Each finding ends in an action, for example treating sales as the growth engine and growing hire through pricing and utilisation.',
      },
    ],
  },
  {
    slug: 'ptv-bus-accessibility',
    title: 'Bus access to Melbourne’s parks and waterways',
    tagline: 'Spatial SQL analysis of how well Public Transport Victoria’s bus network reaches green and blue spaces.',
    year: '2025',
    context: 'Monash · FIT5137 Advanced Database Technology',
    team: 'Solo',
    role: 'Spatial data analyst',
    categories: ['data'],
    featured: false,
    stack: ['PostgreSQL', 'PostGIS', 'GTFS', 'ogr2ogr', 'QGIS', 'ABS ASGS boundaries'],
    links: [],
    summary:
      'Joined PTV GTFS feeds with ABS mesh blocks in PostGIS to map bus-route coverage of parkland and water at the suburb level.',
    problem:
      'After COVID-era service cuts, PTV needed to know where its restored bus network does and doesn’t reach the natural spaces people use for recreation and health.',
    built: [
      'Loaded ABS mesh blocks, suburb boundaries and a full GTFS feed (stops, routes, trips, shapes) into PostGIS with ogr2ogr.',
      'Spatial joins linking parkland and water mesh blocks to nearby stops and unique routes, rolled up by suburb.',
      'A QGIS heatmap plus SQL-based detection of hot spots and blank spots.',
    ],
    results: {
      notes: [
        'Coverage is highly uneven: Werribee (29 routes), Reservoir (26) and Frankston (25) lead, while fringe suburbs such as Clematis and Clonbinane have a single route.',
        'Recommended service changes for outer-east and green-wedge areas with the largest gaps.',
      ],
    },
    decisions: [],
  },
  {
    slug: 'getfit-victoria',
    title: 'GetFit Victoria',
    tagline: 'A community sports finder with authentication, role-guarded admin tools and event ratings.',
    year: '2025',
    context: 'Monash · FIT5032 Internet Applications Development',
    team: 'Solo',
    role: 'Full-stack developer',
    categories: ['fullstack'],
    featured: false,
    stack: ['Vue 3', 'Vue Router', 'Firebase Auth', 'Firestore', 'Bootstrap', 'ESLint', 'Prettier'],
    links: [],
    summary:
      'A Vue 3 + Firebase web app for finding local sports activities, with guarded routes and one rating per member per event.',
    problem: 'People new to an area struggle to find casual, affordable sport. Clubs struggle to reach them.',
    built: [
      'Firebase Authentication sign-up and login with client-side validation and input sanitisation.',
      'Route guards for member-only pages and an admin-only dashboard.',
      'Event pages with average ratings and a one-rating-per-member rule stored in Firestore.',
    ],
    decisions: [],
  },
  {
    slug: 'afl-simulation',
    title: 'AFL match simulator',
    tagline: 'An object-oriented Java simulation of an Australian Rules Football match, from team files to final score.',
    year: '2024',
    context: 'Monash · FIT9131 Programming Foundations in Java',
    team: 'Solo',
    role: 'Developer',
    categories: ['systems'],
    featured: false,
    stack: ['Java', 'OOP', 'File I/O', 'JavaDoc', 'Test strategy'],
    links: [],
    summary:
      'Class hierarchy of player positions, probabilistic play-by-play simulation, file-based team rosters and a documented test strategy.',
    problem: 'Model a real sport’s rules and randomness cleanly enough that the code stays readable, testable and easy to extend.',
    built: [
      'An abstract Player with Forward, Midfielder, Defender and Reserve subclasses, each with position-specific behaviour (polymorphism in practice).',
      'Team management that reads rosters from files and writes updated player stats back after the match.',
      'A seeded random generator driving the quarter-by-quarter simulation.',
      'Generated JavaDoc, a class diagram and a written test strategy.',
    ],
    decisions: [],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
