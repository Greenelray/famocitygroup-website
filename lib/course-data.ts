import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

export type Lesson = {
  slug: string;
  title: string;
  duration: string;
  preview?: boolean;
  summary: string;
  videoUrl: string;
  resources: { title: string; href: string }[];
  body: string[];
};

export type Module = {
  slug: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  priceNaira: number;
  level: string;
  duration: string;
  format: string;
  heroImage: string;
  thumbnail: string;
  outcomes: string[];
  audience: string[];
  modules: Module[];
};

export const fallbackCourses: Course[] = [
  {
    slug: "real-estate-wealth-blueprint",
    title: "Real Estate Wealth Blueprint",
    tagline: "Learn how to move from paying rent to building real asset ownership with confidence.",
    description:
      "A practical Famocity flagship program covering land verification, financing strategy, deal evaluation, and the disciplined habits that turn income into long-term property wealth.",
    priceNaira: 75000,
    level: "Beginner to intermediate",
    duration: "6 weeks",
    format: "Video lessons, worksheets, and guided action steps",
    heroImage: "/premium-garden-city.jpeg",
    thumbnail: "/villa-abraka.jpeg",
    outcomes: [
      "Understand how to assess land and property opportunities without emotional buying.",
      "Create a personal savings and acquisition roadmap tied to your income level.",
      "Know the legal and verification steps to take before committing funds.",
      "Build a plan for turning your first property into a long-term wealth base."
    ],
    audience: [
      "Young professionals who want to start owning assets early.",
      "Families planning their first plot or first investment property.",
      "People who have money saved but need structure before buying land.",
      "Anyone who wants to understand the business side of real estate in Nigeria."
    ],
    modules: [
      {
        slug: "mindset-and-strategy",
        title: "Mindset and Strategy",
        summary: "Start with the thinking patterns and planning habits behind smart ownership.",
        lessons: [
          {
            slug: "why-ownership-matters",
            title: "Why Ownership Matters",
            duration: "12 min",
            preview: true,
            summary: "A practical introduction to asset building and why property remains a strategic foundation.",
            videoUrl: "https://player.vimeo.com/video/76979871",
            resources: [{ title: "Ownership Reflection Worksheet", href: "#" }],
            body: [
              "This lesson resets the conversation from income alone to ownership. Students learn why asset accumulation protects families, creates leverage, and offers a stronger future than constant consumption.",
              "It also introduces the Famocity framework for thinking about real estate as a planned journey rather than a rushed purchase."
            ]
          },
          {
            slug: "setting-your-acquisition-plan",
            title: "Setting Your Acquisition Plan",
            duration: "18 min",
            summary: "Translate your income level into a realistic path toward your first property.",
            videoUrl: "https://player.vimeo.com/video/22439234",
            resources: [{ title: "Acquisition Planning Sheet", href: "#" }],
            body: [
              "Students map their current earnings, savings habits, and target timeline into a workable property plan.",
              "By the end, each learner has a first-draft strategy for when to save, when to buy, and what kind of property to target."
            ]
          }
        ]
      },
      {
        slug: "verification-and-risk",
        title: "Verification and Risk",
        summary: "Learn how to protect yourself before any payment leaves your account.",
        lessons: [
          {
            slug: "how-to-verify-land-safely",
            title: "How to Verify Land Safely",
            duration: "22 min",
            summary: "A guided process for checking ownership, documents, and red flags before buying.",
            videoUrl: "https://player.vimeo.com/video/32723231",
            resources: [{ title: "Verification Checklist", href: "#" }],
            body: [
              "This lesson breaks down the core checks to carry out before committing to land or property deals.",
              "It focuses on reducing fraud, asking the right questions, and building a documentation habit that protects your money."
            ]
          },
          {
            slug: "common-buying-mistakes",
            title: "Common Buying Mistakes",
            duration: "16 min",
            summary: "Avoid emotional decisions, rushed deposits, and poor due diligence.",
            videoUrl: "https://player.vimeo.com/video/146022717",
            resources: [{ title: "Deal Review Scorecard", href: "#" }],
            body: [
              "Students review the mistakes first-time buyers make most often and how those errors can be prevented.",
              "The lesson includes a simple scorecard for pausing, evaluating, and deciding with more discipline."
            ]
          }
        ]
      },
      {
        slug: "execution-and-growth",
        title: "Execution and Growth",
        summary: "Turn your first purchase into a repeatable wealth-building system.",
        lessons: [
          {
            slug: "funding-your-first-property",
            title: "Funding Your First Property",
            duration: "20 min",
            summary: "How to combine savings discipline, phased payments, and opportunity timing.",
            videoUrl: "https://player.vimeo.com/video/90509568",
            resources: [{ title: "Funding Plan Template", href: "#" }],
            body: [
              "This lesson helps students structure payment plans, saving cycles, and contingency decisions for real-world buying scenarios.",
              "It is designed to make first-property ownership feel achievable without reckless pressure."
            ]
          },
          {
            slug: "building-your-next-step-roadmap",
            title: "Building Your Next-Step Roadmap",
            duration: "14 min",
            summary: "Leave the course with a clear 90-day action plan.",
            videoUrl: "https://player.vimeo.com/video/19568824",
            resources: [{ title: "90-Day Action Planner", href: "#" }],
            body: [
              "The closing lesson turns learning into action with a structured roadmap for the next ninety days.",
              "Students finish with the next calls to make, documents to gather, and milestones to hit before the next investment decision."
            ]
          }
        ]
      }
    ]
  }
];

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price_naira: number;
  level: string;
  duration: string;
  format: string;
  hero_image: string;
  thumbnail: string;
  outcomes: unknown;
  audience: unknown;
  is_published: boolean;
};

