# MASTER DEVELOPMENT PROMPT
## Social Media Multi-Downloader Platform

You are a senior product architect, UI/UX designer, frontend engineer, backend engineer, security engineer, QA engineer, and technical documentation specialist.

Your task is to design and build a production-ready web application for downloading publicly accessible social-media media content, with a dedicated downloader page for each supported platform.

The application must have a premium, modern, highly interactive UI and a scalable backend architecture.

---

# 1. CORE PRODUCT CONCEPT

Build a web application called:

**SocialVault Downloader**

The name may be changed later, but use this as the working project name.

The platform allows users to enter a publicly accessible social-media post URL and retrieve available media through permitted/public interfaces.

The application should support multiple social-media platforms.

Each platform must have its own dedicated downloader page.

Initial platform routes:

- Instagram Downloader
- TikTok Downloader
- YouTube Downloader
- Facebook Downloader
- X / Twitter Downloader
- Pinterest Downloader
- Reddit Downloader
- LinkedIn Downloader
- Snapchat Downloader
- Threads Downloader

The architecture must make it easy to add additional platforms later without rewriting the entire application.

---

# 2. IMPORTANT LEGAL / PLATFORM REQUIREMENTS

The application MUST NOT:

- bypass authentication
- access private accounts
- bypass DRM
- bypass paywalls
- bypass CAPTCHA
- circumvent rate limits
- bypass platform security mechanisms
- scrape private APIs
- steal authentication cookies
- obtain unauthorized user data
- download content that the platform does not permit the application to access
- provide tools for circumventing technical protection measures

Only use:

- official APIs where available
- publicly documented endpoints
- publicly accessible content where downloading is permitted
- legitimate third-party APIs/services where their terms allow the intended functionality

The backend must reject unsupported/private URLs where appropriate.

Display appropriate copyright/use notices.

The product should be designed for downloading content that the user has permission to download or that the relevant platform permits downloading.

---

# 3. ABSOLUTE REQUIREMENT — FIVE DOCUMENTATION FILES

Before implementing the application, create these EXACT files in the project root:

```text
/PRD.md
/TAD.md
/SECURITY_AND_ACCESS.md
/FRONTEND_SPECIFICATIONS.md
/FEATURE_TICKET_LIST.md
```

These five files are mandatory.

Do NOT combine them.

Do NOT omit sections.

Do NOT create abbreviated placeholder documentation.

Each document must be comprehensive and implementation-ready.

---

# 4. PRD.md

Create a complete Product Requirements Document.

The PRD must contain:

## 4.1 Product Overview

Explain:

- what the application does
- the problem it solves
- target users
- product goals
- product philosophy
- primary user journeys

## 4.2 Product Vision

Define the long-term vision for the platform.

## 4.3 Target Users

Include:

- casual users
- content creators
- social-media managers
- researchers
- marketers
- students
- media teams

Do not assume every user has permission to download every piece of content.

## 4.4 Supported Platforms

Create an extensible platform registry.

Initial platform pages:

```text
/instagram
/tiktok
/youtube
/facebook
/twitter
/pinterest
/reddit
/linkedin
/snapchat
/threads
```

Platform availability must depend on whether the relevant integration can legally and technically support the required functionality.

## 4.5 Platform Downloader Features

Every downloader page must provide:

- URL input
- paste button
- URL validation
- platform detection
- loading state
- metadata retrieval
- media preview where permitted
- available quality/options
- download action
- error handling
- unsupported-content handling
- progress state where technically available
- copy/share functionality where appropriate

## 4.6 Media Types

Support architecture for:

- images
- videos
- GIFs
- thumbnails
- audio where legally/technically supported
- carousels
- multiple-media posts

Do not promise a media type when the platform integration cannot legally or technically provide it.

## 4.7 User Journey

Document the complete journey:

