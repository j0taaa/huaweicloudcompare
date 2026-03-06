import "server-only";

import { promises as fs } from "fs";
import path from "path";

const storageDir = path.join(process.cwd(), "storage");

export const communityDataPath = path.join(storageDir, "community-data.json");
export const moderationDataPath = path.join(storageDir, "moderation-data.local.json");
export const adminConfigPath = path.join(storageDir, "admin-config.local.json");

async function ensureDir() {
  await fs.mkdir(storageDir, { recursive: true });
}

export async function ensureJsonFile<T>(filePath: string, defaultValue: T): Promise<void> {
  await ensureDir();

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `${JSON.stringify(defaultValue, null, 2)}\n`, "utf8");
  }
}

export async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureJsonFile(filePath, defaultValue);
  const content = await fs.readFile(filePath, "utf8");

  try {
    return JSON.parse(content) as T;
  } catch {
    await writeJsonFile(filePath, defaultValue);
    return defaultValue;
  }
}

export async function writeJsonFile<T>(filePath: string, value: T): Promise<void> {
  await ensureDir();
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
