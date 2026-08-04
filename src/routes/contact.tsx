import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blobs, Reveal, SectionHeading } from "@/components/fx/primitives";
import { clinics } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the eDentix Care Team" },
      {
        name: "description",
        content:
          "Reach the eDentix care team by phone, email or form — plus addresses and opening hours for every clinic.",
      },
      { property: "og:title", content: "Contact the eDentix Care Team" },
      { property: "og:description", content: "Phone, email, clinic addresses and opening hours." },
    ],
  }),
  component: Page,
});

const reasons = ["Book or reschedule", "Treatment question", "Billing & insurance", "Feedback", "Partnership"] as const;

const channels = [
  { icon: Phone, title: "Call the care line", detail: "+91 56842 86546", note: "Mon–Sat, 8am – 9pm" },
  { icon: Mail, title: "Email us", detail: "care@edentix.com", note: "Replies within one working day" },
  { icon: MessageCircle, title: "WhatsApp", detail: "+91 56842 86547", note: "Fastest for rescheduling" },
];

function Page() {
  const [reason, setReason] = useState<string>(reasons[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="pb-28">
      <section className="relative overflow-hidden pt-36 pb-12">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Talk to a human, <span className="text-gradient">not a phone tree</span>
              </>
            }
            description="Our care coordinators handle bookings, treatment questions and billing directly — no scripts, no transfers between departments."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <div className="glass h-full rounded-3xl p-6">
                  <c.icon className="size-5 text-accent" />
                  <h3 className="mt-4 text-sm font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-base font-extrabold text-primary">{c.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* form */}
            <div className="rounded-[1.75rem] border border-border bg-card p-8 sm:p-10">
              {sent ? (
                <div className="py-16 text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-mint">
                    <Send className="size-6 text-primary-deep" />
                  </span>
                  <h2 className="mt-6 text-2xl font-extrabold">Message received</h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    A care coordinator will reply to {form.email || "your email"} within one working day. Urgent
                    dental pain? Call the care line instead.
                  </p>
                  <Button variant="outline" className="mt-7" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold">Send us a message</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tell us what you need and the right team will pick it up.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
                          reason === r
                            ? "border-transparent bg-gradient-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <form
                    className="mt-7 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!form.name || !form.email.includes("@") || form.message.length < 8) {
                        toast.error("Add your name, a valid email and a short message.");
                        return;
                      }
                      toast.success("Message sent to the eDentix care team.");
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="c-name">Full name</Label>
                        <Input id="c-name" value={form.name} onChange={set("name")} placeholder="Sarah Miller" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="c-phone">Phone</Label>
                        <Input id="c-phone" value={form.phone} onChange={set("phone")} placeholder="+91 90000 00000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-email">Email</Label>
                      <Input id="c-email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-msg">How can we help?</Label>
                      <Textarea
                        id="c-msg"
                        rows={5}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Share a few details — symptoms, preferred clinic, preferred times."
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Send message <Send />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Encrypted in transit. Never shared with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* clinics */}
            <div>
              <h2 className="text-2xl font-extrabold">Our clinics</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Walk-in triage available at every site during opening hours.
              </p>
              <div className="mt-6 space-y-4">
                {clinics.map((c, i) => (
                  <Reveal key={c.id} delay={i * 0.05}>
                    <div className="rounded-3xl border border-border bg-card p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold">{c.name}</h3>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{c.city}</p>
                        </div>
                        {c.emergency && (
                          <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
                            24×7 emergency
                          </span>
                        )}
                      </div>
                      <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {c.address}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4 shrink-0 text-primary" /> {c.hours}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
                        <Phone className="size-4 shrink-0" /> {c.phone}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-border">
                <div className="relative grid h-56 place-items-center bg-gradient-primary text-center text-primary-foreground">
                  <div>
                    <MapPin className="mx-auto size-6" />
                    <p className="mt-3 text-sm font-bold">Four clinics across Gujarat</p>
                    <p className="mt-1 text-xs text-primary-foreground/70">
                      Interactive map connects once the platform goes live
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
