import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Award, Heart, MapPin, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blobs, Reveal, SectionHeading } from "@/components/fx/primitives";
import { clinics, doctors, inr } from "@/lib/data";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Doctor Directory — eDentix" },
      {
        name: "description",
        content:
          "Filter verified eDentix specialists by expertise, clinic, language, rating and same-day availability.",
      },
      { property: "og:title", content: "Doctor Directory — eDentix" },
      {
        property: "og:description",
        content: "Verified specialists with credentials, fees and live availability.",
      },
    ],
  }),
  component: Page,
});

const specialities = ["All specialities", ...new Set(doctors.map((d) => d.specialisation))];
const languages = ["All languages", ...new Set(doctors.flatMap((d) => d.languages))];
const sorts = ["Top rated", "Most experienced", "Lowest fee"] as const;

function Page() {
  const { favorites, toggleFavorite } = useAppStore();
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState(specialities[0]!);
  const [clinic, setClinic] = useState("All clinics");
  const [lang, setLang] = useState(languages[0]!);
  const [today, setToday] = useState(false);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Top rated");
  const [selected, setSelected] = useState(doctors[0]!.id);

  const list = useMemo(() => {
    const out = doctors.filter((d) => {
      const text = `${d.name} ${d.specialisation} ${d.qualification}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (spec !== specialities[0] && d.specialisation !== spec) return false;
      if (clinic !== "All clinics" && d.clinicId !== clinic) return false;
      if (lang !== languages[0] && !d.languages.includes(lang)) return false;
      if (today && !d.availableToday) return false;
      return true;
    });
    return out.sort((a, b) =>
      sort === "Top rated"
        ? b.rating - a.rating
        : sort === "Most experienced"
          ? b.experience - a.experience
          : a.fee - b.fee,
    );
  }, [q, spec, clinic, lang, today, sort]);

  const doctor = doctors.find((d) => d.id === selected) ?? doctors[0]!;
  const doctorClinic = clinics.find((c) => c.id === doctor.clinicId);

  const selectClass =
    "h-11 w-full rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary/50";

  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-36 pb-12">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Clinicians"
            title={
              <>
                Meet the specialists behind <span className="text-gradient">every eDentix chair</span>
              </>
            }
            description="Credentials verified against council registrations, reviews collected only from completed appointments, availability pulled live from clinic calendars."
            align="left"
          />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass-strong rounded-3xl p-5">
            <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, speciality or qualification"
                  className="h-11 rounded-full pl-11"
                />
              </div>
              <select value={spec} onChange={(e) => setSpec(e.target.value)} className={selectClass}>
                {specialities.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select value={clinic} onChange={(e) => setClinic(e.target.value)} className={selectClass}>
                <option value="All clinics">All clinics</option>
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className={selectClass}>
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setToday((v) => !v)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                  today
                    ? "border-transparent bg-gradient-mint text-primary-deep"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                Available today
              </button>
              <span className="ml-auto text-xs font-semibold text-muted-foreground">Sort</span>
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                    sort === s
                      ? "border-transparent bg-gradient-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm font-semibold text-muted-foreground">
            {list.length} specialist{list.length === 1 ? "" : "s"} match your filters
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {list.map((d, i) => (
                <Reveal key={d.id} delay={(i % 2) * 0.06}>
                  <button
                    onClick={() => setSelected(d.id)}
                    className={cn(
                      "group h-full w-full overflow-hidden rounded-3xl border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe",
                      selected === d.id ? "border-primary/50 shadow-soft" : "border-border",
                    )}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={d.photo}
                        alt={d.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {d.availableToday && (
                        <span className="absolute left-4 top-4 rounded-full bg-gradient-mint px-3 py-1 text-xs font-bold text-primary-deep">
                          Free today
                        </span>
                      )}
                      <span
                        role="button"
                        tabIndex={-1}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(d.id);
                        }}
                        className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-background/85 backdrop-blur"
                      >
                        <Heart
                          className={cn(
                            "size-4",
                            favorites.includes(d.id) ? "fill-destructive text-destructive" : "text-muted-foreground",
                          )}
                        />
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold">{d.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                        {d.specialisation}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{d.qualification}</p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 font-bold">
                          <Star className="size-3.5 fill-accent text-accent" /> {d.rating}
                          <span className="font-normal text-muted-foreground">({d.reviews})</span>
                        </span>
                        <span className="font-bold text-primary">{inr(d.fee)}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {d.experience} yrs · {d.languages.join(", ")}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
              {list.length === 0 && (
                <div className="rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground sm:col-span-2">
                  No specialists match these filters yet. Try widening your search.
                </div>
              )}
            </div>

            {/* profile panel */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative h-44">
                  <img src={doctor.photo} alt={doctor.name} className="size-full object-cover" />
                </div>
                <div className="p-7">
                  <h2 className="text-xl font-extrabold">{doctor.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {doctor.specialisation}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      [`${doctor.experience}+`, "Years"],
                      [doctor.patients.toLocaleString("en-IN"), "Patients"],
                      [`${doctor.rating}`, "Rating"],
                    ].map(([v, k]) => (
                      <div key={k} className="rounded-2xl bg-surface p-4 text-center">
                        <p className="text-lg font-extrabold text-primary">{v}</p>
                        <p className="text-xs text-muted-foreground">{k}</p>
                      </div>
                    ))}
                  </div>

                  {doctorClinic && (
                    <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                      {doctorClinic.name} · {doctorClinic.city}
                    </p>
                  )}

                  <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Education
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {doctor.education.map((e) => (
                      <li key={e.item} className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">{e.year}</span> — {e.item}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Recognition
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {doctor.awards.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-muted-foreground">
                        <Award className="mt-0.5 size-4 shrink-0 text-accent" /> {a}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Next available slots
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {doctor.slots.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <Button variant="hero" className="mt-7 w-full" asChild>
                    <Link to="/book" search={{ doctor: doctor.id }}>
                      Book with {doctor.name.split(" ").slice(0, 2).join(" ")}
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
