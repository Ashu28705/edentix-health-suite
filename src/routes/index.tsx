import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Blobs,
  Counter,
  Magnetic,
  Reveal,
  SectionHeading,
  Stars,
  TiltCard,
} from "@/components/fx/primitives";
import {
  beforeAfterCases,
  blogPosts,
  clinics,
  doctors,
  faqs,
  insurers,
  inr,
  media,
  patientJourney,
  services,
  specialOffers,
  stats,
  technologies,
  testimonials,
  trustedBrands,
  whyChooseUs,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eDentix — Premium Dental Care, Engineered Around You" },
      {
        name: "description",
        content:
          "Book verified dental specialists with live availability, transparent pricing and one encrypted clinical record across four flagship clinics.",
      },
      { property: "og:title", content: "eDentix — Premium Dental Care, Engineered Around You" },
      {
        property: "og:description",
        content: "Verified specialists, live calendars, transparent pricing and one encrypted record.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="noise relative overflow-hidden pb-24 pt-36 sm:pt-44">
        <Blobs />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="size-3.5 text-accent" />
                15,000+ smiles treated
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
                Premium dental care,
                <br />
                <span className="text-gradient">engineered around you.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Verified specialists, live appointment calendars that cannot double-book, published
                price bands and one encrypted clinical record — from first scan to final invoice.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/book">
                      Book an appointment <ArrowRight />
                    </Link>
                  </Button>
                </Magnetic>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/doctors">Meet the specialists</Link>
                </Button>
              </div>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.3 + i * 0.06}>
                  <p className="text-3xl font-extrabold text-primary">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <TiltCard className="relative">
              <div className="relative overflow-hidden rounded-4xl shadow-luxe">
                <img
                  src={media.heroPatient}
                  alt="Patient with a radiant smile after treatment at eDentix"
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
              <motion.div
                className="glass-strong absolute -bottom-6 -left-4 w-64 rounded-3xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <ShieldCheck className="size-4 text-accent" /> Verified specialists
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Licence-checked, peer-reviewed and credential-verified before joining the network.
                </p>
              </motion.div>
              <motion.div
                className="glass-strong absolute -right-4 top-8 w-56 rounded-3xl p-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <CalendarCheck className="size-4 text-primary" /> Next slot today
                </div>
                <p className="mt-2 text-xs text-muted-foreground">03:30 PM · eDentix Infocity</p>
              </motion.div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ---------- Trusted brands ---------- */}
      <section className="border-y border-border bg-surface py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Equipment and materials partners
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBrands.map((b) => (
              <span key={b} className="text-sm font-bold text-foreground/55">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="Every treatment, one standard of care"
            description="Ten specialist pathways, each with a published price band, expected duration and the specialists who deliver it."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <article className="hover-lift group h-full overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      {s.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                    <p className="mt-5 text-sm font-bold text-primary">
                      From {inr(s.priceFrom)} · {s.duration}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                View all services <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Special treatments / offers ---------- */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Special treatments"
            title="Curated programmes, bundled honestly"
            align="left"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="gradient-border hover-lift h-full rounded-3xl bg-card p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                    {o.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.detail}</p>
                  <p className="mt-5 text-2xl font-extrabold text-primary">{o.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why eDentix" title="Six reasons patients stay for decades" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-card p-7">
                  <span className="grid size-11 place-items-center rounded-2xl bg-gradient-mint text-primary-deep font-extrabold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Doctors ---------- */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Meet the dentists" title="Specialists, not generalists" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06}>
                <article className="hover-lift h-full overflow-hidden rounded-3xl border border-border bg-card">
                  <img src={d.photo} alt={d.name} className="aspect-4/5 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-base font-bold">{d.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{d.specialisation}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Stars rating={d.rating} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        {d.rating} · {d.reviews} reviews
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-primary">
                      {d.experience} yrs experience · {inr(d.fee)} consult
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/doctors">
                Open the doctor directory <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Clinics ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Clinic locations" title="Four flagship clinics across Gujarat" align="left" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {clinics.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-card p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{c.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{c.city}</p>
                    </div>
                    {c.emergency && (
                      <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
                        Emergency
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.address}</p>
                  <p className="mt-4 text-sm font-semibold">{c.hours} · {c.chairs} chairs</p>
                  <p className="mt-1 text-sm text-primary">{c.phone}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Patient journey ---------- */}
      <section className="noise relative overflow-hidden bg-gradient-primary py-24 text-primary-foreground">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground/70">
              Patient journey
            </span>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Five steps, zero friction</h2>
          </div>
          <ol className="mt-14 grid gap-6 md:grid-cols-5">
            {patientJourney.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07} as="li">
                <div className="h-full rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                  <span className="text-2xl font-extrabold text-primary-foreground/45">{p.step}</span>
                  <h3 className="mt-4 text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Before / after ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Before & after" title="Results photographed, never retouched" />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {beforeAfterCases.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="grid grid-cols-2">
                    <figure className="relative">
                      <img src={c.before} alt={`${c.title} before treatment`} className="aspect-square w-full object-cover" />
                      <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-bold">
                        Before
                      </figcaption>
                    </figure>
                    <figure className="relative">
                      <img src={c.after} alt={`${c.title} after treatment`} className="aspect-square w-full object-cover" />
                      <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-bold">
                        After
                      </figcaption>
                    </figure>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Patient reviews" title="Verified, after treatment completes" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <blockquote className="h-full rounded-3xl border border-border bg-card p-7">
                  <Stars rating={t.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">“{t.quote}”</p>
                  <footer className="mt-6">
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Technology ---------- */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={media.technology}
              alt="3D dental scanning technology used at eDentix"
              className="aspect-4/3 w-full rounded-4xl object-cover shadow-luxe"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Technology" title="Diagnostics you can see on screen" align="left" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {technologies.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-sm font-bold">{t.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Insurance ---------- */}
      <section className="border-y border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Cashless with six insurance partners
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {insurers.map((i) => (
              <span key={i} className="text-sm font-bold text-foreground/55">
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing preview ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Published bands. No surprises at the chair."
          />
          <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Treatment</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Price band</th>
                </tr>
              </thead>
              <tbody>
                {services.slice(0, 7).map((s) => (
                  <tr key={s.slug} className="border-t border-border">
                    <td className="px-6 py-4 font-semibold">{s.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.duration}</td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {inr(s.priceFrom)} – {inr(s.priceTo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Answers before you ask" />
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ---------- Blog ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Journal" title="Clinical notes and announcements" align="left" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <article className="hover-lift h-full overflow-hidden rounded-3xl border border-border bg-card">
                  <img src={p.image} alt={p.title} className="aspect-16/10 w-full object-cover" />
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      {p.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-5 text-xs text-muted-foreground">
                      {p.date} · {p.read} read
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Emergency banner ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-4xl bg-gradient-mint p-10 text-primary-deep sm:p-14">
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-extrabold sm:text-4xl">Dental emergency? We hold slots daily.</h2>
                <p className="mt-3 text-sm sm:text-base">
                  Same-day emergency capacity at every clinic, seven days a week. Call the triage line
                  and we will reserve a chair.
                </p>
              </div>
              <Button size="xl" asChild className="bg-primary-deep text-primary-foreground shrink-0">
                <Link to="/emergency">
                  <Phone /> Emergency care
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Newsletter + app ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-4xl border border-border bg-card p-10">
              <h2 className="text-2xl font-extrabold">Oral health, quarterly</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Evidence-led guidance from our clinicians. No promotions, no noise.
              </p>
              <form
                className="mt-7 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="h-12 flex-1 rounded-full border border-input bg-background px-5 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button variant="hero" type="submit" size="lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="noise relative h-full overflow-hidden rounded-4xl bg-gradient-primary p-10 text-primary-foreground">
              <h2 className="text-2xl font-extrabold">Carry your record in your pocket</h2>
              <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
                The eDentix app keeps appointments, prescriptions, reports and invoices one tap away —
                with reminders that actually arrive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold">
                  App Store
                </span>
                <span className="rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold">
                  Google Play
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
