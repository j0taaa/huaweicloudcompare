export type CloudProvider = "aws" | "azure" | "gcp" | "huawei";

export type BaseService = {
  id: string;
  name: string;
  generalFunction: string;
  shortName: string;
  keywords: string[];
  cloudProvider: CloudProvider;
  description: string;
  imageUrl: string;
};

export type NonHuaweiService = BaseService & {
  cloudProvider: Exclude<CloudProvider, "huawei">;
  huaweiEquivalentShortNames: string[];
  differencesFromHuawei: string[];
  migrationToHuawei: string[];
};

export type HuaweiService = BaseService & {
  cloudProvider: "huawei";
};

export type ServiceInfo = NonHuaweiService | HuaweiService;

const huaweiIconBase = "https://res-static.hc-cdn.cn/cloudbu-site/public/product-banner-icon";
const hIcon = (path: string) => `${huaweiIconBase}/${path}.png`;
const huaweiDefaultIcon = hIcon("Compute/ECS");

const huaweiServiceIconByShortName: Record<string, string> = {
  ECS: hIcon("Compute/ECS"),
  BMS: hIcon("Compute/BMS"),
  AS: hIcon("Compute/AS"),
  IMS: hIcon("Compute/IMS"),
  FunctionGraph: hIcon("Compute/FunctionGraph"),
  CCE: hIcon("Containers/CCE"),
  CCI: hIcon("Containers/CCI"),
  "CCI 2.0": hIcon("Containers/CCI"),
  SWR: hIcon("Containers/SWR"),
  OBS: hIcon("Storage/OBS"),
  DOS: hIcon("Storage/OBS"),
  RDS: hIcon("Databases/RDSforMySQL"),
  GaussDB: hIcon("Databases/GaussDB"),
  TaurusDB: hIcon("Databases/GaussDBforMySQL"),
  GeminiDB: hIcon("Databases/GaussDBfornosql"),
  UGO: hIcon("Databases/UGO"),
  DDM: hIcon("Databases/DDM"),
  DDS: hIcon("Databases/DDS"),
  DRS: hIcon("Databases/DRS"),
  DIS: hIcon("Analytics/DIS"),
  DLI: hIcon("Analytics/DLI"),
  DWS: hIcon("Analytics/DWS"),
  "DataArts Fabric": hIcon("Analytics/DataArtsFabric"),
  "DataArts Insight": hIcon("Analytics/DataArts"),
  "Lake Formation": hIcon("Analytics/DataArts"),
  DGC: hIcon("Analytics/DataArts"),
  MRS: hIcon("Analytics/DWS"),
  AOM: hIcon("ManagementGovernance/AOM"),
  APM: hIcon("ManagementGovernance/APM"),
  ServiceStage: hIcon("DeveloperServices/ServiceStage"),
  Workspace: hIcon("BusinessApplications/Workspace"),
  CSS: hIcon("Analytics/CSS"),
  GES: hIcon("AI/ges"),
  ModelArts: hIcon("AI/ModelArts"),
  "ModelArts Studio": hIcon("AI/ModelArts"),
  IoTDA: hIcon("InternetofThings/IoTDA"),
  IoTDM: hIcon("InternetofThings/IoTDM"),
  CES: hIcon("ManagementGovernance/CES"),
  CTS: hIcon("ManagementGovernance/CTS"),
  IAM: hIcon("ManagementGovernance/IAM"),
  "IAM Identity Center": hIcon("ManagementGovernance/IAM"),
  LTS: hIcon("ManagementGovernance/LTS"),
  SMN: hIcon("ManagementGovernance/SMN"),
  APIG: hIcon("Middleware/APIG"),
  DCS: hIcon("Middleware/Memcached"),
  DMS: hIcon("Middleware/DMS"),
  "DMS Kafka": hIcon("Middleware/Kafka"),
  "DMS RabbitMQ": hIcon("Middleware/RabbitMQ"),
  "DMS RocketMQ": hIcon("Middleware/ROCKETMQ"),
  EventGrid: hIcon("BusinessApplications/ROMAConnect"),
  CDM: hIcon("Migration/CDM"),
  MGC: hIcon("Migration/MGC"),
  OMS: hIcon("Migration/OMS"),
  SMS: hIcon("Migration/SMS"),
  CBH: hIcon("SecurityCompliance/CBH"),
  CCM: hIcon("SecurityCompliance/SSL"),
  CFW: hIcon("SecurityCompliance/CFW"),
  CGS: hIcon("SecurityCompliance/CFW"),
  DEW: hIcon("SecurityCompliance/DEW"),
  DSC: hIcon("SecurityCompliance/DSC"),
  DBSS: hIcon("SecurityCompliance/DBSS"),
  DDoS: hIcon("SecurityCompliance/AAD"),
  HSS: hIcon("SecurityCompliance/CFW"),
  SecMaster: hIcon("SecurityCompliance/CFW"),
  WAF: hIcon("SecurityCompliance/WAF"),
  CBR: hIcon("Storage/CBR"),
  CSBS: hIcon("Storage/CSBS"),
  DSS: hIcon("Storage/DSS"),
  EVS: hIcon("Storage/EVS"),
  SFS: hIcon("Storage/SFS"),
  SDRS: hIcon("Storage/SDRS"),
  CDN: hIcon("ContentDeliveryEdgeComputing/CDN"),
  DeH: hIcon("Compute/DeH"),
  CPH: hIcon("Compute/CPH"),
  DC: hIcon("Networking/DC"),
  DNS: hIcon("BusinessApplications/DNS"),
  EIP: hIcon("Networking/EIP"),
  ELB: hIcon("Networking/ELB"),
  ER: hIcon("Networking/ER"),
  NAT: hIcon("Networking/NAT"),
  VPC: hIcon("Networking/VPC"),
  VPN: hIcon("Networking/VPN"),
  VPCEP: hIcon("Networking/VPCEP"),
  CodeArts: hIcon("DeveloperServices/CodeArts"),
  "CodeArts Build": hIcon("DeveloperServices/CodeArtsBuild"),
  "CodeArts Deploy": hIcon("DeveloperServices/CodeArtsDeploy"),
  "CodeArts Pipeline": hIcon("DeveloperServices/CodeArtsPipeline"),
  "CodeArts Repo": hIcon("DeveloperServices/CodeArtsRepo"),
  "CodeArts TestPlan": hIcon("DeveloperServices/CodeArtsTestPlan"),
  "CodeArts Req": hIcon("DeveloperServices/CodeArtsReq"),
  "CodeArts Check": hIcon("DeveloperServices/CodeArtsCheck"),
  "CodeArts Artifact": hIcon("DeveloperServices/CodeArtsArtifact"),
  "CodeArts Governance": hIcon("DeveloperServices/DevSecurity"),
  "CodeArts PerfTest": hIcon("DeveloperServices/CodeArtsPerfTest"),
  KooGallery: hIcon("aPaaS/KooMessage"),
  "Flexus CCI": hIcon("Containers/CCI"),
  "Flexus L": hIcon("Compute/FECSL"),
  "Flexus X": hIcon("Compute/FECSX"),
  "Flexus RDS": hIcon("Compute/FRDS")
};

