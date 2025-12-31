import { checkDatabaseConnection } from "@/db";

export interface ServiceStatus {
  connected: boolean;
  message?: string;
}

export interface AllServicesStatus {
  database: ServiceStatus;
  auth: ServiceStatus;
  polar: ServiceStatus;
  openrouter: ServiceStatus;
}

export async function checkDatabaseStatus(): Promise<ServiceStatus> {
  const connected = await checkDatabaseConnection();
  return {
    connected,
    message: connected ? "PostgreSQL connected" : "PostgreSQL not connected",
  };
}

export function checkAuthStatus(): ServiceStatus {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const betterAuthSecret = process.env.BETTER_AUTH_SECRET;

  const connected =
    !!googleClientId &&
    googleClientId !== "your-google-client-id" &&
    !!googleClientSecret &&
    googleClientSecret !== "your-google-client-secret" &&
    !!betterAuthSecret &&
    betterAuthSecret !== "your-secret-key-change-in-production";

  return {
    connected,
    message: connected
      ? "BetterAuth configured"
      : "BetterAuth not configured (Google OAuth credentials missing)",
  };
}

export function checkPolarStatus(): ServiceStatus {
  const polarToken = process.env.POLAR_ACCESS_TOKEN;
  const connected = !!polarToken && polarToken !== "your-polar-access-token";

  return {
    connected,
    message: connected
      ? "Polar configured"
      : "Polar not configured (access token missing)",
  };
}

export function checkOpenRouterStatus(): ServiceStatus {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const connected = !!apiKey && apiKey !== "your-openrouter-api-key";

  return {
    connected,
    message: connected
      ? "OpenRouter configured"
      : "OpenRouter not configured (API key missing)",
  };
}

export async function checkAllStatuses(): Promise<AllServicesStatus> {
  const [database] = await Promise.all([checkDatabaseStatus()]);

  return {
    database,
    auth: checkAuthStatus(),
    polar: checkPolarStatus(),
    openrouter: checkOpenRouterStatus(),
  };
}
