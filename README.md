# Cloud Service Mapper (Huawei Cloud vs Other Providers)

A Next.js + Bun + Tailwind website that compares equivalent services across AWS, Azure, GCP, and Huawei Cloud.

## Features

- Default table view with all mapped capabilities across clouds.
- Search by any service name (including Huawei Cloud names).
- Home page keeps the full service-equivalency table plus searchable detail cards.
- Direct side-by-side comparison now lives on a separate `/compare` page.
- Single-provider comparison (AWS/Azure/GCP vs Huawei) with Huawei as the migration target column.
- Real provider logos and service icons for visual scanability.

## Icon/Logo sources

- Provider logos: VectorLogoZone brand assets.
- Service icons (AWS/Azure/GCP): loaded from external raw GitHub URLs (Mingrammer `diagrams` cloud architecture icon resources).
- Huawei service icons (ECS, CCE, OBS, RDS, FunctionGraph, CDN): local SVG assets extracted from Huawei Cloud LATAM draw.io icon libraries (text SVG, non-binary).

## Stack

- Next.js (App Router)
- Bun
- Tailwind CSS
- Docker / Docker Compose

## Run locally with Bun

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Production build

```bash
bun run build
bun run start
```

## Run with Docker Compose

```bash
docker compose up --build
```

Then open http://localhost:3000.
