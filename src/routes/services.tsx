import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Blobs, Reveal, SectionHeading, TiltCard } from "@/components/fx/primitives";
import { services, inr, getDoctor } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Treatments & Services — eDentix" },
      {
        name: "description",
        content:
          "Ten specialist dental treatments with transparent price bands, procedure walkthroughs and recommended clinicians.",
      },
      { property: "og:title", content: "Treatments & Services — eDentix" },
      {
        property: "og:description",
        content: "Transparent price bands and procedure walkthroughs for every eDentix treatment.",
      },
    ],
  }),
  component: Page,
});

const categories = ["All", "General", "Cosmetic", "Specialised", "Surgical", "Urgent"] as const;

const promises = [
  { icon: ShieldCheck, title: "Price published upfront", detail: "Every band you see here is the band you are quoted at the chair." },
  { icon: HeartPulse, title: "Specialist-led", detail: "Each treatment is mapped to clinicians credentialed for that discipline." },
  { icon: Sparkles, title: "Digital-first", detail: "Scans, plans and consent live in your dashboard, never in a paper file." },
];

function Page() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState(services[0]!.slug);

  const list = useMemo(
    () => (cat === "All" ? services : services.filter((s) => s.category === cat)),
    [cat],
  );
  const detail = useMemo(
    () => services.find((s) => s.slug === active) ?? services[0]!,
    [active],
  );

  return (
    <div className="pb-28">
      {/* hero */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Treatments"
            title={
              <>
                Every treatment, with the price{" "}
                <span className="text-gradient">printed before you sit down</span>
              </>
            }
            description="Ten clinical programmes across prevention, aesthetics, orthodontics and surgery — each with a documented protocol, expected recovery and a published price band."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="glass h-full rounded-3xl p-6">
                  <p.icon className="size-5 text-accent" />
                  <h3 className="mt-4 text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* filters + grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300",
                  cat === c
                    ? "border-transparent bg-gradient-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <TiltCard className="group h-full overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
                      {s.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          From
                        </p>
                        <p className="text-base font-extrabold text-primary">{inr(s.priceFrom)}</p>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Clock className="size-3.5" /> {s.duration}
                      </p>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setActive(s.slug)}>
                        Details
                      </Button>
                      <Button size="sm" variant="hero" asChild className="flex-1">
                        <Link to="/book" search={{ service: s.slug }}>
                          Book
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* detail panel */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="p-8 sm:p-12">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  {detail.category} programme
                </span>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{detail.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{detail.description}</p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Price band", `${inr(detail.priceFrom)} – ${inr(detail.priceTo)}`],
                    ["Chair time", detail.duration],
                    ["Recovery", detail.recovery],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-surface p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-sm font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  How the treatment runs
                </h3>
                <ol className="mt-5 space-y-4">
                  {detail.procedure.map((p, i) => (
                    <li key={p.title} className="flex gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{p.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button variant="hero" asChild>
                    <Link to="/book" search={{ service: detail.slug }}>
                      Book this treatment <ArrowRight />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/pricing">See full price list</Link>
                  </Button>
                </div>
              </div>

              <div className="relative border-t border-border bg-surface p-8 sm:p-12 lg:border-l lg:border-t-0">
                <img
                  src={detail.image}
                  alt={detail.name}
                  className="h-56 w-full rounded-3xl object-cover"
                />
                <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Recommended clinicians
                </h3>
                <div className="mt-4 space-y-3">
                  {detail.recommendedDoctorIds.map((id) => {
                    const d = getDoctor(id);
                    if (!d) return null;
                    return (
                      <Link
                        key={id}
                        to="/doctors"
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                      >
                        <img src={d.photo} alt={d.name} className="size-12 rounded-2xl object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{d.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{d.specialisation}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Questions patients ask
                </h3>
                <Accordion type="single" collapsible className="mt-3">
                  {detail.faqs.map((f, i) => (
                    <AccordionItem key={f.q} value={`f${i}`}>
                      <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <ul className="mt-10 space-y-2">
                  {["Digital records shared instantly", "Consent captured on screen", "Reminders by email and SMS"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="size-4 text-accent" /> {t}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
