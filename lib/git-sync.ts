import "server-only";

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export type GitSyncResult = {
  attempted: boolean;
  succeeded: boolean;
  message: string;
};

function isEnabled() {
  return process.env.GIT_SYNC_ENABLED === "true" || Boolean(process.env.GITHUB_PUSH_TOKEN);
}

async function getOriginUrl() {
  const { stdout } = await execFileAsync("git", ["remote", "get-url", "origin"], { cwd: process.cwd() });
  return stdout.trim();
}

function buildPushUrl(originUrl: string): string {
  const token = process.env.GITHUB_PUSH_TOKEN;
  if (!token) return originUrl;

  if (originUrl.startsWith("https://")) {
    return originUrl.replace("https://", `https://x-access-token:${encodeURIComponent(token)}@`);
  }

  return originUrl;
}

export async function getGitSyncStatus() {
  const branch = process.env.GIT_SYNC_BRANCH ?? "main";
  return {
    enabled: isEnabled(),
    branch,
    remote: "origin",
    tokenConfigured: Boolean(process.env.GITHUB_PUSH_TOKEN)
  };
}

export async function attemptGitSync(changedFiles: string[], summary: string): Promise<GitSyncResult> {
  if (!isEnabled()) {
    return {
      attempted: false,
      succeeded: false,
      message: "Git sync is disabled. Set GIT_SYNC_ENABLED=true or provide GITHUB_PUSH_TOKEN to enable automatic GitHub sync."
    };
  }

  if (changedFiles.length === 0) {
    return {
      attempted: false,
      succeeded: false,
      message: "No changed files were provided for Git sync."
    };
  }

  const branch = process.env.GIT_SYNC_BRANCH ?? "main";
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? "Community Moderation Bot",
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? "noreply@huaweicloudcompare.local",
    GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME ?? "Community Moderation Bot",
    GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL ?? "noreply@huaweicloudcompare.local"
  };

  try {
    await execFileAsync("git", ["add", ...changedFiles], { cwd: process.cwd(), env });
    await execFileAsync("git", ["commit", "-m", `Approve community suggestion: ${summary}`], { cwd: process.cwd(), env });

    const originUrl = await getOriginUrl();
    const pushUrl = buildPushUrl(originUrl);
    await execFileAsync("git", ["push", pushUrl, `HEAD:${branch}`], { cwd: process.cwd(), env });

    return {
      attempted: true,
      succeeded: true,
      message: `Committed and pushed approved changes to ${branch}.`
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Git sync failed.";
    return {
      attempted: true,
      succeeded: false,
      message
    };
  }
}