```text
Landing Page
↓
Select Platform
↓
Dedicated Downloader
↓
Paste URL
↓
Validate URL
↓
Detect Platform
↓
Fetch Public Metadata
↓
Display Preview
↓
Select Available Media
↓
Download
↓
Success / Error
```

## 4.8 Functional Requirements

Document every major requirement.

## 4.9 Non-Functional Requirements

Include:

- performance
- scalability
- availability
- accessibility
- security
- maintainability
- observability
- responsive design

## 4.10 Responsive Requirements

Support:

- mobile
- tablet
- laptop
- desktop
- large displays

## 4.11 SEO

Include:

- metadata
- Open Graph
- Twitter/X cards
- semantic HTML
- sitemap
- robots.txt
- canonical URLs
- platform-specific landing pages
- structured data where appropriate

## 4.12 Accessibility

Target WCAG 2.2 AA where practical.

Include:

- keyboard navigation
- focus states
- screen-reader support
- semantic HTML
- contrast
- reduced-motion support
- accessible form errors

## 4.13 Analytics

Design privacy-conscious analytics architecture.

Track only necessary product events.

Examples:

```text
page_view
platform_selected
url_submitted
download_started
download_completed
download_failed
error_displayed
```

Do not collect unnecessary personal data.

## 4.14 Success Metrics

Define measurable technical/product metrics without introducing pricing plans.

Examples:

- successful URL processing rate
- median processing time
- download completion rate
- error rate
- page performance
- accessibility score
- Core Web Vitals

## 4.15 Out of Scope

Explicitly document:

- private-account downloading
- authentication bypass
- DRM circumvention
- CAPTCHA bypass
- credential harvesting
- unauthorized API access

---

# 5. NO PRICING SECTION

IMPORTANT:

DO NOT CREATE:

- pricing page
- pricing cards
- subscription tiers
- Free plan
- Pro plan
- Enterprise plan
- pricing CTA
- payment section
- billing dashboard
- checkout
- subscription management

The application is NOT to contain pricing functionality.

Do not add pricing as placeholder content either.

---

# 6. TAD.md

Create a complete Technical Architecture Document.

Include:

## 6.1 Architecture Overview

Use a modular architecture:

```text
Frontend
    ↓
API Layer
    ↓
Validation Layer
    ↓
Platform Adapter Layer
    ↓
Media Processing Layer
    ↓
Storage / Temporary Files
    ↓
Download Response
```

## 6.2 Recommended Technology Stack

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Animation:

- Spline
- Rive
- LottieFiles

Visual effects:

- Shader Gradient

Icons:

- Icons8

Backend:

- Node.js / TypeScript
- REST API or appropriately structured API routes
- modular platform adapters

Database:

- PostgreSQL where persistence is actually required

Caching:

- Redis where required

Object storage:

- S3-compatible storage where required

Deployment:

- Docker-compatible architecture

## 6.3 Platform Adapter Architecture

Every platform must implement a common interface.

Example conceptual interface:

```text
PlatformAdapter

validateUrl()
extractIdentifier()
fetchMetadata()
getAvailableMedia()
validateDownload()
createDownload()
```

The architecture must allow:

```text
InstagramAdapter
TikTokAdapter
YouTubeAdapter
FacebookAdapter
TwitterAdapter
PinterestAdapter
RedditAdapter
LinkedInAdapter
SnapchatAdapter
ThreadsAdapter
```

Each adapter must be isolated.

One platform failure must not crash the entire service.

## 6.4 API Architecture

Document endpoints such as:

```text
POST /api/v1/resolve
POST /api/v1/download
GET  /api/v1/platforms
GET  /api/v1/health
```

Use appropriate HTTP methods and status codes.

Validate all input server-side.

## 6.5 URL Processing

The server must:

1. receive URL
2. normalize URL
3. validate protocol
4. detect platform
5. validate platform domain
6. reject unsupported domains
7. resolve content through the permitted integration
8. return normalized metadata

Never blindly fetch arbitrary URLs.

## 6.6 SSRF Protection

Implement:

