import React from "react";

interface StructuredDataProps {
  type: "WebSite" | "WebPage" | "TechArticle" | "Organization";
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: "Xether AI Documentation",
        url: "https://docs.xether.ai",
        description:
          "Comprehensive developer documentation for Xether AI platform",
        publisher: {
          "@type": "Organization",
          name: "Xether AI",
          url: "https://xether.ai",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://docs.xether.ai/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function DocPageStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return (
    <StructuredData
      type="TechArticle"
      data={{
        headline: title,
        description,
        url,
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: "Xether AI",
        },
        publisher: {
          "@type": "Organization",
          name: "Xether AI",
          url: "https://xether.ai",
        },
      }}
    />
  );
}
