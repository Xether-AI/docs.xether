"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SDKVersion {
  name: string;
  language: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  documentationUrl: string;
  changelogUrl: string;
  isLatest: boolean;
  isDeprecated?: boolean;
  deprecationDate?: string;
}

interface SDKVersionsResponse {
  sdks: SDKVersion[];
  latest: {
    python: string;
    javascript: string;
    go: string;
    java: string;
  };
}

export function SDKVersions() {
  const [sdkData, setSdkData] = useState<SDKVersionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  useEffect(() => {
    const fetchSDKVersions = async () => {
      try {
        // In a real implementation, this would fetch from your API
        // For now, we'll use mock data that demonstrates the functionality
        const mockData: SDKVersionsResponse = {
          sdks: [
            {
              name: "Python SDK",
              language: "python",
              version: "2.4.1",
              releaseDate: "2024-02-20",
              downloadUrl: "https://pypi.org/project/xether-ai/",
              documentationUrl: "/docs/sdk/python",
              changelogUrl: "https://github.com/xether-ai/python-sdk/releases",
              isLatest: true
            },
            {
              name: "Python SDK",
              language: "python",
              version: "2.4.0",
              releaseDate: "2024-02-10",
              downloadUrl: "https://pypi.org/project/xether-ai/2.4.0",
              documentationUrl: "/docs/sdk/python/v2.4.0",
              changelogUrl: "https://github.com/xether-ai/python-sdk/releases/tag/v2.4.0",
              isLatest: false
            },
            {
              name: "JavaScript/TypeScript SDK",
              language: "javascript",
              version: "1.8.3",
              releaseDate: "2024-02-18",
              downloadUrl: "https://www.npmjs.com/package/@xether/sdk",
              documentationUrl: "/docs/sdk/javascript",
              changelogUrl: "https://github.com/xether-ai/js-sdk/releases",
              isLatest: true
            },
            {
              name: "JavaScript/TypeScript SDK",
              language: "javascript",
              version: "1.8.2",
              releaseDate: "2024-02-05",
              downloadUrl: "https://www.npmjs.com/package/@xether/sdk/v1.8.2",
              documentationUrl: "/docs/sdk/javascript/v1.8.2",
              changelogUrl: "https://github.com/xether-ai/js-sdk/releases/tag/v1.8.2",
              isLatest: false
            },
            {
              name: "Go SDK",
              language: "go",
              version: "1.2.0",
              releaseDate: "2024-02-15",
              downloadUrl: "https://github.com/xether-ai/go-sdk/releases",
              documentationUrl: "/docs/sdk/go",
              changelogUrl: "https://github.com/xether-ai/go-sdk/releases",
              isLatest: true
            },
            {
              name: "Java SDK",
              language: "java",
              version: "1.0.5",
              releaseDate: "2024-02-12",
              downloadUrl: "https://mvnrepository.com/artifact/ai.xether/sdk",
              documentationUrl: "/docs/sdk/java",
              changelogUrl: "https://github.com/xether-ai/java-sdk/releases",
              isLatest: true
            }
          ],
          latest: {
            python: "2.4.1",
            javascript: "1.8.3",
            go: "1.2.0",
            java: "1.0.5"
          }
        };

        // Simulate API delay
        setTimeout(() => {
          setSdkData(mockData);
          setLoading(false);
        }, 800);
      } catch {
        setError("Failed to fetch SDK versions");
        setLoading(false);
      }
    };

    fetchSDKVersions();
  }, []);

  const filteredSDKs = sdkData?.sdks.filter(sdk => 
    selectedLanguage === "all" || sdk.language === selectedLanguage
  ) || [];

  const getInstallCommand = (sdk: SDKVersion) => {
    switch (sdk.language) {
      case "python":
        return `pip install xether-ai==${sdk.version}`;
      case "javascript":
        return `npm install @xether/sdk@${sdk.version}`;
      case "go":
        return `go get github.com/xether-ai/go-sdk@v${sdk.version}`;
      case "java":
        return `<dependency>\n  <groupId>ai.xether</groupId>\n  <artifactId>sdk</artifactId>\n  <version>${sdk.version}</version>\n</dependency>`;
      default:
        return "";
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case "python":
        return "🐍";
      case "javascript":
        return "🟨";
      case "go":
        return "🐹";
      case "java":
        return "☕";
      default:
        return "📦";
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-muted/20">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">Loading SDK versions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
        <div className="flex items-center space-x-2">
          <span className="text-red-600">❌</span>
          <span className="text-sm text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SDK Versions</h2>
        <p className="text-muted-foreground">
          Latest versions of Xether AI SDKs for all supported languages
        </p>
      </div>

      {/* Language Filter */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border p-1 bg-muted">
          {["all", "python", "javascript", "go", "java"].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedLanguage === lang
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {lang === "all" ? "All SDKs" : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Latest Versions Summary */}
      {selectedLanguage === "all" && sdkData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(sdkData.latest).map(([lang, version]) => (
            <div key={lang} className="p-4 border rounded-lg bg-background">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getLanguageIcon(lang)}</span>
                <h3 className="font-semibold capitalize">{lang}</h3>
              </div>
              <p className="text-2xl font-bold text-primary mb-1">{version}</p>
              <p className="text-sm text-muted-foreground">Latest</p>
            </div>
          ))}
        </div>
      )}

      {/* Detailed SDK List */}
      <div className="space-y-4">
        {filteredSDKs.map((sdk) => (
          <div key={`${sdk.language}-${sdk.version}`} className="border rounded-lg p-6 bg-background">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getLanguageIcon(sdk.language)}</span>
                <div>
                  <h3 className="text-lg font-semibold">{sdk.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">{sdk.version}</span>
                    {sdk.isLatest && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Released: {new Date(sdk.releaseDate).toLocaleDateString()}
              </div>
            </div>

            {/* Installation Command */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Installation</h4>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm">{getInstallCommand(sdk)}</code>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={sdk.documentationUrl}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                📚 Documentation
              </a>
              <a
                href={sdk.downloadUrl}
                className="inline-flex items-center px-3 py-1 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
              >
                📥 Download
              </a>
              <a
                href={sdk.changelogUrl}
                className="inline-flex items-center px-3 py-1 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
              >
                📋 Changelog
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Looking for older versions? Check our{" "}
          <a href="https://github.com/xether-ai" className="text-primary hover:underline">
            GitHub repositories
          </a>{" "}
          for complete version history.
        </p>
      </div>
    </div>
  );
}