- domain allowlisting
- protocol restrictions
- private IP blocking
- localhost blocking
- internal network blocking
- redirect validation
- DNS rebinding protections
- response-size limits
- timeout limits

## 6.7 Media Processing

Document:

- streaming
- temporary files
- cleanup
- file-size limits
- content-type validation
- filename sanitization
- download expiration

## 6.8 Database

If database persistence is required, define:

- users
- platform integrations
- download jobs
- audit events
- system configuration

Avoid storing unnecessary media or personal information.

## 6.9 Caching

Use short-lived caching where beneficial.

Never cache private/authenticated content.

## 6.10 Background Jobs

For longer operations:

```text
Request
↓
Job Queue
↓
Worker
↓
Platform Adapter
↓
Media Processing
↓
Temporary Storage
↓
Download
```

## 6.11 Error Architecture

Define standardized errors:

```text
INVALID_URL
UNSUPPORTED_PLATFORM
PRIVATE_CONTENT
CONTENT_NOT_FOUND
PLATFORM_UNAVAILABLE
RATE_LIMITED
MEDIA_UNAVAILABLE
PROCESSING_FAILED
DOWNLOAD_FAILED
FILE_TOO_LARGE
TIMEOUT
```

## 6.12 Observability

Include:

- structured logs
- error tracking
- request IDs
- performance metrics
- health checks
- worker monitoring

Never log:

- passwords
- API keys
- access tokens
- cookies
- private media URLs containing sensitive tokens

---

# 7. SECURITY_AND_ACCESS.md

Create a complete security document.

## 7.1 Security Principles

Follow:

- least privilege
- defense in depth
- secure defaults
- zero trust between components
- data minimization

## 7.2 Authentication

If accounts are introduced later, use secure authentication.

The initial downloader experience should not require an account unless technically necessary.

## 7.3 Authorization

Define role architecture for future expansion:

```text
USER
ADMIN
SYSTEM
```

Users must never gain administrative functionality through client-side manipulation.

## 7.4 API Security

Implement:

- rate limiting
- request validation
- schema validation
- CSRF protection where applicable
- CORS restrictions
- security headers
- abuse prevention
- request size limits

## 7.5 SSRF Protection

This section must be detailed.

Block:

```text
localhost
127.0.0.1
0.0.0.0
::1
private IPv4 ranges
private IPv6 ranges
link-local addresses
cloud metadata endpoints
internal hostnames
```

Only permit approved platform domains and approved integration domains.

## 7.6 File Security

Validate:

- MIME type
- extension
- file signature
- file size

Sanitize filenames.

Never execute downloaded media.

Store temporary files outside executable directories.

Delete temporary files after expiration.

## 7.7 Secrets

Never place secrets in frontend code.

Use:

```text
.environment variables
.secret management
```

Never commit:

```text
.env
API keys
OAuth secrets
database passwords
private tokens
```

Create:

```text
.env.example
```

## 7.8 Abuse Prevention

Protect against:

- spam
- automated abuse
- excessive requests
- resource exhaustion
- malicious URLs
- oversized media
- repeated download attacks

## 7.9 Access Control

Document access rules for:

- public downloader
- admin
- internal workers
- database
- object storage
- monitoring

## 7.10 Privacy

Minimize:

- IP retention
- logs
- URLs
- metadata
- analytics

Provide a privacy policy location in the application architecture.

## 7.11 Content and Copyright

The application must clearly communicate that users are responsible for having permission to download/use content.

Do not design functionality specifically to bypass platform restrictions.

---

# 8. FRONTEND_SPECIFICATIONS.md

This must be the most detailed UI/UX document.

The design must feel like a premium modern technology product.

Avoid generic template-like UI.

---

# 9. DESIGN LANGUAGE

Use:

- premium dark interface
- glassmorphism where appropriate
- subtle gradients
- soft shadows
- depth
- large typography
- smooth micro-interactions
- sophisticated motion
- generous spacing
- responsive layouts

