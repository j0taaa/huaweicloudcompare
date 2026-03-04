export type CloudMapping = {
  capability: string;
  category: string;
  aws: string[];
  azure: string[];
  gcp: string[];
  huawei: string[];
  details: {
    summary: string;
    notableDifferences: string[];
    huaweiStrengths: string[];
    migrationTips: string[];
    relativeComparison: {
      aws: string;
      azure: string;
      gcp: string;
    };
  };
};

export const serviceMappings: CloudMapping[] = [
  {
    capability: "Virtual Machines",
    category: "Compute",
    aws: ["Amazon EC2"],
    azure: ["Azure Virtual Machines"],
    gcp: ["Compute Engine"],
    huawei: ["Elastic Cloud Server (ECS)"],
    details: {
      summary: "All providers offer on-demand VM instances with autoscaling and multiple machine families.",
      notableDifferences: [
        "Instance naming and machine family structure differ significantly.",
        "Networking defaults and IAM integration vary per platform."
      ],
      huaweiStrengths: [
        "Competitive pricing for general-purpose and burstable instances.",
        "Integrated support for Chinese mainland regions and compliance requirements."
      ],
      migrationTips: [
        "Map instance types by CPU/RAM profile rather than by name.",
        "Review image formats and startup scripts before migration."
      ],
      relativeComparison: {
        aws: "Compared with Amazon EC2, Huawei ECS offers similar VM flexibility while often being cost-optimized in Huawei regions.",
        azure: "Compared with Azure VMs, Huawei ECS provides equivalent compute building blocks with simpler region selection for China-first deployments.",
        gcp: "Compared with Compute Engine, Huawei ECS has comparable IaaS controls and can reduce migration friction for Huawei-native networking stacks."
      }
    }
  },
  {
    capability: "Managed Kubernetes",
    category: "Containers",
    aws: ["Amazon EKS"],
    azure: ["Azure Kubernetes Service (AKS)"],
    gcp: ["Google Kubernetes Engine (GKE)"],
    huawei: ["Cloud Container Engine (CCE)"],
    details: {
      summary: "Managed Kubernetes services simplify control-plane operations and integrate with cloud networking and IAM.",
      notableDifferences: [
        "Cluster autoscaling behavior and add-on ecosystem differ.",
        "Node pool customization options vary across providers."
      ],
      huaweiStrengths: [
        "Strong integration with Huawei networking and storage services.",
        "Managed cluster lifecycle with enterprise-focused controls."
      ],
      migrationTips: [
        "Inventory Kubernetes add-ons and replace cloud-specific ones.",
        "Validate ingress controllers and storage classes in target environment."
      ],
      relativeComparison: {
        aws: "Compared with Amazon EKS, Huawei CCE offers similar managed Kubernetes operations with tighter integration to Huawei cloud-native services.",
        azure: "Compared with AKS, Huawei CCE provides equivalent cluster lifecycle management and strong compatibility for standard Kubernetes workloads.",
        gcp: "Compared with GKE, Huawei CCE emphasizes enterprise controls and regional integration for workloads targeting Huawei infrastructure."
      }
    }
  },
  {
    capability: "Object Storage",
    category: "Storage",
    aws: ["Amazon S3"],
    azure: ["Azure Blob Storage"],
    gcp: ["Cloud Storage"],
    huawei: ["Object Storage Service (OBS)"],
    details: {
      summary: "Durable object storage for backups, archives, and static assets.",
      notableDifferences: [
        "Lifecycle, tiering, and event notification configuration models differ.",
        "SDK APIs are similar but not always fully interchangeable."
      ],
      huaweiStrengths: [
        "OBS supports S3-compatible APIs for easier transition in many workloads.",
        "Built-in data protection and cross-region replication options."
      ],
      migrationTips: [
        "Recreate bucket policies and lifecycle rules with provider-native syntax.",
        "Plan data transfer tooling and incremental synchronization strategy."
      ],
      relativeComparison: {
        aws: "Compared with Amazon S3, Huawei OBS is close in usage model and often easiest to adopt for S3-style object workflows.",
        azure: "Compared with Azure Blob Storage, Huawei OBS provides similar archival and lifecycle capabilities with Huawei ecosystem integration.",
        gcp: "Compared with Cloud Storage, Huawei OBS gives equivalent object durability options and migration-friendly API patterns."
      }
    }
  },
  {
    capability: "Managed Relational Database",
    category: "Databases",
    aws: ["Amazon RDS"],
    azure: ["Azure SQL Database", "Azure Database for PostgreSQL"],
    gcp: ["Cloud SQL"],
    huawei: ["Relational Database Service (RDS)"],
    details: {
      summary: "Managed relational engines with automated backups, patching, and monitoring.",
      notableDifferences: [
        "High-availability options and maintenance windows vary by engine.",
        "Read replicas and failover setup differ by provider and edition."
      ],
      huaweiStrengths: [
        "Broad engine support and deployment modes for enterprise workloads.",
        "Built-in observability and backup policy controls."
      ],
      migrationTips: [
        "Check engine version compatibility and extension support.",
        "Benchmark performance before cutover with production-like workload."
      ],
      relativeComparison: {
        aws: "Compared with Amazon RDS, Huawei RDS covers similar managed database operations with strong support for multi-engine deployments.",
        azure: "Compared with Azure SQL/PostgreSQL managed services, Huawei RDS provides familiar backup, HA, and observability patterns.",
        gcp: "Compared with Cloud SQL, Huawei RDS offers comparable managed relational operations with enterprise-focused configuration options."
      }
    }
  },
  {
    capability: "Serverless Functions",
    category: "Serverless",
    aws: ["AWS Lambda"],
    azure: ["Azure Functions"],
    gcp: ["Cloud Functions"],
    huawei: ["FunctionGraph"],
    details: {
      summary: "Event-driven compute for running code without managing servers.",
      notableDifferences: [
        "Supported runtime versions and timeout limits can differ.",
        "Event source integrations are cloud-specific."
      ],
      huaweiStrengths: [
        "Strong integration with Huawei event services and API gateways.",
        "Flexible triggers for storage, messaging, and HTTP-based events."
      ],
      migrationTips: [
        "Abstract platform-specific event contracts.",
        "Move secrets/config to provider-native secret and parameter services."
      ],
      relativeComparison: {
        aws: "Compared with AWS Lambda, FunctionGraph provides similar event-driven patterns and integrates tightly with Huawei gateway and messaging services.",
        azure: "Compared with Azure Functions, FunctionGraph keeps the same serverless model while aligning better with Huawei-native event sources.",
        gcp: "Compared with Cloud Functions, FunctionGraph provides equivalent trigger-based execution for lightweight microservice and automation use cases."
      }
    }
  },
  {
    capability: "CDN",
    category: "Networking",
    aws: ["Amazon CloudFront"],
    azure: ["Azure Front Door", "Azure CDN"],
    gcp: ["Cloud CDN"],
    huawei: ["Content Delivery Network (CDN)"],
    details: {
      summary: "Global edge caching and acceleration for web content delivery.",
      notableDifferences: [
        "WAF integration and edge rule syntax vary by provider.",
        "Coverage and peering strategies differ by region."
      ],
      huaweiStrengths: [
        "Optimized performance in APAC markets and mainland China.",
        "Integrated acceleration and security services."
      ],
      migrationTips: [
        "Export and map caching/page rules to target provider.",
        "Validate TLS setup and custom domain verification process."
      ],
      relativeComparison: {
        aws: "Compared with CloudFront, Huawei CDN can be stronger for China/mainland acceleration while keeping equivalent edge caching controls.",
        azure: "Compared with Azure Front Door/CDN, Huawei CDN provides similar edge delivery with strong APAC-oriented routing performance.",
        gcp: "Compared with Cloud CDN, Huawei CDN offers parallel acceleration patterns with better fit for Huawei regional backbone usage."
      }
    }
  }
];
