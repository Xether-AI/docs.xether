import { Metadata } from "next";

export interface DocMetadata {
  title: string;
  description: string;
  category?: string;
  keywords?: string[];
  lastUpdated?: string;
}

export function generateDocMetadata(
  title: string,
  description: string,
  path?: string
): Metadata {
  const fullTitle = `${title} | Xether AI Docs`;
  const url = path ? `https://docs.xether.ai${path}` : "https://docs.xether.ai";

  return {
    title: fullTitle,
    description,
    keywords: [
      "Xether AI",
      "data pipelines",
      "AI datasets",
      "machine learning",
      "data engineering",
      "API documentation",
      title,
    ],
    authors: [{ name: "Xether AI" }],
    creator: "Xether AI",
    publisher: "Xether AI",
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Xether AI Documentation",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@xetherai",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://docs.xether.ai"),
  title: {
    default: "Xether AI - Developer Documentation",
    template: "%s | Xether AI Docs",
  },
  description:
    "Comprehensive developer documentation for Xether AI platform. Build powerful data pipelines and manage AI-ready datasets with our REST API, SDKs, and integrations.",
  keywords: [
    "Xether AI",
    "data pipelines",
    "AI datasets",
    "machine learning",
    "data engineering",
    "REST API",
    "Python SDK",
    "JavaScript SDK",
    "Go SDK",
    "data versioning",
    "synthetic data",
    "outlier detection",
  ],
  authors: [{ name: "Xether AI" }],
  creator: "Xether AI",
  publisher: "Xether AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.xether.ai",
    siteName: "Xether AI Documentation",
    title: "Xether AI - Developer Documentation",
    description:
      "Comprehensive developer documentation for Xether AI platform. Build powerful data pipelines and manage AI-ready datasets.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xether AI - Developer Documentation",
    description:
      "Comprehensive developer documentation for Xether AI platform.",
    creator: "@xetherai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