function resolveHuaweiServiceIcon(service: Omit<HuaweiService, "cloudProvider" | "imageUrl">): string {
  return huaweiServiceIconByShortName[service.shortName] ?? huaweiDefaultIcon;
}

function hw(service: Omit<HuaweiService, "cloudProvider" | "imageUrl"> & { imageUrl?: string }): HuaweiService {
  return {
    ...service,
    cloudProvider: "huawei",
    imageUrl: service.imageUrl ?? resolveHuaweiServiceIcon(service)
  };
}

function nh(service: NonHuaweiService): NonHuaweiService {
  return service;
}

const coreServices: ServiceInfo[] = [
  nh({
    id: "aws-ec2",
    name: "Amazon EC2",
    generalFunction: "Virtual Machines",
    shortName: "EC2",
    keywords: ["vm", "compute", "instance", "iaas"],
    cloudProvider: "aws",
    description: "On-demand virtual machines with flexible instance families and autoscaling support.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2.png",
    huaweiEquivalentShortNames: ["ECS"],
    differencesFromHuawei: ["Instance naming and pricing models differ.", "Default networking and IAM patterns differ."],
    migrationToHuawei: ["Map instance sizes to ECS by CPU/RAM.", "Recreate security groups and startup scripts."]
  }),
  nh({
    id: "azure-vm",
    name: "Azure Virtual Machines",
    generalFunction: "Virtual Machines",
    shortName: "Azure VM",
    keywords: ["vm", "compute", "instance", "iaas"],
    cloudProvider: "azure",
    description: "General-purpose and specialized virtual machines for enterprise workloads.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/vm.png",
    huaweiEquivalentShortNames: ["ECS", "BMS"],
    differencesFromHuawei: ["VM family naming differs.", "Diagnostics and network defaults differ."],
    migrationToHuawei: ["Map VM sizing to ECS/BMS flavors.", "Recreate NSG and route behavior in Huawei VPC."]
  }),
  nh({
    id: "gcp-compute-engine",
    name: "Compute Engine",
    generalFunction: "Virtual Machines",
    shortName: "GCE",
    keywords: ["vm", "compute", "instance"],
    cloudProvider: "gcp",
    description: "Virtual machine platform with custom machine types and instance groups.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
    huaweiEquivalentShortNames: ["ECS"],
    differencesFromHuawei: ["Custom machine type workflows differ.", "Metadata and IAM integration differ."],
    migrationToHuawei: ["Map machine types to ECS flavors.", "Translate startup metadata and firewall rules."]
  }),
  hw({
    id: "huawei-ecs",
    name: "Elastic Cloud Server",
    generalFunction: "Virtual Machines",
    shortName: "ECS",
    keywords: ["vm", "compute", "instance", "elastic"],
    description: "Huawei Cloud virtual machine service for scalable compute workloads."
  }),

  nh({
    id: "aws-eks",
    name: "Amazon EKS",
    generalFunction: "Managed Kubernetes",
    shortName: "EKS",
    keywords: ["kubernetes", "container", "k8s"],
    cloudProvider: "aws",
    description: "Managed Kubernetes control plane for containerized applications.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/elastic-kubernetes-service.png",
    huaweiEquivalentShortNames: ["CCE", "CCI"],
    differencesFromHuawei: ["Add-on ecosystems differ.", "Autoscaling workflows differ."],
    migrationToHuawei: ["Replace provider-specific add-ons.", "Validate ingress and storage classes in CCE/CCI."]
  }),
  nh({
    id: "azure-aks",
    name: "Azure Kubernetes Service (AKS)",
    generalFunction: "Managed Kubernetes",
    shortName: "AKS",
    keywords: ["kubernetes", "container", "k8s"],
    cloudProvider: "azure",
    description: "Managed Kubernetes service with integrated cluster lifecycle operations.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/kubernetes-services.png",
    huaweiEquivalentShortNames: ["CCE", "CCI"],
    differencesFromHuawei: ["Identity and network plugin defaults differ.", "Managed features differ by tier."],
    migrationToHuawei: ["Port manifests and Helm charts.", "Reconfigure load balancers and persistent volume classes."]
  }),
  nh({
    id: "gcp-gke",
    name: "Google Kubernetes Engine (GKE)",
    generalFunction: "Managed Kubernetes",
    shortName: "GKE",
    keywords: ["kubernetes", "container", "k8s"],
    cloudProvider: "gcp",
    description: "Managed Kubernetes with automated upgrades and node management.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/kubernetes-engine.png",
    huaweiEquivalentShortNames: ["CCE", "CCI"],
    differencesFromHuawei: ["Autopilot-style behavior differs.", "Monitoring and policy tooling differs."],
    migrationToHuawei: ["Remove GKE-specific features from manifests.", "Validate HPA/network policies in CCE."]
  }),
  hw({
    id: "huawei-cce",
    name: "Cloud Container Engine",
    generalFunction: "Managed Kubernetes",
    shortName: "CCE",
    keywords: ["kubernetes", "container", "k8s"],
    description: "Huawei managed Kubernetes service for production container orchestration."
  }),

  nh({
    id: "aws-s3",
    name: "Amazon S3",
    generalFunction: "Object Storage",
    shortName: "S3",
    keywords: ["object storage", "bucket", "backup"],
    cloudProvider: "aws",
    description: "Durable object storage for backups, archives, and static assets.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/simple-storage-service-s3.png",
    huaweiEquivalentShortNames: ["OBS", "DOS"],
    differencesFromHuawei: ["Policy and IAM syntax differ.", "Lifecycle configuration differs."],
    migrationToHuawei: ["Migrate buckets/objects with sync tools.", "Rebuild lifecycle and replication settings."]
  }),
  nh({
    id: "azure-blob",
    name: "Azure Blob Storage",
    generalFunction: "Object Storage",
    shortName: "Blob",
    keywords: ["object storage", "blob", "backup"],
    cloudProvider: "azure",
    description: "Scalable object storage for unstructured data.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/storage/blob-storage.png",
    huaweiEquivalentShortNames: ["OBS", "DOS"],
    differencesFromHuawei: ["Container terminology differs from buckets.", "Tiering and SDK patterns differ."],
    migrationToHuawei: ["Map blob containers to OBS buckets.", "Validate metadata and lifecycle behavior."]
  }),
  nh({
    id: "gcp-cloud-storage",
    name: "Cloud Storage",
    generalFunction: "Object Storage",
    shortName: "GCS",
    keywords: ["object storage", "bucket", "archive"],
    cloudProvider: "gcp",
    description: "Object storage service with multiple storage classes.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/storage.png",
    huaweiEquivalentShortNames: ["OBS", "DOS"],
    differencesFromHuawei: ["Storage class naming differs.", "ACL and IAM defaults differ."],
    migrationToHuawei: ["Plan phased transfer and checksum verification.", "Recreate lifecycle/event rules in OBS."]
  }),
  hw({
    id: "huawei-obs",
    name: "Object Storage Service",
    generalFunction: "Object Storage",
    shortName: "OBS",
    keywords: ["object storage", "bucket", "archive"],
    description: "Huawei object storage for backup, archive, and static content."
  }),

  nh({
    id: "aws-rds",
    name: "Amazon RDS",
    generalFunction: "Managed Relational Database",
    shortName: "RDS",
    keywords: ["database", "sql", "managed db"],
    cloudProvider: "aws",
    description: "Managed relational database service with backups and high availability.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/rds.png",
    huaweiEquivalentShortNames: ["RDS", "GaussDB", "TaurusDB"],
    differencesFromHuawei: ["Engine options and editions differ.", "Replica/failover setup differs."],
    migrationToHuawei: ["Validate engine version compatibility.", "Benchmark before cutover."]
  }),
  nh({
    id: "azure-sql-database",
    name: "Azure SQL Database",
    generalFunction: "Managed Relational Database",
    shortName: "Azure SQL",
    keywords: ["database", "sql", "managed db"],
    cloudProvider: "azure",
    description: "Managed SQL database service focused on SQL Server workloads.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/sql-databases.png",
    huaweiEquivalentShortNames: ["RDS", "GaussDB"],
    differencesFromHuawei: ["Pricing/tier models differ.", "Platform features differ."],
    migrationToHuawei: ["Assess SQL Server feature compatibility.", "Migrate backup/restore operations."]
  }),
  nh({
    id: "gcp-cloud-sql",
    name: "Cloud SQL",
    generalFunction: "Managed Relational Database",
    shortName: "Cloud SQL",
    keywords: ["database", "sql", "managed db"],
    cloudProvider: "gcp",
    description: "Managed relational service for MySQL, PostgreSQL, and SQL Server.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/database/sql.png",
    huaweiEquivalentShortNames: ["RDS", "GaussDB"],
    differencesFromHuawei: ["HA topology differs.", "IAM and networking integration differs."],
    migrationToHuawei: ["Verify engine-level compatibility.", "Tune parameters post-migration."]
  }),
  hw({
    id: "huawei-rds",
    name: "Relational Database Service",
    generalFunction: "Managed Relational Database",
    shortName: "RDS",
    keywords: ["database", "sql", "managed db"],
    description: "Huawei managed relational database service with backup and HA."
  }),

  nh({
    id: "aws-lambda",
    name: "AWS Lambda",
    generalFunction: "Serverless Functions",
    shortName: "Lambda",
    keywords: ["serverless", "function", "event"],
    cloudProvider: "aws",
    description: "Event-driven serverless compute.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/lambda.png",
    huaweiEquivalentShortNames: ["FunctionGraph"],
    differencesFromHuawei: ["Triggers and event sources differ.", "Runtime defaults differ."],
    migrationToHuawei: ["Adapt event payload contracts.", "Remap permissions and triggers."]
  }),
  nh({
    id: "azure-functions",
    name: "Azure Functions",
    generalFunction: "Serverless Functions",
    shortName: "Functions",
    keywords: ["serverless", "function", "event"],
    cloudProvider: "azure",
    description: "Serverless compute for event-driven automation and APIs.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/function-apps.png",
    huaweiEquivalentShortNames: ["FunctionGraph"],
    differencesFromHuawei: ["Binding and trigger models differ.", "Host plan behavior differs."],
    migrationToHuawei: ["Refactor binding-specific code.", "Move configuration/secrets to Huawei services."]
  }),
  nh({
    id: "gcp-cloud-functions",
    name: "Cloud Functions",
    generalFunction: "Serverless Functions",
    shortName: "GCF",
    keywords: ["serverless", "function", "event"],
    cloudProvider: "gcp",
    description: "Event-driven functions for lightweight microservices and automation.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/functions.png",
    huaweiEquivalentShortNames: ["FunctionGraph"],
    differencesFromHuawei: ["Deployment/runtime packaging differs.", "Event integrations differ."],
    migrationToHuawei: ["Repackage runtime dependencies.", "Map triggers to Huawei event services."]
  }),
  hw({
    id: "huawei-functiongraph",
    name: "FunctionGraph",
    generalFunction: "Serverless Functions",
    shortName: "FunctionGraph",
    keywords: ["serverless", "function", "event"],
    description: "Huawei serverless compute for event-driven code execution."
  }),

  nh({
    id: "aws-cloudfront",
    name: "Amazon CloudFront",
    generalFunction: "CDN and Security",
    shortName: "CloudFront",
    keywords: ["cdn", "edge", "cache", "security"],
    cloudProvider: "aws",
    description: "Global edge caching and acceleration service.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/cloudfront.png",
    huaweiEquivalentShortNames: ["CDN", "WAF"],
    differencesFromHuawei: ["Edge rule syntax differs.", "Security integrations differ."],
    migrationToHuawei: ["Translate cache/routing rules.", "Recreate certificates and security settings."]
  }),
  nh({
    id: "azure-front-door",
    name: "Azure Front Door",
    generalFunction: "CDN and Security",
    shortName: "Front Door",
    keywords: ["cdn", "edge", "security", "routing"],
    cloudProvider: "azure",
    description: "Edge routing, acceleration, and security entry point.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/front-doors.png",
    huaweiEquivalentShortNames: ["CDN", "WAF"],
    differencesFromHuawei: ["Rule engine behavior differs.", "Feature scope differs by tier."],
    migrationToHuawei: ["Map front-end domains and routes.", "Retest latency and failover behavior."]
  }),
  nh({
    id: "gcp-cloud-cdn",
    name: "Cloud CDN",
    generalFunction: "CDN and Security",
    shortName: "Cloud CDN",
    keywords: ["cdn", "edge", "cache"],
    cloudProvider: "gcp",
    description: "Global edge caching for content acceleration.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/cdn.png",
    huaweiEquivalentShortNames: ["CDN"],
    differencesFromHuawei: ["Backend integration model differs.", "Cache rule semantics differ."],
    migrationToHuawei: ["Recreate cache key policies.", "Validate origin/TLS/cache hit behavior."]
  }),
  hw({
    id: "huawei-cdn",
    name: "Content Delivery Network",
    generalFunction: "CDN and Security",
    shortName: "CDN",
    keywords: ["cdn", "edge", "cache"],
    description: "Huawei CDN for edge acceleration and cache delivery."
  }),

  nh({
    id: "aws-app-runner",
    name: "AWS App Runner",
    generalFunction: "PaaS App Hosting",
    shortName: "App Runner",
    keywords: ["paas", "app hosting", "container"],
    cloudProvider: "aws",
    description: "Managed container web app hosting.",
    imageUrl: huaweiDefaultIcon,
    huaweiEquivalentShortNames: [],
    differencesFromHuawei: ["No direct 1:1 managed runtime in current catalog."],
    migrationToHuawei: ["Use ServiceStage + CCE/CCI design pattern."]
  })
];

