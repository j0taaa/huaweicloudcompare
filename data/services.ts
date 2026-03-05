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

const nonHuaweiServiceIconById: Record<string, string> = {
  "aws-api-gateway": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/api-gateway.png",
  "aws-app-runner": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/app-runner.png",
  "aws-application-migration-service": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/migration/cloudendure-migration.png",
  "aws-athena": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/athena.png",
  "aws-autoscaling": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/auto-scaling.png",
  "aws-backup": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/backup.png",
  "aws-backup-vault-lock-ransomware": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/backup.png",
  "aws-cloudtrail": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/cloudtrail.png",
  "aws-cloudwatch": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/cloudwatch.png",
  "aws-cloudwatch-logs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/cloudwatch-logs.png",
  "aws-codeartifact": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codeartifact.png",
  "aws-codebuild": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codebuild.png",
  "aws-codecommit": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codecommit.png",
  "aws-codepipeline": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codepipeline.png",
  "aws-direct-connect": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/direct-connect.png",
  "aws-dms": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/database-migration-service.png",
  "aws-dedicated-hosts": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2-instance.png",
  "aws-dynamodb": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/dynamodb.png",
  "aws-ebs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/elastic-block-store-ebs.png",
  "aws-ec2-ami-catalog": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2-ami.png",
  "aws-ecr": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2-container-registry.png",
  "aws-efs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/elastic-file-system-efs.png",
  "aws-elastic-disaster-recovery": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/cloudendure-disaster-recovery.png",
  "aws-elasticache": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/elasticache.png",
  "aws-elb": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/elastic-load-balancing.png",
  "aws-emr": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/emr.png",
  "aws-eventbridge": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/integration/eventbridge.png",
  "aws-guardduty": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/guardduty.png",
  "aws-iam": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/identity-and-access-management-iam.png",
  "aws-iot-core": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/iot/iot-core.png",
  "aws-kinesis-data-streams": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/kinesis-data-streams.png",
  "aws-kms": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/key-management-service.png",
  "aws-lake-formation": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/lake-formation.png",
  "aws-macie": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/macie.png",
  "aws-marketplace": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/general/marketplace.png",
  "aws-inspector-container-security": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/inspector.png",
  "aws-network-firewall": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/network-firewall.png",
  "aws-nat-gateway": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/nat-gateway.png",
  "aws-opensearch-service": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/amazon-opensearch-service.png",
  "aws-rds-database-activity-streams": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/rds.png",
  "aws-privatelink": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/privatelink.png",
  "aws-quicksight": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/quicksight.png",
  "aws-redshift": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/redshift.png",
  "aws-route53": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/route-53.png",
  "aws-sagemaker": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/ml/sagemaker.png",
  "aws-systems-manager-session-manager": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/systems-manager.png",
  "aws-site-to-site-vpn": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/site-to-site-vpn.png",
  "aws-sns": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/integration/simple-notification-service-sns.png",
  "aws-sqs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/integration/simple-queue-service-sqs.png",
  "aws-transit-gateway": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/transit-gateway.png",
  "aws-vpc": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/vpc.png",
  "aws-waf": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/waf.png",
  "aws-workspaces": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/enduser/workspaces.png",
  "aws-xray": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/x-ray.png",
  "azure-acr": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/containers/container-registries.png",
  "azure-activity-log": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/monitor/activity-log.png",
  "azure-ai-search": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/aimachinelearning/cognitive-search.png",
  "azure-api-management": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/integration/api-management.png",
  "azure-app-service": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/appservices/app-services.png",
  "azure-artifacts": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/artifacts.png",
  "azure-backup": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/other/backup-vault.png",
  "azure-backup-immutable-vault": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/other/backup-vault.png",
  "azure-bastion": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/networking/bastions.png",
  "azure-cache-for-redis": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/cache-for-redis.png",
  "azure-cosmos-db": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/cosmos-db.png",
  "azure-cosmos-db-gremlin": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/cosmos-db.png",
  "azure-dedicated-host": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/host-groups.png",
  "azure-database-migration-service": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/databases/azure-database-migration-services.png",
  "azure-defender-for-cloud": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/security/microsoft-defender-for-cloud.png",
  "azure-defender-for-containers": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/security/microsoft-defender-for-cloud.png",
  "azure-dns": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/dns-zones.png",
  "azure-entra-id": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/identity/entra-id-protection.png",
  "azure-event-grid": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/integration/event-grid-topics.png",
  "azure-event-hubs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/analytics/event-hubs.png",
  "azure-expressroute": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/expressroute-circuits.png",
  "azure-files": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/general/files.png",
  "azure-firewall": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/networking/firewalls.png",
  "azure-hdinsight": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/analytics/hd-insight-clusters.png",
  "azure-iot-hub": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/iot/iot-hub-security.png",
  "azure-key-vault": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/security/key-vaults.png",
  "azure-load-balancer": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/load-balancers.png",
  "azure-machine-learning": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/ml/machine-learning-service-workspaces.png",
  "azure-managed-disks": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/disks.png",
  "azure-marketplace": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/general/marketplace.png",
  "azure-migrate": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/migrate/azure-migrate.png",
  "azure-monitor": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/monitor/monitor.png",
  "azure-monitor-logs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/monitor/logs.png",
  "azure-nat-gateway": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/networking/nat.png",
  "azure-public-ip-address": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/public-ip-addresses.png",
  "azure-route-tables": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/route-tables.png",
  "azure-notification-hubs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/appservices/notification-hubs.png",
  "azure-pipelines-build": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/pipelines.png",
  "azure-pipelines-cicd": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/pipelines.png",
  "azure-power-bi": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/analytics/power-bi-embedded.png",
  "azure-private-link": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/networking/private-link.png",
  "azure-purview": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/databases/azure-purview-accounts.png",
  "azure-repos": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/repos.png",
  "azure-service-bus": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/integration/service-bus.png",
  "azure-site-recovery": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/migrate/recovery-services-vaults.png",
  "azure-synapse-serverless": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/analytics/azure-synapse-analytics.png",
  "azure-synapse-warehouse": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/database/sql-datawarehouse.png",
  "azure-virtual-desktop": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/other/azure-virtual-desktop.png",
  "azure-vmss": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/vm-scale-sets.png",
  "azure-compute-gallery": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/image-definitions.png",
  "azure-vnet": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/virtual-networks.png",
  "azure-vpn-gateway": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/virtual-network-gateways.png",
  "azure-waf": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/networking/web-application-firewall-policieswaf.png",
  "gcp-apigee": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/api/apigee.png",
  "gcp-artifact-registry-containers": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/container-registry.png",
  "gcp-artifact-analysis-container-security": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/container-registry.png",
  "gcp-artifact-registry-packages": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/container-registry.png",
  "gcp-backup-and-dr": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/persistent-disk.png",
  "gcp-backup-immutable-protection": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/persistent-disk.png",
  "gcp-cloud-armor": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/armor.png",
  "gcp-cloud-audit-logs": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/operations/logging.png",
  "gcp-cloud-build": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/build.png",
  "gcp-cloud-deploy": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/build.png",
  "gcp-cloud-dns": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/dns.png",
  "gcp-cloud-iam": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/iam.png",
  "gcp-cloud-interconnect": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/dedicated-interconnect.png",
  "gcp-cloud-kms": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/key-management-service.png",
  "gcp-cloud-logging": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/operations/logging.png",
  "gcp-cloud-nat": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/nat.png",
  "gcp-cloud-run": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/run.png",
  "gcp-cloud-vpn": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/vpn.png",
  "gcp-certificate-manager": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/certificate-manager.png",
  "gcp-cloud-router": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/router.png",
  "gcp-dataplex": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/data-catalog.png",
  "gcp-dataproc": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/dataproc.png",
  "gcp-datastream": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/dataflow.png",
  "gcp-disaster-recovery": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/migration/migrate-compute-engine.png",
  "gcp-eventarc": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/pubsub.png",
  "gcp-filestore": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/filestore.png",
  "gcp-firestore": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/database/firestore.png",
  "gcp-load-balancing": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/load-balancing.png",
  "gcp-looker": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/looker.png",
  "gcp-marketplace": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/virtual-private-cloud.png",
  "gcp-memorystore": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/database/memorystore.png",
  "gcp-mig-autoscaler": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
  "gcp-migration-center": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/migration/migrate-compute-engine.png",
  "gcp-migrate-to-vms": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/migration/migrate-compute-engine.png",
  "gcp-operations": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/operations/logging.png",
  "gcp-bare-metal-solution": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
  "gcp-sole-tenant-nodes": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
  "gcp-compute-images": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/compute-engine.png",
  "gcp-external-ip-address": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/external-ip-addresses.png",
  "gcp-iap-tcp-forwarding": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/iap.png",
  "gcp-persistent-disk": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/persistent-disk.png",
  "gcp-private-service-connect": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/private-service-connect.png",
  "gcp-pubsub": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/pubsub.png",
  "gcp-pubsub-messaging": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/pubsub.png",
  "gcp-storage-transfer-service": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/storage/storage.png",
  "gcp-dataflow-migration": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/analytics/dataflow.png",
  "gcp-security-command-center": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/security-command-center.png",
  "gcp-security-health-advisor": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/security/security-health-advisor.png",
  "aws-neptune": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/database/neptune.png",
  "aws-ec2-bare-metal-instances": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/ec2-instance.png",
  "aws-elastic-ip-address": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/vpc.png",
  "aws-certificate-manager": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/certificate-manager.png",
  "aws-datasync-object-migration": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/storage/simple-storage-service-s3.png",
  "aws-glue-data-migration": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/analytics/glue.png",
  "aws-migration-hub": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/migration/migration-hub.png",
  "azure-key-vault-certificates": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/security/key-vaults.png",
  "azure-purview-data-security": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/databases/azure-purview-accounts.png",
  "azure-defender-for-sql": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/security/microsoft-defender-for-cloud.png",
  "azure-storage-mover": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/storage/blob-storage.png",
  "azure-data-factory-migration": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/analytics/data-factories.png",
  "azure-server-migration": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/migrate/azure-migrate.png",
  "azure-baremetal-infrastructure": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/host-groups.png",
  "gcp-source-repositories": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/source-repositories.png",
  "gcp-vertex-ai": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/ml/vertex-ai.png",
  "gcp-vpc": "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/virtual-private-cloud.png"
};

function resolveNonHuaweiServiceIcon(service: NonHuaweiService): string {
  const mapped = nonHuaweiServiceIconById[service.id];
  if (mapped) return mapped;

  if (service.imageUrl === "https://cdn.simpleicons.org/amazonaws") return "/logos/aws.svg";
  if (service.imageUrl === "https://cdn.simpleicons.org/microsoftazure") return "/logos/azure.svg";
  if (service.imageUrl === "https://cdn.simpleicons.org/googlecloud") return "/logos/gcp.svg";

  return service.imageUrl;
}

