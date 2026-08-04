import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Blobs, Reveal } from "@/components/fx/primitives";
import { demoAccounts, useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — eDentix" },
      {
        name: "description",
        content: "Access your eDentix patient, doctor, reception or administrator workspace.",
      },
      { property: "og:title", content: "Sign in — eDentix" },
      { property: "og:description", content: "One secure account for your entire dental record." },
    ],
  }),
  component: Page,
});

function Page() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res =
      mode === "login"
        ? login(form.email, form.password)
        : register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(`Welcome${res.user.name ? `, ${res.user.name.split(" ")[0]}` : ""}.`);
    navigate({ to: res.user.role === "admin" ? "/admin" : "/dashboard" });
  };

  const useDemo = (email: string, password: string) => {
    setMode("login");
    setForm((f) => ({ ...f, email, password }));
  };

  return (
    <div className="relative overflow-hidden pb-28 pt-36">
      <Blobs />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="size-1.5 rounded-full bg-accent" /> Secure access
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] sm:text-5xl">
              One account for your <span className="text-gradient">entire dental record</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Appointments, prescriptions, invoices, scans and clinical notes — encrypted, versioned and available to
              every clinician you authorise.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Role-aware workspaces for patients, clinicians, reception and admin",
                "Consent-based record sharing between clinics",
                "Email and SMS reminders before every appointment",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Prototype demo accounts
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {demoAccounts.map((a) => (
                  <button
                    key={a.email}
                    onClick={() => useDemo(a.email, a.password)}
                    className="rounded-2xl border border-border px-4 py-3 text-left transition-colors hover:border-primary/40"
                  >
                    <p className="text-sm font-bold">{a.label}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{a.email}</p>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Password for all demo roles: edentix123</p>
            </div>
          </div>

          <Reveal>
            <div className="glass-strong rounded-[1.75rem] p-8 sm:p-10">
              <div className="flex rounded-full border border-border bg-card p-1">
                {(["login", "register"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "flex-1 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                      mode === m ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {m === "login" ? "Sign in" : "Create account"}
                  </button>
                ))}
              </div>

              <form className="mt-7 space-y-5" onSubmit={submit}>
                {mode === "register" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="l-name">Full name</Label>
                      <Input id="l-name" value={form.name} onChange={set("name")} placeholder="Sarah Miller" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="l-phone">Phone</Label>
                      <Input id="l-phone" value={form.phone} onChange={set("phone")} placeholder="+91 90000 00000" />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="l-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="l-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                      className="pl-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l-pass">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="l-pass"
                      type={show ? "text" : "password"}
                      value={form.password}
                      onChange={set("password")}
                      placeholder="••••••••"
                      className="pl-11 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      aria-label="Toggle password visibility"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  {mode === "login" ? "Sign in" : "Create my account"} <ArrowRight />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Prefer to book first?{" "}
                  <Link to="/book" className="font-semibold text-primary">
                    Book an appointment
                  </Link>
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
