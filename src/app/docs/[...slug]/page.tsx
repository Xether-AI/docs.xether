import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import { generateDocMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  
  // Map paths to titles and descriptions
  const metadataMap: Record<string, { title: string; description: string }> = {
    "getting-started/introduction": {
      title: "Introduction to Xether AI",
      description: "Learn what Xether AI is and how it helps you build AI-ready data pipelines with versioning, lineage tracking, and ML services.",
    },
    "getting-started/quickstart": {
      title: "Quickstart Guide",
      description: "Get your first Xether AI pipeline running in under 5 minutes with our step-by-step quickstart guide.",
    },
    "getting-started/installation": {
      title: "Installation",
      description: "Complete installation guide for Xether AI platform, SDKs, and CLI tools.",
    },
    "getting-started/core-concepts": {
      title: "Core Concepts",
      description: "Understand the fundamental concepts of Xether AI: datasets, pipelines, versions, and lineage.",
    },
    "api-reference/overview": {
      title: "API Reference Overview",
      description: "Complete REST API documentation for Xether AI platform with authentication, endpoints, and examples.",
    },
    "api-reference/authentication": {
      title: "API Authentication",
      description: "Learn how to authenticate with Xether AI API using API keys and OAuth 2.0.",
    },
    "api-reference/datasets": {
      title: "Datasets API",
      description: "Manage datasets, versions, and metadata through the Xether AI REST API.",
    },
    "api-reference/pipelines": {
      title: "Pipelines API",
      description: "Create, manage, and execute data pipelines using the Xether AI REST API.",
    },
    "api-reference/executions": {
      title: "Executions API",
      description: "Monitor and manage pipeline executions with the Xether AI REST API.",
    },
  };

  const metadata = metadataMap[path] || {
    title: path.split("/").pop()?.replace(/-/g, " ") || "Documentation",
    description: "Xether AI documentation",
  };

  return generateDocMetadata(metadata.title, metadata.description, `/docs/${path}`);
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  try {
    // Dynamic import of the MDX file
    const { default: Content } = await import(`@/content/${path}.mdx`);

    return (
      <article className="prose-doc max-w-none">
        <Content />
      </article>
    );
  } catch (error) {
    console.error(`Failed to load MDX content for ${path}:`, error);
    notFound();
  }
}

export async function generateStaticParams() {
  // Return common documentation paths for static generation
  return [
    { slug: ["getting-started", "introduction"] },
    { slug: ["getting-started", "quickstart"] },
    { slug: ["getting-started", "installation"] },
    { slug: ["getting-started", "core-concepts"] },
    { slug: ["api-reference", "overview"] },
    { slug: ["api-reference", "authentication"] },
    { slug: ["api-reference", "datasets"] },
    { slug: ["api-reference", "pipelines"] },
    { slug: ["api-reference", "executions"] },
    { slug: ["pipelines", "basics"] },
    { slug: ["pipelines", "stage-reference"] },
    { slug: ["pipelines", "examples"] },
    { slug: ["datasets", "versioning"] },
    { slug: ["datasets", "metadata"] },
    { slug: ["datasets", "lineage"] },
    { slug: ["sdk", "python"] },
    { slug: ["sdk", "javascript"] },
    { slug: ["sdk", "go"] },
  ];
}
