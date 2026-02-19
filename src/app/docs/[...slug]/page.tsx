import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  try {
    // Dynamic import of the MDX file
    const { default: Content } = await import(`@/content/${path}.mdx`);

    return (
      <div className="prose-doc max-w-none">
        <Content />
      </div>
    );
  } catch (error) {
    console.error(`Failed to load MDX content for ${path}:`, error);
    notFound();
  }
}

export async function generateStaticParams() {
  // In a real scenario, we would crawl the src/content directory
  // For now, let's return a few common paths or an empty array
  return [];
}
