import { createHmac, timingSafeEqual } from "crypto";

function getSecret() {
  return process.env.SESSION_SECRET?.trim() || null;
}

export function isSessionSecretConfigured() {
  return Boolean(getSecret());
}

function sign(value: string) {
  const secret = getSecret();

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function encodeSigned<T>(payload: T) {
  const value = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(value);
  return `${value}.${signature}`;
}

export function decodeSigned<T>(input?: string | null) {
  if (!input || !isSessionSecretConfigured()) {
    return null;
  }

  const [value, signature] = input.split(".");
  if (!value || !signature) {
    return null;
  }

  const expected = sign(value);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}
