/**
 * Project case studies. Each entry renders as a card on the home page and
 * as a full page at /projects/:slug.
 *
 * Shape:
 *   slug, title, tagline, year,
 *   context (what kind of project it is, shown on cards),
 *   course (where it was built: unit, employer or "Personal project"),
 *   team ('Solo' | 'Team of N' | 'Team'),
 *   role, categories[], featured, stack[], links[{ label, href, kind }],
 *   media?: { video, poster }, summary, problem, built[], architecture?:
 *   { lanes: [{ name, steps[] }], caption }, decisions[{ title, detail }],
 *   results?: { metrics?[{ value, label }], table?, notes?[] }, contribution?,
 *   figures?: [{ src, width, height, alt, caption }] (diagrams from reports)
 *
 * `kind` is one of: live | repo | demo | docs.
 */

import mateArchitecture from '@/assets/images/figures/mate-architecture.webp'
import birdtagArchitecture from '@/assets/images/figures/birdtag-architecture.webp'
import warehouseStarSchema from '@/assets/images/figures/warehouse-star-schema.webp'
import ptvHeatmap from '@/assets/images/figures/ptv-heatmap.webp'

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
    tagline:
      'The digital home of the IFRC’s flagship report, launched in Geneva to 30,000+ users on day one.',
    year: '2026',
    context: 'Global humanitarian report platform',
    course: 'MOSAIC × IFRC',
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
          steps: [
            'Pull request',
            'Lint · tests · audit · CodeQL',
            'Preview Worker',
            'Release tag',
            'Staging',
            'Manual prod deploy',
          ],
        },
        {
          name: 'Runtime',
          steps: [
            'Reader',
            'Cloudflare edge',
            'Next.js on Workers (OpenNext)',
            'D1 search index',
            'Static assets & HLS',
          ],
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
    tagline:
      'Sensory-friendly navigation for Melbourne’s CBD: live crowd density and the quietest route, not just the fastest.',
    year: '2026',
    context: 'Accessible smart-city navigation',
    course: 'Monash Industry Experience capstone · City of Melbourne open data',
    team: 'Team · sole engineer',
    role: 'Sole software engineer (end to end)',
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
      'Terraform',
      'scikit-learn',
      'Amplify',
      'Vitest',
      'Playwright',
      'GitHub Actions',
      'Dependabot',
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
      'Infrastructure as code with Terraform: a least-privilege IAM role per Lambda, EventBridge schedules and strict CORS, deployed behind an Amplify-hosted frontend.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Request path',
          steps: [
            'Vue SPA on Amplify',
            'API Gateway',
            'Python Lambdas',
            'RDS · PostGIS · pgRouting',
          ],
        },
        {
          name: 'Ingestion',
          steps: ['EventBridge schedule', 'Loader Lambdas', 'City of Melbourne Open Data', 'RDS'],
        },
        {
          name: 'Forecasting',
          steps: [
            'Hourly trigger',
            'ECR container Lambda (scikit-learn)',
            'S3 forecast JSON',
            'Prediction slider',
          ],
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
          'The repo ships an OpenAPI 3 spec, onboarding checklist, AWS runbook and cookbook and a risk register, so the next team can run and extend it without me.',
      },
    ],
    results: {
      notes: [
        'CI on every pull request runs Vitest unit tests, Playwright end-to-end tests, a high-severity npm audit and linting, with Dependabot keeping dependencies patched.',
        'Demoed at the Monash FIT Industry Experience Expo.',
      ],
    },
    contribution:
      'I was the only software engineer on the capstone team, so I designed and built all of it: the Vue frontend and map experience, every Python Lambda, the PostGIS/pgRouting routing, the crowd-forecasting ML pipeline, the Terraform-managed AWS infrastructure and the CI/CD pipeline.',
  },
  {
    slug: 'ai-marking-harness',
    title: 'Agentic marking harnesses',
    tagline:
      'Four Claude Code harnesses that mark code, reports, slide decks and requirements documents against a rubric, where every mark must cite evidence and be independently checked.',
    year: '2026',
    context: 'Agentic AI tooling',
    course: 'Monash University · Teaching Associate (FIT5046, FIT1056)',
    team: 'Solo',
    role: 'Designer & builder',
    categories: ['ai', 'backend'],
    featured: true,
    stack: [
      'Claude Code',
      'Sub-agents',
      'Harness engineering',
      'Python',
      'openpyxl',
      'pypdf',
      'Semantic Scholar API',
      'OpenAlex API',
      'LaTeX',
    ],
    links: [],
    summary:
      'Rubric-driven marking pipelines for four assessments across two units. Specialised agents gather evidence, deterministic Python tools do the counting and checking, and a verifier plus the tutor have the final say.',
    problem:
      'A tutor marking dozens of group submissions has to cross-check codebases, reports, slide decks and a detailed rubric, and keep marks consistent across the whole cohort. Doing that by hand is slow and drifts over time. A single LLM prompt is fast, but it makes confident claims it can’t back up.',
    built: [
      'Android group projects (FIT5046 A4): an orchestrator that hands each submission to five sub-agents (code-inspector, report-auditor, rubric-scorer, uniqueness-checker and verifier) and writes a mark sheet, a feedback CSV and a trace log.',
      'Research-paper presentations (FIT5046 A1): a stdlib-only PPTX extractor, per-slide word-count audits, and reference checks that pull each paper’s real bibliography from Semantic Scholar with an OpenAlex fallback, so overlap is verified rather than suspected.',
      'Design-proposal reports (FIT5046 A2): PDF/DOCX extraction, automatic location of the rubric’s sections, and page rendering when tables are embedded as images.',
      'Software requirements specifications (FIT1056): extraction to text and page images, a JSON “source of truth” per team, generated LaTeX/Markdown feedback, and a check.py gate that validates ranges, arithmetic and penalties before release.',
      'Spreadsheet writers that back up the workbook before every write and never touch cells tutors own, such as individual marks, formulas and deductions.',
    ],
    architecture: {
      lanes: [
        {
          name: 'A4 agents',
          steps: [
            'Submission',
            'code-inspector',
            'report-auditor',
            'rubric-scorer',
            'uniqueness-checker',
            'verifier',
            'Tutor review',
          ],
        },
        {
          name: 'Deterministic',
          steps: [
            'Extract (PPTX / PDF / DOCX)',
            'Audit (word counts, references)',
            'Mark JSON',
            'Validate',
            'Render feedback / xlsx',
          ],
        },
      ],
      caption:
        'LLM agents judge quality against the rubric. Anything countable or checkable (word limits, bibliographies, arithmetic, spreadsheet cells) is done by plain Python tools the agents call.',
    },
    decisions: [
      {
        title: 'The scorer never checks itself',
        detail:
          'A separate read-only verifier re-greps the project and sorts every mismatch as hallucination, wrong file, arithmetic or scope creep. Only the affected criteria are re-run.',
      },
      {
        title: 'No evidence, no deduction',
        detail:
          'Each deduction must quote the rubric band and point to a file or page. The harness also lists what an extractor can’t see (image content, layout, delivery) and is banned from commenting on it.',
      },
      {
        title: 'Mark horizontally',
        detail:
          'One criterion across every submission, then calibrate and lock, then the next criterion. Marks stay comparable across the cohort instead of drifting group by group.',
      },
      {
        title: 'No double counting',
        detail:
          'A uniqueness map ensures a single implementation (for example WorkManager) earns credit under one criterion only.',
      },
      {
        title: 'Versioned rubric interpretations',
        detail:
          'Each harness keeps a changelog (v1.0 to v2.1 for A1). Scripts can rebuild earlier iterations for audit, so every re-mark is explainable.',
      },
      {
        title: 'Designed for context limits',
        detail:
          'State lives in files, not the conversation: one lab or group per session, a resumable STATUS block, and rubric documents loaded once.',
      },
    ],
    results: {
      metrics: [
        { value: '4', label: 'harnesses across 2 units' },
        { value: '5', label: 'specialised sub-agents (A4)' },
        { value: '60+', label: 'group submissions marked' },
      ],
      notes: [
        'Cut manual cross-checking time while keeping a full audit trail for moderation. Final marks are always set by the tutor.',
      ],
    },
    privateNote: 'Source is private because it works on student submissions.',
  },
  {
    slug: 'cloudpose',
    title: 'CloudPose',
    tagline:
      'Human pose estimation as a web service, containerised and load-tested on Kubernetes under tight CPU and memory limits.',
    year: '2025',
    context: 'Cloud-native ML inference service',
    course: 'Monash University · FIT5225 Cloud Computing & Security',
    team: 'Solo',
    role: 'Engineer',
    categories: ['cloud', 'backend', 'ai'],
    featured: true,
    stack: [
      'Python',
      'FastAPI',
      'YOLO11-pose',
      'ONNX Runtime',
      'OpenCV',
      'Docker',
      'Kubernetes',
      'Locust',
    ],
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
          steps: [
            'Client (base64 image)',
            'NodePort Service',
            'Pod: FastAPI',
            'Bounded queue',
            'Single inference worker',
            'ONNX INT8 model',
          ],
        },
      ],
      caption:
        'Each pod runs one inference at a time. Extra requests wait in a bounded queue or get a fast 429, not an out-of-memory kill.',
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
    tagline:
      'A self-hosted tech-trend radar that streams GitHub and Hacker News activity through Kafka to score what’s trending in CS.',
    year: '2026',
    context: 'Real-time streaming data platform',
    course: 'Personal project',
    team: 'Solo',
    role: 'Engineer',
    categories: ['backend', 'cloud', 'data'],
    featured: true,
    stack: [
      'Python',
      'Apache Kafka (KRaft)',
      'PostgreSQL',
      'Redis',
      'FastAPI',
      'Next.js',
      'Docker Compose',
      'Terraform',
      'AWS EC2',
      'Prometheus',
      'Grafana',
      'GitHub Actions',
      'Trivy',
      'pytest',
    ],
    links: [],
    summary:
      'An event-streaming pipeline built to run on a single free-tier EC2 instance: Kafka in KRaft mode, batched and deduplicated writes, a cached FastAPI service, a Next.js UI and self-hosted Prometheus and Grafana.',
    problem:
      'Trending lists on any one site are noisy and narrow. SignalStack combines developer activity from GitHub and Hacker News into one score per CS topic, and it had to run on one small machine at zero extra cost.',
    built: [
      'A producer that polls GitHub Events (stars and forks) and Hacker News every 60 seconds, maps each post to canonical topics with word-boundary matching (so “java” never matches “javascript”), and publishes one Kafka event per topic.',
      'Redis deduplication (SET NX with a 24-hour TTL), so producer restarts never republish and memory stays bounded.',
      'A consumer that batches up to 100 events or 2 seconds, scores them with log-scaled upvotes times a per-source weight, writes one PostgreSQL transaction per batch and commits Kafka offsets only after a successful write.',
      'A FastAPI service (trending, real-time, topic, compare, sources, recommend, health, metrics and Swagger docs) using cache-aside Redis with per-endpoint TTLs, plus a Next.js front end.',
      'Observability: Prometheus metrics for requests, latency histograms, cache hits and consumer lag, with three provisioned Grafana dashboards for pipeline health, API performance and data quality.',
      'Delivery: Terraform for AWS, a GitHub Actions deploy to EC2, pytest on pull requests and Trivy image scanning for critical and high CVEs.',
    ],
    architecture: {
      lanes: [
        {
          name: 'Ingest',
          steps: [
            'GitHub + HN APIs',
            'Producer (60 s poll)',
            'Redis dedup',
            'Kafka · 4 partitions',
          ],
        },
        {
          name: 'Process',
          steps: [
            'Consumer group',
            'Batch 100 / 2 s',
            'Score + aggregate',
            'PostgreSQL',
            'Commit offsets',
          ],
        },
        { name: 'Serve', steps: ['FastAPI', 'Redis cache-aside', 'Next.js UI'] },
        { name: 'Observe', steps: ['/metrics', 'Prometheus', 'Grafana dashboards'] },
      ],
      caption:
        'The whole stack runs in Docker Compose on one host. Producer and consumer write their metrics to Redis, and the API exports them on each Prometheus scrape.',
    },
    decisions: [
      {
        title: 'Batch, then deduplicate',
        detail:
          'Row-by-row writes were the bottleneck. Batched transactions, in-batch aggregation and Redis dedup raised throughput about 250× on the same hardware.',
      },
      {
        title: 'At-least-once, safely',
        detail:
          'Offsets are committed only after Postgres accepts the batch, and upserts are aggregated first, so a crash replays events instead of losing them.',
      },
      {
        title: 'Kafka for decoupling, not volume',
        detail:
          'Kafka stays for replay and independent consumer groups (such as a future ML consumer). KRaft mode drops ZooKeeper and saves about 200 MB of RAM.',
      },
      {
        title: 'Metrics across containers',
        detail:
          'Producer and consumer run in separate containers, so they write their counters to Redis and a custom collector exposes them through the API’s /metrics endpoint.',
      },
      {
        title: 'Say no to Kubernetes',
        detail:
          'A single node has nothing to orchestrate, and EKS has no free tier. The decision records explain what was left out and why.',
      },
    ],
    results: {
      metrics: [
        { value: '~250×', label: 'consumer throughput gain' },
        { value: '$0', label: 'extra infrastructure' },
        { value: '16/16', label: 'pytest checks passing' },
      ],
    },
    privateNote: 'Source available on request.',
  },
  {
    slug: 'birdtag',
    title: 'BirdTag',
    tagline:
      'A serverless media library that automatically tags bird species in uploaded photos, videos and audio.',
    year: '2025',
    context: 'Serverless AI media platform',
    course: 'Monash University · FIT5225 Cloud Computing & Security',
    figures: [
      {
        src: birdtagArchitecture,
        width: 1862,
        height: 1120,
        alt: 'BirdTag AWS architecture: a Next.js UI behind API Gateway and Cognito; uploads to S3 trigger tagging and thumbnail Lambdas that write to DynamoDB; six query Lambdas and an SNS subscription Lambda serve the users; CloudWatch monitors Lambda and API errors.',
        caption:
          'Fig 1 from our team report: S3-triggered tagging and thumbnail Lambdas, DynamoDB metadata, and one Lambda per query.',
      },
    ],
    team: 'Team of 4',
    role: 'Backend engineer',
    categories: ['cloud', 'backend', 'ai'],
    featured: true,
    stack: [
      'AWS Lambda',
      'S3',
      'DynamoDB',
      'Cognito',
      'API Gateway',
      'SNS',
      'ECR',
      'YOLO (ONNX)',
      'BirdNET',
      'OpenCV',
      'Python',
    ],
    links: [
      {
        label: 'Live app (sign-up required)',
        href: 'https://fit-5225-a3-frontend.vercel.app/',
        kind: 'live',
      },
    ],
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
        {
          name: 'Ingest',
          steps: [
            'Upload',
            'S3',
            'Tagging Lambda (YOLO / BirdNET)',
            'Thumbnail Lambda',
            'DynamoDB',
          ],
        },
        {
          name: 'Query',
          steps: ['Web app', 'Cognito', 'API Gateway', 'Query Lambdas', 'DynamoDB / S3'],
        },
        { name: 'Notify', steps: ['New tags', 'SNS topic', 'Subscriber email'] },
      ],
      caption:
        'Model runtimes ship as Lambda layers and ECR images, so inference scales with uploads and there are no model servers to run.',
    },
    decisions: [
      {
        title: 'Models as Lambda layers and images',
        detail:
          'Packaging TFLite, librosa and ONNX runtimes as layers and container images kept inference serverless and pay-per-use.',
      },
      {
        title: 'Consistent deletes',
        detail:
          'Deleting a file removes the original, its thumbnail and the metadata record, and reports what was deleted and what was skipped, so storage and index never drift apart.',
      },
    ],
    contribution:
      'I built three of the query Lambdas: search by species with minimum counts (“≥3 crows and ≥2 pigeons”), bulk add/remove of tags across many file URLs with validated input, and consistent deletion across S3 and DynamoDB. I also wrote the user guide.',
  },
  {
    slug: 'pantrypals',
    title: 'PantryPals',
    tagline:
      'An Android app that cuts household food waste with barcode and expiry-date scanning, shared pantries and smart reminders.',
    year: '2025',
    context: 'Context-aware Android app',
    course: 'Monash University · FIT5046 Mobile & Distributed Computing',
    team: 'Team · sole engineer',
    role: 'Sole software engineer (end to end)',
    contribution:
      'I built the entire app myself: barcode and OCR scanning, the offline-first Room data layer and item state machine, shared pantry boards, Firebase authentication, WorkManager and AlarmManager scheduling, and the context-aware power-outage monitor.',
    categories: ['mobile'],
    featured: true,
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'Room',
      'Retrofit',
      'CameraX',
      'ML Kit',
      'WorkManager',
      'AlarmManager',
      'Firebase Auth',
      'Coroutines & Flow',
    ],
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
        {
          name: 'Capture',
          steps: ['CameraX', 'ML Kit barcode / OCR', 'OpenFoodFacts (Retrofit)', 'Room'],
        },
        { name: 'Background', steps: ['WorkManager rollover', 'AlarmManager', 'Notifications'] },
        {
          name: 'Context',
          steps: ['Power readings (Flow)', 'Outage detector', 'FSANZ rules', 'Item state update'],
        },
      ],
      caption:
        'One-way data flow: repositories feed ViewModels, which expose StateFlow to Compose.',
    },
    decisions: [
      {
        title: 'Offline-first',
        detail:
          'Room is the source of truth, so the app works in a kitchen with bad reception and syncs details when it can.',
      },
      {
        title: 'Rules decoupled from sensors',
        detail:
          'Sensor detection, food-safety rules and state changes are separate stages, so each can be tested with virtual time.',
      },
    ],
  },
  {
    slug: 'expos-kernel',
    title: 'eXpOS operating system kernel',
    tagline:
      'A multitasking OS kernel written from scratch for a simulated machine: scheduler, virtual memory, file system and system calls.',
    year: '2021',
    context: 'Operating system kernel',
    course: 'NIT Calicut · B.Tech CSE (eXpOS)',
    team: 'Solo',
    role: 'Kernel developer',
    categories: ['systems'],
    featured: true,
    stack: ['SPL', 'ExpL', 'XSM simulator', 'Assembly', 'C toolchain (Lex/Yacc)'],
    links: [
      { label: 'eXpOS platform', href: 'https://exposnitc.github.io/', kind: 'docs' },
      {
        label: 'Roadmap I followed',
        href: 'https://exposnitc.github.io/Roadmap.html',
        kind: 'docs',
      },
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
        {
          name: 'Kernel',
          steps: [
            'Syscall handlers',
            'Process / memory / file / device managers',
            'Scheduler',
            'XSM hardware',
          ],
        },
      ],
      caption:
        'Layered like a real Unix-style kernel: user programs trap into handlers, which call manager modules that own the hardware.',
    },
    decisions: [
      {
        title: 'Concurrency you can see',
        detail:
          'Writing merge sort in sequential and concurrent (fork + semaphore) versions was a practical test of the scheduler and synchronisation primitives.',
      },
    ],
  },
  {
    slug: 'mate-aws-architecture',
    title: 'MATE: AI fitness platform on AWS',
    tagline:
      'An AWS architecture for real-time video pose analysis, global competitions and payments at the scale of a million users.',
    year: '2025',
    context: 'Cloud solution architecture',
    course: 'Monash University · FIT5225 Cloud Computing & Security',
    figures: [
      {
        src: mateArchitecture,
        width: 1635,
        height: 2048,
        alt: 'AWS architecture diagram for the MATE fitness platform: camera feeds into Kinesis Video Streams and SageMaker, competition, payment, user-management, wearables and social modules in private subnets, and a retraining pipeline with Glue, EventBridge and CodePipeline, fronted by Route 53, WAF, CloudFront and API Gateway.',
        caption:
          'The architecture diagram from my design report: every module sits in private subnets behind one API Gateway.',
      },
    ],
    team: 'Solo',
    role: 'Solutions architect',
    categories: ['cloud'],
    featured: false,
    stack: [
      'Kinesis Video Streams',
      'SageMaker',
      'Lambda',
      'DynamoDB',
      'Aurora',
      'ElastiCache',
      'Cognito',
      'WAF',
      'CloudFront',
      'Route 53',
      'Glue',
      'EventBridge',
      'CodePipeline',
      'Secrets Manager',
    ],
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
        detail:
          'Lambda and on-demand DynamoDB scale to zero between peaks, keeping cost proportional to use.',
      },
      {
        title: 'Isolate the blast radius',
        detail:
          'Payments and user management each sit in dedicated private subnets with least-privilege IAM.',
      },
    ],
  },
  {
    slug: 'equipment-data-warehouse',
    title: 'Monash Equipment Center data warehouse',
    tagline:
      'Cleaning messy operational data and modelling a star schema that answers what sells, where and when.',
    year: '2025',
    context: 'Data warehousing & BI',
    course: 'Monash University · FIT5137 Advanced Database Technology',
    figures: [
      {
        src: warehouseStarSchema,
        width: 1381,
        height: 1080,
        alt: 'Star schema with FACT_SALES and FACT_HIRE fact tables linked to BRANCH_DIM, CUSTOMER_TYPE_DIM, EQUIPMENT_DIM, CATEGORY_DIM, TIME_DIM and PRICE_SCALE_DM dimensions.',
        caption:
          'The star schema from my report: two fact tables sharing branch, customer-type, equipment and time dimensions.',
      },
    ],
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
        detail:
          'Each finding ends in an action, for example treating sales as the growth engine and growing hire through pricing and utilisation.',
      },
    ],
  },
  {
    slug: 'ptv-bus-accessibility',
    title: 'PTV green-space accessibility analysis',
    tagline:
      'Spatial SQL analysis of how well Public Transport Victoria’s bus network reaches green and blue spaces.',
    year: '2025',
    context: 'Geospatial transport analysis',
    course: 'Monash University · FIT5137 Advanced Database Technology',
    figures: [
      {
        src: ptvHeatmap,
        width: 1600,
        height: 1132,
        alt: 'Choropleth map of Greater Melbourne suburbs shaded by the number of unique bus routes serving parkland and water mesh blocks, from 0–1 (white) to 20–29 (dark green).',
        caption:
          'The QGIS heatmap from my report: unique bus routes serving parks and waterways in each suburb.',
      },
    ],
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
    tagline:
      'A community sports finder with authentication, role-guarded admin tools and event ratings.',
    year: '2025',
    context: 'Community sports web app',
    course: 'Monash University · FIT5032 Internet Applications Development',
    team: 'Solo',
    role: 'Full-stack developer',
    categories: ['fullstack'],
    featured: false,
    stack: ['Vue 3', 'Vue Router', 'Firebase Auth', 'Firestore', 'Bootstrap', 'ESLint', 'Prettier'],
    links: [],
    summary:
      'A Vue 3 + Firebase web app for finding local sports activities, with guarded routes and one rating per member per event.',
    problem:
      'People new to an area struggle to find casual, affordable sport. Clubs struggle to reach them.',
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
    tagline:
      'An object-oriented Java simulation of an Australian Rules Football match, from team files to final score.',
    year: '2024',
    context: 'Object-oriented game simulation',
    course: 'Monash University · FIT9131 Programming Foundations in Java',
    team: 'Solo',
    role: 'Developer',
    categories: ['systems'],
    featured: false,
    stack: ['Java', 'OOP', 'File I/O', 'JavaDoc', 'Test strategy'],
    links: [],
    summary:
      'Class hierarchy of player positions, probabilistic play-by-play simulation, file-based team rosters and a documented test strategy.',
    problem:
      'Model a real sport’s rules and randomness cleanly enough that the code stays readable, testable and easy to extend.',
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

// Sticker colour per project, cycled by position so neighbours never match.
const TONES = ['yellow', 'mint', 'lilac', 'cobalt', 'pink', 'tomato']
export const toneOf = (project) => TONES[Math.max(0, projects.indexOf(project)) % TONES.length]
