import type { Metadata } from "next";
import Image from "next/image";
import auditorPhoto from "../../auditor.jpeg";
import generalManagerPhoto from "../../gm.jpeg";
import managerPhoto from "../../manager (2).jpeg";
import managingDirectorPhoto from "../../md.jpeg";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";

const team = [
  { name: "Famous Okpor", role: "Managing Director", image: managingDirectorPhoto },
  { name: "Peres Ogeinne", role: "General Manager", image: generalManagerPhoto },
  { name: "Ogbeivor-Abieu Ifeanyichukwu Evergreen", role: "Manager", image: managerPhoto },
  { name: "Blessing Okpor", role: "Business Auditor", image: auditorPhoto }
];

export const metadata: Metadata = {
  title: "Team | Famocity Group Limited",
  description: "Meet the leadership team behind Famocity Group Limited.",
  alternates: {
    canonical: "/team"
  }
};

export default async function TeamPage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Team</span>
            <h1 className="section-title max-w-4xl">People driving trust, structure, and execution.</h1>
            <p className="section-copy">
              Famocity Group Limited is led by people focused on clarity, accountability, and long-term value creation.
            </p>
          </Reveal>

          <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={0.08 * index}>
                <article className="glass-card group flex h-full flex-col overflow-hidden p-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <h2 className="text-xl font-semibold leading-8 text-slate-900">{member.name}</h2>
                    <p className="mt-auto pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c8a951]">{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
