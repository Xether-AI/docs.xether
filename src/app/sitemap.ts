import { MetadataRoute } from "next";
import { docsConfig } from "@/config/docs";
import { versions } from "@/config/versions";

function extractUrls(items: any[]): string[] {
  const urls: string[] = [];
  
  for (const item of items) {
    if (item.href && !item.href.startsWith("http")) {
      urls.push(item.href);
    }
    if (item.items) {
      urls.push(...extractUrls(item.items));
    }
  }
  
  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://docs.xether.ai";
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  // Extract all documentation URLs from the config
  const docUrls = extractUrls(docsConfig.sidebarNav);

  // Generate sitemap entries for all doc pages
  const docPages = docUrls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Add version-specific pages
  const versionPages = versions
    .filter((v) => !v.current)
    .flatMap((version) => {
      return docUrls.map((url) => {
        const versionedUrl = url.replace("/docs", version.path);
        return {
          url: `${baseUrl}${versionedUrl}`,
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        };
      });
    });

  return [...staticPages, ...docPages, ...versionPages];
}
