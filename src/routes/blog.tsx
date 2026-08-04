import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blobs, Reveal, SectionHeading } from "@/components/fx/primitives";
import { blogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The eDentix Journal" },
      {
        name: "description",
        content:
          "Clinical notes, technology deep-dives and clinic announcements from the eDentix specialist network.",
      },
      { property: "og:title", content: "The eDentix Journal" },
      {
        property: "og:description",
        content: "Clinical notes, technology deep-dives and clinic announcements.",
      },
    ],
  }),
  component: Page,
});

const extraPosts = [
  {
    slug: "whitening-what-actually-works",
    title: "Whitening: what actually works, and what just costs money",
    excerpt: "Charcoal, strips, in-office peroxide — ranked by the evidence rather than the marketing.",
    category: "Cosmetic",
    date: "21 May 2026",
    read: "6 min",
  },
  {
    slug: "aligners-vs-braces-2026",
    title: "Clear aligners vs fixed braces in 2026",
    excerpt: "Aligner planning has improved dramatically, but fixed appliances still win specific cases.",
    category: "Orthodontics",
    date: "02 May 2026",
    read: "8 min",
  },
  {
    slug: "child-first-dental-visit",
    title: "Making a child's first dental visit uneventful",
    excerpt: "What we do differently in a paediatric chair, and how parents can help before arrival.",
    category: "Paediatric",
    date: "14 April 2026",
    read: "4 min",
  },
  {
    slug: "night-guards-and-grinding",
    title: "Grinding, cracking and the case for a night guard",
    excerpt: "Bruxism quietly wears down more enamel than sugar does. Here's how we catch it early.",
    category: "Prevention",
    date: "27 March 2026",
    read: "5 min",
  },
];

const allPosts = [
  ...blogPosts.map((p) => ({ ...p, hasImage: true as const })),
  ...extraPosts.map((p) => ({ ...p, body: p.excerpt, image: undefined, hasImage: false as const })),
];

const categories = ["All", ...new Set(allPosts.map((p) => p.category))];

function Page() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");

  const posts = useMemo(
    () =>
      allPosts.filter((p) => {
        if (cat !== "All" && p.category !== cat) return false;
        if (q && !`${p.title} ${p.excerpt}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [cat, q],
  );

  const featured = allPosts[0]!;

  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-36 pb-12">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Journal"
            title={
              <>
                Dentistry explained by the people <span className="text-gradient">holding the handpiece</span>
              </>
            }
            description="No listicles, no scare tactics. Case walkthroughs, technology notes and clinic news written by our own clinicians."
            align="left"
          />
        </div>
      </section>

      {/* featured */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <article className="grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-2">
              <div className="relative min-h-64">
                <img src={featured.image} alt={featured.title} className="size-full object-cover" />
              </div>
              <div className="p-8 sm:p-12">
                <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent">
                  {featured.category}
                </span>
                <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">{featured.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.body}</p>
                <p className="mt-6 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                  {featured.date}
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {featured.read}
                  </span>
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* filters + list */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                    cat === c
                      ? "border-transparent bg-gradient-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the journal"
              className="h-11 rounded-full lg:w-72"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe">
                  {p.hasImage ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-44 place-items-center bg-gradient-primary">
                      <span className="px-8 text-center text-sm font-bold text-primary-foreground/85">
                        {p.category}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{p.category}</span>
                    <h3 className="mt-3 text-base font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                      {p.date}
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {p.read}
                      </span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            {posts.length === 0 && (
              <p className="rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground lg:col-span-3">
                Nothing published under that filter yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* newsletter */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="noise relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground sm:p-14">
            <div className="relative max-w-xl">
              <h2 className="text-2xl font-extrabold sm:text-3xl">One clinical letter a month</h2>
              <p className="mt-3 text-sm text-primary-foreground/80">
                New cases, new technology and clinic news. No promotions, unsubscribe in a click.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.includes("@")) {
                    toast.error("Enter a valid email address.");
                    return;
                  }
                  toast.success("Subscribed — your first letter arrives next month.");
                  setEmail("");
                }}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-12 rounded-full border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button type="submit" variant="mint" size="lg" className="shrink-0">
                  Subscribe <ArrowRight />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
