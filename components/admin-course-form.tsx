"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Course } from "@/lib/course-data";

type ResourceInput = {
  id: string;
  title: string;
  href: string;
};

type LessonInput = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  summary: string;
  body: string;
  preview: boolean;
  videoMode: "upload" | "url";
  videoUrl: string;
  videoFieldName: string;
  resources: ResourceInput[];
};

type ModuleInput = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  lessons: LessonInput[];
};

type AdminCourseFormProps = {
  action: string;
  submitLabel: string;
  initialCourse?: Course;
};

type CoursePayload = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  priceNaira: number;
  level: string;
  duration: string;
  format: string;
  outcomes: string[];
  audience: string[];
  modules: Array<{
    slug: string;
    title: string;
    summary: string;
    lessons: Array<{
      slug: string;
      title: string;
      duration: string;
      summary: string;
      body: string[];
      preview: boolean;
      videoMode: "upload" | "url";
      videoUrl: string;
      videoFieldName: string;
      resources: Array<{
        title: string;
        href: string;
      }>;
    }>;
  }>;
};

function makeId(prefix: string, counter: number) {
  return `${prefix}-${counter}`;
}

function emptyResource(counter: number): ResourceInput {
  return {
    id: makeId("resource", counter),
    title: "",
    href: ""
  };
}

function emptyLesson(counter: number): LessonInput {
  const id = makeId("lesson", counter);
  return {
    id,
    slug: "",
    title: "",
    duration: "",
    summary: "",
    body: "",
    preview: false,
    videoMode: "upload",
    videoUrl: "",
    videoFieldName: `lessonVideo_${id}`,
    resources: []
  };
}

function emptyModule(moduleCounter: number, lessonCounter: number): ModuleInput {
  return {
    id: makeId("module", moduleCounter),
    slug: "",
    title: "",
    summary: "",
    lessons: [emptyLesson(lessonCounter)]
  };
}

function mapInitialCourse(course?: Course) {
  if (!course) {
    return {
      title: "",
      slug: "",
      tagline: "",
      description: "",
      priceNaira: 0,
      level: "",
      duration: "",
      format: "",
      outcomes: "",
      audience: "",
      modules: [emptyModule(1, 1)]
    };
  }

  return {
    title: course.title,
    slug: course.slug,
    tagline: course.tagline,
    description: course.description,
    priceNaira: course.priceNaira,
    level: course.level,
    duration: course.duration,
    format: course.format,
    outcomes: course.outcomes.join("\n"),
    audience: course.audience.join("\n"),
    modules: course.modules.map((module, moduleIndex) => ({
      id: makeId("module", moduleIndex + 1),
      slug: module.slug,
      title: module.title,
      summary: module.summary,
      lessons: module.lessons.map((lesson, lessonIndex) => {
        const id = makeId("lesson", moduleIndex * 100 + lessonIndex + 1);
        return {
          id,
          slug: lesson.slug,
          title: lesson.title,
          duration: lesson.duration,
          summary: lesson.summary,
          body: lesson.body.join("\n"),
          preview: Boolean(lesson.preview),
          videoMode: "url" as const,
          videoUrl: lesson.videoUrl,
          videoFieldName: `lessonVideo_${id}`,
          resources: lesson.resources.map((resource, resourceIndex) => ({
            id: makeId("resource", moduleIndex * 1000 + lessonIndex * 100 + resourceIndex + 1),
            title: resource.title,
            href: resource.href
          }))
        };
      })
    }))
  };
}

