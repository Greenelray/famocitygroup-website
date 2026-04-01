import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  Drill,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import auditorPhoto from "../auditor.jpeg";
import founderStoryPhoto from "../manager3.jpeg";
import generalManagerPhoto from "../gm.jpeg";
import managerPhoto from "../manager (2).jpeg";
import managingDirectorPhoto from "../md.jpeg";
import promisePhoto from "../md2.jpeg";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PropertyGallery } from "@/components/property-gallery";
import { Reveal } from "@/components/reveal";

const stats = [
  { value: "4", label: "Core business pillars" },
  { value: "100%", label: "Commitment to transparency" },
  { value: "Future", label: "Focused on long-term value" }
];

const services = [
  {
    title: "Real Estate",
    copy: "Helping clients acquire safe, verified lands and properties with confidence and clarity.",
    icon: Landmark
  },
  {
    title: "Construction",
    copy: "Turning land into valuable structures, homes, and developments that stand the test of time.",
    icon: Drill
  },
  {
    title: "Gadgets",
    copy: "Providing modern tools for productivity, convenience, and smarter everyday living.",
    icon: Smartphone
  },
  {
    title: "Famosave",
    copy: "Helping people save with purpose and consistency toward land ownership and real assets.",
    icon: BadgeDollarSign
  }
];

const chooseUs = [
  "We promote ownership and wealth building instead of short-term spending.",
  "We operate with trust, verification, and transparency at every stage.",
  "Our structured savings system makes disciplined investing realistic.",
  "We create youth-focused opportunities that unlock long-term growth."
];

const profileHighlights = [
  {
    title: "Built for ownership",
    copy:
      "Famocity exists for people who want more from life than earning and spending. We are built around ownership, structure, and long-term value."
  },
  {
    title: "Focused on real progress",
    copy:
      "Our business supports smart living, wealth building, meaningful projects, and future security through practical opportunities."
  },
  {
    title: "A bridge to the future",
    copy:
      "The brand was created to connect people from low starting points to bigger possibilities through belief, action, and disciplined growth."
  }
];

const propertyImages = [
  {
    src: "/villa-abraka.jpeg",
    alt: "Famocity Villa Abraka",
    title: "Famocity Villa Abraka",
    location: "Abraka, Delta State"
  },
  {
    src: "/premium-garden-city.jpeg",
    alt: "Premium Garden City",
    title: "Premium Garden City",
    location: "Asaba, Delta State"
  },
  {
    src: "/everess-palm-city.jpeg",
    alt: "Everess Palm City",
    title: "Everess Palm City",
    location: "Olodu Ibusa, Delta State"
  }
];

