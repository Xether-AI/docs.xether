'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn-card';
import { apiConfigs, defaultAPIVersion } from '@/config/api';
import { GitBranch } from 'lucide-react';

interface APIVersion {
  version: string;
  baseUrl: string;
  isDefault: boolean;
}

export function APIVersionSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentVersion, setCurrentVersion] = useState(() => {
    const version = searchParams.get('version');
    return (version && apiConfigs[version]) ? version : defaultAPIVersion;
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const version = searchParams.get('version');
    const newVersion = (version && apiConfigs[version]) ? version : defaultAPIVersion;
    if (newVersion !== currentVersion) {
      setCurrentVersion(newVersion);
    }
  }, [searchParams, currentVersion]);

  const handleVersionChange = (version: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (version === defaultAPIVersion) {
      params.delete('version');
    } else {
      params.set('version', version);
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
    setIsOpen(false);
  };

  const versions: APIVersion[] = Object.entries(apiConfigs).map(([version, config]) => ({
    version,
    baseUrl: config.baseUrl,
    isDefault: version === defaultAPIVersion
  }));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
      >
        <GitBranch className="h-4 w-4" />
        <span>API {currentVersion}</span>
        {currentVersion !== defaultAPIVersion && (
          <Badge variant="secondary" className="text-xs">
            {currentVersion}
          </Badge>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-background border rounded-lg shadow-lg z-50">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Select API Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {versions.map((version) => (
                <button
                  key={version.version}
                  onClick={() => handleVersionChange(version.version)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    currentVersion === version.version
                      ? 'bg-primary/10 border-primary/30'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">API {version.version}</span>
                      {version.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                      {currentVersion === version.version && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {version.baseUrl}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