export function AdminCourseForm({ action, submitLabel, initialCourse }: AdminCourseFormProps) {
  const defaults = mapInitialCourse(initialCourse);
  const moduleCounterRef = useRef(defaults.modules.length + 1);
  const lessonCounterRef = useRef(
    defaults.modules.reduce((count, module) => count + module.lessons.length, 0) + 1
  );
  const resourceCounterRef = useRef(
    defaults.modules.reduce(
      (count, module) =>
        count + module.lessons.reduce((lessonCount, lesson) => lessonCount + lesson.resources.length, 0),
      0
    ) + 1
  );

  const [modules, setModules] = useState<ModuleInput[]>(defaults.modules);
  const [resourceVisibility, setResourceVisibility] = useState<Record<string, boolean>>(() => {
    const entries = defaults.modules.flatMap((module) =>
      module.lessons.map((lesson) => [lesson.id, lesson.resources.length > 0] as const)
    );
    return Object.fromEntries(entries);
  });

  const payload: CoursePayload = {
    slug: defaults.slug,
    title: defaults.title,
    tagline: defaults.tagline,
    description: defaults.description,
    priceNaira: defaults.priceNaira,
    level: defaults.level,
    duration: defaults.duration,
    format: defaults.format,
    outcomes: defaults.outcomes
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    audience: defaults.audience
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    modules: modules.map((module) => ({
      slug: module.slug,
      title: module.title,
      summary: module.summary,
      lessons: module.lessons.map((lesson) => ({
        slug: lesson.slug,
        title: lesson.title,
        duration: lesson.duration,
        summary: lesson.summary,
        body: lesson.body
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        preview: lesson.preview,
        videoMode: lesson.videoMode,
        videoUrl: lesson.videoUrl,
        videoFieldName: lesson.videoFieldName,
        resources: lesson.resources
          .filter((resource) => resource.title.trim() && resource.href.trim())
          .map((resource) => ({
            title: resource.title.trim(),
            href: resource.href.trim()
          }))
      }))
    }))
  };

  function updateModule(moduleId: string, field: keyof Omit<ModuleInput, "id" | "lessons">, value: string) {
    setModules((current) =>
      current.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module))
    );
  }

  function updateLesson(
    moduleId: string,
    lessonId: string,
    field: keyof Omit<LessonInput, "id" | "resources">,
    value: string | boolean
  ) {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              )
            }
          : module
      )
    );
  }

  function addModule() {
    const nextModuleId = moduleCounterRef.current++;
    const nextLessonId = lessonCounterRef.current++;
    setModules((current) => [...current, emptyModule(nextModuleId, nextLessonId)]);
  }

  function removeModule(moduleId: string) {
    setModules((current) => (current.length > 1 ? current.filter((module) => module.id !== moduleId) : current));
  }

  function addLesson(moduleId: string) {
    const nextLessonId = lessonCounterRef.current++;
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [...module.lessons, emptyLesson(nextLessonId)]
            }
          : module
      )
    );
  }

  function removeLesson(moduleId: string, lessonId: string) {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId && module.lessons.length > 1
          ? {
              ...module,
              lessons: module.lessons.filter((lesson) => lesson.id !== lessonId)
            }
          : module
      )
    );
  }

  function toggleResources(lessonId: string, enabled: boolean) {
    setResourceVisibility((current) => ({
      ...current,
      [lessonId]: enabled
    }));

    if (enabled) {
      setModules((current) =>
        current.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId && lesson.resources.length === 0
                  ? { ...lesson, resources: [emptyResource(resourceCounterRef.current++)] }
                  : lesson
              )
            }))
      );
      return;
    }

    setModules((current) =>
      current.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, resources: [] } : lesson))
      }))
    );
  }

  function addResource(moduleId: string, lessonId: string) {
    const nextResourceId = resourceCounterRef.current++;
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, resources: [...lesson.resources, emptyResource(nextResourceId)] }
                  : lesson
              )
            }
          : module
      )
    );
  }

  function removeResource(moduleId: string, lessonId: string, resourceId: string) {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, resources: lesson.resources.filter((resource) => resource.id !== resourceId) }
                  : lesson
              )
            }
          : module
      )
    );
  }

  function updateResource(
    moduleId: string,
    lessonId: string,
    resourceId: string,
    field: keyof Omit<ResourceInput, "id">,
    value: string
  ) {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      resources: lesson.resources.map((resource) =>
                        resource.id === resourceId ? { ...resource, [field]: value } : resource
                      )
                    }
                  : lesson
              )
            }
          : module
      )
    );
  }

  return (
    <form action={action} method="POST" encType="multipart/form-data" className="space-y-8">
      <input type="hidden" name="coursePayload" value={JSON.stringify(payload)} />

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Course title</span>
          <input
            name="title"
            type="text"
            required
            defaultValue={defaults.title}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="Real Estate Wealth Blueprint"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Course slug</span>
          <input
            name="slug"
            type="text"
            required
            defaultValue={defaults.slug}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="real-estate-wealth-blueprint"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Short tagline</span>
          <input
            name="tagline"
            type="text"
            required
            defaultValue={defaults.tagline}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="A short line that appears on the course card"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={defaults.description}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="Full course description"
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
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="75000"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Level</span>
          <input
            name="level"
            type="text"
            required
            defaultValue={defaults.level}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="Beginner to intermediate"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Duration</span>
          <input
            name="duration"
            type="text"
            required
            defaultValue={defaults.duration}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="6 weeks"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Format</span>
          <input
            name="format"
            type="text"
            required
            defaultValue={defaults.format}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder="Video lessons and worksheets"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Thumbnail image {initialCourse ? "(optional for edit)" : ""}
          </span>
          {initialCourse ? (
            <div className="mb-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="relative aspect-[16/10]">
                <Image
                  src={initialCourse.thumbnail}
                  alt={`${initialCourse.title} thumbnail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 20rem"
                />
              </div>
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Current thumbnail
              </div>
            </div>
          ) : null}
          <input
            name="thumbnail"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required={!initialCourse}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold focus:border-[#c8a951]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Hero image {initialCourse ? "(optional for edit)" : ""}
          </span>
          {initialCourse ? (
            <div className="mb-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="relative aspect-[16/10]">
                <Image
                  src={initialCourse.heroImage}
                  alt={`${initialCourse.title} hero`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 20rem"
                />
              </div>
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Current hero image
              </div>
            </div>
          ) : null}
          <input
            name="heroImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required={!initialCourse}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold focus:border-[#c8a951]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">What students will learn</span>
          <textarea
            name="outcomes"
            rows={5}
            required
            defaultValue={defaults.outcomes}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder={"One outcome per line"}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Target audience</span>
          <textarea
            name="audience"
            rows={5}
            required
            defaultValue={defaults.audience}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
            placeholder={"One audience point per line"}
          />
        </label>
      </div>

      <div className="space-y-6">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">
                Module {moduleIndex + 1}
              </p>
              {modules.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeModule(module.id)}
                  className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  Remove module
                </button>
              ) : null}
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Module title</span>
                <input
                  type="text"
                  value={module.title}
                  onChange={(event) => updateModule(module.id, "title", event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="Mindset and Strategy"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Module slug</span>
                <input
                  type="text"
                  value={module.slug}
                  onChange={(event) => updateModule(module.id, "slug", event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="mindset-and-strategy"
                />
              </label>

              <label className="block lg:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Module summary</span>
                <textarea
                  rows={3}
                  value={module.summary}
                  onChange={(event) => updateModule(module.id, "summary", event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="Short description for this module"
                />
              </label>
            </div>

            <div className="mt-8 space-y-5">
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="rounded-[1.4rem] border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Lesson {lessonIndex + 1}
                    </p>
                    {module.lessons.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeLesson(module.id, lesson.id)}
                        className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        Remove lesson
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">Lesson title</span>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(event) => updateLesson(module.id, lesson.id, "title", event.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                        placeholder="Why Ownership Matters"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">Lesson slug</span>
                      <input
                        type="text"
                        value={lesson.slug}
                        onChange={(event) => updateLesson(module.id, lesson.id, "slug", event.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                        placeholder="why-ownership-matters"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">Lesson duration</span>
                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(event) => updateLesson(module.id, lesson.id, "duration", event.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                        placeholder="12 min"
                      />
                    </label>

                    <div className="space-y-3">
                      <span className="block text-sm font-semibold text-slate-700">Lesson video</span>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <label className="flex items-center gap-2 font-semibold text-slate-700">
                          <input
                            type="radio"
                            name={`videoMode-${lesson.id}`}
                            checked={lesson.videoMode === "upload"}
                            onChange={() => updateLesson(module.id, lesson.id, "videoMode", "upload")}
                          />
                          Upload file
                        </label>
                        <label className="flex items-center gap-2 font-semibold text-slate-700">
                          <input
                            type="radio"
                            name={`videoMode-${lesson.id}`}
                            checked={lesson.videoMode === "url"}
                            onChange={() => updateLesson(module.id, lesson.id, "videoMode", "url")}
                          />
                          Use video URL
                        </label>
                      </div>

                      {lesson.videoMode === "upload" ? (
                        <input
                          name={lesson.videoFieldName}
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime,video/x-matroska"
                          required={!initialCourse || lesson.videoMode === "upload"}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold focus:border-[#c8a951]"
                        />
                      ) : (
                        <input
                          type="url"
                          value={lesson.videoUrl}
                          onChange={(event) => updateLesson(module.id, lesson.id, "videoUrl", event.target.value)}
                          required
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                          placeholder="https://..."
                        />
                      )}
                    </div>

                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">Lesson summary</span>
                      <textarea
                        rows={3}
                        value={lesson.summary}
                        onChange={(event) => updateLesson(module.id, lesson.id, "summary", event.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                        placeholder="Short summary for the lesson"
                      />
                    </label>

                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">Lesson notes</span>
                      <textarea
                        rows={6}
                        value={lesson.body}
                        onChange={(event) => updateLesson(module.id, lesson.id, "body", event.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                        placeholder={"One paragraph per line"}
                      />
                    </label>

                    <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={lesson.preview}
                        onChange={(event) => updateLesson(module.id, lesson.id, "preview", event.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-[#0b1f3a] focus:ring-[#c8a951]"
                      />
                      Make this lesson a preview
                    </label>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={Boolean(resourceVisibility[lesson.id])}
                        onChange={(event) => toggleResources(lesson.id, event.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-[#0b1f3a] focus:ring-[#c8a951]"
                      />
                      Add lesson resources
                    </label>

                    {resourceVisibility[lesson.id] ? (
                      <div className="mt-4 space-y-4">
                        {lesson.resources.map((resource) => (
                          <div key={resource.id} className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                            <label className="block">
                              <span className="mb-2 block text-sm font-semibold text-slate-700">Resource title</span>
                              <input
                                type="text"
                                value={resource.title}
                                onChange={(event) =>
                                  updateResource(module.id, lesson.id, resource.id, "title", event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                                placeholder="Worksheet name"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-2 block text-sm font-semibold text-slate-700">Resource link</span>
                              <input
                                type="url"
                                value={resource.href}
                                onChange={(event) =>
                                  updateResource(module.id, lesson.id, resource.id, "href", event.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                                placeholder="https://..."
                              />
                            </label>
                            <div className="flex items-end">
                              <button
                                type="button"
                                onClick={() => removeResource(module.id, lesson.id, resource.id)}
                                className="w-full rounded-full border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addResource(module.id, lesson.id)}
                          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        >
                          Add another resource
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addLesson(module.id)}
                className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                Add another lesson
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={addModule}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Add another module
        </button>
        <button type="submit" className="premium-button-primary w-full sm:w-auto">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
