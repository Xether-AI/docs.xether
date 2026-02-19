export interface Version {
  label: string;
  value: string;
  path: string;
  current?: boolean;
  deprecated?: boolean;
  deprecationMessage?: string;
  stable?: boolean;
}

export const versions: Version[] = [
  {
    label: "v1.0.0",
    value: "v1.0.0",
    path: "/docs",
    current: true,
    stable: true,
  },
  {
    label: "v0.9.0",
    value: "v0.9.0",
    path: "/docs/v0.9.0",
    deprecated: true,
    deprecationMessage: "This version is deprecated. Please upgrade to v1.0.0.",
  },
  {
    label: "v0.8.0",
    value: "v0.8.0",
    path: "/docs/v0.8.0",
    deprecated: true,
    deprecationMessage: "This version is deprecated and no longer maintained. Please upgrade to v1.0.0.",
  },
];

export const getCurrentVersion = () => {
  return versions.find(v => v.current) || versions[0];
};

export const getLatestStableVersion = () => {
  return versions.find(v => v.stable) || versions[0];
};

export const getVersionByValue = (value: string) => {
  return versions.find(v => v.value === value);
};

export const getVersionByPath = (path: string) => {
  return versions.find(v => path.startsWith(v.path));
};
