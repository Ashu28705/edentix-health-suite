import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Blobs, Reveal, SectionHeading } from "@/components/fx/primitives";
import { services, specialOffers, inr } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Transparent Pricing — eDentix" },
      {
        name: "description",
        content:
          "Published price bands for every eDentix treatment, membership plans, current offers and insurance guidance.",
      },
      { property: "og:title", content: "Transparent Pricing — eDentix" },
      {
        property: "og:description",
        content: "No quote changes at the chair — every band published upfront.",
      },
    ],
  }),
  component: Page,
});

const plans = [
  {
    name: "Essential",
    price: 4999,
    cadence: "per year",
    tagline: "Prevention on autopilot for one adult.",
    perks: [
      "Two check-ups with digital X-rays",
      "Two scaling & polishing visits",
      "10% off all restorative work",
      "Priority rebooking window",
    ],
  },
  {
    name: "Signature",
    price: 8999,
    cadence: "per year",
    tagline: "Our most chosen plan — care plus aesthetics.",
    perks: [
      "Everything in Essential",
      "One in-office whitening session",
      "15% off cosmetic treatments",
      "Same-day emergency triage",
      "Free night-guard impression",
    ],
    featured: true,
  },
  {
    name: "Family",
    price: 15999,
    cadence: "per year",
    tagline: "Up to four members under one record.",
    perks: [
      "Everything in Signature ×4",
      "Paediatric fluoride & sealants",
      "20% off orthodontic assessment",
      "One shared clinical dashboard",
    ],
  },
];

const insurers = ["Star Health", "HDFC ERGO", "ICICI Lombard", "Niva Bupa", "Aditya Birla", "Care Health"];

const faqs = [
  {
    q: "Can the quoted price change during treatment?",
    a: "Only if the clinical plan itself changes, and never without written consent captured in your dashboard first. The published band is what you are billed inside.",
  },
  {
    q: "Do you offer instalments?",
    a: "Treatment above ₹20,000 can be split across three or six months at zero interest, approved at reception in a couple of minutes.",
  },
  {
    q: "Is the consultation fee refunded?",
    a: "Yes — the consultation fee is credited against your treatment if you proceed within thirty days.",
  },
  {
    q: "How does insurance reimbursement work?",
    a: "We issue a coded invoice and clinical summary the same day, which is all most insurers require for reimbursement.",
  },
];

function Page() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-36 pb-14">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                The price you read is the price you pay.{" "}
                <span className="text-gradient">Always.</span>
              </>
            }
            description="Every treatment carries a published band, every plan is cancellable, and every invoice is itemised down to the material used."
          />
        </div>
      </section>

      {/* membership plans */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-card p-1">
            {[
              [true, "Annual · save 2 months"],
              [false, "Monthly"],
            ].map(([v, label]) => (
              <button
                key={String(label)}
                onClick={() => setAnnual(v as boolean)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-bold transition-colors",
                  annual === v ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {label as string}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.75rem] border p-8",
                    p.featured
                      ? "border-transparent bg-gradient-primary text-primary-foreground shadow-luxe"
                      : "border-border bg-card",
                  )}
                >
                  {p.featured && (
                    <span className="absolute right-6 top-6 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold">
                      Most chosen
                    </span>
                  )}
                  <h3 className="text-lg font-extrabold">{p.name}</h3>
                  <p className={cn("mt-2 text-sm", p.featured ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {p.tagline}
                  </p>
                  <p className="mt-6 text-4xl font-extrabold">
                    {inr(annual ? p.price : Math.round(p.price / 10))}
                    <span
                      className={cn(
                        "ml-1 text-sm font-semibold",
                        p.featured ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      /{annual ? "year" : "month"}
                    </span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex gap-2.5 text-sm">
                        <Check className={cn("mt-0.5 size-4 shrink-0", p.featured ? "" : "text-accent")} />
                        <span className={p.featured ? "text-primary-foreground/90" : "text-muted-foreground"}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.featured ? "mint" : "outline"} className="mt-8 w-full" asChild>
                    <Link to="/book">Choose {p.name}</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* treatment price table */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Treatment bands" title="Full published price list" align="left" />
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-surface px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground lg:grid">
              <span>Treatment</span>
              <span>Category</span>
              <span>Chair time</span>
              <span>Price band</span>
              <span />
            </div>
            {services.map((s) => (
              <div
                key={s.slug}
                className="grid gap-3 border-b border-border px-7 py-5 last:border-0 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-4"
              >
                <div>
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground lg:hidden">{s.duration}</p>
                </div>
                <span className="text-sm text-muted-foreground">{s.category}</span>
                <span className="hidden text-sm text-muted-foreground lg:block">{s.duration}</span>
                <span className="text-sm font-bold text-primary">
                  {inr(s.priceFrom)} – {inr(s.priceTo)}
                </span>
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/book" search={{ service: s.slug }}>
                    Book
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Bands assume a standard single-site case. Complex or multi-site work is quoted in writing after the
            diagnostic appointment, and always before treatment begins.
          </p>
        </div>
      </section>

      {/* offers */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Live offers" title="Running this season" align="left" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                  <span className="w-fit rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent">
                    {o.tag}
                  </span>
                  <h3 className="mt-4 text-base font-bold">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{o.detail}</p>
                  <p className="mt-5 text-xl font-extrabold text-primary">{o.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* insurance + faq */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border bg-card p-8">
              <ShieldCheck className="size-5 text-accent" />
              <h2 className="mt-4 text-2xl font-extrabold">Insurance we bill directly</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cashless approval is handled by our front desk for the networks below. Everything else is
                reimbursement, with same-day coded invoices.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {insurers.map((n) => (
                  <span
                    key={n}
                    className="rounded-2xl border border-border bg-surface px-4 py-3 text-center text-xs font-bold text-muted-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Billing questions</h2>
              <Accordion type="single" collapsible className="mt-5">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`p${i}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
