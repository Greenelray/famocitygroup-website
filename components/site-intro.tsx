"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_STORAGE_KEY = "famocity-intro-seen";
const EXIT_DURATION_MS = 720;
const FALLBACK_DURATION_MS = 5600;
const SLOW_START_DURATION_MS = 2400;

export function SiteIntro() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const dismissIntro = useCallback(() => {
    if (leaving) {
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // If storage is blocked, still let the visitor enter the site.
    }

    setLeaving(true);
    window.setTimeout(() => setVisible(false), EXIT_DURATION_MS);
  }, [leaving]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (prefersReducedMotion || window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      if (prefersReducedMotion) {
        return;
      }
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fallback = window.setTimeout(dismissIntro, FALLBACK_DURATION_MS);
    const slowStart = window.setTimeout(() => {
      const video = videoRef.current;

      if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        dismissIntro();
      }
    }, SLOW_START_DURATION_MS);

    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(slowStart);
      document.body.style.overflow = previousOverflow;
    };
  }, [dismissIntro, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const video = videoRef.current;
    const playPromise = video?.play();

    if (playPromise) {
      playPromise.catch(() => {
        // Some browsers need a user gesture before video playback.
      });
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`site-intro ${leaving ? "site-intro--leaving" : ""}`} role="dialog" aria-label="Famocity opening video">
      <video
        ref={videoRef}
        className="site-intro__video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => videoRef.current?.play().catch(() => undefined)}
        onEnded={dismissIntro}
        onError={dismissIntro}
      >
        <source src="/famocity-intro.mov" />
      </video>

      <div className="site-intro__shade" />

      <div className="site-intro__content">
        <p className="site-intro__eyebrow">Famocity Group Ltd</p>
        <button className="site-intro__skip" type="button" onClick={dismissIntro}>
          Skip Intro
        </button>
      </div>
    </div>
  );
}
