export const categoryOrder = [
  "Compute and Containers",
  "Data and Analytics",
  "Databases",
  "AI and IoT",
  "Application and DevOps",
  "Observability and Management",
  "Networking and Connectivity",
  "Security",
  "Storage and Backup",
  "Migration",
  "Marketplace and Workspace",
  "Other"
] as const;

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

export function categoryRank(category: string): number {
  const idx = categoryOrder.indexOf(category as (typeof categoryOrder)[number]);
  return idx === -1 ? categoryOrder.length : idx;
}

export function getFunctionCategory(generalFunction: string): string {
  const normalized = generalFunction.toLowerCase();

  if (
    includesAny(normalized, [
      "security",
      "identity",
      "audit",
      "waf",
      "firewall",
      "ddos",
      "ransomware",
      "threat",
      "certificate",
      "key management",
      "encryption",
      "privileged access"
    ])
  ) {
    return "Security";
  }
  if (includesAny(normalized, ["virtual machines", "kubernetes", "container", "dedicated compute", "compute"])) {
    return "Compute and Containers";
  }
  if (
    includesAny(normalized, [
      "data warehouse",
      "data lake",
      "data integration",
      "big data",
      "business intelligence",
      "search"
    ])
  ) {
    return "Data and Analytics";
  }
  if (includesAny(normalized, ["database", "caching", "graph"])) {
    return "Databases";
  }
  if (includesAny(normalized, ["machine learning", "iot"])) {
    return "AI and IoT";
  }
  if (
    includesAny(normalized, [
      "devops",
      "code quality",
      "ci",
      "pipeline",
      "artifact",
      "test management",
      "application platform",
      "api management",
      "event bus"
    ])
  ) {
    return "Application and DevOps";
  }
  if (
    includesAny(normalized, [
      "observability",
      "monitoring",
      "log management",
      "notification",
      "operations",
      "image management"
    ])
  ) {
    return "Observability and Management";
  }
  if (
    includesAny(normalized, [
      "network",
      "dns",
      "nat",
      "vpn",
      "load balanc",
      "private endpoint",
      "connectivity",
      "public ip",
      "routing",
      "vpc",
      "cdn",
      "content delivery"
    ])
  ) {
    return "Networking and Connectivity";
  }
  if (
    includesAny(normalized, [
      "storage",
      "backup",
      "disaster recovery",
      "block storage",
      "file storage",
      "object storage"
    ])
  ) {
    return "Storage and Backup";
  }
  if (normalized.includes("migration")) {
    return "Migration";
  }
  if (includesAny(normalized, ["marketplace", "workspace"])) {
    return "Marketplace and Workspace";
  }

  return "Other";
}