const additionalEquivalentServices: NonHuaweiService[] = [
  nh({
    id: "aws-kinesis-data-streams",
    name: "Amazon Kinesis Data Streams",
    generalFunction: "Data Integration",
    shortName: "Kinesis",
    keywords: ["stream", "ingestion", "realtime"],
    cloudProvider: "aws",
    description: "Real-time stream ingestion and processing service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DIS"],
    differencesFromHuawei: ["Sharding and throughput units differ."],
    migrationToHuawei: ["Map stream partitions and retention settings to DIS."]
  }),
  nh({
    id: "azure-event-hubs",
    name: "Azure Event Hubs",
    generalFunction: "Data Integration",
    shortName: "Event Hubs",
    keywords: ["stream", "ingestion", "events"],
    cloudProvider: "azure",
    description: "Big data event ingestion and streaming platform.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DIS"],
    differencesFromHuawei: ["Namespace and partition model differ."],
    migrationToHuawei: ["Translate producer/consumer and checkpoint behavior."]
  }),
  nh({
    id: "gcp-pubsub",
    name: "Google Cloud Pub/Sub",
    generalFunction: "Data Integration",
    shortName: "Pub/Sub",
    keywords: ["events", "stream", "ingestion"],
    cloudProvider: "gcp",
    description: "Global messaging and ingestion service.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DIS", "DMS"],
    differencesFromHuawei: ["Subscription delivery semantics differ."],
    migrationToHuawei: ["Rebuild topic/subscription topology in DIS or DMS."]
  }),

  nh({
    id: "aws-athena",
    name: "Amazon Athena",
    generalFunction: "Data Lake Analytics",
    shortName: "Athena",
    keywords: ["sql", "data lake", "query"],
    cloudProvider: "aws",
    description: "Serverless SQL analytics on data lake storage.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DLI"],
    differencesFromHuawei: ["Query engines and connectors differ."],
    migrationToHuawei: ["Port SQL and metadata catalog settings."]
  }),
  nh({
    id: "azure-synapse-serverless",
    name: "Azure Synapse Analytics",
    generalFunction: "Data Lake Analytics",
    shortName: "Synapse",
    keywords: ["sql", "analytics", "lakehouse"],
    cloudProvider: "azure",
    description: "Unified analytics platform for SQL and Spark workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DLI", "DWS"],
    differencesFromHuawei: ["Workspace and pool architecture differ."],
    migrationToHuawei: ["Separate warehouse and lake analytics into DWS/DLI."]
  }),
  nh({
    id: "gcp-bigquery",
    name: "BigQuery",
    generalFunction: "Data Warehouse",
    shortName: "BigQuery",
    keywords: ["warehouse", "analytics", "sql"],
    cloudProvider: "gcp",
    description: "Serverless data warehouse for analytical SQL workloads.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/bigquery.png",
    huaweiEquivalentShortNames: ["DWS", "DLI"],
    differencesFromHuawei: ["Serverless model differs from cluster-based DWS."],
    migrationToHuawei: ["Map datasets, partitioning, and SQL compatibility."]
  }),
  nh({
    id: "aws-redshift",
    name: "Amazon Redshift",
    generalFunction: "Data Warehouse",
    shortName: "Redshift",
    keywords: ["warehouse", "olap", "analytics"],
    cloudProvider: "aws",
    description: "Managed cloud data warehouse service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DWS"],
    differencesFromHuawei: ["Node types and workload management differ."],
    migrationToHuawei: ["Migrate schemas and ETL with performance retuning."]
  }),
  nh({
    id: "azure-synapse-warehouse",
    name: "Azure Synapse Dedicated SQL Pool",
    generalFunction: "Data Warehouse",
    shortName: "Synapse SQL",
    keywords: ["warehouse", "sql pool", "analytics"],
    cloudProvider: "azure",
    description: "Dedicated SQL data warehouse in Synapse.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DWS"],
    differencesFromHuawei: ["Distribution and compute scaling differ."],
    migrationToHuawei: ["Map distribution keys and tuning profiles."]
  }),

  nh({
    id: "aws-lake-formation",
    name: "AWS Lake Formation",
    generalFunction: "Data Lake Management",
    shortName: "Lake Formation",
    keywords: ["data lake", "governance", "catalog"],
    cloudProvider: "aws",
    description: "Data lake setup, governance, and access controls.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["Lake Formation", "DataArts Fabric"],
    differencesFromHuawei: ["Permission and catalog constructs differ."],
    migrationToHuawei: ["Migrate metadata and access governance models."]
  }),
  nh({
    id: "azure-purview",
    name: "Microsoft Purview",
    generalFunction: "Data Governance",
    shortName: "Purview",
    keywords: ["governance", "catalog", "lineage"],
    cloudProvider: "azure",
    description: "Unified data governance and catalog platform.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DataArts Fabric", "DGC"],
    differencesFromHuawei: ["Classification and policy features vary."],
    migrationToHuawei: ["Rebuild catalog/lineage and governance policies."]
  }),
  nh({
    id: "gcp-dataplex",
    name: "Google Cloud Dataplex",
    generalFunction: "Data Governance",
    shortName: "Dataplex",
    keywords: ["governance", "lakehouse", "catalog"],
    cloudProvider: "gcp",
    description: "Unified governance and management for data lakes.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DataArts Fabric", "Lake Formation"],
    differencesFromHuawei: ["Control plane and policy scope differ."],
    migrationToHuawei: ["Migrate zones/assets metadata and permissions."]
  }),
  nh({
    id: "aws-quicksight",
    name: "Amazon QuickSight",
    generalFunction: "Business Intelligence",
    shortName: "QuickSight",
    keywords: ["bi", "dashboard", "visualization"],
    cloudProvider: "aws",
    description: "Business intelligence and dashboarding platform.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DataArts Insight"],
    differencesFromHuawei: ["Visualization components differ."],
    migrationToHuawei: ["Recreate datasets and dashboards in DataArts Insight."]
  }),
  nh({
    id: "azure-power-bi",
    name: "Power BI",
    generalFunction: "Business Intelligence",
    shortName: "Power BI",
    keywords: ["bi", "dashboard", "analytics"],
    cloudProvider: "azure",
    description: "Business analytics and interactive reporting service.",
    imageUrl: "https://cdn.simpleicons.org/powerbi",
    huaweiEquivalentShortNames: ["DataArts Insight"],
    differencesFromHuawei: ["Semantic model and sharing model differ."],
    migrationToHuawei: ["Migrate reports and data models manually."]
  }),
  nh({
    id: "gcp-looker",
    name: "Looker",
    generalFunction: "Business Intelligence",
    shortName: "Looker",
    keywords: ["bi", "dashboard", "modeling"],
    cloudProvider: "gcp",
    description: "Business intelligence and analytics modeling platform.",
    imageUrl: "https://cdn.simpleicons.org/looker",
    huaweiEquivalentShortNames: ["DataArts Insight"],
    differencesFromHuawei: ["Modeling layer differs significantly."],
    migrationToHuawei: ["Rebuild explores/models into target BI datasets."]
  }),

  nh({
    id: "aws-emr",
    name: "Amazon EMR",
    generalFunction: "Big Data Processing",
    shortName: "EMR",
    keywords: ["hadoop", "spark", "big data"],
    cloudProvider: "aws",
    description: "Managed big data processing clusters.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["MRS"],
    differencesFromHuawei: ["Managed stack defaults differ."],
    migrationToHuawei: ["Port cluster configs and job orchestration."]
  }),
  nh({
    id: "azure-hdinsight",
    name: "Azure HDInsight",
    generalFunction: "Big Data Processing",
    shortName: "HDInsight",
    keywords: ["hadoop", "spark", "big data"],
    cloudProvider: "azure",
    description: "Managed Apache big data analytics service.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["MRS"],
    differencesFromHuawei: ["Cluster service versions differ."],
    migrationToHuawei: ["Validate workload compatibility and tuning."]
  }),
  nh({
    id: "gcp-dataproc",
    name: "Cloud Dataproc",
    generalFunction: "Big Data Processing",
    shortName: "Dataproc",
    keywords: ["hadoop", "spark", "big data"],
    cloudProvider: "gcp",
    description: "Managed Spark and Hadoop clusters.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["MRS"],
    differencesFromHuawei: ["Autoscaling and image defaults differ."],
    migrationToHuawei: ["Migrate jobs and cluster bootstrap scripts."]
  }),

  nh({
    id: "aws-cloudwatch",
    name: "Amazon CloudWatch",
    generalFunction: "Observability",
    shortName: "CloudWatch",
    keywords: ["monitoring", "metrics", "alerts"],
    cloudProvider: "aws",
    description: "Metrics, logs, and monitoring dashboards.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["AOM", "CES", "LTS"],
    differencesFromHuawei: ["Metric namespace and alarm semantics differ."],
    migrationToHuawei: ["Recreate dashboards, alerts, and log pipelines."]
  }),
  nh({
    id: "aws-xray",
    name: "AWS X-Ray",
    generalFunction: "Observability",
    shortName: "X-Ray",
    keywords: ["apm", "tracing", "latency"],
    cloudProvider: "aws",
    description: "Distributed tracing and performance analysis.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["APM"],
    differencesFromHuawei: ["Trace context and telemetry models differ."],
    migrationToHuawei: ["Adjust instrumentation exporters and sampling."]
  }),
  nh({
    id: "azure-monitor",
    name: "Azure Monitor",
    generalFunction: "Observability",
    shortName: "Azure Monitor",
    keywords: ["monitoring", "metrics", "logs"],
    cloudProvider: "azure",
    description: "Unified monitoring platform for cloud resources.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["AOM", "CES", "LTS", "APM"],
    differencesFromHuawei: ["Workspace model and queries differ."],
    migrationToHuawei: ["Translate alerts/queries and tracing pipeline."]
  }),
  nh({
    id: "gcp-operations",
    name: "Google Cloud Operations",
    generalFunction: "Observability",
    shortName: "Cloud Ops",
    keywords: ["monitoring", "logging", "tracing"],
    cloudProvider: "gcp",
    description: "Monitoring, logging, trace, and error reporting stack.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["AOM", "APM", "LTS", "CES"],
    differencesFromHuawei: ["SLO/metric abstractions differ."],
    migrationToHuawei: ["Rebuild monitoring and tracing dashboards."]
  }),

  nh({
    id: "azure-app-service",
    name: "Azure App Service",
    generalFunction: "Application Platform",
    shortName: "App Service",
    keywords: ["paas", "web app", "platform"],
    cloudProvider: "azure",
    description: "Managed web app platform for API and app hosting.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["ServiceStage", "FunctionGraph"],
    differencesFromHuawei: ["Runtime and deployment slots differ."],
    migrationToHuawei: ["Map runtime settings and CI/CD deployment flow."]
  }),
  nh({
    id: "gcp-cloud-run",
    name: "Cloud Run",
    generalFunction: "Application Platform",
    shortName: "Cloud Run",
    keywords: ["serverless container", "paas", "api"],
    cloudProvider: "gcp",
    description: "Serverless container hosting for HTTP services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["ServiceStage", "CCI"],
    differencesFromHuawei: ["Concurrency and revision behavior differ."],
    migrationToHuawei: ["Adjust container deploy and scaling policies."]
  }),
  nh({
    id: "aws-workspaces",
    name: "Amazon WorkSpaces",
    generalFunction: "Digital Workspace",
    shortName: "WorkSpaces",
    keywords: ["workspace", "vdi", "desktop"],
    cloudProvider: "aws",
    description: "Managed virtual desktop infrastructure service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["Workspace"],
    differencesFromHuawei: ["Desktop images and directory integration differ."],
    migrationToHuawei: ["Recreate pools and user profiles."]
  }),
  nh({
    id: "azure-virtual-desktop",
    name: "Azure Virtual Desktop",
    generalFunction: "Digital Workspace",
    shortName: "AVD",
    keywords: ["workspace", "vdi", "desktop"],
    cloudProvider: "azure",
    description: "Cloud-hosted virtual desktop and app streaming.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["Workspace"],
    differencesFromHuawei: ["Host pool design and identity model differ."],
    migrationToHuawei: ["Reconfigure desktop pools and access policies."]
  }),

  nh({
    id: "aws-autoscaling",
    name: "AWS Auto Scaling",
    generalFunction: "Compute Scaling",
    shortName: "Auto Scaling",
    keywords: ["autoscaling", "compute", "elasticity"],
    cloudProvider: "aws",
    description: "Automatic scaling across compute resources.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["AS"],
    differencesFromHuawei: ["Policy targets and cooldown logic differ."],
    migrationToHuawei: ["Port scaling alarms and policy thresholds."]
  }),
  nh({
    id: "azure-vmss",
    name: "Azure Virtual Machine Scale Sets",
    generalFunction: "Compute Scaling",
    shortName: "VMSS",
    keywords: ["autoscaling", "compute", "scale set"],
    cloudProvider: "azure",
    description: "Autoscaling VM clusters managed as a single resource.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["AS"],
    differencesFromHuawei: ["Scale set model differs from AS policies."],
    migrationToHuawei: ["Re-map scaling rules and health checks."]
  }),
  nh({
    id: "gcp-mig-autoscaler",
    name: "Managed Instance Groups",
    generalFunction: "Compute Scaling",
    shortName: "MIG",
    keywords: ["autoscaling", "instance group", "compute"],
    cloudProvider: "gcp",
    description: "Autoscaled groups of VM instances.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["AS"],
    differencesFromHuawei: ["Group templates and update policies differ."],
    migrationToHuawei: ["Translate templates and autoscaler settings."]
  }),

  nh({
    id: "aws-marketplace",
    name: "AWS Marketplace",
    generalFunction: "Cloud Marketplace",
    shortName: "AWS Marketplace",
    keywords: ["marketplace", "software", "saas"],
    cloudProvider: "aws",
    description: "Marketplace for third-party software and solutions.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["KooGallery"],
    differencesFromHuawei: ["Catalog and procurement flows differ."],
    migrationToHuawei: ["Re-list products and adapt billing integration."]
  }),
  nh({
    id: "azure-marketplace",
    name: "Azure Marketplace",
    generalFunction: "Cloud Marketplace",
    shortName: "Azure Marketplace",
    keywords: ["marketplace", "software", "saas"],
    cloudProvider: "azure",
    description: "Azure software and service marketplace.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["KooGallery"],
    differencesFromHuawei: ["Offer publishing flow differs."],
    migrationToHuawei: ["Adapt offer packaging and publication steps."]
  }),
  nh({
    id: "gcp-marketplace",
    name: "Google Cloud Marketplace",
    generalFunction: "Cloud Marketplace",
    shortName: "GCP Marketplace",
    keywords: ["marketplace", "software", "saas"],
    cloudProvider: "gcp",
    description: "Marketplace for cloud-ready commercial solutions.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["KooGallery"],
    differencesFromHuawei: ["Procurement API and listing standards differ."],
    migrationToHuawei: ["Rework listing and billing integration."]
  })
];

