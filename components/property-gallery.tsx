"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";

type PropertyImage = {
  src: string;
  alt: string;
  title: string;
  location: string;
};

type PropertyGalleryProps = {
  images: PropertyImage[];
};

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState<PropertyImage | null>(null);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <>
      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2">
        {images.map((image, index) => (
          <Reveal
            key={image.alt}
            delay={0.08 * index}
            className={index === 0 ? "sm:col-span-2" : undefined}
          >
            <div className="glass-card h-full overflow-hidden p-3">
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className={`group relative block w-full overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#eef4fb_0%,#d8e7f8_100%)] text-left ${
                  index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
                aria-label={`Open ${image.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                />
              </button>
              <div className="px-2 pb-2 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c8a951]">
                  Featured Listing
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">{image.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{image.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#061326]/88 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <div
            className="relative w-full max-w-5xl rounded-[2rem] bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0b1f3a] text-white shadow-lg transition hover:bg-[#102848]"
              aria-label="Close image"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,#eef4fb_0%,#d8e7f8_100%)]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain p-4 sm:p-6"
                sizes="90vw"
                priority
              />
            </div>

            <div className="px-3 pb-2 pt-5 sm:px-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c8a951]">
                Featured Listing
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">{activeImage.title}</h3>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">{activeImage.location}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
