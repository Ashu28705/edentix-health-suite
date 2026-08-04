import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { ToothMark } from "@/components/fx/primitives";
import { clinics } from "@/lib/data";

const columns = [
  {
    title: "Treatments",
    links: [
      { to: "/services", label: "All services" },
      { to: "/services/cosmetic-dentistry", label: "Cosmetic dentistry" },
      { to: "/services/dental-implants", label: "Dental implants" },
      { to: "/services/orthodontics", label: "Orthodontics" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { to: "/doctors", label: "Doctor directory" },
      { to: "/book", label: "Book appointment" },
      { to: "/dashboard", label: "Patient dashboard" },
      { to: "/admin", label: "Admin panel" },
      { to: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About eDentix" },
      { to: "/clinics", label: "Clinic locations" },
      { to: "/contact", label: "Contact" },
      { to: "/emergency", label: "Emergency care" },
      { to: "/login", label: "Sign in" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="noise relative overflow-hidden bg-gradient-primary text-primary-foreground">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary-foreground/10">
                <ToothMark className="size-5" animate={false} />
              </span>
              <span className="text-lg font-extrabold tracking-tight">eDentix</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              A digital dental healthcare platform connecting patients with verified specialists —
              live availability, transparent pricing and one encrypted clinical record.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <p className="flex items-center gap-2">
                <Phone className="size-4" /> +91 56842 86546
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4" /> care@edentix.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" /> {clinics[0]?.address}
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 eDentix. Built for the modern dental practice.</p>
          <p>Encrypted records · Role-based access · Empanelled with 6 insurers</p>
        </div>
      </div>
    </footer>
  );
}
