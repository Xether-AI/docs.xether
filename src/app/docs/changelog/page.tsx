import { notFound } from "next/navigation";
import { APIClient, ChangelogEntry } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn-card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, GitBranch, Plus, Trash2, AlertTriangle, Wrench, Shield } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    version?: string;
  }>;
}

async function getChangelogData(version?: string): Promise<ChangelogEntry[]> {
  try {
    const apiClient = new APIClient(version);
    return await apiClient.fetchChangelog();
  } catch (error) {
    console.error("Failed to fetch changelog:", error);
    notFound();
  }
}

const changeTypeConfig = {
  added: {
    icon: Plus,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Added"
  },
  changed: {
    icon: GitBranch,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "Changed"
  },
  deprecated: {
    icon: AlertTriangle,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    label: "Deprecated"
  },
  removed: {
    icon: Trash2,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Removed"
  },
  fixed: {
    icon: Wrench,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    label: "Fixed"
  },
  security: {
    icon: Shield,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    label: "Security"
  }
};

export default async function ChangelogPage({ searchParams }: PageProps) {
  const { version } = await searchParams;
  const changelog = await getChangelogData(version);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Changelog</h1>
        </div>
        
        <p className="text-muted-foreground">
          Track the latest updates, improvements, and fixes to the Xether AI API.
        </p>
        
        {version && (
          <div className="flex items-center gap-2">
            <Badge variant="outline">Version {version}</Badge>
          </div>
        )}
      </div>

      {/* Changelog Entries */}
      <div className="space-y-8">
        {changelog.map((entry, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl">{entry.version}</CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(entry.date).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entry.changes.map((change, changeIndex) => {
                  const config = changeTypeConfig[change.type];
                  const Icon = config.icon;
                  
                  return (
                    <div key={changeIndex} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0">
                        <Badge className={config.color}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{change.description}</p>
                        {(change.pr || change.issue) && (
                          <div className="flex gap-2 mt-2">
                            {change.pr && (
                              <a
                                href={`https://github.com/Xether-AI/backend/pull/${change.pr}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground"
                              >
                                PR #{change.pr}
                              </a>
                            )}
                            {change.issue && (
                              <a
                                href={`https://github.com/Xether-AI/backend/issues/${change.issue}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground"
                              >
                                Issue #{change.issue}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {changelog.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No changelog entries</h3>
            <p className="text-muted-foreground text-center">
              No changelog entries are available for this version yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
