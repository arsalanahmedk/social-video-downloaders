# Technical Architecture Document: SocialVault Downloader

## 1. Architecture Overview

### Modular Layered Architecture

The application follows a modular, layered architecture that ensures separation of concerns, scalability, and maintainability:

```
Frontend (Next.js)
    ↓
API Layer (Next.js Route Handlers)
    ↓
Validation Layer (Schema Validation)
    ↓
Platform Adapter Layer (Pluggable Adapters)
    ↓
Media Processing Layer (Streaming/Transform)
    ↓
Storage / Temporary Files (Ephemeral)
    ↓
Download Response (Stream to Client)
```

### Architecture Principles

1. **Modularity**: Each platform has an isolated adapter
2. **Extensibility**: New platforms added via configuration + new adapter
3. **Resilience**: One platform failure must not crash the entire service
4. **Security-First**: All layers enforce security boundaries
5. **Statelessness**: API layer remains stateless; state managed via jobs
6. **Performance**: Caching, streaming, and efficient processing

---

## 2. Recommended Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | Full-stack React framework with App Router |
| **React 18+** | UI library with concurrent features |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Accessible, customizable UI components |

### Animation & Visual Effects

| Technology | Purpose |
|------------|---------|
| **Spline** | Major 3D visual experiences (hero scenes) |
| **Rive** | Interactive 2D animations (states, icons) |
| **Shader Gradient** | Premium background effects |
| **LottieFiles** | Lightweight state animations |
| **Icons8** | Consistent icon system |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js / TypeScript** | Runtime and server-side logic |
| **Next.js API Routes** | RESTful API endpoints |
| **Platform Adapters** | Modular integration layer |

### Data Layer

| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Persistence where required (jobs, audit) |
| **Redis** | Caching, rate limiting, session management |
| **S3-Compatible Storage** | Temporary media storage (optional) |

### Deployment

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerized deployment |
| **Docker Compose** | Local development and orchestration |
| **Kubernetes** | Production orchestration (optional) |

---

## 3. Platform Adapter Architecture

### Common Interface

Every platform adapter must implement the following interface:

```typescript
interface PlatformAdapter {
  // Validate URL format and platform compatibility
  validateUrl(url: string): Promise<ValidationResult>;

  // Extract unique identifier from URL
  extractIdentifier(url: string): Promise<PlatformIdentifier>;

  // Fetch public metadata from the platform
  fetchMetadata(identifier: PlatformIdentifier): Promise<MediaMetadata>;

  // Get available media options for the content
  getAvailableMedia(identifier: PlatformIdentifier): Promise<MediaOption[]>;

  // Validate download request
  validateDownload(identifier: PlatformIdentifier, options: DownloadOptions): Promise<DownloadValidation>;

  // Create and initiate download
  createDownload(identifier: PlatformIdentifier, options: DownloadOptions): Promise<DownloadResult>;
}
```

### Adapter Isolation

Each adapter operates independently:
- Isolated error handling
- No cross-platform dependencies
- Individual timeout and rate limit controls
- Independent test suites

### Available Adapters

```
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

### Adapter Failure Handling

- One adapter failure must not affect other platforms
- Timeout protection per adapter (configurable, default 30s)
- Circuit breaker pattern for repeated failures
- Graceful degradation with appropriate user messaging

---

## 4. API Architecture

### Endpoint Definitions

#### `POST /api/v1/resolve`
Resolves a URL and returns platform information and available media.

```
Request:
{
  "url": "https://www.instagram.com/p/ABC123/"
}

Response:
{
  "platform": "instagram",
  "metadata": { ... },
  "media": [ ... ],
  "supportedOptions": [ ... ]
}
```

#### `POST /api/v1/download`
Initiates a download for specified media.

```
Request:
{
  "platform": "instagram",
  "identifier": "ABC123",
  "options": { "quality": "high" }
}

Response:
{
  "downloadUrl": "...",
  "expiresAt": "..."
}
```

#### `GET /api/v1/platforms`
Returns list of supported platforms and their status.

```
Response:
[
  {
    "id": "instagram",
    "name": "Instagram",
    "slug": "instagram",
    "enabled": true,
    "supportedMedia": ["images", "videos", "carousels"]
  }
]
```

#### `GET /api/v1/health`
Health check endpoint.

```
Response:
{
  "status": "healthy",
  "timestamp": "...",
  "platforms": { "instagram": "healthy", ... }
}
```

### HTTP Methods & Status Codes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/resolve` | Resolve and validate URL |
| POST | `/api/v1/download` | Initiate download |
| GET | `/api/v1/platforms` | List supported platforms |
| GET | `/api/v1/health` | Health check |

Standard HTTP status codes:
- `200` - Success
- `202` - Accepted (async processing)
- `400` - Bad request (invalid URL/format)
- `403` - Forbidden (private content)
- `404` - Not found (content unavailable)
- `429` - Rate limited
- `500` - Internal server error
- `503` - Service unavailable (platform down)

### Request Validation

