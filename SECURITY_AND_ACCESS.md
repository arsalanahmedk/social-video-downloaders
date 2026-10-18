# Security and Access Document: SocialVault Downloader

## 1. Security Principles

The application follows industry-standard security principles to protect users, data, and infrastructure.

### Least Privilege
- Each component operates with minimum required permissions
- API routes have scoped access to only necessary resources
- Workers access only the data they need for their task
- Frontend has no direct access to backend secrets

### Defense in Depth
- Multiple layers of security controls at every tier
- Frontend validation, API validation, and server-side validation
- Network-level firewalls and application-level protections
- Input validation at entry points and processing stages

### Secure Defaults
- All endpoints require validation by default
- CORS configured to restrict origins
- Security headers enabled automatically
- Rate limiting active on all API routes
- Default theme is dark (no auto-elevation of permissions)

### Zero Trust Between Components
- No implicit trust between frontend and backend
- Every request validated independently
- Service-to-service communication authenticated
- Internal network traffic monitored and restricted

### Data Minimization
- Collect only data necessary for the download function
- No persistent storage of downloaded media
- No logging of sensitive information
- Analytics track only essential product events
- User data not collected unless accounts are introduced later

---

## 2. Authentication

### Current State: No Authentication Required

The initial downloader experience does not require an account:
- Users can download content without login
- No credential storage or management
- Session-less operation
- Anonymous usage supported

### Future Authentication (If Introduced)

Should accounts be added in the future:
- Secure authentication using industry standards (OAuth 2.0, PKCE)
- Multi-factor authentication support
- Secure token storage with HttpOnly cookies
- Token expiration and refresh mechanisms
- No password storage in plaintext

### Authentication Boundaries

- Authentication never bypassed for any feature
- Client-side manipulation never grants elevated access
- All authorization decisions made server-side
- Role-based access control enforced at API layer

---

## 3. Authorization

### Role Architecture

```
USER - Access to downloader functionality only
ADMIN - Full platform management access
SYSTEM - Internal service accounts for workers
```

### Authorization Enforcement

- Users cannot gain administrative functionality through client-side manipulation
- All authorization decisions verified server-side
- Role checks on every API request
- Token validation on every protected route

---

## 4. API Security

### Rate Limiting
- Global limit: 100 requests per minute per IP
- Resolve endpoint: 30 requests per minute per IP
- Download endpoint: 20 requests per minute per IP
- Rate limiting implemented via Redis with sliding window algorithm

### Request Validation
- Schema validation using Zod or equivalent
- URL validation: protocol, domain, format verification
- Size limits on request bodies
- Type checking for all fields
- Injection prevention (SQL, NoSQL, command injection)

### Security Headers
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### CORS Restrictions
- Strict origin whitelist
- No wildcard origins in production
- Credentials only allowed for authenticated origins

### Abuse Prevention
- Request size limits enforced
- Rate limiting with progressive penalties
- IP-based reputation tracking
- Automated abuse detection patterns

---

## 5. SSRF Protection

### Blocked Addresses and Ranges
- localhost, 127.0.0.1, 0.0.0.0, ::1
- Private IPv4 ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- Private IPv6 ranges: fc00::/7, fe80::/10
- Link-local addresses: 169.254.0.0/16
- Cloud metadata endpoints: 169.254.169.254
- Internal hostnames: *.local, *.internal

### Domain Allowlisting
Only approved platform domains permitted:
```
instagram.com, tiktok.com, youtube.com, facebook.com,
x.com, twitter.com, pinterest.com, reddit.com,
linkedin.com, snapchat.com, threads.net
```

### Protocol Restrictions
- Only https:// and http:// protocols permitted
- file://, ftp://, gopher:// blocked
- Protocol-relative URLs treated as invalid
- No URL shortener redirects allowed

### Redirect Validation
- Maximum redirect depth: 3 hops
- All redirect targets validated against allowlist
- Redirect to non-allowlisted domain aborts request
- POST-to-GET redirects prevented

### DNS Rebinding Protection
- DNS resolution performed before connection
- IP address verified against domain on each request
- Connection-level validation at socket layer

### Response Limits
- Maximum response body: 50MB
- Connection timeout: 10 seconds
- Total request timeout: 30 seconds

---