Do not overuse animations.

Animations must improve the experience rather than distract from functionality.

---

# 10. REQUIRED FRONTEND TECHNOLOGIES

The frontend specification MUST explicitly use all of the following:

## 10.1 Spline

Use Spline for major 3D visual experiences.

Possible uses:

- hero 3D object
- floating media ecosystem
- 3D downloader visualization
- interactive platform scene

The Spline scene must remain performant.

Provide reduced-motion/static fallback.

## 10.2 Rive

Use Rive for interactive 2D animations.

Possible uses:

- download state
- success state
- empty state
- error state
- loading animation
- interactive icons

Animations must react to application state.

## 10.3 Shader Gradient

Use Shader Gradient for premium background effects.

Use it for:

- hero background
- platform sections
- transition areas
- atmospheric gradients

Do not make text unreadable because of the effect.

## 10.4 LottieFiles

Use Lottie animations for:

- loading
- processing
- success
- error
- empty states
- lightweight decorative animations

Prefer optimized animations.

## 10.5 Icons8

Use Icons8 for the icon system where appropriate.

Use consistent icon sizes and styles.

Do not mix random icon libraries without a reason.

---

# 11. GLOBAL NAVIGATION

Create:

```text
Logo
Downloaders
Platforms
How It Works
About
Help
```

Do not add:

```text
Pricing
Plans
Subscription
Billing
```

The navigation must be responsive.

Mobile navigation should use a polished menu/drawer.

---

# 12. LANDING PAGE

Create a premium landing page.

## Hero

Include:

- strong headline
- supporting description
- universal URL input
- Paste button
- Detect Platform action
- animated visual background
- Spline 3D experience

Example conceptual copy:

"Download Public Social Media Content — Simply."

Do not use exaggerated or misleading claims.

## Hero Input

The URL field should include:

- platform detection
- validation
- paste-from-clipboard
- clear button
- loading state
- keyboard support
- accessible labels

---

# 13. PLATFORM DIRECTORY

Create a platform directory.

Cards for:

- Instagram
- TikTok
- YouTube
- Facebook
- X
- Pinterest
- Reddit
- LinkedIn
- Snapchat
- Threads

Each card includes:

- platform icon
- platform name
- short description
- supported media types
- animated hover state
- CTA

Clicking a card opens that platform's dedicated downloader page.

---

# 14. DEDICATED DOWNLOADER PAGES

Every platform gets its own page.

Example:

```text
/instagram
/tiktok
/youtube
/facebook
/twitter
/pinterest
/reddit
/linkedin
/snapchat
/threads
```

Every page must NOT simply be a copy with a different title.

It should use a shared downloader component with platform-specific configuration.

---

# 15. DOWNLOADER PAGE STRUCTURE

Each downloader page contains:

## Header

Platform branding.

## Main Input

```text
Paste public post URL
[Paste]
[Download]
```

## Supported Content

Show supported content types.

## Processing

Use:

- Rive
- Lottie
- progress indicator

## Preview

Display:

- thumbnail
- title if available
- creator/account name if publicly available
- media type
- dimensions where available
- duration where available
- available download options

Only display information legitimately returned by the integration.

## Download Options

Examples:

```text
Original
High Quality
Medium Quality
Thumbnail
```

Only show options actually available.

## Success State

Use Rive/Lottie animation.

Provide:

```text
Download
Copy Link
Start Another
```

---

# 16. ERROR STATES

Design polished error states.

Examples:

### Invalid URL

"Please enter a valid public post URL."

### Unsupported Platform

"This platform isn't currently supported."

### Private Content

"This content isn't publicly accessible."

### Content Not Found

"We couldn't find the requested content."

### Rate Limited

"Too many requests. Please try again later."

### Platform Unavailable

"The platform is temporarily unavailable."

### Processing Error

"We couldn't process this media right now."

Every error must have:

- understandable message
- visual state
- retry option where appropriate
- accessible error announcement

