import { createHmac, timingSafeEqual } from "crypto";

const DEFAULT_SECRET = "famocity-dev-secret-change-me";

function getSecret() {
  return process.env.SESSION_SECRET ?? DEFAULT_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function encodeSigned<T>(payload: T) {
  const value = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(value);
  return `${value}.${signature}`;
}

export function decodeSigned<T>(input?: string | null) {
  if (!input) {
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