## 6. File Security

### Validation
- MIME type allowlist per platform
- Extension validation matching MIME type
- File signature (magic bytes) verification
- File size limits (Images: 50MB, Videos: 500MB, GIFs: 100MB)
- Filename sanitization (path traversal removal)

### Execution Prevention
- Downloaded media never executed
- Files never run from temporary directories
- Content-Disposition headers set to attachment
- Executable permissions removed

### Storage Security
- Temporary files stored outside executable directories
- Files stored with restrictive permissions
- Separate storage buckets per environment

### Cleanup
- Temporary files automatically deleted after 1 hour
- Failed downloads trigger immediate cleanup
- Storage quotas enforced

---

## 7. Secrets Management

### Never Place Secrets in Frontend Code
- API keys, database connection strings, OAuth secrets must remain server-side
- Frontend code must never contain any token or key material

### Environment Variables
- .env files for local development (gitignored)
- Secret management service for production
- Environment variables injected at deployment time
- Secrets never logged or displayed in error messages
- Secrets rotated on a regular schedule

### .env.example Template
```
DATABASE_URL=postgresql://username:password@localhost:5432/socialvault
REDIS_URL=redis://localhost:6379
STORAGE_ACCESS_KEY=your-access-key
STORAGE_SECRET_KEY=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000
RATE_LIMIT_WINDOW=60
MAX_FILE_SIZE=524288000
```

### Never Committed to Version Control
- .env, .env.production, .env.staging
- api_keys.json, credentials/, secrets/

---

## 8. Abuse Prevention

### Protection Mechanisms
- Rate limiting on all endpoints
- Per-IP rate limits enforced
- Progressive response delays for violators
- Temporary IP bans for severe violations
- Bot detection through request pattern analysis
- File size limits enforced before processing
- Same-URL download frequency monitoring
- Suspicious activity alerts

### Resource Exhaustion Prevention
- Maximum concurrent connections per IP
- Memory usage limits per request
- CPU time limits for media processing
- Queue depth limits for background jobs

---

## 9. Access Control

| Resource | USER | ADMIN | SYSTEM |
|----------|------|-------|--------|
| Downloader | Yes | Yes | Yes |
| Platform Config | No | Yes | Yes |
| Analytics | No | Yes | Yes |
| Database Direct | No | No | Yes |
| Object Storage | No | No | Yes |

### Database Access
- Application service account only
- No direct human database access
- Read replicas for analytics/monitoring
- Backup encryption required

### Monitoring Access
- Read-only access for monitoring tools
- Admin access requires separate authentication
- No access to personal data in logs

---

## 10. Privacy

### Data Minimization
- No personal identification information collected
- No persistent storage of URLs or content
- No tracking of individual user behavior
- IP addresses retained briefly for rate limiting only

### Log Policies
- Structured logs exclude personal information
- Request logs exclude full URLs and content
- Error logs exclude sensitive data
- Log retention period: 30 days maximum

### Analytics
- Only essential product events tracked
- No personal data in analytics events
- No cookie-based tracking by default
- Anonymized session identifiers

### Privacy Policy Location
- Accessible at /privacy route
- Linked in footer of all pages
- Compliant with applicable data protection regulations

---

## 11. Content and Copyright

### User Responsibility
The application clearly communicates that users are responsible for having permission to download/use content and complying with copyright laws.

### Platform Compliance
The application does NOT:
- Design functionality to bypass platform restrictions
- Provide tools for circumventing technical protection measures
- Enable downloading of content without permission
- Support any method to circumvent DRM
- Facilitate access to private or protected content

### Unavailable Content Messaging
- "This content isn't publicly accessible."
- "The platform does not permit automated access to this content."
- Clear, respectful messaging about limitations

---

## 12. Security Audit and Compliance

### Regular Security Reviews
- Quarterly security audits
- Dependency vulnerability scanning
- Penetration testing before major releases
- SSRF protection validation

### Compliance Considerations
- GDPR compliance (if applicable)
- CCPA compliance
- Terms of service compliance for each platform
- Copyright law compliance

### Incident Response
- Security incident detection and response plan
- Forensic log preservation procedures
- Post-incident review and remediation

---

This document is a living security specification that must be updated as the application evolves. Security considerations are integral to every development decision.