---

# 17. RESPONSIVE DESIGN

The site must automatically adapt to:

```text
320px
375px
390px
414px
768px
1024px
1280px
1440px
1920px+
```

Never use a fixed desktop canvas.

Never allow horizontal overflow.

Use:

```text
fluid widths
max-width containers
responsive typography
CSS clamp()
responsive grids
flexbox
CSS grid
```

---

# 18. MOBILE EXPERIENCE

On mobile:

- simplify navigation
- enlarge touch targets
- keep URL input usable
- avoid oversized 3D scenes
- reduce expensive effects
- preserve functionality
- support paste from clipboard

All interactive targets should be appropriately sized for touch.

---

# 19. ANIMATION SYSTEM

Create a unified motion system.

Define:

```text
micro
small
medium
large
```

Animation principles:

- fast feedback
- smooth transitions
- no unnecessary bouncing
- no excessive parallax
- respect prefers-reduced-motion

Spline, Rive, Lottie, and Shader Gradient must work together rather than competing for attention.

---

# 20. COMPONENT SYSTEM

Create reusable components such as:

```text
Navbar
Footer
PlatformCard
PlatformGrid
DownloaderCard
URLInput
PasteButton
PlatformDetector
DownloadButton
MediaPreview
MediaOption
ProgressIndicator
LoadingState
SuccessState
ErrorState
EmptyState
Toast
Modal
Dialog
Tooltip
AnimatedIcon
```

---

# 21. DESIGN TOKENS

Create centralized design tokens for:

- colors
- typography
- spacing
- border radius
- shadows
- animation durations
- breakpoints
- z-index layers

Do not hardcode random values throughout the application.

---

# 22. ACCESSIBILITY

Frontend must support:

- keyboard navigation
- focus-visible states
- semantic HTML
- ARIA where required
- screen readers
- reduced motion
- sufficient contrast
- accessible errors
- accessible buttons
- accessible form controls

---

# 23. PERFORMANCE

Optimize:

- Spline loading
- Lottie loading
- Rive assets
- images
- fonts
- JavaScript
- API calls

Use lazy loading for expensive visual elements.

Do not load every animation asset on the initial page.

Target strong Core Web Vitals.

---

# 24. FRONTEND ROUTING

Use clean routes:

```text
/
/instagram
/tiktok
/youtube
/facebook
/twitter
/pinterest
/reddit
/linkedin
/snapchat
/threads
/how-it-works
/about
/help
/privacy
/terms
```

Do not create:

```text
/pricing
/plans
/subscription
/billing
```

---

# 25. FOOTER

Include:

```text
Product
Platforms
Resources
Legal
Privacy
Terms
Copyright
```

Do NOT include pricing links.

---

# 26. FEATURE_TICKET_LIST.md

Create a complete engineering ticket list.

Tickets must be implementation-ready.

Use IDs:

```text
PLAT-001
PLAT-002
...
```

---

# 27. REQUIRED TICKET CATEGORIES

Create tickets for:

## Project Setup

- repository initialization
- Next.js setup
- TypeScript
- Tailwind
- shadcn/ui
- linting
- formatting
- environment configuration

## Design System

- tokens
- typography
- components
- responsive system
- animation system

## Spline

- Spline integration
- hero scene
- responsive behavior
- loading fallback
- reduced-motion fallback

## Rive

- Rive integration
- loading animation
- success animation
- error animation

## Shader Gradient

- integration
- hero background
- responsive optimization
- reduced-motion fallback

## LottieFiles

- integration
- loading animation
- success animation
- empty states

## Icons8

- icon setup
- platform icons
- UI icons

## Landing Page

- hero
- URL input
- platform detection
- platform directory
- responsive layout

## Platform Pages

Create tickets for every platform:

```text
Instagram
TikTok
YouTube
Facebook
X/Twitter
Pinterest
Reddit
LinkedIn
Snapchat
Threads
```

