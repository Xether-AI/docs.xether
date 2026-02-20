import { OpenAPISpec } from './api-client';

export interface APIEndpoint {
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Array<{
    name: string;
    in: 'path' | 'query' | 'header' | 'cookie';
    description?: string;
    required: boolean;
    type?: string;
    schema?: unknown;
  }>;
  requestBody?: {
    description?: string;
    required: boolean;
    content?: Record<string, unknown>;
  };
  responses?: Record<string, {
    description: string;
    content?: Record<string, unknown>;
  }>;
  tags?: string[];
}

export interface APIReferenceData {
  title: string;
  version: string;
  description?: string;
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  endpoints: APIEndpoint[];
  schemas?: Record<string, unknown>;
}

export class APIReferenceGenerator {
  static generateReferenceData(spec: OpenAPISpec): APIReferenceData {
    const endpoints: APIEndpoint[] = [];

    for (const [path, pathItem] of Object.entries(spec.paths)) {
      if (typeof pathItem === 'object' && pathItem !== null) {
        const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'] as const;
        
        for (const method of methods) {
          const operation = (pathItem as Record<string, unknown>)[method];
          
          if (operation && typeof operation === 'object') {
            const op = operation as Record<string, unknown>;
            
            endpoints.push({
              path,
              method: method.toUpperCase(),
              operationId: op.operationId as string | undefined,
              summary: op.summary as string | undefined,
              description: op.description as string | undefined,
              parameters: this.processParameters(op.parameters as unknown[]),
              requestBody: this.processRequestBody(op.requestBody as unknown),
              responses: this.processResponses(op.responses as Record<string, unknown>),
              tags: op.tags as string[] | undefined,
            });
          }
        }
      }
    }

    return {
      title: spec.info.title,
      version: spec.info.version,
      description: spec.info.description,
      servers: spec.servers,
      endpoints,
      schemas: spec.components?.schemas,
    };
  }

  private static processParameters(parameters?: unknown[]): APIEndpoint['parameters'] {
    if (!Array.isArray(parameters)) return undefined;

    return parameters.map(param => {
      if (typeof param === 'object' && param !== null) {
        const p = param as Record<string, unknown>;
        return {
          name: p.name as string,
          in: p.in as 'path' | 'query' | 'header' | 'cookie',
          description: p.description as string | undefined,
          required: p.required as boolean || false,
          type: (p.schema as Record<string, unknown>)?.type as string | undefined,
          schema: p.schema,
        };
      }
      return null;
    }).filter((param): param is NonNullable<typeof param> => param !== null);
  }

  private static processRequestBody(requestBody?: unknown): APIEndpoint['requestBody'] {
    if (!requestBody || typeof requestBody !== 'object') return undefined;

    const rb = requestBody as Record<string, unknown>;
    return {
      description: rb.description as string | undefined,
      required: rb.required as boolean || false,
      content: rb.content as Record<string, unknown> | undefined,
    };
  }

  private static processResponses(responses?: Record<string, unknown>): APIEndpoint['responses'] {
    if (!responses || typeof responses !== 'object') return undefined;

    const processed: Record<string, unknown> = {};
    
    for (const [statusCode, response] of Object.entries(responses)) {
      if (typeof response === 'object' && response !== null) {
        const r = response as Record<string, unknown>;
        processed[statusCode] = {
          description: r.description as string || '',
          content: r.content as Record<string, unknown> | undefined,
        };
      }
    }

    return processed as APIEndpoint['responses'];
  }

  static generateEndpointSlug(endpoint: APIEndpoint): string {
    const tag = endpoint.tags?.[0] || 'default';
    const method = endpoint.method.toLowerCase();
    const path = endpoint.path
      .replace(/^\//, '')
      .replace(/\//g, '-')
      .replace(/\{[^}]+\}/g, 'param')
      .replace(/[^a-zA-Z0-9-]/g, '');
    
    return `${tag}-${method}-${path}`;
  }

  static groupEndpointsByTag(endpoints: APIEndpoint[]): Record<string, APIEndpoint[]> {
    const grouped: Record<string, APIEndpoint[]> = {};
    
    for (const endpoint of endpoints) {
      const tag = endpoint.tags?.[0] || 'Other';
      if (!grouped[tag]) {
        grouped[tag] = [];
      }
      grouped[tag].push(endpoint);
    }
    
    return grouped;
  }
}
