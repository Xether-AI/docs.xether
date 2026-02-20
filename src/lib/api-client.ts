import { APIConfig, getAPIConfig } from '@/config/api';

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    responses?: Record<string, unknown>;
    parameters?: Record<string, unknown>;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: Array<{
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
    pr?: number;
    issue?: number;
  }>;
}

export class APIClient {
  private config: APIConfig;

  constructor(version?: string) {
    this.config = getAPIConfig(version);
  }

  async fetchOpenAPISpec(): Promise<OpenAPISpec> {
    const url = `${this.config.baseUrl}${this.config.openApiPath}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching OpenAPI spec:', error);
      throw error;
    }
  }

  async fetchChangelog(): Promise<ChangelogEntry[]> {
    if (!this.config.changelogPath) {
      throw new Error('Changelog path not configured');
    }

    const url = `${this.config.baseUrl}${this.config.changelogPath}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 86400, // Cache for 24 hours
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch changelog: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching changelog:', error);
      throw error;
    }
  }

  getConfig(): APIConfig {
    return this.config;
  }
}

export const apiClient = new APIClient();