## Backend

- API architecture
- URL validation
- platform detection
- adapter system
- download orchestration
- error handling
- rate limiting

## Security

- SSRF protection
- domain allowlisting
- input validation
- file validation
- request limits
- security headers
- secrets management
- logging security

## Testing

- unit tests
- integration tests
- API tests
- frontend tests
- accessibility tests
- responsive tests
- security tests
- performance tests

## Deployment

- production environment
- Docker
- environment variables
- monitoring
- health checks
- CI/CD

---

# 28. TICKET FORMAT

Every ticket must use:

```text
Ticket ID:
Title:
Category:
Priority:
Description:
User Story:
Technical Requirements:
Acceptance Criteria:
Dependencies:
Files/Components:
Testing Requirements:
Definition of Done:
```

Do not create vague tickets.

Each ticket must be independently understandable.

---

# 29. TESTING REQUIREMENTS

Implement tests for:

### Frontend

- URL input
- paste button
- platform detection
- validation
- loading state
- success state
- error state
- responsive layout

### Backend

- valid URLs
- invalid URLs
- unsupported URLs
- private URLs
- malicious URLs
- SSRF attempts
- oversized requests
- rate limiting

### Platform adapters

Every adapter must have isolated tests.

---

# 30. PROJECT STRUCTURE

Use a clean scalable structure similar to:

```text
socialvault/
│
├── app/
│   ├── page.tsx
│   ├── instagram/
│   ├── tiktok/
│   ├── youtube/
│   ├── facebook/
│   ├── twitter/
│   ├── pinterest/
│   ├── reddit/
│   ├── linkedin/
│   ├── snapchat/
│   ├── threads/
│   ├── how-it-works/
│   ├── about/
│   ├── help/
│   ├── privacy/
│   └── terms/
│
├── components/
│   ├── ui/
│   ├── downloader/
│   ├── platform/
│   ├── animations/
│   └── layout/
│
├── lib/
│   ├── platforms/
│   ├── validation/
│   ├── security/
│   ├── downloads/
│   └── utils/
│
├── public/
│   ├── icons/
│   ├── lottie/
│   ├── rive/
│   └── images/
│
├── api/
│
├── tests/
│
├── docs/
│
├── PRD.md
├── TAD.md
├── SECURITY_AND_ACCESS.md
├── FRONTEND_SPECIFICATIONS.md
├── FEATURE_TICKET_LIST.md
├── .env.example
├── README.md
└── package.json
```

Adapt the exact structure to the chosen Next.js architecture.

---

# 31. PLATFORM CONFIGURATION

Do NOT hardcode platform behavior throughout the application.

Create a centralized configuration system.

Conceptually:

```text
PlatformConfig

id
name
slug
domains
icon
color
supportedMedia
adapter
enabled
```

This allows future platforms to be added without rebuilding the entire frontend.

---

# 32. DOWNLOAD FLOW

The complete flow must be:

```text
User opens platform page
        ↓
User enters URL
        ↓
Frontend validates basic format
        ↓
Backend validates URL
        ↓
Platform is detected
        ↓
Platform adapter handles request
        ↓
Public/authorized metadata is retrieved
        ↓
Available media is normalized
        ↓
Frontend displays preview
        ↓
User selects media
        ↓
Download request
        ↓
Server validates request
        ↓
Media is streamed/generated
        ↓
Temporary resources cleaned
        ↓
Download completed
```

---

# 33. UNIVERSAL URL DETECTION

The landing page should automatically detect supported platforms.

Example:

```text
instagram.com → Instagram
tiktok.com → TikTok
youtube.com → YouTube
facebook.com → Facebook
x.com → X
twitter.com → X
pinterest.com → Pinterest
reddit.com → Reddit
linkedin.com → LinkedIn
snapchat.com → Snapchat
threads.net → Threads
```

Detection must be based on strict hostname parsing.

Do not trust user-supplied platform names.

---

# 34. UX DETAILS

