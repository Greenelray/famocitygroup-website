export function getSafeRedirectPath(candidate?: null | string, fallback = "/my-courses") {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(candidate, "https://famocitygroup.org");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function isTrustedFormRequest(request: Request) {
  const expectedOrigin = new URL(request.url).origin;
  const suppliedOrigin = request.headers.get("origin") ?? request.headers.get("referer");

  if (!suppliedOrigin) {
    return false;
  }

  try {
    return new URL(suppliedOrigin).origin === expectedOrigin;
  } catch {
    return false;
  }
}