All input validated server-side:
- URL format validation (protocol, domain, structure)
- Schema validation via Zod or similar
- Size limits on request bodies
- Rate limiting per IP/endpoint

---

## 5. URL Processing

### Processing Pipeline

The server processes every URL through a strict pipeline:

1. **Receive URL**: Accept URL from frontend request
2. **Normalize URL**: Remove fragments, normalize encoding, add protocol if missing
3. **Validate Protocol**: Ensure `https://` (or `http://` for legacy)
4. **Detect Platform**: Parse hostname and match against allowlisted domains
5. **Validate Platform Domain**: Confirm domain is in approved list
6. **Reject Unsupported Domains**: Return error for unrecognized domains
7. **Resolve Content**: Route to appropriate platform adapter
8. **Return Normalized Metadata**: Standardize response format

### Never Blindly Fetch Arbitrary URLs

The system must never perform arbitrary URL fetching. All URLs must pass through the platform detection and validation pipeline before any network request is made.

---

## 6. SSRF Protection

### Server-Side Request Forgery Prevention

SSRF (Server-Side Request Forgery) protection is critical since the server fetches content from external platforms.

### Domain Allowlisting

Only approved platform domains are permitted:
```
instagram.com
tiktok.com
youtube.com
facebook.com
x.com
twitter.com
pinterest.com
reddit.com
linkedin.com
snapchat.com
threads.net
```

### Protocol Restrictions

- Only `https://` and `http://` protocols allowed
- No `file://`, `ftp://`, `gopher://`, etc.
- No protocol-relative URLs (`//example.com`)

### Network Blocking

The following must be blocked:
- `localhost`
- `127.0.0.1`
- `0.0.0.0`
- `::1` (IPv6 loopback)
- Private IPv4 ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
- Private IPv6 ranges (fc00::/7, fe80::/10)
- Link-local addresses
- Cloud metadata endpoints (`169.254.169.254`)
- Internal hostnames

### Redirect Validation

- Follow redirects only within allowlisted domains
- Maximum redirect depth: 3
- Validate redirect targets before following
- Abort on redirect to non-allowlisted domain

### DNS Rebinding Protection

- Resolve DNS and verify IP matches allowlisted domain
- Re-validate after DNS resolution
- Use connection-level validation

### Response Limits

- Maximum response size: 50MB
- Timeout: 30 seconds per request
- Connection timeout: 10 seconds

---

## 7. Media Processing

### Streaming Architecture

Media is processed via streaming to avoid loading entire files into memory:

1. **Request Received**: Download initiated for specific media
2. **Stream Opened**: Connection to source opened
3. **Content Validation**: MIME type, size, and signature verified
4. **Stream Transformed**: Any necessary format conversion
5. **Stream to Client**: Media streamed directly to client
6. **Cleanup**: Temporary resources released

### Temporary Files

When temporary storage is needed:
- Files stored outside executable directories
- Unique filenames with random identifiers
- Automatic cleanup after expiration (default: 1 hour)
- File size limits enforced before storage
- Content-type validation before accepting

### File Size Limits

| Media Type | Max Size |
|------------|----------|
| Images | 50MB |
| Videos | 500MB |
| GIFs | 100MB |
| Audio | 100MB |

### Content-Type Validation

- Validate MIME type matches expected format
- Verify file signature (magic bytes)
- Reject mismatched or unknown types
- Maintain allowlist of accepted types

### Filename Sanitization

- Remove special characters
- Strip path traversal sequences (`../`)
- Limit filename length (255 chars)
- Add platform prefix for identification
- Use URL-safe encoding

### Download Expiration

- Download links expire after 1 hour
- Temporary files cleaned on expiration
- No permanent storage of downloaded media
- Audit logs maintained without media content

---

## 8. Database

### Persistence Model

PostgreSQL is used for persistence where actually required:

### Schema Design

#### Users Table (Future)
```
id: UUID (PK)
email: VARCHAR
created_at: TIMESTAMP
role: ENUM('USER', 'ADMIN', 'SYSTEM')
```

#### Platform Integrations Table
```
id: UUID (PK)
platform_name: VARCHAR
adapter_class: VARCHAR
enabled: BOOLEAN
last_checked: TIMESTAMP
status: VARCHAR
```

#### Download Jobs Table
```
id: UUID (PK)
platform: VARCHAR
identifier: VARCHAR
status: ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')
created_at: TIMESTAMP
completed_at: TIMESTAMP
result_url: TEXT (temporary, not stored long-term)
error_message: TEXT
```

#### Audit Events Table
```
id: UUID (PK)
event_type: VARCHAR
timestamp: TIMESTAMP
platform: VARCHAR
status: VARCHAR
request_id: UUID
```

#### System Configuration Table
```
id: UUID (PK)
config_key: VARCHAR
config_value: TEXT
updated_at: TIMESTAMP
```

### Data Minimization

- Never store downloaded media permanently
- Never store URLs with sensitive tokens
- Avoid storing personal information
- Audit logs do not contain content data
- User data only collected if accounts are introduced later

---

## 9. Caching

### Strategy

