import { notFound } from "next/navigation";
import { APIClient, OpenAPISpec } from "@/lib/api-client";
import { APIReferenceGenerator, APIReferenceData } from "@/lib/api-reference-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Server } from "lucide-react";
import { APIVersionSelector } from "@/components/APIVersionSelector";

interface PageProps {
  searchParams: Promise<{
    version?: string;
  }>;
}

async function getAPIReferenceData(version?: string): Promise<APIReferenceData> {
  try {
    const apiClient = new APIClient(version);
    const spec: OpenAPISpec = await apiClient.fetchOpenAPISpec();
    return APIReferenceGenerator.generateReferenceData(spec);
  } catch (error) {
    console.error("Failed to fetch API spec:", error);
    notFound();
  }
}

export default async function APIReferencePage({ searchParams }: PageProps) {
  const { version } = await searchParams;
  const apiData = await getAPIReferenceData(version);
  const groupedEndpoints = APIReferenceGenerator.groupEndpointsByTag(apiData.endpoints);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-3xl font-bold">API Reference</h1>
          </div>
          <APIVersionSelector />
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {apiData.description || "Complete API documentation for Xether AI"}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Version: {apiData.version}</span>
            {apiData.servers && (
              <span>Base URL: {apiData.servers[0]?.url}</span>
            )}
          </div>
        </div>
      </div>

      {/* Server Information */}
      {apiData.servers && apiData.servers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Server Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {apiData.servers.map((server, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <code className="text-sm font-mono">{server.url}</code>
                    {server.description && (
                      <p className="text-sm text-muted-foreground mt-1">{server.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Endpoints by Tag */}
      <Tabs defaultValue={Object.keys(groupedEndpoints)[0]} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.keys(groupedEndpoints).map((tag) => (
            <TabsTrigger key={tag} value={tag} className="text-sm">
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
          <TabsContent key={tag} value={tag} className="space-y-4">
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono">{endpoint.path}</code>
                        </div>
                        {endpoint.summary && (
                          <CardTitle className="text-lg">{endpoint.summary}</CardTitle>
                        )}
                        {endpoint.description && (
                          <CardDescription>{endpoint.description}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Parameters */}
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Parameters</h4>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-center gap-2 text-sm">
                              <Badge variant="outline">{param.in}</Badge>
                              <code className="font-mono">{param.name}</code>
                              {param.required && <Badge variant="destructive">required</Badge>}
                              {param.type && <span className="text-muted-foreground">({param.type})</span>}
                              {param.description && (
                                <span className="text-muted-foreground">{param.description}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Request Body */}
                    {endpoint.requestBody && (
                      <div>
                        <h4 className="font-semibold mb-2">Request Body</h4>
                        <div className="space-y-2">
                          {endpoint.requestBody.required && (
                            <Badge variant="destructive">required</Badge>
                          )}
                          {endpoint.requestBody.description && (
                            <p className="text-sm text-muted-foreground">{endpoint.requestBody.description}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Responses */}
                    {endpoint.responses && (
                      <div>
                        <h4 className="font-semibold mb-2">Responses</h4>
                        <div className="space-y-2">
                          {Object.entries(endpoint.responses).map(([statusCode, response]) => (
                            <div key={statusCode} className="flex items-center gap-2 text-sm">
                              <Badge variant={statusCode.startsWith('2') ? 'secondary' : 'destructive'}>
                                {statusCode}
                              </Badge>
                              <span>{response.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
