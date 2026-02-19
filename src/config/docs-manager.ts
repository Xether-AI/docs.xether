import { NavItem } from "./docs";
import { docsConfigV100 } from "./docs-v1.0.0";
import { docsConfigV090 } from "./docs-v0.9.0";
import { docsConfigV080 } from "./docs-v0.8.0";
import { getVersionByValue, getCurrentVersion } from "./versions";

const versionConfigs = {
  "v1.0.0": docsConfigV100,
  "v0.9.0": docsConfigV090,
  "v0.8.0": docsConfigV080,
};

export interface DocsConfig {
  sidebarNav: NavItem[];
}

export const getDocsConfig = (version?: string): DocsConfig => {
  const targetVersion = version || getCurrentVersion().value;
  return versionConfigs[targetVersion as keyof typeof versionConfigs] || docsConfigV100;
};

export const getAllVersions = () => {
  return Object.keys(versionConfigs);
};

export const isVersionSupported = (version: string) => {
  return version in versionConfigs;
};
