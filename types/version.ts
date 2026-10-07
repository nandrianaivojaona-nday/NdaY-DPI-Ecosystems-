export interface VersionManifest {
  product: string;
  organization: string;
  version: string;
  engineeringGeneration: number;
  codename: string;
  ecosystemArchitecture?: string;
  tveEngine?: string;
  build: string;
  buildTimestamp: string;
  commit: string;
  branch: string;
  environment: string;
  node: string;
}