type ModuleRow = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  summary: string;
  position: number;
};

type LessonRow = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  duration: string;
  preview: boolean;
  summary: string;
  video_url: string;
  resources: unknown;
  body: unknown;
  position: number;
};

function ensureStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function ensureResources(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as { title: string; href: string }[];
  }

  return value.filter(
    (item): item is { title: string; href: string } =>
      typeof item === "object" &&
      item !== null &&
      "title" in item &&
      "href" in item &&
      typeof item.title === "string" &&
      typeof item.href === "string"
  );
}

function mapDbCourses(courseRows: CourseRow[], moduleRows: ModuleRow[], lessonRows: LessonRow[]) {
  return courseRows.map((courseRow) => {
    const modules = moduleRows
      .filter((moduleRow) => moduleRow.course_id === courseRow.id)
      .sort((a, b) => a.position - b.position)
      .map((moduleRow) => ({
        slug: moduleRow.slug,
        title: moduleRow.title,
        summary: moduleRow.summary,
        lessons: lessonRows
          .filter((lessonRow) => lessonRow.module_id === moduleRow.id)
          .sort((a, b) => a.position - b.position)
          .map((lessonRow) => ({
            slug: lessonRow.slug,
            title: lessonRow.title,
            duration: lessonRow.duration,
            preview: lessonRow.preview,
            summary: lessonRow.summary,
            videoUrl: lessonRow.video_url,
            resources: ensureResources(lessonRow.resources),
            body: ensureStringArray(lessonRow.body)
          }))
      }));

    return {
      slug: courseRow.slug,
      title: courseRow.title,
      tagline: courseRow.tagline,
      description: courseRow.description,
      priceNaira: courseRow.price_naira,
      level: courseRow.level,
      duration: courseRow.duration,
      format: courseRow.format,
      heroImage: courseRow.hero_image,
      thumbnail: courseRow.thumbnail,
      outcomes: ensureStringArray(courseRow.outcomes),
      audience: ensureStringArray(courseRow.audience),
      modules
    };
  });
}

export async function listCourses() {
  if (!isSupabaseConfigured()) {
    return fallbackCourses;
  }

  try {
    const supabase = createSupabaseAdminClient();
    const [{ data: courseRows, error: courseError }, { data: moduleRows, error: moduleError }, { data: lessonRows, error: lessonError }] =
      await Promise.all([
        supabase
          .from("courses")
          .select("id, slug, title, tagline, description, price_naira, level, duration, format, hero_image, thumbnail, outcomes, audience, is_published")
          .eq("is_published", true)
          .order("created_at", { ascending: true }),
        supabase
          .from("course_modules")
          .select("id, course_id, slug, title, summary, position")
          .order("position", { ascending: true }),
        supabase
          .from("course_lessons")
          .select("id, module_id, slug, title, duration, preview, summary, video_url, resources, body, position")
          .order("position", { ascending: true })
      ]);

    if (courseError || moduleError || lessonError || !courseRows) {
      return fallbackCourses;
    }

    if (courseRows.length === 0) {
      return [];
    }

    return mapDbCourses(courseRows as CourseRow[], (moduleRows ?? []) as ModuleRow[], (lessonRows ?? []) as LessonRow[]);
  } catch {
    return fallbackCourses;
  }
}

export async function getCourseBySlug(slug: string) {
  const courses = await listCourses();
  return courses.find((course) => course.slug === slug);
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  const course = await getCourseBySlug(courseSlug);
  if (!course) {
    return null;
  }

  for (const module of course.modules) {
    const lesson = module.lessons.find((item) => item.slug === lessonSlug);
    if (lesson) {
      return { course, module, lesson };
    }
  }

  return null;
}

export function getLessonCount(course: Course) {
  return course.modules.reduce((count, module) => count + module.lessons.length, 0);
}