const team = [
  { name: "Mr Famous Okpor", role: "Managing Director", image: managingDirectorPhoto },
  { name: "Mr Peres Ogeinne", role: "General Manager", image: generalManagerPhoto },
  { name: "Mr Ogbeivor-Abieu Ifeanyichukwu Evergreen", role: "Manager", image: managerPhoto },
  { name: "Mrs Blessing Okpor", role: "Business Auditor", image: auditorPhoto }
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar />

      <section id="home" className="relative -mt-24 overflow-hidden pb-20 pt-28 sm:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/hero-real-estate.svg"
            alt="Luxury real estate skyline"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,31,58,0.96),rgba(11,31,58,0.84),rgba(30,41,59,0.78))]" />
        </div>

        <div className="section-shell relative z-10 grid min-h-[88svh] items-center gap-14 pt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-label border-white/15 bg-white/10 text-[#c8a951]">
                Premium asset growth partner
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Build Smart. Own Assets. Live Better.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Helping you build wealth through real estate, construction, smart savings, and future-focused
                investments.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="#contact" className="premium-button-accent min-h-12 sm:min-w-[180px]">
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#real-estate"
                  className="premium-button min-h-12 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white hover:bg-white/15"
                >
                  View Properties
                </Link>
              </div>

              <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <Reveal key={stat.label} delay={0.08 * index}>
                    <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-5 shadow-md backdrop-blur-sm">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-[26rem] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={promisePhoto}
                  alt="Famocity promise portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/88 via-[#0b1f3a]/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(6,19,38,0.72),rgba(6,19,38,0.94))] p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#c8a951]">Famocity Promise</p>
                  <p className="mt-3 text-base leading-7 text-slate-100">
                    We help everyday people move from hope to ownership with structure, trust, and smart planning.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="section-block bg-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
          <Reveal>
            <div className="glass-card p-8 sm:p-10">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Ownership, structure, and long-term value.</h2>
              <p className="section-copy">
                Famocity Real Estate and Construction LTD is a modern and forward-thinking company created for
                people who want more from life than just earning and spending money. We are a brand built on
                ownership, structure, and long-term value.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Our goal is to help people build a better future through assets and meaningful investments.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                At Famocity, we believe true financial growth comes from ownership, structure, and long-term
                value. We encourage people, especially young people, to think beyond temporary spending and start
                making moves that will benefit them tomorrow.
              </p>
            </div>
          </Reveal>

          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2">
            {["Real Estate", "Construction", "Gadgets", "Smart Savings (FAMOSAVE)"].map((item, index) => (
              <Reveal key={item} delay={0.08 * index}>
                <div className="glass-card flex h-full min-h-44 flex-col justify-between p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1f3a] text-white shadow-md">
                    <Building2 size={20} />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-slate-900 sm:text-2xl">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Built to create stable value, practical access, and meaningful growth for families and young
                    investors.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-surface">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Company Profile</span>
            <h2 className="section-title">A business designed for smart living, wealth building, and future security.</h2>
            <p className="section-copy">
              Famocity serves people who want to own assets, build meaningful projects, improve their lifestyle,
              and save with purpose. Every part of the company is structured to make progress practical and
              understandable.
            </p>
          </Reveal>

          <div className="mt-12 grid auto-rows-fr gap-6 lg:grid-cols-3">
            {profileHighlights.map((item, index) => (
              <Reveal key={item.title} delay={0.08 * index}>
                <div className="glass-card h-full p-8">
                  <div className="mb-5 h-1 w-14 rounded-full bg-[#c8a951]" />
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell">
          <div className="glass-card overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={founderStoryPhoto}
                    alt="Founder story portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <span className="section-label">Founder Story</span>
                <h2 className="section-title">My Story, My Motivation</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
                  <p>
                    Famocity was born from a very relatable truth for many Nigerians: hard work alone does not
                    always create security. Too many people earn, spend, and start again without building anything
                    that lasts.
                  </p>
                  <p>
                    This vision is about changing that story. From humble beginnings and real-life struggle came a
                    decision to build structure, create opportunities, and make ownership possible for more people.
                    The message is simple: believe bigger, act with purpose, and let your money become something
                    meaningful.
                  </p>
                  <p>
                    Famocity was created to build a bridge from the lowest point to the highest point, to create a
                    link between the poor and the rich, and to build the qualities and character needed to create
                    wealth. It is meant to help people rewrite their story and become the hero of their own future.
                  </p>
                  <p className="font-semibold text-slate-900">
                    Join us or partner with us, and become a contributor to humanity.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block section-surface">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-8 sm:p-10">
              <span className="section-label">Vision</span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">Make investment accessible.</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Make savings and real estate investment accessible, especially for young people.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                We want to close the gap for people who desire assets and a secure future but lack the right
                platform, guidance, or opportunity to begin.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card h-full p-8 sm:p-10">
              <span className="section-label">Mission</span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">Build lasting global impact.</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Build a strong business structure, drive innovation, and create lasting impact in real estate and
                development globally.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                We are building for sustainable growth, collaboration, relevance, and excellence so our work today
                can position Famocity as a recognized force in the future of development and investment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-block bg-white">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Services</span>
            <h2 className="section-title">Solutions designed for ownership and growth.</h2>
            <p className="section-copy">
              Every Famocity service supports a bigger outcome: helping people turn income into assets, comfort,
              and long-term value.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Our business is designed to serve people who want to own assets, build meaningful projects, improve
              their lifestyle, and save with purpose.
            </p>
          </Reveal>

          <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={0.08 * index}>
                  <div className="glass-card group h-full p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1f3a] text-white shadow-md transition group-hover:bg-[#c8a951] group-hover:text-[#0b1f3a]">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{service.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="real-estate" className="section-block section-surface">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span className="section-label">Real Estate</span>
            <h2 className="section-title">Land remains one of the most reliable appreciating assets.</h2>
            <p className="section-copy">
              We believe real estate should be built on trust, transparency, and access. That is why Famocity
              focuses on verified opportunities and systems that make ownership realistic for young people and
              growing families.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Safe and verified land opportunities.",
                "Straightforward communication and transparent processes.",
                "Accessible pathways into ownership for first-time buyers."
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-base text-slate-600">
                  <ShieldCheck className="mt-1 text-[#c8a951]" size={18} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <PropertyGallery images={propertyImages} />
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-8 sm:p-10">
              <span className="section-label">Construction</span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Turning empty land into valuable structures.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                From homes to investment projects and broader developments, we turn spaces into functional value.
                Our construction arm exists to transform raw opportunity into tangible progress.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Whether the goal is a dream home, an income-generating property, or a broader development project,
                we help clients turn owned land into something useful, lasting, and valuable.
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#c8a951]">
                Turning dreams into reality
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card h-full p-8 sm:p-10">
              <span className="section-label">Gadgets</span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Modern tools that support smart living today.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Famocity also operates in the gadget space because productivity, communication, learning, and
                modern living all depend on having the right tools in the present.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                While real estate and construction focus on long-term value, gadgets support day-to-day efficiency
                and convenience. Together, they create a stronger path toward a better life.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="famosave" className="section-block section-surface">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="glass-card flex h-full flex-col justify-between p-8 sm:p-10">
              <div>
                <span className="section-label">Meet Famosave</span>
                <div className="mt-6 rounded-2xl p-2">
                  <Image
                    src="/famosave-logo.png"
                    alt="Famosave logo"
                    width={440}
                    height={180}
                    className="h-auto w-full max-w-sm drop-shadow-[0_8px_24px_rgba(11,31,58,0.12)]"
                  />
                </div>
              </div>
              <p className="mt-6 text-base leading-8 text-slate-600">
                Famosave is the savings arm of Famocity, created for people who want to save with purpose and
                direction toward something tangible and valuable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card h-full p-8 sm:p-10">
              <span className="section-label">Famosave</span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Savings with purpose, discipline, and ownership in mind.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Famosave helps people build consistency around saving. Instead of saving without direction, members
                save toward something real, measurable, and life-changing: asset ownership.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Many people struggle to maintain savings because they do not have a clear target. Famosave gives
                savers a reason to stay focused and consistent while moving closer to land and property ownership.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Through Famosave, Famocity shows that wealth can begin with small, steady steps. With the right
                structure and consistency, savings can gradually become assets.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell">
          <Reveal>
            <div className="glass-card relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#c8a951]" />
              <span className="section-label">Plot Savings Plan</span>
              <div className="relative mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                    Save gradually toward land ownership.
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                    The plot savings plan removes the pressure of one-time payment and replaces it with a practical,
                    steady pathway to ownership. It is designed for people who are ready to build something real,
                    one disciplined step at a time.
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                    It teaches discipline, encourages consistency, and gives people hope that major goals can be
                    achieved with patience and structure.
                  </p>
                </div>
                <Link href="#contact" className="premium-button-primary min-h-12">
                  Start Saving Today
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="team" className="section-block section-surface">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Team</span>
            <h2 className="section-title">People driving trust, structure, and execution.</h2>
            <p className="section-copy">
              Our team combines leadership, planning, and accountability to keep Famocity focused on real results.
            </p>
          </Reveal>

          <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={0.08 * index}>
                <article className="glass-card group flex h-full flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <h3 className="text-xl font-semibold leading-8 text-slate-900">{member.name}</h3>
                    <p className="mt-auto pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c8a951]">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">A premium brand with everyday accessibility.</h2>
          </Reveal>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {chooseUs.map((item, index) => (
              <Reveal key={item} delay={0.08 * index}>
                <div className="glass-card flex h-full items-start gap-4 p-6">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#c8a951]" size={22} />
                  <p className="text-base leading-7 text-slate-600">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-shell">
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0b1f3a_0%,#122b4b_60%,#1e293b_100%)] p-8 text-white shadow-xl sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c8a951]">Our Message</p>
              <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Do not just spend money, build something, save something, and own something.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
                The future is not built by chance. It is built by intentional action, wise decisions, and
                consistent steps. Through real estate, construction, gadgets, and purposeful savings, Famocity is
                creating opportunities for people to live smarter, grow stronger, and own assets that truly
                matter.
              </p>
              <Link href="#contact" className="premium-button-accent mt-8">
                Get Started With Famocity
              </Link>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#c8a951]">
                Your future starts with what you build today.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-block section-surface">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let&apos;s help you move from income to ownership.</h2>
            <p className="section-copy">
              Reach out to discuss land, construction, savings plans, or partnership opportunities.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-6">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "08138576412\n07038320560\n08108554219"
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "famocityprime@gmail.com"
                },
                {
                  icon: MapPin,
                  title: "Office",
                  content: "Grace plaza NUT junction, Abraka, New Agbor-Sapele Road, Delta State"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={0.08 * index}>
                    <div className="glass-card flex gap-4 p-6">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0b1f3a] text-white shadow-md">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{item.content}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              <Reveal delay={0.18}>
                <div className="glass-card overflow-hidden p-3">
                  <iframe
                    title="Famocity office map"
                    src="https://www.google.com/maps?q=Grace%20plaza%20NUT%20junction%20Abraka%20New%20Agbor-Sapele%20Road%20Delta%20State&output=embed"
                    className="h-[320px] w-full rounded-2xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="glass-card p-8 sm:p-10">
                <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Send us a message</h3>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