function nh(service: NonHuaweiService): NonHuaweiService {
  return {
    ...service,
    imageUrl: resolveNonHuaweiServiceIcon(service)
  };
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS Amazon EC2, the direct Huawei equivalence layer is ECS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ECS + IMS + AS. Treat ECS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Virtual Machines, the direct Huawei equivalence layer is ECS + BMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ECS + IMS + AS. Treat ECS + BMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Compute Engine, the direct Huawei equivalence layer is ECS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ECS + IMS + AS. Treat ECS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    id: "aws-dedicated-hosts",
    name: "AWS Dedicated Hosts",
    generalFunction: "Dedicated Host",
    shortName: "Dedicated Hosts",
    keywords: ["dedicated", "host", "single-tenant", "isolation"],
    cloudProvider: "aws",
    description: "Single-tenant physical hosts for license-bound and isolation-sensitive workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DeH"],
    differencesFromHuawei: ["Host allocation and placement workflows differ.", "License affinity controls differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS AWS Dedicated Hosts, the direct Huawei equivalence layer is DeH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DeH + ECS. Treat DeH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-dedicated-host",
    name: "Azure Dedicated Host",
    generalFunction: "Dedicated Host",
    shortName: "Dedicated Host",
    keywords: ["dedicated", "host", "single tenant", "isolation"],
    cloudProvider: "azure",
    description: "Dedicated physical servers to host Azure VMs with tenant isolation.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DeH"],
    differencesFromHuawei: ["Host group/fault domain model differs.", "Maintenance and allocation controls differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Dedicated Host, the direct Huawei equivalence layer is DeH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DeH + ECS. Treat DeH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-sole-tenant-nodes",
    name: "Sole-tenant Nodes",
    generalFunction: "Dedicated Host",
    shortName: "Sole-tenant Nodes",
    keywords: ["dedicated", "host", "single tenant", "isolation"],
    cloudProvider: "gcp",
    description: "Dedicated host nodes for VM placement isolation and compliance-sensitive workloads.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DeH"],
    differencesFromHuawei: ["Node group and host maintenance semantics differ.", "Placement policies and capacity model differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Sole-tenant Nodes, the direct Huawei equivalence layer is DeH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DeH + ECS. Treat DeH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-ec2-bare-metal-instances",
    name: "EC2 Bare Metal Instances",
    generalFunction: "Bare Metal Compute",
    shortName: "EC2 Bare Metal",
    keywords: ["bare metal", "dedicated", "compute", "single-tenant"],
    cloudProvider: "aws",
    description: "Direct access to underlying server hardware using EC2 bare metal instance types.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["BMS"],
    differencesFromHuawei: ["Instance family and hardware portfolio differ.", "Provisioning lifecycle and automation primitives differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS EC2 Bare Metal Instances, the direct Huawei equivalence layer is BMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: BMS + CBR. Treat BMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-baremetal-infrastructure",
    name: "Azure BareMetal Infrastructure",
    generalFunction: "Bare Metal Compute",
    shortName: "Azure BareMetal",
    keywords: ["bare metal", "dedicated", "compute"],
    cloudProvider: "azure",
    description: "Dedicated bare metal infrastructure for specialized enterprise workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["BMS"],
    differencesFromHuawei: ["Provisioning and region/service availability model differ.", "Operational ownership boundaries differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure BareMetal Infrastructure, the direct Huawei equivalence layer is BMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: BMS + CBR. Treat BMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-bare-metal-solution",
    name: "Bare Metal Solution",
    generalFunction: "Bare Metal Compute",
    shortName: "BMS",
    keywords: ["bare metal", "dedicated", "single tenant", "compute"],
    cloudProvider: "gcp",
    description: "Dedicated bare metal infrastructure for performance and licensing-sensitive workloads.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["BMS"],
    differencesFromHuawei: ["Provisioning model and connectivity topology differ.", "Managed operations scope differs."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Bare Metal Solution, the direct Huawei equivalence layer is BMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: BMS + CBR. Treat BMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-ec2-ami-catalog",
    name: "Amazon Machine Images (AMI)",
    generalFunction: "Image Management",
    shortName: "AMI",
    keywords: ["image", "machine image", "template", "compute"],
    cloudProvider: "aws",
    description: "Machine image catalog used to standardize and provision EC2 workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["IMS"],
    differencesFromHuawei: ["Image lifecycle and sharing permissions differ.", "Region replication workflows differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS Amazon Machine Images (AMI), the direct Huawei equivalence layer is IMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IMS + ECS. Treat IMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-compute-gallery",
    name: "Azure Compute Gallery",
    generalFunction: "Image Management",
    shortName: "Compute Gallery",
    keywords: ["image", "gallery", "template", "vm"],
    cloudProvider: "azure",
    description: "Managed gallery for versioned VM images and regional image distribution.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["IMS"],
    differencesFromHuawei: ["Gallery replication and version model differ.", "Target region publishing controls differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Compute Gallery, the direct Huawei equivalence layer is IMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IMS + ECS. Treat IMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-compute-images",
    name: "Compute Engine Images",
    generalFunction: "Image Management",
    shortName: "Compute Images",
    keywords: ["image", "compute", "template", "vm"],
    cloudProvider: "gcp",
    description: "Custom and public VM images for repeatable instance provisioning.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["IMS"],
    differencesFromHuawei: ["Image family model and deprecation policies differ.", "Project-level sharing semantics differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Compute Engine Images, the direct Huawei equivalence layer is IMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IMS + ECS. Treat IMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS Amazon EKS, the direct Huawei equivalence layer is CCE + CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCE + CCI + SWR + ELB. Treat CCE + CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills cluster control plane plus node compute/storage/network usage; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Kubernetes Service (AKS), the direct Huawei equivalence layer is CCE + CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCE + CCI + SWR + ELB. Treat CCE + CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills cluster management tier plus node compute/storage/network usage; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Google Kubernetes Engine (GKE), the direct Huawei equivalence layer is CCE + CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCE + CCI + SWR + ELB. Treat CCE + CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills cluster management fee plus node compute/storage/network usage; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS Amazon S3, the direct Huawei equivalence layer is OBS + DOS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OBS + OMS + CBR. Treat OBS + DOS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills storage class GB-month, API requests, retrieval, and egress; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Blob Storage, the direct Huawei equivalence layer is OBS + DOS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OBS + OMS + CBR. Treat OBS + DOS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills blob capacity, transactions, retrieval, and egress; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Cloud Storage, the direct Huawei equivalence layer is OBS + DOS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OBS + OMS + CBR. Treat OBS + DOS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills storage class GB-month, operations, retrieval, and egress; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For AWS Amazon RDS, the direct Huawei equivalence layer is RDS + GaussDB + TaurusDB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: RDS + DRS + DBSS. Treat RDS + GaussDB + TaurusDB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills instance/serverless runtime, storage, I/O, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Azure Azure SQL Database, the direct Huawei equivalence layer is RDS + GaussDB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: RDS + DRS + DBSS. Treat RDS + GaussDB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills vCore/DTU or serverless runtime, storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Google Cloud Cloud SQL, the direct Huawei equivalence layer is RDS + GaussDB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: RDS + DRS + DBSS. Treat RDS + GaussDB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills instance runtime, storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS AWS Lambda, the direct Huawei equivalence layer is FunctionGraph; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: FunctionGraph + APIG + SMN. Treat FunctionGraph as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills request count and execution duration with additional network/edge integrations; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Functions, the direct Huawei equivalence layer is FunctionGraph; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: FunctionGraph + APIG + SMN. Treat FunctionGraph as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills execution/request volume and execution time by hosting plan; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Cloud Functions, the direct Huawei equivalence layer is FunctionGraph; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: FunctionGraph + APIG + SMN. Treat FunctionGraph as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills invocation count, compute time, and networking usage; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    generalFunction: "Content Delivery Network (CDN)",
    shortName: "CloudFront",
    keywords: ["cdn", "edge", "cache", "security"],
    cloudProvider: "aws",
    description: "Global edge caching and acceleration service.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/network/cloudfront.png",
    huaweiEquivalentShortNames: ["CDN"],
    differencesFromHuawei: ["Edge rule syntax differs.", "Security integrations differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS Amazon CloudFront, the direct Huawei equivalence layer is CDN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDN + WAF + CCM. Treat CDN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills data transfer out, HTTP/HTTPS requests, and optional edge features; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-front-door",
    name: "Azure Front Door",
    generalFunction: "Content Delivery Network (CDN)",
    shortName: "Front Door",
    keywords: ["cdn", "edge", "security", "routing"],
    cloudProvider: "azure",
    description: "Edge routing, acceleration, and security entry point.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/network/front-doors.png",
    huaweiEquivalentShortNames: ["CDN"],
    differencesFromHuawei: ["Rule engine behavior differs.", "Feature scope differs by tier."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure Front Door, the direct Huawei equivalence layer is CDN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDN + WAF + CCM. Treat CDN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills outbound data transfer, request volume, and rules/security options; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-cdn",
    name: "Cloud CDN",
    generalFunction: "Content Delivery Network (CDN)",
    shortName: "Cloud CDN",
    keywords: ["cdn", "edge", "cache"],
    cloudProvider: "gcp",
    description: "Global edge caching for content acceleration.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/network/cdn.png",
    huaweiEquivalentShortNames: ["CDN"],
    differencesFromHuawei: ["Backend integration model differs.", "Cache rule semantics differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud CDN, the direct Huawei equivalence layer is CDN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDN + WAF + CCM. Treat CDN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills cache egress, cache fill traffic, and request volume; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  hw({
    id: "huawei-cdn",
    name: "Content Delivery Network",
    generalFunction: "Content Delivery Network (CDN)",
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
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS App Runner, the direct Huawei equivalence layer is ; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: . Treat  as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon Kinesis Data Streams, the direct Huawei equivalence layer is DIS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + CDM + DLI. Treat DIS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query/compute runtime, scanned or processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Azure Event Hubs, the direct Huawei equivalence layer is DIS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + CDM + DLI. Treat DIS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills activity/runtime units, compute pools, and stored/processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Google Cloud Google Cloud Pub/Sub, the direct Huawei equivalence layer is DIS + DMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + CDM + DLI. Treat DIS + DMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/processing units, processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon Athena, the direct Huawei equivalence layer is DLI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DLI + DWS + DataArts Fabric. Treat DLI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query runtime/data scanned plus catalog/storage charges; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Azure Synapse Analytics, the direct Huawei equivalence layer is DLI + DWS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DLI + DWS + DataArts Fabric. Treat DLI + DWS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills serverless/dedicated compute runtime and data processed; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Google Cloud BigQuery, the direct Huawei equivalence layer is DWS + DLI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DWS + DLI + CDM. Treat DWS + DLI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills slot/compute runtime plus storage and processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon Redshift, the direct Huawei equivalence layer is DWS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DWS + DLI + CDM. Treat DWS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills cluster/serverless warehouse runtime plus storage and data scanned; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Azure Synapse Dedicated SQL Pool, the direct Huawei equivalence layer is DWS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DWS + DLI + CDM. Treat DWS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills SQL pool/runtime units plus storage and data processing; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS AWS Lake Formation, the direct Huawei equivalence layer is Lake Formation + DataArts Fabric; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + DGC + OBS. Treat Lake Formation + DataArts Fabric as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query/compute runtime, scanned or processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Microsoft Purview, the direct Huawei equivalence layer is DataArts Fabric + DGC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + DGC. Treat DataArts Fabric + DGC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills activity/runtime units, compute pools, and stored/processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Google Cloud Google Cloud Dataplex, the direct Huawei equivalence layer is DataArts Fabric + Lake Formation; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Fabric + Lake Formation. Treat DataArts Fabric + Lake Formation as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/processing units, processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon QuickSight, the direct Huawei equivalence layer is DataArts Insight; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Insight + DWS. Treat DataArts Insight as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query/compute runtime, scanned or processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Power BI, the direct Huawei equivalence layer is DataArts Insight; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Insight + DWS. Treat DataArts Insight as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills activity/runtime units, compute pools, and stored/processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Google Cloud Looker, the direct Huawei equivalence layer is DataArts Insight; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DataArts Insight + DWS. Treat DataArts Insight as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/processing units, processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon EMR, the direct Huawei equivalence layer is MRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MRS + DLI + OBS. Treat MRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query/compute runtime, scanned or processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Azure HDInsight, the direct Huawei equivalence layer is MRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MRS + DLI + OBS. Treat MRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills activity/runtime units, compute pools, and stored/processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Google Cloud Cloud Dataproc, the direct Huawei equivalence layer is MRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MRS + DLI + OBS. Treat MRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/processing units, processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For AWS Amazon CloudWatch, the direct Huawei equivalence layer is AOM + CES + LTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CES + LTS + APM + AOM. Treat AOM + CES + LTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills telemetry ingestion, retention, query volume, and alert executions; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For AWS AWS X-Ray, the direct Huawei equivalence layer is APM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CES + LTS + APM + AOM. Treat APM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills telemetry ingestion, retention, query volume, and alert executions; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For Azure Azure Monitor, the direct Huawei equivalence layer is AOM + CES + LTS + APM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CES + LTS + APM + AOM. Treat AOM + CES + LTS + APM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills ingested/retained telemetry plus query and alert execution volume; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For Google Cloud Google Cloud Operations, the direct Huawei equivalence layer is AOM + APM + LTS + CES; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CES + LTS + APM + AOM. Treat AOM + APM + LTS + CES as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills log/metric/trace ingestion, retention, and query volume; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure App Service, the direct Huawei equivalence layer is ServiceStage + FunctionGraph; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ServiceStage + CCE + APIG. Treat ServiceStage + FunctionGraph as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Run, the direct Huawei equivalence layer is ServiceStage + CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ServiceStage + CCE + APIG. Treat ServiceStage + CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map listing/workspace lifecycle, access controls, and commercial dependencies. For AWS Amazon WorkSpaces, the direct Huawei equivalence layer is Workspace; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: Workspace + IAM + CBH. Treat Workspace as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills per-user/workspace-hour or monthly desktop and bundle pricing; Huawei usually bills offer-specific licensing/usage or seat-based charges. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map listing/workspace lifecycle, access controls, and commercial dependencies. For Azure Azure Virtual Desktop, the direct Huawei equivalence layer is Workspace; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: Workspace + IAM + CBH. Treat Workspace as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills desktop/session host runtime plus user licensing prerequisites; Huawei usually bills offer-specific licensing/usage or seat-based charges. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS AWS Auto Scaling, the direct Huawei equivalence layer is AS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: AS + ECS + CES. Treat AS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Virtual Machine Scale Sets, the direct Huawei equivalence layer is AS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: AS + ECS + CES. Treat AS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Managed Instance Groups, the direct Huawei equivalence layer is AS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: AS + ECS + CES. Treat AS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map listing/workspace lifecycle, access controls, and commercial dependencies. For AWS AWS Marketplace, the direct Huawei equivalence layer is KooGallery; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: KooGallery + IAM. Treat KooGallery as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills seller-defined license or usage meters plus infrastructure usage; Huawei usually bills offer-specific licensing/usage or seat-based charges. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map listing/workspace lifecycle, access controls, and commercial dependencies. For Azure Azure Marketplace, the direct Huawei equivalence layer is KooGallery; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: KooGallery + IAM. Treat KooGallery as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills offer-defined license or usage meters plus infrastructure usage; Huawei usually bills offer-specific licensing/usage or seat-based charges. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
    migrationToHuawei: [
      "Map listing/workspace lifecycle, access controls, and commercial dependencies. For Google Cloud Google Cloud Marketplace, the direct Huawei equivalence layer is KooGallery; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: KooGallery + IAM. Treat KooGallery as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills offer-defined license or usage meters plus infrastructure usage; Huawei usually bills offer-specific licensing/usage or seat-based charges. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-vpc",
    name: "Amazon VPC",
    generalFunction: "Virtual Network",
    shortName: "VPC",
    keywords: ["network", "vpc", "subnet"],
    cloudProvider: "aws",
    description: "Logically isolated virtual network for AWS resources.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["VPC"],
    differencesFromHuawei: ["Routing and endpoint configuration patterns differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS Amazon VPC, the direct Huawei equivalence layer is VPC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPC + ER + EIP + NAT. Treat VPC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-vnet",
    name: "Azure Virtual Network",
    generalFunction: "Virtual Network",
    shortName: "VNet",
    keywords: ["network", "vnet", "subnet"],
    cloudProvider: "azure",
    description: "Private network foundation for Azure workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["VPC"],
    differencesFromHuawei: ["Addressing and peering options differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure Virtual Network, the direct Huawei equivalence layer is VPC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPC + ER + EIP + NAT. Treat VPC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-vpc",
    name: "Google Cloud VPC",
    generalFunction: "Virtual Network",
    shortName: "VPC",
    keywords: ["network", "vpc", "subnet"],
    cloudProvider: "gcp",
    description: "Global virtual private cloud networking service.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["VPC"],
    differencesFromHuawei: ["Global VPC behavior differs from regional constructs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Google Cloud VPC, the direct Huawei equivalence layer is VPC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPC + ER + EIP + NAT. Treat VPC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-transit-gateway",
    name: "AWS Transit Gateway",
    generalFunction: "Network Routing",
    shortName: "Transit Gateway",
    keywords: ["routing", "transit", "network", "hub"],
    cloudProvider: "aws",
    description: "Centralized routing hub connecting VPCs, VPNs, and on-premises networks.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["ER"],
    differencesFromHuawei: ["Route domain and attachment model differ.", "Propagation and association semantics differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS AWS Transit Gateway, the direct Huawei equivalence layer is ER; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ER + VPC + VPN. Treat ER as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-route-tables",
    name: "Azure Route Tables",
    generalFunction: "Network Routing",
    shortName: "Route Tables",
    keywords: ["routing", "route table", "network"],
    cloudProvider: "azure",
    description: "Custom route control for traffic flow across Azure virtual networks.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["ER"],
    differencesFromHuawei: ["User-defined routing and next-hop model differ.", "Association scope and defaults differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure Route Tables, the direct Huawei equivalence layer is ER; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ER + VPC + VPN. Treat ER as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-router",
    name: "Cloud Router",
    generalFunction: "Network Routing",
    shortName: "Cloud Router",
    keywords: ["routing", "bgp", "network"],
    cloudProvider: "gcp",
    description: "Dynamic route exchange service for hybrid and multi-network routing.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["ER"],
    differencesFromHuawei: ["BGP policy and advertisement controls differ.", "Integration touchpoints differ across connectivity services."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud Router, the direct Huawei equivalence layer is ER; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ER + VPC + VPN. Treat ER as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-elastic-ip-address",
    name: "Elastic IP Address",
    generalFunction: "Public IP",
    shortName: "Elastic IP",
    keywords: ["public ip", "elastic ip", "network"],
    cloudProvider: "aws",
    description: "Static public IPv4 addresses for internet-facing workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["EIP"],
    differencesFromHuawei: ["Allocation and association quota model differ.", "Idle address charging behavior differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS Elastic IP Address, the direct Huawei equivalence layer is EIP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EIP + NAT + ELB. Treat EIP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills allocated/attached address hours and associated transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-public-ip-address",
    name: "Azure Public IP Address",
    generalFunction: "Public IP",
    shortName: "Public IP",
    keywords: ["public ip", "ip address", "network"],
    cloudProvider: "azure",
    description: "Public IPv4/IPv6 addresses for inbound and outbound connectivity.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["EIP"],
    differencesFromHuawei: ["SKU/tier behavior and routing preference options differ.", "Attachment scope across resources differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure Public IP Address, the direct Huawei equivalence layer is EIP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EIP + NAT + ELB. Treat EIP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills public IP SKU/availability usage and transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-external-ip-address",
    name: "External IP Address",
    generalFunction: "Public IP",
    shortName: "External IP",
    keywords: ["public ip", "external ip", "network"],
    cloudProvider: "gcp",
    description: "Regional and global external IP addresses for internet-facing services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["EIP"],
    differencesFromHuawei: ["Ephemeral versus reserved addressing model differs.", "Global/regional scope options differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud External IP Address, the direct Huawei equivalence layer is EIP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EIP + NAT + ELB. Treat EIP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills reserved/used external IP pricing and transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-route53",
    name: "Amazon Route 53",
    generalFunction: "DNS",
    shortName: "Route 53",
    keywords: ["dns", "network", "domain"],
    cloudProvider: "aws",
    description: "Highly available DNS and traffic routing service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DNS"],
    differencesFromHuawei: ["Routing policy types and health checks differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS Amazon Route 53, the direct Huawei equivalence layer is DNS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DNS + ELB + CDN. Treat DNS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-dns",
    name: "Azure DNS",
    generalFunction: "DNS",
    shortName: "Azure DNS",
    keywords: ["dns", "network", "domain"],
    cloudProvider: "azure",
    description: "Managed DNS hosting for domain records.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DNS"],
    differencesFromHuawei: ["Zone management and permission model differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure DNS, the direct Huawei equivalence layer is DNS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DNS + ELB + CDN. Treat DNS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-dns",
    name: "Cloud DNS",
    generalFunction: "DNS",
    shortName: "Cloud DNS",
    keywords: ["dns", "network", "domain"],
    cloudProvider: "gcp",
    description: "Scalable authoritative DNS service on Google Cloud.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DNS"],
    differencesFromHuawei: ["IAM integration and logging options differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud DNS, the direct Huawei equivalence layer is DNS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DNS + ELB + CDN. Treat DNS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-elb",
    name: "Elastic Load Balancing",
    generalFunction: "Load Balancing",
    shortName: "ELB",
    keywords: ["load balancer", "network", "traffic"],
    cloudProvider: "aws",
    description: "Managed load balancing across compute targets.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["ELB"],
    differencesFromHuawei: ["Balancer types and listener features differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS Elastic Load Balancing, the direct Huawei equivalence layer is ELB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ELB + EIP + WAF. Treat ELB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills load balancer hours plus processed bytes/new connections/rule evaluations; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-load-balancer",
    name: "Azure Load Balancer",
    generalFunction: "Load Balancing",
    shortName: "Azure LB",
    keywords: ["load balancer", "network", "traffic"],
    cloudProvider: "azure",
    description: "Layer 4 load balancing for inbound and outbound flows.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["ELB"],
    differencesFromHuawei: ["SKU and availability zone behavior differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Load Balancer, the direct Huawei equivalence layer is ELB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ELB + EIP + WAF. Treat ELB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills load balancer rules/data processing and related public IP usage; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-load-balancing",
    name: "Cloud Load Balancing",
    generalFunction: "Load Balancing",
    shortName: "GCLB",
    keywords: ["load balancer", "network", "traffic"],
    cloudProvider: "gcp",
    description: "Global and regional managed load balancing services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["ELB"],
    differencesFromHuawei: ["Global front-end model differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Load Balancing, the direct Huawei equivalence layer is ELB; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ELB + EIP + WAF. Treat ELB as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills forwarding rules/proxies and processed data volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-nat-gateway",
    name: "NAT Gateway",
    generalFunction: "NAT Gateway",
    shortName: "NAT Gateway",
    keywords: ["nat", "egress", "network"],
    cloudProvider: "aws",
    description: "Managed NAT for private subnet internet egress.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["NAT"],
    differencesFromHuawei: ["Throughput and billing model differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS NAT Gateway, the direct Huawei equivalence layer is NAT; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: NAT + EIP + VPC. Treat NAT as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills gateway-hour and processed traffic; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-nat-gateway",
    name: "Azure NAT Gateway",
    generalFunction: "NAT Gateway",
    shortName: "NAT Gateway",
    keywords: ["nat", "egress", "network"],
    cloudProvider: "azure",
    description: "Managed outbound internet connectivity for virtual networks.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["NAT"],
    differencesFromHuawei: ["Subnet association behavior differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure NAT Gateway, the direct Huawei equivalence layer is NAT; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: NAT + EIP + VPC. Treat NAT as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway-hour and processed outbound data; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-nat",
    name: "Cloud NAT",
    generalFunction: "NAT Gateway",
    shortName: "Cloud NAT",
    keywords: ["nat", "egress", "network"],
    cloudProvider: "gcp",
    description: "Network address translation for private Google Cloud resources.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["NAT"],
    differencesFromHuawei: ["Cloud Router integration differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud NAT, the direct Huawei equivalence layer is NAT; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: NAT + EIP + VPC. Treat NAT as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills NAT gateway usage and processed outbound traffic; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-site-to-site-vpn",
    name: "AWS Site-to-Site VPN",
    generalFunction: "VPN Connectivity",
    shortName: "AWS VPN",
    keywords: ["vpn", "network", "site-to-site"],
    cloudProvider: "aws",
    description: "Managed IPSec VPN connectivity to AWS VPC.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["VPN"],
    differencesFromHuawei: ["Tunnel options and failover handling differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS AWS Site-to-Site VPN, the direct Huawei equivalence layer is VPN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPN + ER + DC. Treat VPN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-vpn-gateway",
    name: "Azure VPN Gateway",
    generalFunction: "VPN Connectivity",
    shortName: "VPN Gateway",
    keywords: ["vpn", "network", "site-to-site"],
    cloudProvider: "azure",
    description: "Site-to-site and point-to-site VPN service.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["VPN"],
    differencesFromHuawei: ["Gateway SKUs and throughput limits differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure VPN Gateway, the direct Huawei equivalence layer is VPN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPN + ER + DC. Treat VPN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-vpn",
    name: "Cloud VPN",
    generalFunction: "VPN Connectivity",
    shortName: "Cloud VPN",
    keywords: ["vpn", "network", "site-to-site"],
    cloudProvider: "gcp",
    description: "IPSec VPN connectivity between networks.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["VPN"],
    differencesFromHuawei: ["HA VPN architecture differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud VPN, the direct Huawei equivalence layer is VPN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPN + ER + DC. Treat VPN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-direct-connect",
    name: "AWS Direct Connect",
    generalFunction: "Dedicated Connectivity",
    shortName: "Direct Connect",
    keywords: ["private link", "dedicated connection", "network"],
    cloudProvider: "aws",
    description: "Dedicated private connectivity between AWS and on-premises.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DC"],
    differencesFromHuawei: ["Partner models and virtual interface options differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS AWS Direct Connect, the direct Huawei equivalence layer is DC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DC + ER + VPC. Treat DC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-expressroute",
    name: "Azure ExpressRoute",
    generalFunction: "Dedicated Connectivity",
    shortName: "ExpressRoute",
    keywords: ["private link", "dedicated connection", "network"],
    cloudProvider: "azure",
    description: "Private enterprise connectivity to Azure services.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DC"],
    differencesFromHuawei: ["Peering and redundancy options differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure ExpressRoute, the direct Huawei equivalence layer is DC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DC + ER + VPC. Treat DC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-interconnect",
    name: "Cloud Interconnect",
    generalFunction: "Dedicated Connectivity",
    shortName: "Interconnect",
    keywords: ["private link", "dedicated connection", "network"],
    cloudProvider: "gcp",
    description: "Dedicated and partner private connectivity to Google Cloud.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DC"],
    differencesFromHuawei: ["Attachment and VLAN configuration differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Cloud Interconnect, the direct Huawei equivalence layer is DC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DC + ER + VPC. Treat DC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-privatelink",
    name: "AWS PrivateLink",
    generalFunction: "Private Endpoints",
    shortName: "PrivateLink",
    keywords: ["private endpoint", "network", "service access"],
    cloudProvider: "aws",
    description: "Private access to services over AWS backbone.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["VPCEP"],
    differencesFromHuawei: ["Endpoint service publishing models differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For AWS AWS PrivateLink, the direct Huawei equivalence layer is VPCEP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPCEP + VPC + ER. Treat VPCEP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills resource-hours plus processed traffic, request volume, and data transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-private-link",
    name: "Azure Private Link",
    generalFunction: "Private Endpoints",
    shortName: "Private Link",
    keywords: ["private endpoint", "network", "service access"],
    cloudProvider: "azure",
    description: "Private endpoint connectivity to Azure services.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["VPCEP"],
    differencesFromHuawei: ["DNS integration flow differs."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Azure Azure Private Link, the direct Huawei equivalence layer is VPCEP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPCEP + VPC + ER. Treat VPCEP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway/resource-hours plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-private-service-connect",
    name: "Private Service Connect",
    generalFunction: "Private Endpoints",
    shortName: "PSC",
    keywords: ["private endpoint", "network", "service access"],
    cloudProvider: "gcp",
    description: "Private consumption and publishing of services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["VPCEP"],
    differencesFromHuawei: ["Consumer/producer endpoint abstractions differ."],
    migrationToHuawei: [
      "Map topology, route propagation, policy order, and failover behavior. For Google Cloud Private Service Connect, the direct Huawei equivalence layer is VPCEP; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: VPCEP + VPC + ER. Treat VPCEP as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills resource/runtime plus processed traffic and outbound transfer; Huawei usually bills EIP/ELB/NAT/ER/DC resource-hours, bandwidth plans, and processed traffic. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-ecr",
    name: "Amazon ECR",
    generalFunction: "Container Registry",
    shortName: "ECR",
    keywords: ["container registry", "image repo", "artifact"],
    cloudProvider: "aws",
    description: "Managed container registry for Docker and OCI images.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SWR"],
    differencesFromHuawei: ["Repository policies and scanning features differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS Amazon ECR, the direct Huawei equivalence layer is SWR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SWR + CCE. Treat SWR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-acr",
    name: "Azure Container Registry",
    generalFunction: "Container Registry",
    shortName: "ACR",
    keywords: ["container registry", "image repo", "artifact"],
    cloudProvider: "azure",
    description: "Private registry for container images and artifacts.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SWR"],
    differencesFromHuawei: ["Geo-replication and RBAC model differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Container Registry, the direct Huawei equivalence layer is SWR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SWR + CCE. Treat SWR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-artifact-registry-containers",
    name: "Artifact Registry (Containers)",
    generalFunction: "Container Registry",
    shortName: "Artifact Registry",
    keywords: ["container registry", "image repo", "artifact"],
    cloudProvider: "gcp",
    description: "Google Cloud registry for container images and packages.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["SWR"],
    differencesFromHuawei: ["Repository format and permission controls differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Artifact Registry (Containers), the direct Huawei equivalence layer is SWR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SWR + CCE. Treat SWR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-dynamodb",
    name: "Amazon DynamoDB",
    generalFunction: "Managed NoSQL Database",
    shortName: "DynamoDB",
    keywords: ["nosql", "key-value", "database"],
    cloudProvider: "aws",
    description: "Serverless key-value and document database service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["GeminiDB", "DDS"],
    differencesFromHuawei: ["Data models and consistency defaults differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For AWS Amazon DynamoDB, the direct Huawei equivalence layer is GeminiDB + DDS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DDS + GeminiDB + DRS. Treat GeminiDB + DDS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills provisioned/on-demand throughput plus storage and backup; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-cosmos-db",
    name: "Azure Cosmos DB",
    generalFunction: "Managed NoSQL Database",
    shortName: "Cosmos DB",
    keywords: ["nosql", "document", "database"],
    cloudProvider: "azure",
    description: "Globally distributed multi-model NoSQL database.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["GeminiDB", "DDS"],
    differencesFromHuawei: ["API model and partitioning behavior differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Azure Azure Cosmos DB, the direct Huawei equivalence layer is GeminiDB + DDS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DDS + GeminiDB + DRS. Treat GeminiDB + DDS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills throughput units/requests plus storage and backup; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-firestore",
    name: "Cloud Firestore",
    generalFunction: "Managed NoSQL Database",
    shortName: "Firestore",
    keywords: ["nosql", "document", "database"],
    cloudProvider: "gcp",
    description: "Serverless document database for app and backend workloads.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["GeminiDB", "DDS"],
    differencesFromHuawei: ["Client SDK and query/index behavior differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Google Cloud Cloud Firestore, the direct Huawei equivalence layer is GeminiDB + DDS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DDS + GeminiDB + DRS. Treat GeminiDB + DDS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills node/throughput/runtime plus storage and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-neptune",
    name: "Amazon Neptune",
    generalFunction: "Graph Database",
    shortName: "Neptune",
    keywords: ["graph", "database", "relationships", "rdf"],
    cloudProvider: "aws",
    description: "Managed graph database service for property graph and RDF workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["GES"],
    differencesFromHuawei: ["Query engines and operational tooling differ.", "Graph model feature coverage differs."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For AWS Amazon Neptune, the direct Huawei equivalence layer is GES; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: GES + DGC. Treat GES as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills instance or serverless capacity runtime plus storage, I/O, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-cosmos-db-gremlin",
    name: "Azure Cosmos DB (Gremlin)",
    generalFunction: "Graph Database",
    shortName: "Cosmos DB Gremlin",
    keywords: ["graph", "database", "gremlin", "relationships"],
    cloudProvider: "azure",
    description: "Graph database capability of Azure Cosmos DB using Gremlin API.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["GES"],
    differencesFromHuawei: ["Partitioning and consistency model differ.", "API compatibility nuances differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Azure Azure Cosmos DB (Gremlin), the direct Huawei equivalence layer is GES; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: GES + DGC. Treat GES as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills vCore/DTU or serverless runtime plus storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-elasticache",
    name: "Amazon ElastiCache",
    generalFunction: "Caching",
    shortName: "ElastiCache",
    keywords: ["redis", "cache", "in-memory"],
    cloudProvider: "aws",
    description: "Managed in-memory cache service for Redis and Memcached.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DCS"],
    differencesFromHuawei: ["Cluster topology options differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For AWS Amazon ElastiCache, the direct Huawei equivalence layer is DCS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DCS. Treat DCS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills instance or serverless capacity runtime plus storage, I/O, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-cache-for-redis",
    name: "Azure Cache for Redis",
    generalFunction: "Caching",
    shortName: "Azure Redis",
    keywords: ["redis", "cache", "in-memory"],
    cloudProvider: "azure",
    description: "Managed Redis cache for low-latency application access.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DCS"],
    differencesFromHuawei: ["Tiering and persistence options differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Azure Azure Cache for Redis, the direct Huawei equivalence layer is DCS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DCS. Treat DCS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills vCore/DTU or serverless runtime plus storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-memorystore",
    name: "Memorystore",
    generalFunction: "Caching",
    shortName: "Memorystore",
    keywords: ["redis", "cache", "in-memory"],
    cloudProvider: "gcp",
    description: "Managed Redis and Memcached in-memory data store.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DCS"],
    differencesFromHuawei: ["Scaling and network integration differ."],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Google Cloud Memorystore, the direct Huawei equivalence layer is DCS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DCS. Treat DCS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills instance/runtime pricing plus storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-sqs",
    name: "Amazon SQS",
    generalFunction: "Messaging",
    shortName: "SQS",
    keywords: ["queue", "messaging", "asynchronous"],
    cloudProvider: "aws",
    description: "Managed message queue service for decoupled systems.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DMS"],
    differencesFromHuawei: ["Queue semantics and visibility settings differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS Amazon SQS, the direct Huawei equivalence layer is DMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DMS + SMN + EventGrid. Treat DMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills request/message volume and throughput/storage where applicable; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-service-bus",
    name: "Azure Service Bus",
    generalFunction: "Messaging",
    shortName: "Service Bus",
    keywords: ["queue", "topic", "messaging"],
    cloudProvider: "azure",
    description: "Enterprise message broker with queues and topics.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DMS"],
    differencesFromHuawei: ["Protocol support and ordering guarantees differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Service Bus, the direct Huawei equivalence layer is DMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DMS + SMN + EventGrid. Treat DMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills operation/message volume plus throughput tier capacity; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-pubsub-messaging",
    name: "Pub/Sub",
    generalFunction: "Messaging",
    shortName: "Pub/Sub",
    keywords: ["queue", "topic", "messaging"],
    cloudProvider: "gcp",
    description: "Asynchronous messaging service with pub/sub delivery.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DMS", "DIS"],
    differencesFromHuawei: ["Ack/dead-letter handling differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Pub/Sub, the direct Huawei equivalence layer is DMS + DIS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DMS + SMN + EventGrid. Treat DMS + DIS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills message ingestion/delivery volume and retained data; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-api-gateway",
    name: "Amazon API Gateway",
    generalFunction: "API Management",
    shortName: "API Gateway",
    keywords: ["api", "gateway", "management"],
    cloudProvider: "aws",
    description: "Managed API gateway for REST, HTTP, and WebSocket APIs.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["APIG"],
    differencesFromHuawei: ["Policy and auth integrations differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS Amazon API Gateway, the direct Huawei equivalence layer is APIG; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: APIG + IAM + WAF. Treat APIG as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills API request volume, caching, and optional edge/regional options; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-api-management",
    name: "Azure API Management",
    generalFunction: "API Management",
    shortName: "APIM",
    keywords: ["api", "gateway", "management"],
    cloudProvider: "azure",
    description: "API publishing, management, and protection platform.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["APIG"],
    differencesFromHuawei: ["Policy syntax and gateway tiers differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure API Management, the direct Huawei equivalence layer is APIG; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: APIG + IAM + WAF. Treat APIG as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills gateway unit capacity and request volume by APIM tier; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-apigee",
    name: "Apigee",
    generalFunction: "API Management",
    shortName: "Apigee",
    keywords: ["api", "gateway", "management"],
    cloudProvider: "gcp",
    description: "Enterprise API management and analytics platform.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["APIG"],
    differencesFromHuawei: ["Developer portal and policy capabilities differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Apigee, the direct Huawei equivalence layer is APIG; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: APIG + IAM + WAF. Treat APIG as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills request volume and gateway/proxy runtime by product tier; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-eventbridge",
    name: "Amazon EventBridge",
    generalFunction: "Event Bus",
    shortName: "EventBridge",
    keywords: ["event", "event bus", "integration"],
    cloudProvider: "aws",
    description: "Event routing and integration bus for AWS and SaaS events.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["EventGrid"],
    differencesFromHuawei: ["Rule syntax and partner integrations differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS Amazon EventBridge, the direct Huawei equivalence layer is EventGrid; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EventGrid + SMN + DMS. Treat EventGrid as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills published events, matched rules, and target invocations; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-event-grid",
    name: "Azure Event Grid",
    generalFunction: "Event Bus",
    shortName: "Event Grid",
    keywords: ["event", "event bus", "integration"],
    cloudProvider: "azure",
    description: "Managed event routing for reactive cloud applications.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["EventGrid"],
    differencesFromHuawei: ["Subscription filters and delivery options differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Event Grid, the direct Huawei equivalence layer is EventGrid; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EventGrid + SMN + DMS. Treat EventGrid as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills operations/events and delivery attempts by tier; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-eventarc",
    name: "Eventarc",
    generalFunction: "Event Bus",
    shortName: "Eventarc",
    keywords: ["event", "event bus", "integration"],
    cloudProvider: "gcp",
    description: "Event routing between Google Cloud services and targets.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["EventGrid"],
    differencesFromHuawei: ["Trigger and transport behavior differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Eventarc, the direct Huawei equivalence layer is EventGrid; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EventGrid + SMN + DMS. Treat EventGrid as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills event volume and downstream delivery/processing usage; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-iam",
    name: "AWS Identity and Access Management",
    generalFunction: "Identity Management",
    shortName: "IAM",
    keywords: ["identity", "access", "authorization"],
    cloudProvider: "aws",
    description: "Identity and permission management for AWS resources.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["IAM", "IAM Identity Center"],
    differencesFromHuawei: ["Role federation and policy language differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Identity and Access Management, the direct Huawei equivalence layer is IAM + IAM Identity Center; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IAM + IAM Identity Center + CBH. Treat IAM + IAM Identity Center as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-entra-id",
    name: "Microsoft Entra ID",
    generalFunction: "Identity Management",
    shortName: "Entra ID",
    keywords: ["identity", "sso", "access"],
    cloudProvider: "azure",
    description: "Cloud identity and access management platform.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["IAM", "IAM Identity Center"],
    differencesFromHuawei: ["Directory model and conditional access differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Microsoft Entra ID, the direct Huawei equivalence layer is IAM + IAM Identity Center; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IAM + IAM Identity Center + CBH. Treat IAM + IAM Identity Center as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-iam",
    name: "Cloud IAM",
    generalFunction: "Identity Management",
    shortName: "Cloud IAM",
    keywords: ["identity", "access", "authorization"],
    cloudProvider: "gcp",
    description: "Role-based identity and access controls for GCP resources.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["IAM"],
    differencesFromHuawei: ["Hierarchy and role inheritance differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Cloud IAM, the direct Huawei equivalence layer is IAM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IAM + IAM Identity Center + CBH. Treat IAM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-cloudtrail",
    name: "AWS CloudTrail",
    generalFunction: "Audit and Trace",
    shortName: "CloudTrail",
    keywords: ["audit", "trace", "compliance"],
    cloudProvider: "aws",
    description: "Audit trail of account activity and API operations.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CTS"],
    differencesFromHuawei: ["Event categories and retention defaults differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS CloudTrail, the direct Huawei equivalence layer is CTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CTS + LTS + SecMaster. Treat CTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-activity-log",
    name: "Azure Activity Log",
    generalFunction: "Audit and Trace",
    shortName: "Activity Log",
    keywords: ["audit", "trace", "compliance"],
    cloudProvider: "azure",
    description: "Platform-level activity audit logs for Azure resources.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CTS"],
    differencesFromHuawei: ["Log scope and schema differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Activity Log, the direct Huawei equivalence layer is CTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CTS + LTS + SecMaster. Treat CTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-audit-logs",
    name: "Cloud Audit Logs",
    generalFunction: "Audit and Trace",
    shortName: "Audit Logs",
    keywords: ["audit", "trace", "compliance"],
    cloudProvider: "gcp",
    description: "Administrative and data access audit logging.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CTS"],
    differencesFromHuawei: ["Audit log categories and sinks differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Cloud Audit Logs, the direct Huawei equivalence layer is CTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CTS + LTS + SecMaster. Treat CTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-cloudwatch-logs",
    name: "CloudWatch Logs",
    generalFunction: "Log Management",
    shortName: "CloudWatch Logs",
    keywords: ["logs", "observability", "search"],
    cloudProvider: "aws",
    description: "Centralized log collection and query service on AWS.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["LTS"],
    differencesFromHuawei: ["Query language and retention controls differ."],
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For AWS CloudWatch Logs, the direct Huawei equivalence layer is LTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: LTS. Treat LTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills telemetry ingestion, retention, query volume, and alert executions; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-monitor-logs",
    name: "Azure Monitor Logs",
    generalFunction: "Log Management",
    shortName: "Monitor Logs",
    keywords: ["logs", "observability", "search"],
    cloudProvider: "azure",
    description: "Log analytics platform for Azure and custom workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["LTS"],
    differencesFromHuawei: ["Query model and workspace structure differ."],
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For Azure Azure Monitor Logs, the direct Huawei equivalence layer is LTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: LTS. Treat LTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills ingested/retained telemetry plus query and alert execution volume; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-logging",
    name: "Cloud Logging",
    generalFunction: "Log Management",
    shortName: "Cloud Logging",
    keywords: ["logs", "observability", "search"],
    cloudProvider: "gcp",
    description: "Centralized logging, routing, and analysis platform.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["LTS"],
    differencesFromHuawei: ["Sink/export and indexing behavior differ."],
    migrationToHuawei: [
      "Map telemetry schema, retention, alert semantics, and audit/compliance workflows. For Google Cloud Cloud Logging, the direct Huawei equivalence layer is LTS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: LTS. Treat LTS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills log/metric/trace ingestion, retention, and query volume; Huawei usually bills CES/LTS/APM/AOM ingestion, retention, analysis, and alerting volume. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-sns",
    name: "Amazon SNS",
    generalFunction: "Notification Messaging",
    shortName: "SNS",
    keywords: ["notification", "message", "alert"],
    cloudProvider: "aws",
    description: "Pub/sub notifications for applications and users.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SMN"],
    differencesFromHuawei: ["Protocol and subscription management differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS Amazon SNS, the direct Huawei equivalence layer is SMN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SMN + DMS. Treat SMN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills publish/delivery requests and protocol-specific delivery charges; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-notification-hubs",
    name: "Azure Notification Hubs",
    generalFunction: "Notification Messaging",
    shortName: "Notification Hubs",
    keywords: ["notification", "message", "alert"],
    cloudProvider: "azure",
    description: "Push notification service for mobile and backend systems.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SMN"],
    differencesFromHuawei: ["Push device platform integration differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Notification Hubs, the direct Huawei equivalence layer is SMN; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SMN + DMS. Treat SMN as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills hub tier/capacity and push operation volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-kms",
    name: "AWS Key Management Service",
    generalFunction: "Key Management and Encryption",
    shortName: "KMS",
    keywords: ["encryption", "kms", "key management"],
    cloudProvider: "aws",
    description: "Managed key management and cryptographic controls.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DEW"],
    differencesFromHuawei: ["Key policies and grant models differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Key Management Service, the direct Huawei equivalence layer is DEW; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DEW + CCM. Treat DEW as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills KMS key storage and API request volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-key-vault",
    name: "Azure Key Vault",
    generalFunction: "Key Management and Encryption",
    shortName: "Key Vault",
    keywords: ["encryption", "kms", "key management"],
    cloudProvider: "azure",
    description: "Key, secret, and certificate management service.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DEW", "CCM"],
    differencesFromHuawei: ["Secret/cert integration patterns differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Key Vault, the direct Huawei equivalence layer is DEW + CCM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DEW + CCM. Treat DEW + CCM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills key operations, key versions, and premium key material tiers; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-kms",
    name: "Cloud KMS",
    generalFunction: "Key Management and Encryption",
    shortName: "Cloud KMS",
    keywords: ["encryption", "kms", "key management"],
    cloudProvider: "gcp",
    description: "Centralized encryption key management service.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DEW"],
    differencesFromHuawei: ["IAM and keyring hierarchy differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Cloud KMS, the direct Huawei equivalence layer is DEW; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DEW + CCM. Treat DEW as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills key versions and cryptographic operation requests; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-certificate-manager",
    name: "AWS Certificate Manager",
    generalFunction: "Certificate Security",
    shortName: "ACM",
    keywords: ["certificate", "tls", "pki", "security"],
    cloudProvider: "aws",
    description: "Provisioning and lifecycle management for SSL/TLS certificates.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CCM"],
    differencesFromHuawei: ["Certificate issuance and DNS validation flow differ.", "Private CA integration differs."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Certificate Manager, the direct Huawei equivalence layer is CCM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCM + DEW. Treat CCM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-key-vault-certificates",
    name: "Azure Key Vault Certificates",
    generalFunction: "Certificate Security",
    shortName: "Key Vault Certs",
    keywords: ["certificate", "tls", "pki", "security"],
    cloudProvider: "azure",
    description: "Certificate lifecycle management capability within Azure Key Vault.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CCM"],
    differencesFromHuawei: ["Certificate policy and issuer integration differ.", "Lifecycle automation model differs."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Key Vault Certificates, the direct Huawei equivalence layer is CCM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCM + DEW. Treat CCM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-certificate-manager",
    name: "Certificate Manager",
    generalFunction: "Certificate Security",
    shortName: "Certificate Manager",
    keywords: ["certificate", "tls", "pki", "security"],
    cloudProvider: "gcp",
    description: "Managed certificate provisioning and lifecycle operations for Google Cloud services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CCM"],
    differencesFromHuawei: ["Attachment and certificate map model differ.", "Issuance automation differs."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Certificate Manager, the direct Huawei equivalence layer is CCM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCM + DEW. Treat CCM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-systems-manager-session-manager",
    name: "AWS Systems Manager Session Manager",
    generalFunction: "Privileged Access Security",
    shortName: "Session Manager",
    keywords: ["privileged access", "bastion", "audit", "security"],
    cloudProvider: "aws",
    description: "Secure shell/session access with centralized logging and controlled privileged access.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CBH"],
    differencesFromHuawei: ["Agent and session brokering model differ.", "Command/session audit controls differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Systems Manager Session Manager, the direct Huawei equivalence layer is CBH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBH + IAM. Treat CBH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-bastion",
    name: "Azure Bastion",
    generalFunction: "Privileged Access Security",
    shortName: "Bastion",
    keywords: ["privileged access", "bastion", "security", "audit"],
    cloudProvider: "azure",
    description: "Managed bastion host service for secure administrative access to private workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CBH"],
    differencesFromHuawei: ["Session model and identity integration differ.", "Connectivity and protocol behavior differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Bastion, the direct Huawei equivalence layer is CBH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBH + IAM. Treat CBH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-iap-tcp-forwarding",
    name: "IAP TCP Forwarding",
    generalFunction: "Privileged Access Security",
    shortName: "IAP TCP",
    keywords: ["privileged access", "security", "bastion", "zero trust"],
    cloudProvider: "gcp",
    description: "Identity-aware secure administrative access to private compute resources.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CBH"],
    differencesFromHuawei: ["Identity-aware proxy access model differs.", "Audit telemetry and policy granularity differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud IAP TCP Forwarding, the direct Huawei equivalence layer is CBH; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBH + IAM. Treat CBH as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-waf",
    name: "AWS WAF",
    generalFunction: "Web and API Protection",
    shortName: "AWS WAF",
    keywords: ["waf", "web security", "attack prevention"],
    cloudProvider: "aws",
    description: "Web application firewall for HTTP(S) workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["WAF"],
    differencesFromHuawei: ["Managed rule groups and ACL behavior differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS WAF, the direct Huawei equivalence layer is WAF; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: WAF + CFW + DDoS. Treat WAF as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills web ACL/rule count and inspected request volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-waf",
    name: "Azure Web Application Firewall",
    generalFunction: "Web and API Protection",
    shortName: "Azure WAF",
    keywords: ["waf", "web security", "attack prevention"],
    cloudProvider: "azure",
    description: "Managed WAF on Azure application gateways/front doors.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["WAF"],
    differencesFromHuawei: ["Policy model and tuning workflow differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Web Application Firewall, the direct Huawei equivalence layer is WAF; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: WAF + CFW + DDoS. Treat WAF as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills WAF policy tier and processed requests; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-armor",
    name: "Cloud Armor",
    generalFunction: "Web and API Protection",
    shortName: "Cloud Armor",
    keywords: ["waf", "ddos", "web security"],
    cloudProvider: "gcp",
    description: "DDoS and WAF protection for internet-facing services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["WAF", "DDoS"],
    differencesFromHuawei: ["Security policy semantics differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Cloud Armor, the direct Huawei equivalence layer is WAF + DDoS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: WAF + CFW + DDoS. Treat WAF + DDoS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/rule charges and protected request volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-network-firewall",
    name: "AWS Network Firewall",
    generalFunction: "Network Threat Protection",
    shortName: "Network Firewall",
    keywords: ["firewall", "network security", "threat", "ddos"],
    cloudProvider: "aws",
    description: "Managed network firewall for VPC traffic inspection and threat prevention.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CFW", "DDoS"],
    differencesFromHuawei: ["Rule group model and stateful inspection semantics differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Network Firewall, the direct Huawei equivalence layer is CFW + DDoS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CFW + DDoS + SecMaster. Treat CFW + DDoS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-firewall",
    name: "Azure Firewall",
    generalFunction: "Network Threat Protection",
    shortName: "Azure Firewall",
    keywords: ["firewall", "network security", "threat"],
    cloudProvider: "azure",
    description: "Managed cloud-native firewall service for centralized network threat protection.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CFW", "DDoS"],
    differencesFromHuawei: ["Policy hierarchy and rule collection behavior differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Firewall, the direct Huawei equivalence layer is CFW + DDoS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CFW + DDoS + SecMaster. Treat CFW + DDoS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-firewall-rules",
    name: "VPC Firewall Rules",
    generalFunction: "Network Threat Protection",
    shortName: "Firewall Rules",
    keywords: ["firewall", "network security", "threat"],
    cloudProvider: "gcp",
    description: "Ingress/egress firewall controls for workload-level network security protection.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CFW", "DDoS"],
    differencesFromHuawei: ["Rule target model and distributed enforcement differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud VPC Firewall Rules, the direct Huawei equivalence layer is CFW + DDoS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CFW + DDoS + SecMaster. Treat CFW + DDoS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-macie",
    name: "Amazon Macie",
    generalFunction: "Data Security Governance",
    shortName: "Macie",
    keywords: ["data security", "classification", "governance", "sensitive data"],
    cloudProvider: "aws",
    description: "Sensitive data discovery and classification service for data governance and protection.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DSC"],
    differencesFromHuawei: ["Discovery scope and managed data identifier model differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS Amazon Macie, the direct Huawei equivalence layer is DSC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DSC + DBSS + SecMaster. Treat DSC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-purview-data-security",
    name: "Microsoft Purview Data Security",
    generalFunction: "Data Security Governance",
    shortName: "Purview Data Security",
    keywords: ["data security", "classification", "governance", "protection"],
    cloudProvider: "azure",
    description: "Data security and governance controls for sensitive data discovery and policy enforcement.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DSC"],
    differencesFromHuawei: ["Policy model and integration scope differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Microsoft Purview Data Security, the direct Huawei equivalence layer is DSC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DSC + DBSS + SecMaster. Treat DSC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-security-health-advisor",
    name: "Security Health Analytics",
    generalFunction: "Data Security Governance",
    shortName: "Security Health",
    keywords: ["data security", "governance", "security posture", "compliance"],
    cloudProvider: "gcp",
    description: "Security posture and governance insights for identifying sensitive data and misconfiguration risks.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DSC"],
    differencesFromHuawei: ["Risk finding model and governance controls differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Security Health Analytics, the direct Huawei equivalence layer is DSC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DSC + DBSS + SecMaster. Treat DSC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-rds-database-activity-streams",
    name: "RDS Database Activity Streams",
    generalFunction: "Database Security",
    shortName: "DB Activity Streams",
    keywords: ["database security", "audit", "protection", "activity monitoring"],
    cloudProvider: "aws",
    description: "Real-time database activity monitoring for security auditing and anomaly detection.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DBSS"],
    differencesFromHuawei: ["Activity feed architecture and integration pattern differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS RDS Database Activity Streams, the direct Huawei equivalence layer is DBSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DBSS + DSC. Treat DBSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-defender-for-sql",
    name: "Microsoft Defender for SQL",
    generalFunction: "Database Security",
    shortName: "Defender for SQL",
    keywords: ["database security", "audit", "protection", "threat detection"],
    cloudProvider: "azure",
    description: "Threat detection and vulnerability assessment for Azure SQL and SQL Server workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DBSS"],
    differencesFromHuawei: ["Threat detection rule sets and assessment workflows differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Microsoft Defender for SQL, the direct Huawei equivalence layer is DBSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DBSS + DSC. Treat DBSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-sql-security-insights",
    name: "Cloud SQL Security Insights",
    generalFunction: "Database Security",
    shortName: "SQL Security",
    keywords: ["database security", "audit", "protection", "compliance"],
    cloudProvider: "gcp",
    description: "Security and audit-focused controls for Cloud SQL databases including IAM and logging integration.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DBSS"],
    differencesFromHuawei: ["Operational model and control surface differ.", "Audit integration patterns differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Cloud SQL Security Insights, the direct Huawei equivalence layer is DBSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DBSS + DSC. Treat DBSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-inspector-container-security",
    name: "Amazon Inspector (Container Security)",
    generalFunction: "Container Security",
    shortName: "Inspector",
    keywords: ["container security", "vulnerability", "image scanning", "runtime"],
    cloudProvider: "aws",
    description: "Automated vulnerability assessment for container images and workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CGS"],
    differencesFromHuawei: ["Scanning integration points and findings taxonomy differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS Amazon Inspector (Container Security), the direct Huawei equivalence layer is CGS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CGS + CCE + SWR. Treat CGS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-defender-for-containers",
    name: "Microsoft Defender for Containers",
    generalFunction: "Container Security",
    shortName: "Defender Containers",
    keywords: ["container security", "vulnerability", "runtime protection"],
    cloudProvider: "azure",
    description: "Container security posture and threat protection in Azure workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CGS"],
    differencesFromHuawei: ["Threat detection integrations and policy model differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Microsoft Defender for Containers, the direct Huawei equivalence layer is CGS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CGS + CCE + SWR. Treat CGS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-artifact-analysis-container-security",
    name: "Artifact Analysis",
    generalFunction: "Container Security",
    shortName: "Artifact Analysis",
    keywords: ["container security", "vulnerability", "image scanning"],
    cloudProvider: "gcp",
    description: "Container image vulnerability scanning and software supply chain analysis service.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CGS"],
    differencesFromHuawei: ["Scan metadata and vulnerability feed model differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Artifact Analysis, the direct Huawei equivalence layer is CGS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CGS + CCE + SWR. Treat CGS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-backup-vault-lock-ransomware",
    name: "AWS Backup Vault Lock",
    generalFunction: "Anti-Ransomware Security",
    shortName: "Vault Lock",
    keywords: ["ransomware", "immutable backup", "security", "protection"],
    cloudProvider: "aws",
    description: "Immutable backup retention controls to protect recovery points from tampering and ransomware impact.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["HSS", "CBR"],
    differencesFromHuawei: ["Immutability lock model and policy enforcement differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS AWS Backup Vault Lock, the direct Huawei equivalence layer is HSS + CBR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: HSS + CBR + SecMaster. Treat HSS + CBR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-backup-immutable-vault",
    name: "Azure Backup (Immutable Vault)",
    generalFunction: "Anti-Ransomware Security",
    shortName: "Immutable Vault",
    keywords: ["ransomware", "immutable backup", "security", "protection"],
    cloudProvider: "azure",
    description: "Immutable vault capabilities for backup hardening against ransomware and malicious deletion.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["HSS", "CBR"],
    differencesFromHuawei: ["Vault immutability and policy controls differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Azure Backup (Immutable Vault), the direct Huawei equivalence layer is HSS + CBR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: HSS + CBR + SecMaster. Treat HSS + CBR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-backup-immutable-protection",
    name: "Backup and DR (Immutable Protection)",
    generalFunction: "Anti-Ransomware Security",
    shortName: "Immutable Backup",
    keywords: ["ransomware", "immutable backup", "security", "protection"],
    cloudProvider: "gcp",
    description: "Backup hardening and retention controls for ransomware-resilient recovery posture.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["HSS", "CBR"],
    differencesFromHuawei: ["Backup immutability implementation and policy workflow differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Backup and DR (Immutable Protection), the direct Huawei equivalence layer is HSS + CBR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: HSS + CBR + SecMaster. Treat HSS + CBR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-guardduty",
    name: "Amazon GuardDuty",
    generalFunction: "Security Operations",
    shortName: "GuardDuty",
    keywords: ["soc", "security operations", "threat detection"],
    cloudProvider: "aws",
    description: "Threat detection and continuous security monitoring.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SecMaster", "HSS"],
    differencesFromHuawei: ["Threat intel feeds and response automation differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For AWS Amazon GuardDuty, the direct Huawei equivalence layer is SecMaster + HSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SecMaster + CTS + LTS. Treat SecMaster + HSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills protected resources, rule/policy count, request/event volume, or scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-defender-for-cloud",
    name: "Microsoft Defender for Cloud",
    generalFunction: "Security Operations",
    shortName: "Defender for Cloud",
    keywords: ["soc", "security operations", "threat detection"],
    cloudProvider: "azure",
    description: "Cloud security posture and workload threat protection.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SecMaster", "HSS", "CGS"],
    differencesFromHuawei: ["Recommendation engine and regulatory baselines differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Azure Microsoft Defender for Cloud, the direct Huawei equivalence layer is SecMaster + HSS + CGS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SecMaster + CTS + LTS. Treat SecMaster + HSS + CGS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-security-command-center",
    name: "Security Command Center",
    generalFunction: "Security Operations",
    shortName: "SCC",
    keywords: ["soc", "security operations", "threat detection"],
    cloudProvider: "gcp",
    description: "Security and risk management platform for GCP resources.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["SecMaster"],
    differencesFromHuawei: ["Finding taxonomy and integrations differ."],
    migrationToHuawei: [
      "Map detection/prevention policy scope, enforcement points, and response workflows. For Google Cloud Security Command Center, the direct Huawei equivalence layer is SecMaster; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SecMaster + CTS + LTS. Treat SecMaster as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills policy/protected-resource tiers plus request/event/scan volume; Huawei usually bills WAF/CFW/DEW/DBSS/DSC billing by edition, protected assets, requests/events, or scans. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-ebs",
    name: "Amazon EBS",
    generalFunction: "Block Storage",
    shortName: "EBS",
    keywords: ["block storage", "disk", "volume"],
    cloudProvider: "aws",
    description: "Persistent block storage volumes for EC2 workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["EVS", "DSS"],
    differencesFromHuawei: ["Volume classes and performance tuning differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS Amazon EBS, the direct Huawei equivalence layer is EVS + DSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EVS + CBR. Treat EVS + DSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills GB-month capacity, request operations, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-managed-disks",
    name: "Azure Managed Disks",
    generalFunction: "Block Storage",
    shortName: "Managed Disks",
    keywords: ["block storage", "disk", "volume"],
    cloudProvider: "azure",
    description: "Managed persistent disks for Azure virtual machines.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["EVS", "DSS"],
    differencesFromHuawei: ["Disk tiers and bursting behavior differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Managed Disks, the direct Huawei equivalence layer is EVS + DSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EVS + CBR. Treat EVS + DSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills GB-month capacity, transaction counts, retrieval/snapshot, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-persistent-disk",
    name: "Persistent Disk",
    generalFunction: "Block Storage",
    shortName: "PD",
    keywords: ["block storage", "disk", "volume"],
    cloudProvider: "gcp",
    description: "Persistent block storage for Compute Engine instances.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["EVS"],
    differencesFromHuawei: ["Regional/zone replication options differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Persistent Disk, the direct Huawei equivalence layer is EVS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: EVS + CBR. Treat EVS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills GB-month capacity, operation classes, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-efs",
    name: "Amazon EFS",
    generalFunction: "File Storage",
    shortName: "EFS",
    keywords: ["file storage", "nfs", "shared storage"],
    cloudProvider: "aws",
    description: "Elastic shared file storage service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SFS"],
    differencesFromHuawei: ["Performance modes and lifecycle policy differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS Amazon EFS, the direct Huawei equivalence layer is SFS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SFS + CBR. Treat SFS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills GB-month capacity, request operations, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-files",
    name: "Azure Files",
    generalFunction: "File Storage",
    shortName: "Azure Files",
    keywords: ["file storage", "smb", "shared storage"],
    cloudProvider: "azure",
    description: "Managed SMB/NFS file shares for cloud and hybrid use.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SFS"],
    differencesFromHuawei: ["Protocol and tiering options differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Files, the direct Huawei equivalence layer is SFS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SFS + CBR. Treat SFS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills GB-month capacity, transaction counts, retrieval/snapshot, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-filestore",
    name: "Filestore",
    generalFunction: "File Storage",
    shortName: "Filestore",
    keywords: ["file storage", "nfs", "shared storage"],
    cloudProvider: "gcp",
    description: "Managed NFS file storage for application workloads.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["SFS"],
    differencesFromHuawei: ["Service tier and scaling model differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Filestore, the direct Huawei equivalence layer is SFS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SFS + CBR. Treat SFS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills GB-month capacity, operation classes, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-backup",
    name: "AWS Backup",
    generalFunction: "Backup and Recovery",
    shortName: "AWS Backup",
    keywords: ["backup", "recovery", "snapshot"],
    cloudProvider: "aws",
    description: "Centralized backup policies across AWS services.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CBR", "CSBS"],
    differencesFromHuawei: ["Vault model and policy structure differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS AWS Backup, the direct Huawei equivalence layer is CBR + CSBS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBR + CSBS + EVS. Treat CBR + CSBS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills GB-month capacity, request operations, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-backup",
    name: "Azure Backup",
    generalFunction: "Backup and Recovery",
    shortName: "Azure Backup",
    keywords: ["backup", "recovery", "snapshot"],
    cloudProvider: "azure",
    description: "Cloud backup service for VM, DB, and file workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CBR", "CSBS"],
    differencesFromHuawei: ["Vault and policy administration differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Backup, the direct Huawei equivalence layer is CBR + CSBS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBR + CSBS + EVS. Treat CBR + CSBS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills GB-month capacity, transaction counts, retrieval/snapshot, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-backup-and-dr",
    name: "Backup and DR Service",
    generalFunction: "Backup and Recovery",
    shortName: "Backup and DR",
    keywords: ["backup", "recovery", "snapshot"],
    cloudProvider: "gcp",
    description: "Centralized backup and disaster recovery orchestration.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CBR"],
    differencesFromHuawei: ["Backup appliance and policy design differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Backup and DR Service, the direct Huawei equivalence layer is CBR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CBR + CSBS + EVS. Treat CBR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills GB-month capacity, operation classes, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-elastic-disaster-recovery",
    name: "AWS Elastic Disaster Recovery",
    generalFunction: "Disaster Recovery",
    shortName: "DRS",
    keywords: ["dr", "replication", "disaster recovery"],
    cloudProvider: "aws",
    description: "Replication-based disaster recovery service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SDRS", "SMS"],
    differencesFromHuawei: ["Replication workflow and orchestration differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS AWS Elastic Disaster Recovery, the direct Huawei equivalence layer is SDRS + SMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SDRS + CBR + SMS. Treat SDRS + SMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills GB-month capacity, request operations, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-site-recovery",
    name: "Azure Site Recovery",
    generalFunction: "Disaster Recovery",
    shortName: "ASR",
    keywords: ["dr", "replication", "disaster recovery"],
    cloudProvider: "azure",
    description: "Business continuity and disaster recovery orchestration.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SDRS", "SMS"],
    differencesFromHuawei: ["Failover plans and replication limits differ."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Site Recovery, the direct Huawei equivalence layer is SDRS + SMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SDRS + CBR + SMS. Treat SDRS + SMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills GB-month capacity, transaction counts, retrieval/snapshot, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-disaster-recovery",
    name: "Disaster Recovery",
    generalFunction: "Disaster Recovery",
    shortName: "Disaster Recovery",
    keywords: ["dr", "replication", "disaster recovery"],
    cloudProvider: "gcp",
    description: "Disaster recovery patterns using managed replication services.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["SDRS"],
    differencesFromHuawei: ["Pattern-based implementation differs from a single service."],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Disaster Recovery, the direct Huawei equivalence layer is SDRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SDRS + CBR + SMS. Treat SDRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills GB-month capacity, operation classes, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-migration-hub",
    name: "AWS Migration Hub",
    generalFunction: "Migration Planning and Assessment",
    shortName: "Migration Hub",
    keywords: ["migration", "assessment", "planning", "portfolio"],
    cloudProvider: "aws",
    description: "Central migration portfolio service that tracks application/server migrations across AWS and partner migration tools.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["MGC"],
    differencesFromHuawei: [
      "Scope differs: Migration Hub focuses on inventory tracking/orchestration, while Huawei splits planning in MGC and execution in services such as SMS/DRS/OMS.",
      "Pricing model differs: AWS Migration Hub core tracking is positioned as no-additional-charge, while Huawei MGC is no-additional-charge but uses paid underlying resources during execution."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For AWS AWS Migration Hub, the direct Huawei equivalence layer is MGC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MGC + SMS + DRS + OMS. Treat MGC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills migration task/runtime and transferred data plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-migration-center",
    name: "Migration Center",
    generalFunction: "Migration Planning and Assessment",
    shortName: "Migration Center",
    keywords: ["migration", "assessment", "planning", "discovery"],
    cloudProvider: "gcp",
    description: "Discovery and assessment platform for infrastructure estates, including dependency signals, sizing recommendations, and migration waves.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["MGC"],
    differencesFromHuawei: [
      "Assessment model differs: Google emphasizes fit/sizing recommendations and modernization guidance, while Huawei uses MGC-driven migration readiness with Huawei target patterns.",
      "Pricing model differs: Migration Center is listed with no additional service cost, while MGC itself is free but execution consumes paid Huawei services."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Google Cloud Migration Center, the direct Huawei equivalence layer is MGC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MGC + SMS + DRS + OMS. Treat MGC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills migration tooling/runtime and transferred-data charges plus target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-datasync-object-migration",
    name: "AWS DataSync",
    generalFunction: "Object Storage Migration",
    shortName: "DataSync",
    keywords: ["object storage", "migration", "transfer", "sync"],
    cloudProvider: "aws",
    description: "Managed online transfer service for moving data between storage systems and object stores, with scheduling, filtering, and integrity verification.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["OMS"],
    differencesFromHuawei: [
      "Capability scope differs: DataSync supports file and object endpoints with agent-based and managed transfer paths, while OMS focuses on object-storage migration to OBS.",
      "Pricing model differs: DataSync bills by transferred data volume (plus related storage/network costs), while OMS billing emphasizes migrated-data volume/API requests and source-side network egress."
    ],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For AWS AWS DataSync, the direct Huawei equivalence layer is OMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OMS + OBS + MGC. Treat OMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills GB-month capacity, request operations, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-storage-mover",
    name: "Azure Storage Mover",
    generalFunction: "Object Storage Migration",
    shortName: "Storage Mover",
    keywords: ["object storage", "migration", "transfer"],
    cloudProvider: "azure",
    description: "Managed migration orchestration for moving SMB/NFS file shares into Azure Blob endpoints with centralized project/job control.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["OMS"],
    differencesFromHuawei: [
      "Capability scope differs: Storage Mover is optimized for file-share-to-Blob migration, while OMS is object-to-OBS focused.",
      "Pricing model differs: Storage Mover has no additional service fee and relies on storage/network charges, while OMS charges by migrated data/API activity with source egress costs."
    ],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Azure Azure Storage Mover, the direct Huawei equivalence layer is OMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OMS + OBS + MGC. Treat OMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills GB-month capacity, transaction counts, retrieval/snapshot, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-storage-transfer-service",
    name: "Storage Transfer Service",
    generalFunction: "Object Storage Migration",
    shortName: "STS",
    keywords: ["object storage", "migration", "transfer", "sync"],
    cloudProvider: "gcp",
    description: "Managed transfer service for moving/synchronizing data into Cloud Storage from cloud object stores, HTTP sources, or file systems.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["OMS"],
    differencesFromHuawei: [
      "Capability scope differs: STS supports broad cross-cloud/object/http and agent-based file transfer patterns, while OMS is centered on object migrations into OBS.",
      "Pricing model differs: STS is no-charge for agentless cloud-object transfers and charges per-GB for agent-based file transfers, while OMS charges migrated data/API requests and source egress."
    ],
    migrationToHuawei: [
      "Map data durability tier, lifecycle policy, encryption, retention, and restore objectives. For Google Cloud Storage Transfer Service, the direct Huawei equivalence layer is OMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: OMS + OBS + MGC. Treat OMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills GB-month capacity, operation classes, retrieval, and transfer; Huawei usually bills OBS/EVS/SFS/CBR capacity, requests, retrieval/replication, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-glue-data-migration",
    name: "AWS Glue",
    generalFunction: "Data Migration",
    shortName: "Glue",
    keywords: ["data migration", "etl", "data movement"],
    cloudProvider: "aws",
    description: "Serverless data integration service for ETL/ELT pipelines, schema discovery, and job orchestration used in migration and modernization projects.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CDM"],
    differencesFromHuawei: [
      "Capability scope differs: Glue provides serverless ETL jobs, crawlers, and catalog integration, while CDM is migration-oriented data movement/ETL often paired with other Huawei analytics services.",
      "Pricing model differs: Glue pricing is resource/time and request based (for example job capacity runtime and catalog operations), while CDM pricing is tied to purchased migration compute specifications and duration."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For AWS AWS Glue, the direct Huawei equivalence layer is CDM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDM + DLI + DWS. Treat CDM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills migration task/runtime and transferred data plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-data-factory-migration",
    name: "Azure Data Factory",
    generalFunction: "Data Migration",
    shortName: "Data Factory",
    keywords: ["data migration", "etl", "orchestration"],
    cloudProvider: "azure",
    description: "Data integration and orchestration platform for pipeline-driven ingestion, transformation, and migration workflows.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CDM"],
    differencesFromHuawei: [
      "Capability scope differs: ADF emphasizes activity-based orchestration and integration runtimes, while CDM emphasizes data migration jobs and connector-driven execution.",
      "Pricing model differs: ADF pricing is activity/orchestration and integration-runtime time based, while CDM pricing is primarily by migration cluster specification and runtime period."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Azure Azure Data Factory, the direct Huawei equivalence layer is CDM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDM + DLI + DWS. Treat CDM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills migration tooling charges (free or metered by component) plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-dataflow-migration",
    name: "Dataflow",
    generalFunction: "Data Migration",
    shortName: "Dataflow",
    keywords: ["data migration", "etl", "pipeline"],
    cloudProvider: "gcp",
    description: "Managed Apache Beam execution service for batch and streaming pipelines used in large-scale data migration and transformation.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CDM"],
    differencesFromHuawei: [
      "Capability scope differs: Dataflow is a code-first Beam runtime for streaming and batch, while CDM is more connector/task oriented and may require DLI/MRS for advanced processing parity.",
      "Pricing model differs: Dataflow is metered by compute/memory and related pipeline resources over runtime, while CDM pricing is based on migration task resources and time windows."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Google Cloud Dataflow, the direct Huawei equivalence layer is CDM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CDM + DLI + DWS. Treat CDM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills migration tooling/runtime and transferred-data charges plus target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-application-migration-service",
    name: "AWS Application Migration Service",
    generalFunction: "Server Migration",
    shortName: "MGN",
    keywords: ["migration", "lift and shift", "server migration"],
    cloudProvider: "aws",
    description: "Lift-and-shift server migration service using continuous block-level replication and orchestrated test/cutover workflows.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["SMS", "MGC"],
    differencesFromHuawei: [
      "Execution split differs: MGN combines replication and cutover orchestration in one service, while Huawei commonly combines MGC (planning) + SMS (replication/cutover).",
      "Pricing model differs: MGN pricing references service and underlying AWS resource consumption during replication/testing/cutover, while Huawei SMS billing depends on migration resource usage plus destination/network resources."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For AWS AWS Application Migration Service, the direct Huawei equivalence layer is SMS + MGC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SMS + MGC + IMS + CBR. Treat SMS + MGC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills migration task/runtime and transferred data plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-migrate",
    name: "Azure Migrate",
    generalFunction: "Migration Planning and Assessment",
    shortName: "Azure Migrate",
    keywords: ["migration", "assessment", "planning"],
    cloudProvider: "azure",
    description: "Unified migration hub for discovery, dependency analysis, assessment, and migration tooling across servers, databases, apps, and data.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["MGC", "SMS"],
    differencesFromHuawei: [
      "Capability packaging differs: Azure Migrate bundles assessment and multiple migration tool integrations, while Huawei splits execution into service-specific tools (SMS/DRS/OMS) under MGC governance.",
      "Pricing model differs: Azure Migrate service is free, with specific metered components (for example dependency analysis/server migration after free periods), while MGC is no-additional-charge and migration execution uses paid Huawei resources."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Azure Azure Migrate, the direct Huawei equivalence layer is MGC + SMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: MGC + SMS + DRS + OMS. Treat MGC + SMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills migration tooling charges (free or metered by component) plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-server-migration",
    name: "Azure Migrate: Server Migration",
    generalFunction: "Server Migration",
    shortName: "Server Migration",
    keywords: ["migration", "server migration", "replication"],
    cloudProvider: "azure",
    description: "Azure Migrate execution component for replicating and cutting over physical/virtual servers to Azure VMs with minimal downtime patterns.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["SMS"],
    differencesFromHuawei: [
      "Workflow differs: Azure Server Migration is a workload-specific module under Azure Migrate, while Huawei uses SMS directly and MGC for portfolio-level governance.",
      "Pricing model differs: Azure Server Migration has a documented free period then per-instance monthly charge, while SMS pricing is based on Huawei migration/resource consumption plus target infrastructure."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Azure Azure Migrate: Server Migration, the direct Huawei equivalence layer is SMS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SMS + MGC + IMS + CBR. Treat SMS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills migration tooling charges (free or metered by component) plus source/target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-migrate-to-vms",
    name: "Migrate to Virtual Machines",
    generalFunction: "Server Migration",
    shortName: "Migrate to VMs",
    keywords: ["migration", "lift and shift", "server migration"],
    cloudProvider: "gcp",
    description: "Migration service for moving physical, virtual, and other-cloud workloads to Google Compute Engine virtual machines.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["SMS", "MGC"],
    differencesFromHuawei: [
      "Capability scope differs: Migrate to VMs focuses on VM target conversion/orchestration to Compute Engine, while Huawei typically combines MGC planning with SMS replication and cutover.",
      "Pricing model differs: Migrate to VMs is positioned as no-additional-charge tooling with underlying GCP resource costs, while Huawei SMS/MGC execution incurs Huawei resource and network charges."
    ],
    migrationToHuawei: [
      "Map discovery/assessment, replication pipeline, and cutover checkpoints with rollback criteria. For Google Cloud Migrate to Virtual Machines, the direct Huawei equivalence layer is SMS + MGC; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: SMS + MGC + IMS + CBR. Treat SMS + MGC as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills migration tooling/runtime and transferred-data charges plus target infrastructure costs; Huawei usually bills MGC governance plus SMS/OMS/CDM/DRS runtime, migrated volume, and network/resource consumption. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-dms",
    name: "AWS Database Migration Service",
    generalFunction: "Database Migration and Replication",
    shortName: "AWS DMS",
    keywords: ["replication", "database migration", "cdc"],
    cloudProvider: "aws",
    description: "Managed database migration service for homogeneous/heterogeneous migrations and continuous change data capture replication.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["DRS"],
    differencesFromHuawei: [
      "Capability scope differs: AWS DMS includes migration modes spanning full load + CDC with engine-specific endpoints, while Huawei DRS separates migration, synchronization, and disaster-recovery task types.",
      "Pricing model differs: AWS DMS pricing is based on provisioned/serverless replication capacity runtime, while Huawei DRS billing depends on task type and runtime with additional source/target resource costs."
    ],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For AWS AWS Database Migration Service, the direct Huawei equivalence layer is DRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DRS + RDS + GaussDB. Treat DRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills instance or serverless capacity runtime plus storage, I/O, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-database-migration-service",
    name: "Azure Database Migration Service",
    generalFunction: "Database Migration and Replication",
    shortName: "Azure DMS",
    keywords: ["replication", "database migration", "cdc"],
    cloudProvider: "azure",
    description: "Managed Azure service for offline and online database migrations with guided assessments and migration workflows.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["DRS"],
    differencesFromHuawei: [
      "Capability scope differs: Azure DMS supports classic offline and premium online migration modes, while Huawei DRS offers migration/synchronization/DR task modes with different engine matrices.",
      "Pricing model differs: Azure DMS classic Standard tier is free and Premium is billed hourly after its free period, while Huawei DRS is billed by task/resource mode plus related infrastructure/network charges."
    ],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Azure Azure Database Migration Service, the direct Huawei equivalence layer is DRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DRS + RDS + GaussDB. Treat DRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills vCore/DTU or serverless runtime plus storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-datastream",
    name: "Datastream",
    generalFunction: "Database Migration and Replication",
    shortName: "Datastream",
    keywords: ["replication", "database migration", "cdc"],
    cloudProvider: "gcp",
    description: "Serverless change data capture service that streams database changes to Google Cloud targets for replication and modernization pipelines.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["DRS"],
    differencesFromHuawei: [
      "Pipeline model differs: Datastream focuses on CDC stream delivery into downstream analytics/processing targets, while DRS focuses on database migration/synchronization/DR task execution.",
      "Pricing model differs: Datastream is metered by processed data volume, while DRS pricing is tied to migration/sync task specification and runtime model."
    ],
    migrationToHuawei: [
      "Map engine/version compatibility, HA topology, replication mode, and backup/restore behavior. For Google Cloud Datastream, the direct Huawei equivalence layer is DRS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: DRS + RDS + GaussDB. Treat DRS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills instance/runtime pricing plus storage, backup, and transfer; Huawei usually bills RDS/GaussDB/DDS runtime or DRS task billing plus storage, backup, and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-sagemaker",
    name: "Amazon SageMaker",
    generalFunction: "Machine Learning Platform",
    shortName: "SageMaker",
    keywords: ["ml", "ai", "training", "inference"],
    cloudProvider: "aws",
    description: "End-to-end machine learning development platform.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["ModelArts", "ModelArts Studio"],
    differencesFromHuawei: ["Studio UX and MLOps integrations differ."],
    migrationToHuawei: [
      "Map model/device lifecycle, trigger/event contracts, and deployment governance boundaries. For AWS Amazon SageMaker, the direct Huawei equivalence layer is ModelArts + ModelArts Studio; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ModelArts + ModelArts Studio + OBS. Treat ModelArts + ModelArts Studio as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills training/inference runtime, endpoint uptime, and model storage; Huawei usually bills ModelArts/IoT service runtime plus endpoint/device/message operations. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-machine-learning",
    name: "Azure Machine Learning",
    generalFunction: "Machine Learning Platform",
    shortName: "Azure ML",
    keywords: ["ml", "ai", "training", "inference"],
    cloudProvider: "azure",
    description: "Managed MLOps platform for model lifecycle operations.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["ModelArts", "ModelArts Studio"],
    differencesFromHuawei: ["Workspace and deployment endpoint models differ."],
    migrationToHuawei: [
      "Map model/device lifecycle, trigger/event contracts, and deployment governance boundaries. For Azure Azure Machine Learning, the direct Huawei equivalence layer is ModelArts + ModelArts Studio; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ModelArts + ModelArts Studio + OBS. Treat ModelArts + ModelArts Studio as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills training/inference compute runtime, endpoint usage, and storage; Huawei usually bills ModelArts/IoT service runtime plus endpoint/device/message operations. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-vertex-ai",
    name: "Vertex AI",
    generalFunction: "Machine Learning Platform",
    shortName: "Vertex AI",
    keywords: ["ml", "ai", "training", "inference"],
    cloudProvider: "gcp",
    description: "Unified machine learning platform on Google Cloud.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["ModelArts", "ModelArts Studio"],
    differencesFromHuawei: ["Pipeline and model serving abstractions differ."],
    migrationToHuawei: [
      "Map model/device lifecycle, trigger/event contracts, and deployment governance boundaries. For Google Cloud Vertex AI, the direct Huawei equivalence layer is ModelArts + ModelArts Studio; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: ModelArts + ModelArts Studio + OBS. Treat ModelArts + ModelArts Studio as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills training/inference runtime, endpoint usage, and storage; Huawei usually bills ModelArts/IoT service runtime plus endpoint/device/message operations. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-iot-core",
    name: "AWS IoT Core",
    generalFunction: "IoT Platform",
    shortName: "IoT Core",
    keywords: ["iot", "device", "mqtt", "telemetry"],
    cloudProvider: "aws",
    description: "Managed IoT connectivity and device messaging platform.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["IoTDA", "IoTDM"],
    differencesFromHuawei: ["Device registry and rules engine behavior differ.", "Identity/certificate onboarding flows differ."],
    migrationToHuawei: [
      "Map model/device lifecycle, trigger/event contracts, and deployment governance boundaries. For AWS AWS IoT Core, the direct Huawei equivalence layer is IoTDA + IoTDM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IoTDA + IoTDM + DMS. Treat IoTDA + IoTDM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills training/inference runtime, endpoint uptime, and device/message operations; Huawei usually bills ModelArts/IoT service runtime plus endpoint/device/message operations. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-iot-hub",
    name: "Azure IoT Hub",
    generalFunction: "IoT Platform",
    shortName: "IoT Hub",
    keywords: ["iot", "device", "telemetry", "twin"],
    cloudProvider: "azure",
    description: "Managed IoT messaging hub for secure device connectivity and control.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["IoTDA", "IoTDM"],
    differencesFromHuawei: ["Device twin and routing semantics differ.", "Provisioning and identity integration differ."],
    migrationToHuawei: [
      "Map model/device lifecycle, trigger/event contracts, and deployment governance boundaries. For Azure Azure IoT Hub, the direct Huawei equivalence layer is IoTDA + IoTDM; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: IoTDA + IoTDM + DMS. Treat IoTDA + IoTDM as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills training/inference runtime, endpoint usage, and device/message operations; Huawei usually bills ModelArts/IoT service runtime plus endpoint/device/message operations. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-opensearch-service",
    name: "Amazon OpenSearch Service",
    generalFunction: "Search and Analytics",
    shortName: "OpenSearch",
    keywords: ["search", "elasticsearch", "analytics"],
    cloudProvider: "aws",
    description: "Managed OpenSearch/Elasticsearch cluster service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CSS"],
    differencesFromHuawei: ["Version and plugin support differ."],
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For AWS Amazon OpenSearch Service, the direct Huawei equivalence layer is CSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CSS + DLI + OBS. Treat CSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills query/compute runtime, scanned or processed data, and storage; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-ai-search",
    name: "Azure AI Search",
    generalFunction: "Search and Analytics",
    shortName: "Azure Search",
    keywords: ["search", "analytics", "index"],
    cloudProvider: "azure",
    description: "Search-as-a-service for full-text and vector search workloads.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CSS"],
    differencesFromHuawei: ["Index design and ranking features differ."],
    migrationToHuawei: [
      "Map ingestion, transformation, query semantics, and governance/metadata dependencies. For Azure Azure AI Search, the direct Huawei equivalence layer is CSS; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CSS + DLI + OBS. Treat CSS as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills activity/runtime units, compute pools, and stored/processed data; Huawei usually bills DLI/DWS/MRS/CDM runtime or cluster-spec billing plus storage and transfer. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),

  nh({
    id: "aws-codebuild",
    name: "AWS CodeBuild",
    generalFunction: "CI Build",
    shortName: "CodeBuild",
    keywords: ["ci", "build", "pipeline"],
    cloudProvider: "aws",
    description: "Managed build service for continuous integration workloads.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CodeArts Build"],
    differencesFromHuawei: ["Build environment setup and permissions differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeBuild, the direct Huawei equivalence layer is CodeArts Build; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Build + CodeArts Pipeline. Treat CodeArts Build as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-pipelines-build",
    name: "Azure Pipelines",
    generalFunction: "CI Build",
    shortName: "Pipelines",
    keywords: ["ci", "build", "pipeline"],
    cloudProvider: "azure",
    description: "Build and CI workflows in Azure DevOps Pipelines.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CodeArts Build", "CodeArts Pipeline"],
    differencesFromHuawei: ["YAML schema and agent pools differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Pipelines, the direct Huawei equivalence layer is CodeArts Build + CodeArts Pipeline; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Build + CodeArts Pipeline. Treat CodeArts Build + CodeArts Pipeline as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-build",
    name: "Cloud Build",
    generalFunction: "CI Build",
    shortName: "Cloud Build",
    keywords: ["ci", "build", "pipeline"],
    cloudProvider: "gcp",
    description: "Serverless build execution for container and app artifacts.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CodeArts Build"],
    differencesFromHuawei: ["Build trigger and worker models differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Build, the direct Huawei equivalence layer is CodeArts Build; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Build + CodeArts Pipeline. Treat CodeArts Build as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codepipeline",
    name: "AWS CodePipeline",
    generalFunction: "CI/CD Pipeline",
    shortName: "CodePipeline",
    keywords: ["pipeline", "ci/cd", "automation"],
    cloudProvider: "aws",
    description: "Continuous delivery orchestration pipeline service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CodeArts Pipeline", "CodeArts Deploy"],
    differencesFromHuawei: ["Stage/action model differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodePipeline, the direct Huawei equivalence layer is CodeArts Pipeline + CodeArts Deploy; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Pipeline + CodeArts Build + CodeArts Deploy. Treat CodeArts Pipeline + CodeArts Deploy as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-pipelines-cicd",
    name: "Azure Pipelines",
    generalFunction: "CI/CD Pipeline",
    shortName: "Pipelines",
    keywords: ["pipeline", "ci/cd", "automation"],
    cloudProvider: "azure",
    description: "Continuous integration and delivery orchestration service.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CodeArts Pipeline", "CodeArts Deploy"],
    differencesFromHuawei: ["Release and environment model differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Pipelines, the direct Huawei equivalence layer is CodeArts Pipeline + CodeArts Deploy; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Pipeline + CodeArts Build + CodeArts Deploy. Treat CodeArts Pipeline + CodeArts Deploy as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-deploy",
    name: "Cloud Deploy",
    generalFunction: "CI/CD Pipeline",
    shortName: "Cloud Deploy",
    keywords: ["pipeline", "ci/cd", "deployment"],
    cloudProvider: "gcp",
    description: "Managed continuous delivery service for Kubernetes workloads.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CodeArts Deploy", "CodeArts Pipeline"],
    differencesFromHuawei: ["Promotion pipeline and target model differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Deploy, the direct Huawei equivalence layer is CodeArts Deploy + CodeArts Pipeline; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Pipeline + CodeArts Build + CodeArts Deploy. Treat CodeArts Deploy + CodeArts Pipeline as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codeartifact",
    name: "AWS CodeArtifact",
    generalFunction: "Artifact Repository",
    shortName: "CodeArtifact",
    keywords: ["artifact", "package", "repository"],
    cloudProvider: "aws",
    description: "Managed package and artifact repository service.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CodeArts Artifact"],
    differencesFromHuawei: ["Domain/repository structure differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeArtifact, the direct Huawei equivalence layer is CodeArts Artifact; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Artifact + SWR. Treat CodeArts Artifact as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-artifacts",
    name: "Azure Artifacts",
    generalFunction: "Artifact Repository",
    shortName: "Azure Artifacts",
    keywords: ["artifact", "package", "repository"],
    cloudProvider: "azure",
    description: "Package feeds for build and release pipelines.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CodeArts Artifact"],
    differencesFromHuawei: ["Feed permissions and upstream behavior differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Artifacts, the direct Huawei equivalence layer is CodeArts Artifact; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Artifact + SWR. Treat CodeArts Artifact as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-artifact-registry-packages",
    name: "Artifact Registry",
    generalFunction: "Artifact Repository",
    shortName: "Artifact Registry",
    keywords: ["artifact", "package", "repository"],
    cloudProvider: "gcp",
    description: "Package and container artifact storage service.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CodeArts Artifact", "SWR"],
    differencesFromHuawei: ["Repository format and IAM behavior differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Artifact Registry, the direct Huawei equivalence layer is CodeArts Artifact + SWR; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Artifact + SWR. Treat CodeArts Artifact + SWR as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codecommit",
    name: "AWS CodeCommit",
    generalFunction: "Source Code Repository",
    shortName: "CodeCommit",
    keywords: ["git", "repo", "source control"],
    cloudProvider: "aws",
    description: "Managed Git repositories for private source control.",
    imageUrl: "https://cdn.simpleicons.org/amazonaws",
    huaweiEquivalentShortNames: ["CodeArts Repo"],
    differencesFromHuawei: ["Repository policy and integration ecosystem differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeCommit, the direct Huawei equivalence layer is CodeArts Repo; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Repo + CodeArts. Treat CodeArts Repo as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-repos",
    name: "Azure Repos",
    generalFunction: "Source Code Repository",
    shortName: "Azure Repos",
    keywords: ["git", "repo", "source control"],
    cloudProvider: "azure",
    description: "Hosted Git repositories in Azure DevOps.",
    imageUrl: "https://cdn.simpleicons.org/microsoftazure",
    huaweiEquivalentShortNames: ["CodeArts Repo"],
    differencesFromHuawei: ["Branch policy and workflow integration differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Repos, the direct Huawei equivalence layer is CodeArts Repo; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Repo + CodeArts. Treat CodeArts Repo as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-source-repositories",
    name: "Cloud Source Repositories",
    generalFunction: "Source Code Repository",
    shortName: "CSR",
    keywords: ["git", "repo", "source control"],
    cloudProvider: "gcp",
    description: "Private Git hosting integrated with Google Cloud tooling.",
    imageUrl: "https://cdn.simpleicons.org/googlecloud",
    huaweiEquivalentShortNames: ["CodeArts Repo"],
    differencesFromHuawei: ["Repository capabilities and lifecycle differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Source Repositories, the direct Huawei equivalence layer is CodeArts Repo; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Repo + CodeArts. Treat CodeArts Repo as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-fargate",
    name: "AWS Fargate",
    generalFunction: "Container Runtime",
    shortName: "Fargate",
    keywords: ["container", "runtime", "serverless", "ecs"],
    cloudProvider: "aws",
    description: "Serverless container runtime for ECS and EKS workloads.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/compute/fargate.png",
    huaweiEquivalentShortNames: ["CCI", "CCI 2.0", "Flexus CCI"],
    differencesFromHuawei: ["Runtime integration and networking defaults differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For AWS AWS Fargate, the direct Huawei equivalence layer is CCI + CCI 2.0 + Flexus CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCI + CCE + SWR. Treat CCI + CCI 2.0 + Flexus CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills primarily instance/runtime hours (often per-second) plus attached storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-container-instances-runtime",
    name: "Azure Container Instances",
    generalFunction: "Container Runtime",
    shortName: "ACI",
    keywords: ["container", "runtime", "serverless"],
    cloudProvider: "azure",
    description: "Run single containers and container groups without managing servers.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/compute/container-instances.png",
    huaweiEquivalentShortNames: ["CCI", "CCI 2.0", "Flexus CCI"],
    differencesFromHuawei: ["Container group model and VNet integration differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Azure Azure Container Instances, the direct Huawei equivalence layer is CCI + CCI 2.0 + Flexus CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCI + CCE + SWR. Treat CCI + CCI 2.0 + Flexus CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills primarily VM/runtime units plus managed control-plane charges and storage/network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-run-runtime",
    name: "Cloud Run",
    generalFunction: "Container Runtime",
    shortName: "Cloud Run",
    keywords: ["container", "runtime", "serverless"],
    cloudProvider: "gcp",
    description: "Serverless container runtime for stateless HTTP and job workloads.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/run.png",
    huaweiEquivalentShortNames: ["CCI", "CCI 2.0", "Flexus CCI"],
    differencesFromHuawei: ["Request scaling model and service configuration differ."],
    migrationToHuawei: [
      "Map compute shape/runtime, OS-image behavior, scaling policy, and placement/isolation semantics. For Google Cloud Cloud Run, the direct Huawei equivalence layer is CCI + CCI 2.0 + Flexus CCI; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CCI + CCE + SWR. Treat CCI + CCI 2.0 + Flexus CCI as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills primarily per-second runtime/compute units plus storage and network transfer; Huawei usually bills ECS/BMS/CCE/CCI runtime with EVS, bandwidth/traffic, and optional management add-ons. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codestar-platform",
    name: "AWS CodeStar",
    generalFunction: "DevOps Platform",
    shortName: "CodeStar",
    keywords: ["devops", "platform", "delivery"],
    cloudProvider: "aws",
    description: "Integrated project experience for AWS developer toolchain workflows.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codestar.png",
    huaweiEquivalentShortNames: ["CodeArts"],
    differencesFromHuawei: ["Integrated project templates and lifecycle tooling differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeStar, the direct Huawei equivalence layer is CodeArts; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts + CodeArts Pipeline + CodeArts Build. Treat CodeArts as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-devops-platform",
    name: "Azure DevOps",
    generalFunction: "DevOps Platform",
    shortName: "Azure DevOps",
    keywords: ["devops", "platform", "delivery"],
    cloudProvider: "azure",
    description: "End-to-end software delivery platform across planning, build, and release.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/devops.png",
    huaweiEquivalentShortNames: ["CodeArts"],
    differencesFromHuawei: ["Project and organization model differs from CodeArts."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure DevOps, the direct Huawei equivalence layer is CodeArts; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts + CodeArts Pipeline + CodeArts Build. Treat CodeArts as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-build-platform",
    name: "Google Cloud Build",
    generalFunction: "DevOps Platform",
    shortName: "Cloud Build",
    keywords: ["devops", "platform", "ci/cd", "build"],
    cloudProvider: "gcp",
    description: "Managed build platform commonly used as a central CI/CD control point.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/build.png",
    huaweiEquivalentShortNames: ["CodeArts"],
    differencesFromHuawei: ["Pipeline composition and integration patterns differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Google Cloud Build, the direct Huawei equivalence layer is CodeArts; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts + CodeArts Pipeline + CodeArts Build. Treat CodeArts as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codedeploy",
    name: "AWS CodeDeploy",
    generalFunction: "CD Deployment",
    shortName: "CodeDeploy",
    keywords: ["deployment", "cd", "release"],
    cloudProvider: "aws",
    description: "Deployment orchestration service for EC2, Lambda, and on-prem targets.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codedeploy.png",
    huaweiEquivalentShortNames: ["CodeArts Deploy"],
    differencesFromHuawei: ["Deployment strategies and target definitions differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeDeploy, the direct Huawei equivalence layer is CodeArts Deploy; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Deploy + CodeArts Pipeline. Treat CodeArts Deploy as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-pipelines-release",
    name: "Azure Pipelines (Release)",
    generalFunction: "CD Deployment",
    shortName: "Pipelines Release",
    keywords: ["deployment", "cd", "release"],
    cloudProvider: "azure",
    description: "Release orchestration pipelines for multi-stage deployment workflows.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/pipelines.png",
    huaweiEquivalentShortNames: ["CodeArts Deploy"],
    differencesFromHuawei: ["Environment approvals and stage semantics differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Pipelines (Release), the direct Huawei equivalence layer is CodeArts Deploy; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Deploy + CodeArts Pipeline. Treat CodeArts Deploy as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-cloud-deploy-cd",
    name: "Cloud Deploy",
    generalFunction: "CD Deployment",
    shortName: "Cloud Deploy",
    keywords: ["deployment", "cd", "release"],
    cloudProvider: "gcp",
    description: "Managed release orchestration for progressive deployments.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/devtools/build.png",
    huaweiEquivalentShortNames: ["CodeArts Deploy"],
    differencesFromHuawei: ["Target and promotion model differs from CodeArts."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Cloud Deploy, the direct Huawei equivalence layer is CodeArts Deploy; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Deploy + CodeArts Pipeline. Treat CodeArts Deploy as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codeguru-quality",
    name: "AWS CodeGuru",
    generalFunction: "Code Quality",
    shortName: "CodeGuru",
    keywords: ["code quality", "static analysis", "recommendations"],
    cloudProvider: "aws",
    description: "Automated code reviews and recommendations to improve code quality.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/management/codeguru.png",
    huaweiEquivalentShortNames: ["CodeArts Check"],
    differencesFromHuawei: ["Code analysis rulesets and ecosystem integration differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeGuru, the direct Huawei equivalence layer is CodeArts Check; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Check + CodeArts Governance. Treat CodeArts Check as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-devops-code-quality",
    name: "Azure DevOps (Code Quality)",
    generalFunction: "Code Quality",
    shortName: "Azure DevOps",
    keywords: ["code quality", "analysis", "policy"],
    cloudProvider: "azure",
    description: "Code quality enforcement through Azure DevOps pipeline policies and extensions.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/devops.png",
    huaweiEquivalentShortNames: ["CodeArts Check"],
    differencesFromHuawei: ["Quality gate and extension model differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure DevOps (Code Quality), the direct Huawei equivalence layer is CodeArts Check; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Check + CodeArts Governance. Treat CodeArts Check as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-binary-authorization-code-quality",
    name: "Binary Authorization",
    generalFunction: "Code Quality",
    shortName: "Binary Authorization",
    keywords: ["policy", "compliance", "supply chain"],
    cloudProvider: "gcp",
    description: "Policy-based software supply chain control used in quality/compliance pipelines.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/binary-authorization.png",
    huaweiEquivalentShortNames: ["CodeArts Check", "CodeArts Governance"],
    differencesFromHuawei: ["Policy enforcement scope differs from source-level code checks."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Binary Authorization, the direct Huawei equivalence layer is CodeArts Check + CodeArts Governance; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Check + CodeArts Governance. Treat CodeArts Check + CodeArts Governance as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-security-hub-governance",
    name: "AWS Security Hub",
    generalFunction: "DevSecOps Governance",
    shortName: "Security Hub",
    keywords: ["security", "governance", "compliance"],
    cloudProvider: "aws",
    description: "Centralized security posture and compliance management across AWS services.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/security/security-hub.png",
    huaweiEquivalentShortNames: ["CodeArts Governance"],
    differencesFromHuawei: ["Governance scope and integration focus differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS Security Hub, the direct Huawei equivalence layer is CodeArts Governance; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Governance + CodeArts Check. Treat CodeArts Governance as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-devops-governance",
    name: "Azure DevOps (Governance)",
    generalFunction: "DevSecOps Governance",
    shortName: "Azure DevOps",
    keywords: ["security", "governance", "devsecops"],
    cloudProvider: "azure",
    description: "Governance and policy enforcement through Azure DevOps controls and integrations.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/devops.png",
    huaweiEquivalentShortNames: ["CodeArts Governance"],
    differencesFromHuawei: ["Governance controls are distributed across tools and policies."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure DevOps (Governance), the direct Huawei equivalence layer is CodeArts Governance; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Governance + CodeArts Check. Treat CodeArts Governance as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "gcp-binary-authorization-governance",
    name: "Binary Authorization",
    generalFunction: "DevSecOps Governance",
    shortName: "Binary Authorization",
    keywords: ["security", "governance", "devsecops", "policy"],
    cloudProvider: "gcp",
    description: "Policy-based release governance for container deployment authorization.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/gcp/compute/binary-authorization.png",
    huaweiEquivalentShortNames: ["CodeArts Governance"],
    differencesFromHuawei: ["Focus is deployment policy rather than full SDLC governance."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Google Cloud Binary Authorization, the direct Huawei equivalence layer is CodeArts Governance; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Governance + CodeArts Check. Treat CodeArts Governance as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Google Cloud usually bills runtime/request usage and artifact/data storage volume; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-device-farm-performance",
    name: "AWS Device Farm",
    generalFunction: "Performance Testing",
    shortName: "Device Farm",
    keywords: ["performance", "testing", "mobile"],
    cloudProvider: "aws",
    description: "Managed device testing platform used for mobile app validation and testing workflows.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/mobile/device-farm.png",
    huaweiEquivalentShortNames: ["CodeArts PerfTest", "CodeArts TestPlan"],
    differencesFromHuawei: ["Primary focus is mobile/device testing scenarios."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS Device Farm, the direct Huawei equivalence layer is CodeArts PerfTest + CodeArts TestPlan; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts PerfTest + CodeArts Pipeline. Treat CodeArts PerfTest + CodeArts TestPlan as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-load-testing-performance",
    name: "Azure Load Testing",
    generalFunction: "Performance Testing",
    shortName: "Load Testing",
    keywords: ["performance", "load test", "testing"],
    cloudProvider: "azure",
    description: "Managed load testing service for web and API performance validation.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/load-testing.png",
    huaweiEquivalentShortNames: ["CodeArts PerfTest"],
    differencesFromHuawei: ["Load generation and scenario model differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Load Testing, the direct Huawei equivalence layer is CodeArts PerfTest; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts PerfTest + CodeArts Pipeline. Treat CodeArts PerfTest as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-codestar-requirements",
    name: "AWS CodeStar",
    generalFunction: "Requirements Management",
    shortName: "CodeStar",
    keywords: ["requirements", "planning", "agile", "devops"],
    cloudProvider: "aws",
    description: "Project templates and workflow scaffolding used to track delivery requirements.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/devtools/codestar.png",
    huaweiEquivalentShortNames: ["CodeArts Req"],
    differencesFromHuawei: ["Requirements tracking is less centralized than CodeArts Req."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS CodeStar, the direct Huawei equivalence layer is CodeArts Req; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Req + CodeArts. Treat CodeArts Req as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-boards-requirements",
    name: "Azure Boards",
    generalFunction: "Requirements Management",
    shortName: "Azure Boards",
    keywords: ["requirements", "planning", "agile", "backlog"],
    cloudProvider: "azure",
    description: "Work item and backlog management for agile requirements planning.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/boards.png",
    huaweiEquivalentShortNames: ["CodeArts Req"],
    differencesFromHuawei: ["Work item model and process templates differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Boards, the direct Huawei equivalence layer is CodeArts Req; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts Req + CodeArts. Treat CodeArts Req as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "aws-device-farm-test-management",
    name: "AWS Device Farm",
    generalFunction: "Test Management",
    shortName: "Device Farm",
    keywords: ["test management", "qa", "testing"],
    cloudProvider: "aws",
    description: "Managed test execution environment for device and integration test runs.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/aws/mobile/device-farm.png",
    huaweiEquivalentShortNames: ["CodeArts TestPlan"],
    differencesFromHuawei: ["Test planning and test case management depth differs."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For AWS AWS Device Farm, the direct Huawei equivalence layer is CodeArts TestPlan; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts TestPlan + CodeArts PerfTest. Treat CodeArts TestPlan as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: AWS usually bills pipeline/build/runtime minutes, request volume, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
  }),
  nh({
    id: "azure-test-plans-management",
    name: "Azure Test Plans",
    generalFunction: "Test Management",
    shortName: "Test Plans",
    keywords: ["test management", "qa", "planning"],
    cloudProvider: "azure",
    description: "Test case management and manual/automated test orchestration in Azure DevOps.",
    imageUrl: "https://raw.githubusercontent.com/mingrammer/diagrams/master/resources/azure/devops/test-plans.png",
    huaweiEquivalentShortNames: ["CodeArts TestPlan"],
    differencesFromHuawei: ["Test suite structure and reporting semantics differ."],
    migrationToHuawei: [
      "Map API/workflow stages, integration points, pipeline gates, and release controls. For Azure Azure Test Plans, the direct Huawei equivalence layer is CodeArts TestPlan; validate feature-by-feature parity for control plane, data plane, and operational behavior before cutover.",
      "Use a composed Huawei migration pattern where needed: CodeArts TestPlan + CodeArts PerfTest. Treat CodeArts TestPlan as the core equivalent capability and use the additional services to cover integration, security, observability, and governance gaps.",
      "Pricing model difference: Azure usually bills pipeline/runtime minutes, request units, artifact storage, or seat-based components; Huawei usually bills CodeArts/APIG/DMS runtime or request volume plus artifact/storage usage. Recalculate TCO with peak load, request volume, retention period, and cross-region/interconnect traffic before production migration."
    ]
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
  hw({ id: "huawei-bms", name: "Bare Metal Server", generalFunction: "Bare Metal Compute", shortName: "BMS", keywords: ["bare metal", "compute", "dedicated"], description: "Dedicated physical servers for performance-sensitive workloads." }),
  hw({ id: "huawei-cph", name: "Cloud Phone Host", generalFunction: "Virtual Mobile", shortName: "CPH", keywords: ["cloud phone", "mobile", "virtual device"], description: "Cloud-hosted mobile device environments." }),
  hw({ id: "huawei-deh", name: "Dedicated Host", generalFunction: "Dedicated Host", shortName: "DeH", keywords: ["dedicated host", "compliance", "isolation"], description: "Dedicated host infrastructure for isolated deployment." }),
  hw({ id: "huawei-ims", name: "Image Management Service", generalFunction: "Image Management", shortName: "IMS", keywords: ["image", "vm image", "template"], description: "Manage VM images and templates for compute workloads." }),

  hw({ id: "huawei-cci", name: "Cloud Container Instance", generalFunction: "Container Runtime", shortName: "CCI", keywords: ["container", "serverless container", "runtime"], description: "Serverless container runtime for on-demand workloads." }),
  hw({ id: "huawei-cci2", name: "Cloud Container Instance 2.0", generalFunction: "Container Runtime", shortName: "CCI 2.0", keywords: ["container", "serverless", "runtime"], description: "Next-generation serverless container runtime." }),
  hw({ id: "huawei-swr", name: "SoftWare Repository for Container", generalFunction: "Container Registry", shortName: "SWR", keywords: ["container registry", "image repo", "artifact"], description: "Container image repository service." }),

  hw({ id: "huawei-drs", name: "Data Replication Service", generalFunction: "Database Migration and Replication", shortName: "DRS", keywords: ["replication", "database migration", "cdc"], description: "Database migration, synchronization, and disaster recovery service with full-load and incremental replication modes." }),
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

  hw({ id: "huawei-ces", name: "Cloud Eye", generalFunction: "Observability", shortName: "CES", keywords: ["monitoring", "metrics", "alerting"], description: "Cloud resource monitoring and alerting service." }),
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

  hw({ id: "huawei-cdm", name: "Cloud Data Migration", generalFunction: "Data Migration", shortName: "CDM", keywords: ["data migration", "etl", "sync"], description: "Connector-based data migration and transformation service for structured and semi-structured data movement." }),
  hw({ id: "huawei-mgc", name: "Migration Center", generalFunction: "Migration Planning and Assessment", shortName: "MGC", keywords: ["migration", "assessment", "planning"], description: "Central migration planning and governance hub that coordinates discovery, assessment, and execution workflows." }),
  hw({ id: "huawei-oms", name: "Object Storage Migration Service", generalFunction: "Object Storage Migration", shortName: "OMS", keywords: ["object storage", "migration", "transfer"], description: "Managed service for migrating object data from third-party object stores into Huawei OBS." }),
  hw({ id: "huawei-sms", name: "Server Migration Service", generalFunction: "Server Migration", shortName: "SMS", keywords: ["server migration", "lift and shift", "replication"], description: "Server migration service for replicating and cutting over workloads from physical or virtual sources to Huawei cloud servers." }),

  hw({ id: "huawei-dc", name: "Direct Connect", generalFunction: "Dedicated Connectivity", shortName: "DC", keywords: ["private link", "dedicated connection", "network"], description: "Dedicated private network connectivity service." }),
  hw({ id: "huawei-dns", name: "Domain Name Service", generalFunction: "DNS", shortName: "DNS", keywords: ["dns", "domain", "resolution"], description: "Managed domain name resolution service." }),
  hw({ id: "huawei-eip", name: "Elastic IP", generalFunction: "Public IP", shortName: "EIP", keywords: ["public ip", "elastic ip", "network"], description: "Elastic public IP addressing service." }),
  hw({ id: "huawei-elb", name: "Elastic Load Balance", generalFunction: "Load Balancing", shortName: "ELB", keywords: ["load balancer", "traffic", "lb"], description: "Layer 4/7 load balancing service." }),
  hw({ id: "huawei-er", name: "Enterprise Router", generalFunction: "Network Routing", shortName: "ER", keywords: ["router", "transit", "network"], description: "Enterprise-grade inter-VPC routing service." }),
  hw({ id: "huawei-nat", name: "NAT Gateway", generalFunction: "NAT Gateway", shortName: "NAT", keywords: ["nat", "egress", "network"], description: "Network address translation gateway service." }),
  hw({ id: "huawei-vpc", name: "Virtual Private Cloud", generalFunction: "Virtual Network", shortName: "VPC", keywords: ["vpc", "network isolation", "subnet"], description: "Isolated virtual network service." }),
  hw({ id: "huawei-vpn", name: "Virtual Private Network", generalFunction: "VPN Connectivity", shortName: "VPN", keywords: ["vpn", "site-to-site", "secure network"], description: "Secure encrypted network connectivity service." }),
  hw({ id: "huawei-vpcep", name: "VPC Endpoint", generalFunction: "Private Endpoints", shortName: "VPCEP", keywords: ["private endpoint", "service access", "network"], description: "Private endpoint access for cloud services." }),

  hw({ id: "huawei-cbh", name: "Cloud Bastion Host", generalFunction: "Privileged Access Security", shortName: "CBH", keywords: ["bastion", "privileged access", "audit"], description: "Privileged access and operation audit bastion service." }),
  hw({ id: "huawei-ccm", name: "Cloud Certificate & Manager", generalFunction: "Certificate Security", shortName: "CCM", keywords: ["certificate", "tls", "pki"], description: "Certificate lifecycle and management service." }),
  hw({ id: "huawei-cfw", name: "Cloud Firewall", generalFunction: "Network Threat Protection", shortName: "CFW", keywords: ["firewall", "network security", "threat"], description: "Managed cloud firewall protection service." }),
  hw({ id: "huawei-cgs", name: "Container Guard Service", generalFunction: "Container Security", shortName: "CGS", keywords: ["container security", "vulnerability", "runtime protection"], description: "Container image and runtime security service." }),
  hw({ id: "huawei-dew", name: "Data Encryption Workshop", generalFunction: "Key Management and Encryption", shortName: "DEW", keywords: ["encryption", "kms", "key management"], description: "Encryption key and secret management service." }),
  hw({ id: "huawei-dsc", name: "Data Security Center", generalFunction: "Data Security Governance", shortName: "DSC", keywords: ["data security", "classification", "protection"], description: "Data security governance and risk control service." }),
  hw({ id: "huawei-dbss", name: "Database Security Service", generalFunction: "Database Security", shortName: "DBSS", keywords: ["database security", "audit", "protection"], description: "Database access audit and security protection." }),
  hw({ id: "huawei-ddos", name: "DDoS Mitigation", generalFunction: "Network Threat Protection", shortName: "DDoS", keywords: ["ddos", "attack mitigation", "protection"], description: "Distributed denial-of-service protection service." }),
  hw({ id: "huawei-hss", name: "Host Security Service", generalFunction: "Anti-Ransomware Security", shortName: "HSS", keywords: ["host security", "endpoint", "protection"], description: "Server host security detection and protection." }),
  hw({ id: "huawei-secmaster", name: "SecMaster", generalFunction: "Security Operations", shortName: "SecMaster", keywords: ["soc", "security operations", "incident"], description: "Security operations and orchestration platform." }),
  hw({ id: "huawei-waf", name: "Web Application Firewall", generalFunction: "Web and API Protection", shortName: "WAF", keywords: ["waf", "web security", "attack prevention"], description: "Web application firewall for HTTP/HTTPS protection." }),

  hw({ id: "huawei-cbr", name: "Cloud Backup and Recovery", generalFunction: "Backup and Recovery", shortName: "CBR", keywords: ["backup", "recovery", "snapshot"], description: "Unified backup and recovery service." }),
  hw({ id: "huawei-csbs", name: "Cloud Server Backup Service", generalFunction: "Backup and Recovery", shortName: "CSBS", keywords: ["server backup", "recovery", "snapshot"], description: "Server-level backup and restore service." }),
  hw({ id: "huawei-ddss", name: "Dedicated Distributed Storage Service", generalFunction: "Storage", shortName: "DSS", keywords: ["distributed storage", "dedicated", "performance"], description: "Dedicated distributed block storage service." }),
  hw({ id: "huawei-dos", name: "Dedicated OBS", generalFunction: "Object Storage", shortName: "DOS", keywords: ["object storage", "dedicated", "isolation"], description: "Dedicated deployment model for object storage." }),
  hw({ id: "huawei-evs", name: "Elastic Volume Service", generalFunction: "Block Storage", shortName: "EVS", keywords: ["block storage", "disk", "volume"], description: "Persistent block storage volumes for cloud servers." }),
  hw({ id: "huawei-sfs", name: "Scalable File Service", generalFunction: "File Storage", shortName: "SFS", keywords: ["file storage", "nfs", "shared storage"], description: "Scalable shared file storage service." }),
  hw({ id: "huawei-sdrs", name: "Storage Disaster Recovery Service", generalFunction: "Disaster Recovery", shortName: "SDRS", keywords: ["dr", "replication", "disaster recovery"], description: "Cross-site storage disaster recovery service." })
];

export const services: ServiceInfo[] = [...coreServices, ...additionalEquivalentServices, ...additionalHuaweiServices];
