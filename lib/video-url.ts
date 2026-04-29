function cleanVideoId(value: string) {
  return value.trim().replace(/[^a-zA-Z0-9_-]/g, "");
}

export function normalizeVideoUrl(input: string) {
  const value = input.trim();

  if (!value) {
    return value;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      const id = cleanVideoId(url.pathname.replace(/^\/+/, ""));
      return id ? `https://www.youtube.com/embed/${id}` : value;
    }

    if (hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        const id = cleanVideoId(url.pathname.split("/embed/")[1] || "");
        return id ? `https://www.youtube.com/embed/${id}` : value;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const id = cleanVideoId(url.pathname.split("/shorts/")[1] || "");
        return id ? `https://www.youtube.com/embed/${id}` : value;
      }

      const watchId = cleanVideoId(url.searchParams.get("v") || "");
      return watchId ? `https://www.youtube.com/embed/${watchId}` : value;
    }

    if (hostname === "vimeo.com") {
      const id = cleanVideoId(url.pathname.replace(/^\/+/, ""));
      return id ? `https://player.vimeo.com/video/${id}` : value;
    }

    if (hostname === "www.vimeo.com") {
      const id = cleanVideoId(url.pathname.replace(/^\/+/, ""));
      return id ? `https://player.vimeo.com/video/${id}` : value;
    }

    return value;
  } catch {
    return value;
  }
}
