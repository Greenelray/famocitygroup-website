"use client";

import Image from "next/image";
import type { Course } from "@/lib/course-data";

type AdminCourseFormProps = {
  action: string;
  submitLabel: string;
  initialCourse?: Course;
};

function getDefaults(course?: Course) {
  if (!course) {
    return {
      title: "",
      slug: "",
      tagline: "",
      description: "",
      selarUrl: "",
      priceNaira: 10000,
      level: "",
      duration: "",
      lessonCount: 0
    };
  }

  return {
    title: course.title,
    slug: course.slug,
    tagline: course.tagline,
    description: course.description,
    selarUrl: course.selarUrl,
    priceNaira: course.priceNaira,
    level: course.level,
    duration: course.duration,
    lessonCount: course.lessonCount
  };
}

function PreviewImage({ src, alt, label }: { src?: string; alt: string; label: string }) {
  if (!src) {
    return null;
  }

  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">{label}</p>
      <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-white">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 20rem" />
      </div>
    </div>
  );
}

export function AdminCourseForm({ action, submitLabel, initialCourse }: AdminCourseFormProps) {
  const defaults = getDefaults(initialCourse);

  return (
    <form action={action} method="POST" encType="multipart/form-data" className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Course title</span>
          <input
            name="title"
            required
            defaultValue={defaults.title}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
            placeholder="Real Estate Wealth Blueprint"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Course slug</span>
          <input
            name="slug"
            required
            defaultValue={defaults.slug}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm lowercase outline-none transition focus:border-[#0b1f3a]"
            placeholder="real-estate-wealth-blueprint"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Selar public link</span>
        <input
          name="selarUrl"
          type="url"
          required
          defaultValue={defaults.selarUrl}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
          placeholder="https://selar.com/your-course-link"
        />
      </label>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Short tagline</span>
          <input
            name="tagline"
            required
            defaultValue={defaults.tagline}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
            placeholder="A short line that appears inside the price card"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Price in naira</span>
          <input
            name="priceNaira"
            type="number"
            min="0"
            required
            defaultValue={defaults.priceNaira}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
        <textarea
          name="description"
          required
          rows={7}
          defaultValue={defaults.description}
          className="w-full rounded-[1.6rem] border border-slate-200 px-4 py-4 text-sm leading-7 outline-none transition focus:border-[#0b1f3a]"
          placeholder="Write the premium preview copy that explains why people should buy this course."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Level</span>
          <input
            name="level"
            required
            defaultValue={defaults.level}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
            placeholder="Beginner"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Duration</span>
          <input
            name="duration"
            required
            defaultValue={defaults.duration}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
            placeholder="1 day"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Lessons</span>
          <input
            name="lessonCount"
            type="number"
            min="0"
            required
            defaultValue={defaults.lessonCount}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0b1f3a]"
            placeholder="2"
          />
        </label>
      </div>

      {initialCourse ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <PreviewImage src={initialCourse.thumbnail} alt={`${initialCourse.title} thumbnail`} label="Current thumbnail" />
          <PreviewImage src={initialCourse.heroImage} alt={`${initialCourse.title} hero`} label="Current hero image" />
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Thumbnail image</span>
          <input
            name="thumbnail"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required={!initialCourse}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:border-[#0b1f3a]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Hero image</span>
          <input
            name="heroImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required={!initialCourse}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:border-[#0b1f3a]"
          />
        </label>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
        This form now controls only the premium website preview. Buyers will use the Selar public link above to purchase and access the actual course on Selar.
      </div>

      <button type="submit" className="premium-button-primary w-full justify-center">
        {submitLabel}
      </button>
    </form>
  );
}
