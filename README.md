# Xether AI - Developer Documentation

## Overview

The developer documentation site for Xether AI, providing comprehensive guides, API references, tutorials, and technical specifications for the platform.

## Purpose

This site serves as the **technical knowledge base** for developers, data engineers, and ML engineers working with Xether AI. It includes:

- **Getting Started Guides**: Onboarding for new users
- **API Reference**: Complete REST and gRPC API documentation
- **Pipeline Configuration**: How to define and execute data pipelines
- **Integration Guides**: Connecting to S3, Snowflake, PostgreSQL, and other data sources
- **Best Practices**: Patterns for dataset versioning, pipeline design, and synthetic data generation
- **Architecture Documentation**: System design, communication protocols, and infrastructure
- **SDK Documentation**: Client libraries for Python, JavaScript, Go, and Java
- **Troubleshooting**: Common issues and solutions

## Content Structure (Planned)

```
/docs
├── /getting-started
│   ├── quickstart
│   ├── installation
│   └── core-concepts
├── /api-reference
│   ├── rest-api
│   ├── grpc-api
│   └── authentication
├── /pipelines
│   ├── pipeline-basics
│   ├── stage-reference
│   └── custom-stages
├── /datasets
│   ├── versioning
│   ├── metadata
│   └── lineage
├── /integrations
│   ├── s3
│   ├── snowflake
│   ├── postgresql
│   └── custom-connectors
├── /ml-services
│   ├── outlier-detection
│   ├── synthetic-generation
│   └── model-versioning
├── /architecture
│   ├── system-overview
│   ├── microservices
│   └── communication
└── /sdk
    ├── python
    ├── javascript
    ├── go
    └── java
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX for documentation pages
- **Search**: Algolia or custom search (planned)
- **Code Highlighting**: Shiki or Prism
- **Data Fetching**: TanStack Query
- **API Communication**: REST (to main backend for dynamic content)

## Frontend Architecture

### Content Strategy

- **Static pages**: MDX files compiled at build time
- **Dynamic content**: API references fetched from backend OpenAPI spec
- **Versioning**: Documentation versions match platform releases
- **Search**: Full-text search across all documentation

### Communication

- **Backend API**: REST for dynamic API documentation
- **No direct storage access**: All examples and references via backend
- **Public access**: Most docs are public, some require authentication

## Design Principles

- **Clarity over cleverness**: Simple, direct explanations
- **Code examples first**: Show, then explain
- **Searchable**: Fast, accurate search functionality
- **Versioned**: Documentation matches platform versions
- **Similar tone to**: Stripe, Supabase, or HashiCorp documentation

## Getting Started

### Prerequisites

- Node.js 20+ or later
- npm, yarn, pnpm, or bun

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Deployment

Optimized for deployment on [Vercel](https://vercel.com).

## Related Components

- **[Backend](../backend)**: API endpoints documented here
- **[Main Pipeline](../main%20pipeline)**: Pipeline configuration reference
- **[Website](../website)**: Marketing site linking to these docs

## Status

🚧 **In Development** - Content structure and initial documentation in progress.
