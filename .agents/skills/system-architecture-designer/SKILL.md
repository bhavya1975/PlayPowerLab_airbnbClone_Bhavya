---
name: system-architecture-designer
description: Focus on designing high-availability, production-scale architecture specs for rental marketplaces (CDN, search indexing, dynamic caching, microservices).
---

# System Architecture Designer Skill Guide

This skill provides architectural patterns, high-availability specs, and scalable infrastructure designs tailored for high-concurrency marketplace platforms (e.g., rental/booking platforms like Airbnb).

## High-Availability Architecture Overview

```
[ User Clients (Web / Mobile) ]
              │
              ▼
    [ Edge CDN / Cloudflare ]
  (Static Assets, Media, Edge Cache)
              │
              ▼
   [ Global API Gateway ]
  (Rate Limiting, Auth, Routing)
              │
    ┌─────────┴─────────┬──────────────────┐
    ▼                   ▼                  ▼
[ Listing Service ] [ Search Service ] [ Booking Service ]
 (PostgreSQL/Read) (OpenSearch/Geo)  (PostgreSQL/Write Lock)
    │                   │                  │
    └─────────┬─────────┴──────────────────┘
              ▼
       [ Redis Caching ]
```

---

## Architecture Components & Specifications

### 1. Edge CDN & Media Delivery Optimization
- **Static Assets & Media Optimization**:
  - Image/Video assets served via Cloudflare / CloudFront CDN.
  - On-the-fly image transformations: WebP/AVIF generation, responsive dynamic resizing based on viewport (`srcset`).
  - Cache Control headers: `public, max-age=31536000, immutable` for versioned static media.

### 2. Search Indexing & Spatial Engine
- **Search Backend**: OpenSearch / Elasticsearch cluster dedicated to geospatial search queries.
- **Geo-Spatial Querying**:
  - `geo_bounding_box` and `geo_distance` indexing for map-view bounding box queries.
  - Sub-second search responses across millions of listings using inverted indices and memory-mapped field data.
- **Data Synchronization**:
  - Asynchronous event bus (Kafka / AWS EventBridge) syncs listing mutations from primary database to the search cluster in real-time.

### 3. Dynamic Caching Strategy
- **Multi-Level Caching**:
  - **L1 In-Memory Cache**: Application-level LRU caching for hot metadata.
  - **L2 Distributed Cache**: Redis Cluster for cached search results, user sessions, and availability calendars.
- **Cache Invalidation & Freshness**:
  - **Stale-While-Revalidate (SWR)** strategy for fast listing detail reads.
  - Targeted cache purging triggered by webhook on price or availability changes.

### 4. Microservices & Decoupled Architecture
- **Service Breakdown**:
  - **Listing Service**: Manages property details, amenities, host profiles, and media metadata.
  - **Search & Recommendation Service**: Serves real-time queries, filters, and personalized recommendations.
  - **Booking & Reservation Engine**: Handles calendar locks, double-booking prevention, and state machines.
  - **Payment Gateway Integration**: Processes split payments, payouts, and hold authorizations via Stripe.
  - **Reviews & Rating Service**: Async aggregation of ratings and reviews.
- **Concurrency & Idempotency**:
  - Redis distributed locks (`Redlock`) or strict PostgreSQL row locks (`SELECT ... FOR UPDATE`) during booking creation to guarantee zero double-bookings.
  - Idempotency keys (`X-Idempotency-Key`) required on all payment and booking write API endpoints.
