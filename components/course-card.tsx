import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, GraduationCap, LayoutList } from "lucide-react";
import type { Course } from "@/lib/course-data";
import { getLessonCount } from "@/lib/course-data";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="glass-card overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061326]/90 via-[#061326]/35 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#eadba6]">Famocity Academy</p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{course.title}</h3>
          </div>
          <div className="self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur sm:self-auto">
            NGN {course.priceNaira.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <p className="text-sm leading-7 text-slate-600">{course.tagline}</p>

        <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Clock3 size={16} className="text-[#c8a951]" />
              {course.duration}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <LayoutList size={16} className="text-[#c8a951]" />
              {getLessonCount(course)} lessons
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <GraduationCap size={16} className="text-[#c8a951]" />
              <span className="line-clamp-2">{course.level}</span>
            </div>
          </div>
        </div>

        <Link href={`/courses/${course.slug}`} className="premium-button-primary button-card-view mt-6 w-full">
          View Course
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
