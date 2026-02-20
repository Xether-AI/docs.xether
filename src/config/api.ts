export interface APIConfig {
  baseUrl: string;
  version: string;
  openApiPath: string;
  changelogPath?: string;
}

export const apiConfigs: Record<string, APIConfig> = {
  'v1': {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.xether.ai',
    version: 'v1',
    openApiPath: '/openapi.json',
    changelogPath: '/changelog'
  },
  'v2': {
    baseUrl: process.env.NEXT_PUBLIC_API_V2_BASE_URL || 'https://api-v2.xether.ai',
    version: 'v2',
    openApiPath: '/openapi.json',
    changelogPath: '/changelog'
  }
};

export const defaultAPIVersion = 'v1';

export function getAPIConfig(version: string = defaultAPIVersion): APIConfig {
  return apiConfigs[version] || apiConfigs[defaultAPIVersion];
}
