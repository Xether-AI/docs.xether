import { NavItem } from "./docs";

export const docsConfigV090 = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs/v0.9.0/getting-started/introduction" },
        { title: "Quickstart", href: "/docs/v0.9.0/getting-started/quickstart" },
        { title: "Installation", href: "/docs/v0.9.0/getting-started/installation" },
        { title: "Core Concepts", href: "/docs/v0.9.0/getting-started/core-concepts" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { title: "Overview", href: "/docs/v0.9.0/api-reference/overview" },
        { title: "Authentication", href: "/docs/v0.9.0/api-reference/authentication" },
        { title: "Datasets", href: "/docs/v0.9.0/api-reference/datasets" },
        { title: "Pipelines", href: "/docs/v0.9.0/api-reference/pipelines" },
        { title: "Executions", href: "/docs/v0.9.0/api-reference/executions" },
      ],
    },
    {
      title: "Pipelines",
      items: [
        { title: "Basics", href: "/docs/v0.9.0/pipelines/basics" },
        { title: "Stage Reference", href: "/docs/v0.9.0/pipelines/stage-reference" },
        { title: "Examples", href: "/docs/v0.9.0/pipelines/examples" },
      ],
    },
    {
      title: "Datasets",
      items: [
        { title: "Versioning", href: "/docs/v0.9.0/datasets/versioning" },
        { title: "Metadata", href: "/docs/v0.9.0/datasets/metadata" },
        { title: "Lineage", href: "/docs/v0.9.0/datasets/lineage" },
      ],
    },
    {
      title: "Integrations",
      items: [
        { title: "Amazon S3", href: "/docs/v0.9.0/integrations/s3" },
        { title: "Snowflake", href: "/docs/v0.9.0/integrations/snowflake" },
        { title: "PostgreSQL", href: "/docs/v0.9.0/integrations/postgresql" },
      ],
    },
    {
      title: "ML Services",
      items: [
        { title: "Outlier Detection", href: "/docs/v0.9.0/ml-services/outlier-detection" },
        { title: "Synthetic Data", href: "/docs/v0.9.0/ml-services/synthetic-generation" },
      ],
    },
    {
      title: "Architecture",
      items: [
        { title: "System Overview", href: "/docs/v0.9.0/architecture/system-overview" },
        { title: "Microservices", href: "/docs/v0.9.0/architecture/microservices" },
      ],
    },
    {
      title: "SDKs",
      items: [
        { title: "Python SDK", href: "/docs/v0.9.0/sdk/python" },
        { title: "JavaScript SDK", href: "/docs/v0.9.0/sdk/javascript" },
      ],
    },
  ],
};