- **Short-lived caching** where beneficial
- **Never cache private or authenticated content**
- **Cache-Control headers** on appropriate responses
- **Redis** for rate limiting and session data

### Cacheable Data

- Platform configuration metadata
- Platform status information
- Public domain validation results
- Rate limit counters

### Non-Cacheable Data

- User-specific content
- Download results
- Private media URLs
- Any content requiring authentication

---

## 10. Background Jobs

### Job Queue Architecture

For longer operations that exceed request timeout limits:

```
Request
    ↓
Job Queue (Redis/BullMQ)
    ↓
Worker Process
    ↓
Platform Adapter
    ↓
Media Processing
    ↓
Temporary Storage
    ↓
Download
```

### When Background Processing Applies

- Large file processing
- Complex media transformations
- Batch operations (future)
- Platform API calls with long latency

### Job Lifecycle

1. **Queued**: Job accepted and assigned ID
2. **Processing**: Worker picks up and executes
3. **Completed**: Result stored, notification sent
4. **Failed**: Error logged, retry attempted (configurable)
5. **Expired**: Job removed after TTL

---

## 11. Error Architecture

### Standardized Error Codes

```text
INVALID_URL          - URL format is invalid or malformed
UNSUPPORTED_PLATFORM - Platform not recognized or supported
PRIVATE_CONTENT      - Content is not publicly accessible
CONTENT_NOT_FOUND    - Requested content does not exist
PLATFORM_UNAVAILABLE - Platform service is temporarily down
RATE_LIMITED         - Too many requests from client
MEDIA_UNAVAILABLE    - Media type not available for this content
PROCESSING_FAILED    - Error during media processing
DOWNLOAD_FAILED      - Download could not be completed
FILE_TOO_LARGE       - Media exceeds size limits
TIMEOUT              - Request timed out
```

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_URL",
    "message": "The provided URL is not valid.",
    "details": "Please enter a valid public post URL.",
    "requestId": "req_abc123"
  }
}
```

### Error Handling Hierarchy

- **Client Errors (4xx)**: Validation failures, unsupported content
- **Server Errors (5xx)**: Internal failures, platform outages
- **Rate Limiting (429)**: Excessive requests
- **Platform Errors**: Mapped to appropriate client-facing messages

---

## 12. Observability

### Structured Logging

All logs follow structured format:
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "requestId": "req_abc123",
  "event": "download_started",
  "platform": "instagram",
  "duration_ms": 1500
}
```

### What Never Gets Logged

- Passwords
- API keys
- Access tokens
- Cookies
- Private media URLs containing sensitive tokens
- User personal information (unless required and authorized)

### Monitoring Components

- **Structured Logs**: Centralized log aggregation
- **Error Tracking**: Real-time error notifications
- **Request IDs**: Correlation IDs for tracing
- **Performance Metrics**: Response times, throughput
- **Health Checks**: Service availability monitoring
- **Worker Monitoring**: Background job status

### Health Check Endpoints

- `/api/v1/health` - Overall service health
- `/api/v1/health/platforms` - Per-platform health status
- `/api/v1/health/redis` - Cache/queue connectivity
- `/api/v1/health/db` - Database connectivity

---

## 13. Security Architecture Summary

### Defense in Depth Layers

1. **Frontend**: Input validation, XSS prevention, CSP
2. **API Layer**: Schema validation, rate limiting, authentication
3. **Platform Layer**: Domain allowlisting, SSRF protection
4. **Media Layer**: File validation, size limits, content scanning
5. **Storage Layer**: Ephemeral storage, access controls
6. **Network Layer**: TLS, firewall rules, network segmentation

### Secrets Management

- `.env` files for local development
- Secret management service for production
- Never committed to version control
- `.env.example` provided with placeholder values
- Environment variables injected at runtime

---

## 14. Deployment Architecture

### Containerized Deployment

```
┌─────────────────────────────┐
│         Load Balancer       │
├─────────────────────────────┤
│   Next.js Frontend Pods     │
├─────────────────────────────┤
│   API Route Handler Pods    │
├─────────────────────────────┤
│   Background Workers        │
├─────────────────────────────┤
│   PostgreSQL (Primary)      │
│   PostgreSQL (Replica)      │
├─────────────────────────────┤
│   Redis Cluster             │
├─────────────────────────────┤
│   Object Storage (S3)       │
└─────────────────────────────┘
```

### Environment Configuration

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `NEXT_PUBLIC_API_URL` - Public API URL
- `STORAGE_BUCKET` - Object storage configuration
- `RATE_LIMIT_WINDOW` - Rate limiting window
- `MAX_FILE_SIZE` - Maximum file size limit

---

## 15. Scalability Considerations

### Horizontal Scaling

- Stateless API routes allow horizontal pod scaling
- Redis for shared state (rate limits, job queues)
- Database read replicas for query offloading
- CDN for static assets

### Performance Optimization

- Lazy loading for animation assets (Spline, Rive, Lottie)
- Edge caching for static pages
- Database query optimization with indexing
- Connection pooling for database and Redis
- Request compression (gzip/brotli)