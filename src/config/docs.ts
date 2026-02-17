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
                {
                    title: "Introduction",
                    href: "/docs/getting-started/introduction",
                },
                {
                    title: "Quickstart",
                    href: "/docs/getting-started/quickstart",
                },
                {
                    title: "Installation",
                    href: "/docs/getting-started/installation",
                },
                {
                    title: "Core Concepts",
                    href: "/docs/getting-started/core-concepts",
                },
            ],
        },
        {
            title: "API Reference",
            items: [
                {
                    title: "Overview",
                    href: "/docs/api-reference/overview",
                },
                {
                    title: "Authentication",
                    href: "/docs/api-reference/authentication",
                },
            ],
        },
        {
            title: "Pipelines",
            items: [
                {
                    title: "Basics",
                    href: "/docs/pipelines/basics",
                },
                {
                    title: "Stage Reference",
                    href: "/docs/pipelines/stage-reference",
                },
            ],
        },
    ],
};
