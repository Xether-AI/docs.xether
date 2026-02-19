"use client";

import { useState } from "react";
import { Play, Copy, Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface APIRequest {
  method: string;
  endpoint: string;
  headers: Record<string, string>;
  body?: string;
}

interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

interface APIPlaygroundProps {
  className?: string;
}

const exampleRequests = [
  {
    name: "List Datasets",
    method: "GET",
    endpoint: "/v1/datasets",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-api-key"
    }
  },
  {
    name: "Create Dataset",
    method: "POST",
    endpoint: "/v1/datasets",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-api-key"
    },
    body: JSON.stringify({
      name: "my-dataset",
      description: "A sample dataset",
      schema: {
        type: "struct",
        fields: [
          { name: "id", type: "string", nullable: false },
          { name: "name", type: "string", nullable: false }
        ]
      }
    }, null, 2)
  },
  {
    name: "Run Pipeline",
    method: "POST",
    endpoint: "/v1/pipelines/pipe_123/run",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-api-key"
    },
    body: JSON.stringify({
      parameters: {
        date_range: {
          start: "2024-01-01",
          end: "2024-01-31"
        }
      }
    }, null, 2)
  }
];

export function APIPlayground({ className }: APIPlaygroundProps) {
  const [request, setRequest] = useState<APIRequest>(exampleRequests[0]);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [environment, setEnvironment] = useState<"dev" | "prod">("dev");

  const environments = {
    dev: "https://api-dev.xether.ai",
    prod: "https://api.xether.ai"
  };

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const startTime = Date.now();
      const url = `${environments[environment]}${request.endpoint}`;
      
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: request.headers,
      };

      if (request.body && request.method !== "GET") {
        fetchOptions.body = request.body;
      }

      const res = await fetch(url, fetchOptions);
      const endTime = Date.now();
      
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseBody = await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body: responseBody,
        time: endTime - startTime
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRequest = async () => {
    const curlCommand = `curl -X ${request.method} "${environments[environment]}${request.endpoint}" ${Object.entries(request.headers).map(([key, value]) => `-H "${key}: ${value}"`).join(" ")} ${request.body ? `-d '${request.body}'` : ""}`;
    
    await navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleSelect = (example: typeof exampleRequests[0]) => {
    setRequest(example);
    setResponse(null);
    setError(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          API Playground
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Environment:
          </label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as "dev" | "prod")}
            className="px-2 py-1 text-sm rounded border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
          >
            <option value="dev">Development</option>
            <option value="prod">Production</option>
          </select>
        </div>
      </div>

      {/* Example Requests */}
      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Example Requests:
        </label>
        <div className="flex gap-2 flex-wrap">
          {exampleRequests.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleSelect(example)}
              className={cn(
                "px-3 py-1 text-sm rounded border transition-all",
                request.endpoint === example.endpoint
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              style={{
                borderColor: request.endpoint === example.endpoint ? "var(--primary)" : "var(--border)"
              }}
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      {/* Request Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              Request
            </h3>
            <button
              onClick={handleCopyRequest}
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border transition-all"
              style={{
                borderColor: "var(--border)",
                color: copied ? "var(--primary)" : "var(--muted-foreground)"
              }}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy cURL
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {/* Method and Endpoint */}
            <div className="flex gap-2">
              <select
                value={request.method}
                onChange={(e) => setRequest({ ...request, method: e.target.value })}
                className="px-2 py-1 text-sm rounded border"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)"
                }}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input
                type="text"
                value={request.endpoint}
                onChange={(e) => setRequest({ ...request, endpoint: e.target.value })}
                placeholder="/v1/datasets"
                className="flex-1 px-2 py-1 text-sm rounded border"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)"
                }}
              />
            </div>

            {/* Headers */}
            <div>
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Headers:
              </label>
              <textarea
                value={JSON.stringify(request.headers, null, 2)}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value);
                    setRequest({ ...request, headers });
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
                className="w-full h-24 px-2 py-1 text-sm font-mono rounded border mt-1"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)"
                }}
              />
            </div>

            {/* Body */}
            {request.method !== "GET" && (
              <div>
                <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Body:
                </label>
                <textarea
                  value={request.body || ""}
                  onChange={(e) => setRequest({ ...request, body: e.target.value })}
                  placeholder="Request body (JSON)"
                  className="w-full h-32 px-2 py-1 text-sm font-mono rounded border mt-1"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                />
              </div>
            )}
          </div>

          {/* Execute Button */}
          <button
            onClick={handleExecute}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all"
            style={{
              backgroundColor: loading ? "var(--muted)" : "var(--primary)",
              color: loading ? "var(--muted-foreground)" : "var(--primary-foreground)"
            }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Execute Request
              </>
            )}
          </button>
        </div>

        {/* Response */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Response
          </h3>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded border"
              style={{
                borderColor: "var(--destructive)",
                backgroundColor: "var(--destructive)/0.1"
              }}
            >
              <AlertCircle className="h-4 w-4" style={{ color: "var(--destructive)" }} />
              <span className="text-sm" style={{ color: "var(--destructive)" }}>
                {error}
              </span>
            </div>
          )}

          {response && (
            <div className="space-y-3">
              {/* Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    Status:
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded",
                      response.status >= 200 && response.status < 300
                        ? "bg-green-500/20 text-green-400"
                        : response.status >= 400
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    )}
                  >
                    {response.status} {response.statusText}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    Time:
                  </span>
                  <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                    {response.time}ms
                  </span>
                </div>
              </div>

              {/* Response Headers */}
              <div>
                <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Response Headers:
                </label>
                <textarea
                  value={JSON.stringify(response.headers, null, 2)}
                  readOnly
                  className="w-full h-20 px-2 py-1 text-sm font-mono rounded border mt-1"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                />
              </div>

              {/* Response Body */}
              <div>
                <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Response Body:
                </label>
                <textarea
                  value={response.body}
                  readOnly
                  className="w-full h-40 px-2 py-1 text-sm font-mono rounded border mt-1"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)"
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
