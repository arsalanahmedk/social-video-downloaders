# Frontend Specifications: SocialVault Downloader

## 1. Design Language

### Core Design Principles
- Premium dark interface as default theme
- Glassmorphism used judiciously for depth
- Subtle gradients for visual interest
- Soft shadows for layer separation
- Generous spacing for breathing room
- Large typography for readability
- Smooth micro-interactions for feedback
- Sophisticated motion for delight
- No excessive animation — animations must improve experience, not distract

### Animation Philosophy
- Fast feedback on interactions
- Smooth transitions between states
- No unnecessary bouncing
- No excessive parallax
- Respect prefers-reduced-motion
- Spline, Rive, Lottie, and Shader Gradient work together harmoniously

### Color System
- Dark mode as default (premium feel)
- Light mode support for user preference
- System mode follows OS preference
- Platform-specific accent colors
- Consistent color tokens throughout
- WCAG AA contrast ratios maintained in all modes

---

## 2. Required Frontend Technologies

### 2.1 Spline
**Purpose**: Major 3D visual experiences
- Hero 3D object on landing page
- Floating media ecosystem visualization
- 3D downloader visualization for platform pages
- Interactive platform scene

**Requirements**:
- Scene must remain performant (60fps)
- Provide reduced-motion/static fallback
- Lazy load Spline embeddings
- Responsive behavior across devices
- Mobile: simplified or static fallback

---

### 2.2 Rive
**Purpose**: Interactive 2D animations reacting to application state
- Download state animation
- Success state animation
- Error state animation
- Loading animation
- Interactive icons
- Empty state animation

**Requirements**: Animations must react to application state with smooth transitions between states

---

### 2.3 Shader Gradient
**Purpose**: Premium background effects
- Hero background
- Platform sections
- Transition areas
- Atmospheric gradients

**Requirements**: Never make text unreadable because of the effect. Contrast maintained for all text.

---

### 2.4 LottieFiles
**Purpose**: Lightweight state animations
- Loading states, processing indicators, success animations
- Error states, empty states, decorative animations

**Requirements**: Prefer optimized animations (small file sizes). Lazy load on demand.

---

### 2.5 Icons8
**Purpose**: Consistent icon system
- Platform icons for each social media platform
- UI icons for actions and navigation
- Consistent icon sizes and styles throughout

---

## 3. Global Navigation

```
Logo | Downloaders | Platforms | How It Works | About | Help
```

No Pricing, Plans, Subscription, Billing links. Mobile navigation uses a polished slide-in drawer with touch-friendly targets (44x44px minimum).

---

## 4. Landing Page

### Hero Section
- Strong headline: "Download Public Social Media Content — Simply."
- Supporting description
- Universal URL input with platform detection, validation, paste-from-clipboard, clear button, loading state
- Paste button and Detect Platform action
- Animated visual background (Spline + Shader Gradient)
- Do not use exaggerated or misleading claims

### Platform Directory
Cards for each platform with icon, name, short description, supported media types, animated hover state, and CTA. Clicking opens that platform's downloader page.

---

## 5. Dedicated Downloader Pages

Every platform page uses a shared downloader component with platform-specific configuration.

### Page Structure
- **Header**: Platform branding
- **Main Input**: URL input with Paste and Download buttons
- **Supported Content**: Show supported content types
- **Processing**: Rive/Lottie animation with progress indicator
- **Preview**: Thumbnail, title, creator (public only), media type, dimensions, duration, download options
- **Download Options**: Original, High Quality, Medium Quality, Thumbnail (only show available options)
- **Success State**: Rive/Lottie animation with Download, Copy Link, Start Another buttons

---

## 6. Error States

All error states must have understandable message, visual state, retry option where appropriate, and accessible error announcement:
- Invalid URL: "Please enter a valid public post URL."
- Unsupported Platform: "This platform isn't currently supported."
- Private Content: "This content isn't publicly accessible."
- Content Not Found: "We couldn't find the requested content."
- Rate Limited: "Too many requests. Please try again later."
- Platform Unavailable: "The platform is temporarily unavailable."
- Processing Error: "We couldn't process this media right now."

---

## 7. Responsive Design

### Breakpoints
```
320px - Small mobile
375px - Mobile (iPhone)
414px - Mobile (large)
768px - Tablet
1024px - Laptop
1280px - Desktop
1440px - Large desktop
1920px+ - Extra large
```

### Rules
- Fluid widths with max-width containers
- Responsive typography using CSS clamp()
- CSS Grid and Flexbox layouts
- No horizontal overflow at any breakpoint
- No fixed desktop canvas
- Mobile-first approach

### Mobile Experience
- Simplified navigation (drawer)
- Enlarged touch targets (44x44px)
- URL input remains usable
- Avoid oversized 3D scenes
- Reduce expensive effects
- Preserve all functionality
- Support paste from clipboard

---

## 8. Animation System

### Motion Scale
```
micro:    100-200ms   (button hover, focus)
small:    200-300ms   (state transitions)
medium:   300-500ms   (page transitions)
large:    500-800ms   (entrance animations)
```

### Principles
- Fast feedback, smooth transitions
- No unnecessary bouncing or excessive parallax
- Respect prefers-reduced-motion
- All animation libraries harmonized

---

## 9. Component System

Required reusable components:
Navbar, Footer, PlatformCard, PlatformGrid, DownloaderCard, URLInput, PasteButton, PlatformDetector, DownloadButton, MediaPreview, MediaOption, ProgressIndicator, LoadingState, SuccessState, ErrorState, EmptyState, Toast, Modal, Dialog, Tooltip, AnimatedIcon

---

## 10. Design Tokens

Centralized tokens for colors, typography, spacing, border radius, shadows, animation durations, breakpoints, and z-index layers. Never hardcode random values throughout the application.

---

## 11. Accessibility

- WCAG 2.2 AA compliance
- Keyboard navigation for all interactive elements
- Focus-visible states
- Screen reader support with ARIA labels
- Sufficient color contrast (4.5:1 minimum)
- Reduced motion support via prefers-reduced-motion
- Accessible form errors
- Semantic HTML

---

## 12. Performance

- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Lazy loading for expensive visual elements (Spline, Rive, Lottie)
- Code splitting for route-based loading
- Tree shaking for unused code
- Dynamic imports for heavy components
- Do not load every animation asset on initial page

---

## 13. Frontend Routing

Clean routes: /, /instagram, /tiktok, /youtube, /facebook, /twitter, /pinterest, /reddit, /linkedin, /snapchat, /threads, /how-it-works, /about, /help, /privacy, /terms

No /pricing, /plans, /subscription, /billing routes.

---

## 14. Dark / Light Mode

Support Dark Mode, Light Mode, and System Mode. Default is premium dark theme. Theme switching must not break gradients, text contrast, Spline, Rive, Lottie, or Icons8 rendering.

---

## 15. SEO Content

Every platform page must have unique title, description, OpenGraph metadata, canonical URL, and structured metadata. Avoid duplicate SEO text across platform pages.

---

## 16. Footer

Links: Product, Platforms, Resources, Legal, Privacy, Terms, Copyright. No pricing links.

---

## 17. Micro-Interactions

Button hover/press, input focus, platform card hover, loading transitions, download progress, success transition, error transition, page transitions. Avoid excessive animation.

---

This document serves as the definitive frontend specification. All UI/UX implementation must align with these specifications. The final product must feel like a polished, premium, production-grade social-media downloader platform rather than a basic form with a download button.