Add polished micro-interactions:

- button hover
- button press
- input focus
- platform card hover
- loading transitions
- download progress
- success transition
- error transition
- page transitions

Avoid excessive animation.

---

# 35. DARK / LIGHT MODE

Support:

```text
Dark Mode
Light Mode
System Mode
```

The default should be a premium dark theme.

Theme switching must not break:

- gradients
- text contrast
- Spline
- Rive
- Lottie
- Icons8

---

# 36. SEO CONTENT

Every platform page must have unique:

```text
title
description
OpenGraph metadata
canonical URL
structured metadata where appropriate
```

Avoid duplicate SEO text across platform pages.

---

# 37. DOCUMENTATION QUALITY

The five required documents must be treated as living engineering specifications.

They must contain enough detail that another developer can understand:

- what to build
- why it exists
- how it works
- how it is secured
- how the frontend should look
- how the features should be implemented
- how each feature should be tested

---

# 38. IMPLEMENTATION ORDER

Follow this sequence:

### Phase 1

Create:

```text
PRD.md
TAD.md
SECURITY_AND_ACCESS.md
FRONTEND_SPECIFICATIONS.md
FEATURE_TICKET_LIST.md
```

### Phase 2

Initialize the application.

### Phase 3

Implement design system.

### Phase 4

Implement animation systems:

```text
Spline
Rive
Shader Gradient
LottieFiles
Icons8
```

### Phase 5

Implement landing page.

### Phase 6

Implement reusable downloader architecture.

### Phase 7

Implement platform adapters individually.

### Phase 8

Implement security controls.

### Phase 9

Implement testing.

### Phase 10

Implement performance optimization.

### Phase 11

Run complete QA.

### Phase 12

Prepare production deployment.

---

# 39. IMPORTANT DEVELOPMENT RULE

Do NOT build fake functionality just to make the UI appear complete.

If an integration is not legally/technically available:

- create the adapter interface
- implement proper validation
- display an appropriate unavailable state
- document the limitation

Do not create a fake downloader that pretends to retrieve media.

---

# 40. FINAL QUALITY REQUIREMENT

Before considering the project complete, verify:

- all five documentation files exist
- every document is complete
- no pricing section exists
- no pricing cards exist
- no subscription functionality exists
- every platform has a dedicated route
- platform architecture is modular
- frontend is responsive
- Spline is integrated
- Rive is integrated
- Shader Gradient is integrated
- LottieFiles is integrated
- Icons8 is integrated
- accessibility is implemented
- security controls are implemented
- SSRF protections are implemented
- rate limiting exists
- input validation exists
- file validation exists
- secrets are protected
- tests exist
- errors are handled
- loading states exist
- success states exist
- reduced-motion support exists
- mobile layout works
- desktop layout works
- SEO metadata exists
- no private-content bypass exists
- no CAPTCHA bypass exists
- no DRM bypass exists
- no authentication bypass exists

---

# 41. FINAL INSTRUCTION TO THE AI CODING AGENT

Do not start by writing random application code.

First create and populate:

```text
PRD.md
TAD.md
SECURITY_AND_ACCESS.md
FRONTEND_SPECIFICATIONS.md
FEATURE_TICKET_LIST.md
```

Read all five documents before beginning implementation.

Then implement the application according to those documents.

Maintain consistency between the documents and the actual code.

Whenever implementation decisions change the architecture, update the appropriate documentation file.

The final product must feel like a polished, premium, production-grade social-media downloader platform rather than a basic form with a download button.

There must be NO pricing system, pricing page, subscription system, payment system, or pricing section anywhere in the product.

Use the required visual technologies deliberately:

**Spline → 3D**

**Rive → interactive 2D**

**Shader Gradient → premium visual backgrounds**

**LottieFiles → lightweight state animations**

**Icons8 → consistent iconography**

Prioritize:

**UX + performance + accessibility + security + maintainability + scalable platform architecture.**
