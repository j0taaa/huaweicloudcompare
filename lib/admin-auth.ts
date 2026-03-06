import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { adminConfigPath, readJsonFile, writeJsonFile } from "@/lib/storage";

export const adminSessionCookieName = "hc_admin_session";

type CookieSource = {
  get(name: string): { value: string } | undefined;
};

export type AdminConfig = {
  passwordSalt: string;
  passwordHash: string;
  sessions: Array<{
    token: string;
    createdAt: string;
  }>;
};

const defaultPassword = "admin123";

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function makeDefaultConfig(): AdminConfig {
  const salt = randomBytes(16).toString("hex");
  return {
    passwordSalt: salt,
    passwordHash: hashPassword(defaultPassword, salt),
    sessions: []
  };
}

export async function getAdminConfig(): Promise<AdminConfig> {
  return readJsonFile<AdminConfig>(adminConfigPath, makeDefaultConfig());
}

async function saveAdminConfig(config: AdminConfig): Promise<void> {
  await writeJsonFile(adminConfigPath, config);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const config = await getAdminConfig();
  const actualHash = Buffer.from(hashPassword(password, config.passwordSalt), "hex");
  const expectedHash = Buffer.from(config.passwordHash, "hex");

  if (actualHash.length !== expectedHash.length) return false;
  return timingSafeEqual(actualHash, expectedHash);
}

export async function createAdminSession(): Promise<string> {
  const config = await getAdminConfig();
  const token = randomBytes(32).toString("hex");
  config.sessions = [...config.sessions, { token, createdAt: new Date().toISOString() }].slice(-20);
  await saveAdminConfig(config);
  return token;
}

export async function invalidateAdminSession(token: string): Promise<void> {
  const config = await getAdminConfig();
  config.sessions = config.sessions.filter((session) => session.token !== token);
  await saveAdminConfig(config);
}

export async function changeAdminPassword(newPassword: string): Promise<string> {
  const trimmed = newPassword.trim();
  if (trimmed.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const salt = randomBytes(16).toString("hex");
  const token = randomBytes(32).toString("hex");
  const nextConfig: AdminConfig = {
    passwordSalt: salt,
    passwordHash: hashPassword(trimmed, salt),
    sessions: [{ token, createdAt: new Date().toISOString() }]
  };

  await saveAdminConfig(nextConfig);
  return token;
}

function extractSessionToken(source: CookieSource): string | undefined {
  return source.get(adminSessionCookieName)?.value;
}

export async function isAdminAuthenticated(source: CookieSource): Promise<boolean> {
  const token = extractSessionToken(source);
  if (!token) return false;

  const config = await getAdminConfig();
  return config.sessions.some((session) => session.token === token);
}

export async function requireAdminAuthentication(source: CookieSource): Promise<string> {
  const token = extractSessionToken(source);
  if (!token) {
    throw new Error("Unauthorized");
  }

  const config = await getAdminConfig();
  if (!config.sessions.some((session) => session.token === token)) {
    throw new Error("Unauthorized");
  }

  return token;
}
