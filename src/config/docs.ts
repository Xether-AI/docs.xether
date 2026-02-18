export interface NavItem {
    title: string;
    href?: string;
    items?: NavItem[];
}

export const docsConfig = {
    sidebarNav: [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/docs/getting-started/introduction" },
                { title: "Quickstart", href: "/docs/getting-started/quickstart" },
                { title: "Installation", href: "/docs/getting-started/installation" },
                { title: "Core Concepts", href: "/docs/getting-started/core-concepts" },
            ],
        },
        {
            title: "API Reference",
            items: [
                { title: "Overview", href: "/docs/api-reference/overview" },
                { title: "Authentication", href: "/docs/api-reference/authentication" },
                { title: "Datasets", href: "/docs/api-reference/datasets" },
                { title: "Pipelines", href: "/docs/api-reference/pipelines" },
                { title: "Executions", href: "/docs/api-reference/executions" },
            ],
        },
        {
            title: "Pipelines",
            items: [
                { title: "Basics", href: "/docs/pipelines/basics" },
                { title: "Stage Reference", href: "/docs/pipelines/stage-reference" },
                { title: "Examples", href: "/docs/pipelines/examples" },
            ],
        },
        {
            title: "Datasets",
            items: [
                { title: "Versioning", href: "/docs/datasets/versioning" },
                { title: "Metadata", href: "/docs/datasets/metadata" },
                { title: "Lineage", href: "/docs/datasets/lineage" },
            ],
        },
        {
            title: "Integrations",
            items: [
                { title: "Amazon S3", href: "/docs/integrations/s3" },
                { title: "Snowflake", href: "/docs/integrations/snowflake" },
                { title: "PostgreSQL", href: "/docs/integrations/postgresql" },
                { title: "Custom Connectors", href: "/docs/integrations/custom-connectors" },
            ],
        },
        {
            title: "ML Services",
            items: [
                { title: "Outlier Detection", href: "/docs/ml-services/outlier-detection" },
                { title: "Synthetic Data", href: "/docs/ml-services/synthetic-generation" },
                { title: "Model Versioning", href: "/docs/ml-services/model-versioning" },
            ],
        },
        {
            title: "Architecture",
            items: [
                { title: "System Overview", href: "/docs/architecture/system-overview" },
                { title: "Microservices", href: "/docs/architecture/microservices" },
                { title: "Communication", href: "/docs/architecture/communication" },
            ],
        },
        {
            title: "SDKs",
            items: [
                { title: "Python SDK", href: "/docs/sdk/python" },
                { title: "JavaScript SDK", href: "/docs/sdk/javascript" },
                { title: "Go SDK", href: "/docs/sdk/go" },
            ],
        },
    ],
};
