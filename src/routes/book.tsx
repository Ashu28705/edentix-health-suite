import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blobs, Reveal } from "@/components/fx/primitives";
import { clinics, doctors, services, inr } from "@/lib/data";
import { useAppStore } from "@/lib/app-store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search["service"] === "string" ? (search["service"] as string) : undefined,
    doctor: typeof search["doctor"] === "string" ? (search["doctor"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an Appointment — eDentix" },
      {
        name: "description",
        content: "Live clinic calendars, instant confirmation and no double-booking — reserve a chair in four steps.",
      },
      { property: "og:title", content: "Book an Appointment — eDentix" },
      { property: "og:description", content: "Live calendars, instant confirmation, no double-booking." },
    ],
  }),
  component: Page,
});

const steps = ["Treatment", "Clinician", "Date & time", "Your details"] as const;

function nextDates(count = 8) {
  const out: { iso: string; day: string; date: string; month: string }[] = [];
  const base = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(base.getTime() + i * 86400000);
    out.push({
      iso: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("en-GB", { weekday: "short" }),
      date: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleDateString("en-GB", { month: "short" }),
    });
  }
  return out;
}

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { book, appointments } = useAppStore();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState(search.service ?? services[0]!.slug);
  const [doctorId, setDoctorId] = useState(search.doctor ?? doctors[0]!.id);
  const dates = useMemo(() => nextDates(), []);
  const [date, setDate] = useState(dates[0]!.iso);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [done, setDone] = useState<{ date: string; time: string } | null>(null);

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0]!;
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0]!;
  const clinic = clinics.find((c) => c.id === doctor.clinicId);

  const taken = appointments
    .filter((a) => a.doctorId === doctor.id && a.date === date && a.status !== "Cancelled")
    .map((a) => a.time);

  const confirm = () => {
    if (!name || !email.includes("@") || !phone) {
      toast.error("Add your name, a valid email and a phone number.");
      return;
    }
    if (!time) {
      toast.error("Pick a time slot first.");
      return;
    }
    const res = book({
      patientEmail: email,
      patientName: name,
      date,
      time,
      doctorId: doctor.id,
      clinicId: doctor.clinicId,
      service: service.name,
      reason: reason || `${service.name} appointment`,
      amount: service.priceFrom,
    });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Appointment confirmed.");
    setDone({ date, time });
  };

  if (done) {
    return (
      <div className="relative overflow-hidden pb-28 pt-36">
        <Blobs />
        <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-mint">
            <CalendarCheck className="size-8 text-primary-deep" />
          </span>
          <h1 className="mt-8 text-3xl font-extrabold sm:text-4xl">Chair reserved</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {service.name} with {doctor.name} on {done.date} at {done.time}. A confirmation has been sent to {email},
            with a reminder 24 hours before.
          </p>
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-left">
            {[
              ["Treatment", service.name],
              ["Clinician", doctor.name],
              ["Clinic", clinic ? `${clinic.name}, ${clinic.city}` : "—"],
              ["Estimated cost", inr(service.priceFrom)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border py-3 last:border-0">
                <span className="text-sm text-muted-foreground">{k}</span>
                <span className="text-sm font-bold">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" asChild>
              <Link to="/dashboard">Open my dashboard</Link>
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: "/services" })}>
              Browse treatments
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden pb-28 pt-36">
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="size-1.5 rounded-full bg-accent" /> Booking
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] sm:text-5xl">
            Reserve a chair in <span className="text-gradient">four steps</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Calendars are live — a slot disappears the moment somebody else takes it, so double-booking is impossible.
          </p>
        </div>

        {/* stepper */}
        <div className="mt-12 grid gap-3 sm:grid-cols-4">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => i <= step && setStep(i)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors",
                i === step
                  ? "border-transparent bg-gradient-primary text-primary-foreground shadow-soft"
                  : i < step
                    ? "border-accent/40 bg-card"
                    : "border-border bg-card opacity-60",
              )}
            >
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                {i < step ? <Check className="size-3.5 text-accent" /> : <span>0{i + 1}</span>}
              </span>
              <p className="mt-2 text-sm font-bold">{s}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-border bg-card p-7 sm:p-9">
            {step === 0 && (
              <div>
                <h2 className="text-xl font-extrabold">What do you need?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => setServiceSlug(s.slug)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-colors",
                        serviceSlug === s.slug ? "border-primary/60 bg-surface" : "border-border hover:border-primary/40",
                      )}
                    >
                      <p className="text-sm font-bold">{s.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.duration}</p>
                      <p className="mt-2 text-sm font-bold text-primary">from {inr(s.priceFrom)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-extrabold">Choose your clinician</h2>
                <div className="mt-6 grid gap-3">
                  {doctors.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDoctorId(d.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                        doctorId === d.id ? "border-primary/60 bg-surface" : "border-border hover:border-primary/40",
                      )}
                    >
                      <img src={d.photo} alt={d.name} className="size-14 rounded-2xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{d.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{d.specialisation}</p>
                        <p className="mt-1 text-xs font-semibold text-primary">
                          {inr(d.fee)} consultation · {d.experience} yrs
                        </p>
                      </div>
                      {d.availableToday && (
                        <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent">Today</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-extrabold">Pick a date and time</h2>
                <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8">
                  {dates.map((d) => (
                    <button
                      key={d.iso}
                      onClick={() => {
                        setDate(d.iso);
                        setTime("");
                      }}
                      className={cn(
                        "rounded-2xl border p-3 text-center transition-colors",
                        date === d.iso
                          ? "border-transparent bg-gradient-primary text-primary-foreground"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <p className="text-xs font-semibold opacity-70">{d.day}</p>
                      <p className="text-base font-extrabold">{d.date}</p>
                      <p className="text-xs opacity-70">{d.month}</p>
                    </button>
                  ))}
                </div>

                <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Slots with {doctor.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.slots.map((s) => {
                    const gone = taken.includes(s);
                    return (
                      <button
                        key={s}
                        disabled={gone}
                        onClick={() => setTime(s)}
                        className={cn(
                          "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                          gone
                            ? "cursor-not-allowed border-border text-muted-foreground line-through opacity-50"
                            : time === s
                              ? "border-transparent bg-gradient-mint text-primary-deep"
                              : "border-border hover:border-primary/40",
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {taken.length > 0 && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Struck-through slots are already reserved on this date.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-extrabold">Your details</h2>
                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="b-name">Full name</Label>
                      <Input id="b-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Miller" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="b-phone">Phone</Label>
                      <Input id="b-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 90000 00000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-email">Email</Label>
                    <Input id="b-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-reason">Reason for visit (optional)</Label>
                    <Textarea
                      id="b-reason"
                      rows={4}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Sensitivity on the lower right, worse with cold drinks."
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-6">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                <ArrowLeft /> Back
              </Button>
              {step < 3 ? (
                <Button
                  variant="hero"
                  onClick={() => {
                    if (step === 2 && !time) {
                      toast.error("Pick a time slot to continue.");
                      return;
                    }
                    setStep((s) => s + 1);
                  }}
                >
                  Continue <ArrowRight />
                </Button>
              ) : (
                <Button variant="hero" onClick={confirm}>
                  Confirm appointment <Check />
                </Button>
              )}
            </div>
          </div>

          {/* summary */}
          <Reveal>
            <aside className="glass-strong rounded-[1.75rem] p-7 lg:sticky lg:top-28">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">Your booking</h2>
              <img src={service.image} alt={service.name} className="mt-5 h-36 w-full rounded-2xl object-cover" />
              <p className="mt-5 text-lg font-extrabold">{service.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{service.tagline}</p>

              <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 text-primary" /> {date} · {time || "no slot yet"}
                </p>
                <p className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  {clinic ? `${clinic.name}, ${clinic.city}` : "Clinic assigned on confirmation"}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <img src={doctor.photo} alt="" className="size-6 rounded-full object-cover" /> {doctor.name}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <span className="text-sm text-muted-foreground">Estimated</span>
                <span className="text-2xl font-extrabold text-primary">{inr(service.priceFrom)}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Pay at the clinic. The published band never changes without written consent.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