const additionalHuaweiServices: HuaweiService[] = [
  hw({ id: "huawei-dis", name: "Data Ingestion Service", generalFunction: "Data Integration", shortName: "DIS", keywords: ["ingestion", "stream", "data pipeline"], description: "Ingest streaming and batch data into analytics platforms." }),
  hw({ id: "huawei-dli", name: "Data Lake Insight", generalFunction: "Data Lake Analytics", shortName: "DLI", keywords: ["data lake", "sql", "spark"], description: "Serverless data lake analytics and SQL processing service." }),
  hw({ id: "huawei-dws", name: "Data Warehouse Service", generalFunction: "Data Warehouse", shortName: "DWS", keywords: ["warehouse", "analytics", "olap"], description: "Cloud data warehouse for large-scale analytical workloads." }),
  hw({ id: "huawei-dataarts-fabric", name: "DataArts Fabric", generalFunction: "Data Governance", shortName: "DataArts Fabric", keywords: ["data fabric", "governance", "catalog"], description: "Unified data fabric and governance capabilities." }),
  hw({ id: "huawei-dataarts-insight", name: "DataArts Insight", generalFunction: "Business Intelligence", shortName: "DataArts Insight", keywords: ["bi", "dashboard", "visualization"], description: "BI and dashboard service for data insights." }),
  hw({ id: "huawei-dataarts-lakeformation", name: "DataArts Lake Formation", generalFunction: "Data Lake Management", shortName: "Lake Formation", keywords: ["data lake", "governance", "metadata"], description: "Data lake formation and governance capabilities." }),
  hw({ id: "huawei-dgc", name: "DataArts Studio(DGC)", generalFunction: "Data Integration", shortName: "DGC", keywords: ["etl", "pipeline", "integration"], description: "Data governance center for ETL and metadata workflows." }),
  hw({ id: "huawei-mrs", name: "MapReduce Service", generalFunction: "Big Data Processing", shortName: "MRS", keywords: ["hadoop", "spark", "big data"], description: "Managed big data clusters for Hadoop/Spark ecosystems." }),

  hw({ id: "huawei-aom", name: "Application Operations Management", generalFunction: "Observability", shortName: "AOM", keywords: ["operations", "metrics", "monitoring"], description: "Application monitoring and operations management." }),
  hw({ id: "huawei-apm", name: "Application Performance Management", generalFunction: "Observability", shortName: "APM", keywords: ["apm", "tracing", "performance"], description: "Application tracing and performance diagnostics." }),
  hw({ id: "huawei-servicestage", name: "ServiceStage", generalFunction: "Application Platform", shortName: "ServiceStage", keywords: ["paas", "microservices", "app platform"], description: "Application platform for microservice lifecycle management." }),
  hw({ id: "huawei-workspace", name: "Workspace", generalFunction: "Digital Workspace", shortName: "Workspace", keywords: ["workspace", "desktop", "collaboration"], description: "Cloud workspace and desktop productivity environment." }),

  hw({ id: "huawei-as", name: "Auto Scaling", generalFunction: "Compute Scaling", shortName: "AS", keywords: ["autoscaling", "compute", "elasticity"], description: "Automatic scaling for compute resources." }),
  hw({ id: "huawei-bms", name: "Bare Metal Server", generalFunction: "Dedicated Compute", shortName: "BMS", keywords: ["bare metal", "compute", "dedicated"], description: "Dedicated physical servers for performance-sensitive workloads." }),
  hw({ id: "huawei-cph", name: "Cloud Phone Host", generalFunction: "Virtual Mobile", shortName: "CPH", keywords: ["cloud phone", "mobile", "virtual device"], description: "Cloud-hosted mobile device environments." }),
  hw({ id: "huawei-deh", name: "Dedicated Host", generalFunction: "Dedicated Compute", shortName: "DeH", keywords: ["dedicated host", "compliance", "isolation"], description: "Dedicated host infrastructure for isolated deployment." }),
  hw({ id: "huawei-ims", name: "Image Management Service", generalFunction: "Image Management", shortName: "IMS", keywords: ["image", "vm image", "template"], description: "Manage VM images and templates for compute workloads." }),

  hw({ id: "huawei-cci", name: "Cloud Container Instance", generalFunction: "Container Runtime", shortName: "CCI", keywords: ["container", "serverless container", "runtime"], description: "Serverless container runtime for on-demand workloads." }),
  hw({ id: "huawei-cci2", name: "Cloud Container Instance 2.0", generalFunction: "Container Runtime", shortName: "CCI 2.0", keywords: ["container", "serverless", "runtime"], description: "Next-generation serverless container runtime." }),
  hw({ id: "huawei-swr", name: "SoftWare Repository for Container", generalFunction: "Container Registry", shortName: "SWR", keywords: ["container registry", "image repo", "artifact"], description: "Container image repository service." }),

  hw({ id: "huawei-drs", name: "Data Replication Service", generalFunction: "Database Migration and Replication", shortName: "DRS", keywords: ["replication", "database migration", "cdc"], description: "Database replication and synchronization service." }),
  hw({ id: "huawei-ddm", name: "Distributed Database Middleware", generalFunction: "Database Middleware", shortName: "DDM", keywords: ["middleware", "sharding", "distributed db"], description: "Middleware for distributed relational databases." }),
  hw({ id: "huawei-dds", name: "Document Database Service", generalFunction: "Managed NoSQL Database", shortName: "DDS", keywords: ["document db", "nosql", "mongodb"], description: "Managed document database service." }),
  hw({ id: "huawei-gaussdb", name: "GaussDB", generalFunction: "Managed Relational Database", shortName: "GaussDB", keywords: ["database", "relational", "distributed"], description: "Huawei enterprise-grade distributed relational database." }),
  hw({ id: "huawei-geminidb", name: "GeminiDB", generalFunction: "Managed NoSQL Database", shortName: "GeminiDB", keywords: ["nosql", "kv", "document"], description: "Cloud-native NoSQL database service." }),
  hw({ id: "huawei-taurusdb", name: "TaurusDB", generalFunction: "Managed Relational Database", shortName: "TaurusDB", keywords: ["database", "mysql compatible", "distributed"], description: "Cloud-native distributed relational database service." }),
  hw({ id: "huawei-ugo", name: "UGO", generalFunction: "Database Tools", shortName: "UGO", keywords: ["database", "governance", "operations"], description: "Database governance and operations service." }),

  hw({ id: "huawei-codearts", name: "CodeArts", generalFunction: "DevOps Platform", shortName: "CodeArts", keywords: ["devops", "ci/cd", "collaboration"], description: "Integrated DevOps platform for software delivery." }),
  hw({ id: "huawei-codearts-artifact", name: "CodeArts Artifact", generalFunction: "Artifact Repository", shortName: "CodeArts Artifact", keywords: ["artifact", "package", "repository"], description: "Artifact and package repository service." }),
  hw({ id: "huawei-codearts-build", name: "CodeArts Build", generalFunction: "CI Build", shortName: "CodeArts Build", keywords: ["ci", "build", "pipeline"], description: "Build automation service for CI workflows." }),
  hw({ id: "huawei-codearts-check", name: "CodeArts Check", generalFunction: "Code Quality", shortName: "CodeArts Check", keywords: ["code quality", "static analysis", "security"], description: "Code quality and static analysis service." }),
  hw({ id: "huawei-codearts-deploy", name: "CodeArts Deploy", generalFunction: "CD Deployment", shortName: "CodeArts Deploy", keywords: ["deployment", "cd", "release"], description: "Release and deployment orchestration service." }),
  hw({ id: "huawei-codearts-governance", name: "CodeArts Governance", generalFunction: "DevSecOps Governance", shortName: "CodeArts Governance", keywords: ["governance", "compliance", "devsecops"], description: "Governance and policy controls for software delivery." }),
  hw({ id: "huawei-codearts-perftest", name: "CodeArts PerfTest", generalFunction: "Performance Testing", shortName: "CodeArts PerfTest", keywords: ["performance", "load test", "testing"], description: "Performance and load testing service." }),
  hw({ id: "huawei-codearts-pipeline", name: "CodeArts Pipeline", generalFunction: "CI/CD Pipeline", shortName: "CodeArts Pipeline", keywords: ["pipeline", "ci/cd", "automation"], description: "Pipeline orchestration for CI/CD automation." }),
  hw({ id: "huawei-codearts-repo", name: "CodeArts Repo", generalFunction: "Source Code Repository", shortName: "CodeArts Repo", keywords: ["git", "repo", "source control"], description: "Managed source code repository service." }),
  hw({ id: "huawei-codearts-req", name: "CodeArts Req", generalFunction: "Requirements Management", shortName: "CodeArts Req", keywords: ["requirements", "planning", "agile"], description: "Requirements and backlog management tool." }),
  hw({ id: "huawei-codearts-testplan", name: "CodeArts TestPlan", generalFunction: "Test Management", shortName: "CodeArts TestPlan", keywords: ["test management", "qa", "planning"], description: "Test planning and management service." }),

  hw({ id: "huawei-css", name: "Cloud Search Service", generalFunction: "Search and Analytics", shortName: "CSS", keywords: ["search", "elasticsearch", "analytics"], description: "Managed search and analytics service." }),
  hw({ id: "huawei-ges", name: "Graph Engine Service", generalFunction: "Graph Database", shortName: "GES", keywords: ["graph", "database", "relationship"], description: "Graph database and analytics engine." }),
  hw({ id: "huawei-modelarts", name: "ModelArts", generalFunction: "Machine Learning Platform", shortName: "ModelArts", keywords: ["ml", "ai", "training", "inference"], description: "AI development platform for model training and deployment." }),
  hw({ id: "huawei-modelarts-studio", name: "ModelArts Studio", generalFunction: "Machine Learning Platform", shortName: "ModelArts Studio", keywords: ["ai studio", "mlops", "model lifecycle"], description: "Low-code AI studio for model development workflows." }),

  hw({ id: "huawei-flexus-cci", name: "Flexus CCI", generalFunction: "Container Runtime", shortName: "Flexus CCI", keywords: ["container", "runtime", "flexus"], description: "Flexus container compute instance offering." }),
  hw({ id: "huawei-flexus-l", name: "Flexus L Instance", generalFunction: "Virtual Machines", shortName: "Flexus L", keywords: ["vm", "instance", "flexus"], description: "Flexus lightweight instance offering." }),
  hw({ id: "huawei-flexus-rds", name: "Flexus RDS", generalFunction: "Managed Relational Database", shortName: "Flexus RDS", keywords: ["database", "rds", "flexus"], description: "Flexus managed relational database offering." }),
  hw({ id: "huawei-flexus-x", name: "Flexus X Instance", generalFunction: "Virtual Machines", shortName: "Flexus X", keywords: ["vm", "instance", "flexus"], description: "Flexus high-performance instance offering." }),

  hw({ id: "huawei-iotdm", name: "IoT Device Management", generalFunction: "IoT Platform", shortName: "IoTDM", keywords: ["iot", "device", "management"], description: "IoT device onboarding and lifecycle management." }),
  hw({ id: "huawei-iotda", name: "IoTDA", generalFunction: "IoT Platform", shortName: "IoTDA", keywords: ["iot", "device access", "telemetry"], description: "IoT device access and data ingestion platform." }),

  hw({ id: "huawei-koogallery", name: "KooGallery", generalFunction: "Cloud Marketplace", shortName: "KooGallery", keywords: ["marketplace", "solutions", "apps"], description: "Huawei Cloud marketplace for software and solutions." }),

  hw({ id: "huawei-ces", name: "Cloud Eye", generalFunction: "Monitoring", shortName: "CES", keywords: ["monitoring", "metrics", "alerting"], description: "Cloud resource monitoring and alerting service." }),
  hw({ id: "huawei-cts", name: "Cloud Trace Service", generalFunction: "Audit and Trace", shortName: "CTS", keywords: ["audit", "trace", "compliance"], description: "Operation audit trail and trace service." }),
  hw({ id: "huawei-iam-idc", name: "IAM Identity Center", generalFunction: "Identity Management", shortName: "IAM Identity Center", keywords: ["identity", "sso", "access"], description: "Centralized identity access center for enterprise accounts." }),
  hw({ id: "huawei-iam", name: "Identity and Access Management", generalFunction: "Identity Management", shortName: "IAM", keywords: ["identity", "access", "authorization"], description: "Identity and permission management service." }),
  hw({ id: "huawei-lts", name: "Log Tank Service", generalFunction: "Log Management", shortName: "LTS", keywords: ["logs", "observability", "search"], description: "Centralized log collection and analysis service." }),
  hw({ id: "huawei-smn", name: "Simple Message Notification", generalFunction: "Notification Messaging", shortName: "SMN", keywords: ["notification", "message", "alert"], description: "Publish/subscribe notification service." }),

  hw({ id: "huawei-apig", name: "API Gateway", generalFunction: "API Management", shortName: "APIG", keywords: ["api", "gateway", "management"], description: "API lifecycle management and traffic control service." }),
  hw({ id: "huawei-dcs", name: "Distributed Cache Service (for Redis)", generalFunction: "Caching", shortName: "DCS", keywords: ["redis", "cache", "in-memory"], description: "Managed Redis-compatible cache service." }),
  hw({ id: "huawei-dms", name: "Distributed Message Service", generalFunction: "Messaging", shortName: "DMS", keywords: ["message queue", "messaging", "stream"], description: "Managed message service framework." }),
  hw({ id: "huawei-dms-kafka", name: "Distributed Message Service (for Kafka)", generalFunction: "Messaging", shortName: "DMS Kafka", keywords: ["kafka", "stream", "messaging"], description: "Managed Kafka message streaming service." }),
  hw({ id: "huawei-dms-rabbit", name: "Distributed Message Service (for RabbitMQ)", generalFunction: "Messaging", shortName: "DMS RabbitMQ", keywords: ["rabbitmq", "queue", "messaging"], description: "Managed RabbitMQ message queue service." }),
  hw({ id: "huawei-dms-rocket", name: "Distributed Message Service (for RocketMQ)", generalFunction: "Messaging", shortName: "DMS RocketMQ", keywords: ["rocketmq", "queue", "messaging"], description: "Managed RocketMQ messaging service." }),
  hw({ id: "huawei-eventgrid", name: "EventGrid", generalFunction: "Event Bus", shortName: "EventGrid", keywords: ["event", "event bus", "integration"], description: "Event routing and integration service." }),

  hw({ id: "huawei-cdm", name: "Cloud Data Migration", generalFunction: "Migration", shortName: "CDM", keywords: ["data migration", "etl", "sync"], description: "Cloud data migration for structured and unstructured data." }),
  hw({ id: "huawei-mgc", name: "Migration Center", generalFunction: "Migration", shortName: "MGC", keywords: ["migration", "assessment", "planning"], description: "Migration planning and execution center." }),
  hw({ id: "huawei-oms", name: "Object Storage Migration Service", generalFunction: "Migration", shortName: "OMS", keywords: ["object storage", "migration", "transfer"], description: "Object storage data migration service." }),
  hw({ id: "huawei-sms", name: "Server Migration Service", generalFunction: "Migration", shortName: "SMS", keywords: ["server migration", "lift and shift", "replication"], description: "Server lift-and-shift migration service." }),

  hw({ id: "huawei-dc", name: "Direct Connect", generalFunction: "Networking", shortName: "DC", keywords: ["private link", "dedicated connection", "network"], description: "Dedicated private network connectivity service." }),
  hw({ id: "huawei-dns", name: "Domain Name Service", generalFunction: "Networking", shortName: "DNS", keywords: ["dns", "domain", "resolution"], description: "Managed domain name resolution service." }),
  hw({ id: "huawei-eip", name: "Elastic IP", generalFunction: "Networking", shortName: "EIP", keywords: ["public ip", "elastic ip", "network"], description: "Elastic public IP addressing service." }),
  hw({ id: "huawei-elb", name: "Elastic Load Balance", generalFunction: "Networking", shortName: "ELB", keywords: ["load balancer", "traffic", "lb"], description: "Layer 4/7 load balancing service." }),
  hw({ id: "huawei-er", name: "Enterprise Router", generalFunction: "Networking", shortName: "ER", keywords: ["router", "transit", "network"], description: "Enterprise-grade inter-VPC routing service." }),
  hw({ id: "huawei-nat", name: "NAT Gateway", generalFunction: "Networking", shortName: "NAT", keywords: ["nat", "egress", "network"], description: "Network address translation gateway service." }),
  hw({ id: "huawei-vpc", name: "Virtual Private Cloud", generalFunction: "Networking", shortName: "VPC", keywords: ["vpc", "network isolation", "subnet"], description: "Isolated virtual network service." }),
  hw({ id: "huawei-vpn", name: "Virtual Private Network", generalFunction: "Networking", shortName: "VPN", keywords: ["vpn", "site-to-site", "secure network"], description: "Secure encrypted network connectivity service." }),
  hw({ id: "huawei-vpcep", name: "VPC Endpoint", generalFunction: "Networking", shortName: "VPCEP", keywords: ["private endpoint", "service access", "network"], description: "Private endpoint access for cloud services." }),

  hw({ id: "huawei-cbh", name: "Cloud Bastion Host", generalFunction: "Security", shortName: "CBH", keywords: ["bastion", "privileged access", "audit"], description: "Privileged access and operation audit bastion service." }),
  hw({ id: "huawei-ccm", name: "Cloud Certificate & Manager", generalFunction: "Security", shortName: "CCM", keywords: ["certificate", "tls", "pki"], description: "Certificate lifecycle and management service." }),
  hw({ id: "huawei-cfw", name: "Cloud Firewall", generalFunction: "Security", shortName: "CFW", keywords: ["firewall", "network security", "threat"], description: "Managed cloud firewall protection service." }),
  hw({ id: "huawei-cgs", name: "Container Guard Service", generalFunction: "Security", shortName: "CGS", keywords: ["container security", "vulnerability", "runtime protection"], description: "Container image and runtime security service." }),
  hw({ id: "huawei-dew", name: "Data Encryption Workshop", generalFunction: "Security", shortName: "DEW", keywords: ["encryption", "kms", "key management"], description: "Encryption key and secret management service." }),
  hw({ id: "huawei-dsc", name: "Data Security Center", generalFunction: "Security", shortName: "DSC", keywords: ["data security", "classification", "protection"], description: "Data security governance and risk control service." }),
  hw({ id: "huawei-dbss", name: "Database Security Service", generalFunction: "Security", shortName: "DBSS", keywords: ["database security", "audit", "protection"], description: "Database access audit and security protection." }),
  hw({ id: "huawei-ddos", name: "DDoS Mitigation", generalFunction: "Security", shortName: "DDoS", keywords: ["ddos", "attack mitigation", "protection"], description: "Distributed denial-of-service protection service." }),
  hw({ id: "huawei-hss", name: "Host Security Service", generalFunction: "Security", shortName: "HSS", keywords: ["host security", "endpoint", "protection"], description: "Server host security detection and protection." }),
  hw({ id: "huawei-secmaster", name: "SecMaster", generalFunction: "Security Operations", shortName: "SecMaster", keywords: ["soc", "security operations", "incident"], description: "Security operations and orchestration platform." }),
  hw({ id: "huawei-waf", name: "Web Application Firewall", generalFunction: "CDN and Security", shortName: "WAF", keywords: ["waf", "web security", "attack prevention"], description: "Web application firewall for HTTP/HTTPS protection." }),

  hw({ id: "huawei-cbr", name: "Cloud Backup and Recovery", generalFunction: "Backup and Recovery", shortName: "CBR", keywords: ["backup", "recovery", "snapshot"], description: "Unified backup and recovery service." }),
  hw({ id: "huawei-csbs", name: "Cloud Server Backup Service", generalFunction: "Backup and Recovery", shortName: "CSBS", keywords: ["server backup", "recovery", "snapshot"], description: "Server-level backup and restore service." }),
  hw({ id: "huawei-ddss", name: "Dedicated Distributed Storage Service", generalFunction: "Storage", shortName: "DSS", keywords: ["distributed storage", "dedicated", "performance"], description: "Dedicated distributed block storage service." }),
  hw({ id: "huawei-dos", name: "Dedicated OBS", generalFunction: "Object Storage", shortName: "DOS", keywords: ["object storage", "dedicated", "isolation"], description: "Dedicated deployment model for object storage." }),
  hw({ id: "huawei-evs", name: "Elastic Volume Service", generalFunction: "Block Storage", shortName: "EVS", keywords: ["block storage", "disk", "volume"], description: "Persistent block storage volumes for cloud servers." }),
  hw({ id: "huawei-sfs", name: "Scalable File Service", generalFunction: "File Storage", shortName: "SFS", keywords: ["file storage", "nfs", "shared storage"], description: "Scalable shared file storage service." }),
  hw({ id: "huawei-sdrs", name: "Storage Disaster Recovery Service", generalFunction: "Disaster Recovery", shortName: "SDRS", keywords: ["dr", "replication", "disaster recovery"], description: "Cross-site storage disaster recovery service." })
];

export const services: ServiceInfo[] = [...coreServices, ...additionalEquivalentServices, ...additionalHuaweiServices];
