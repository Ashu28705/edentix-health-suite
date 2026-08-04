import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — eDentix" },
      { name: "description", content: "Access your eDentix patient, doctor, reception or admin workspace." },
      { property: "og:title", content: "Sign in — eDentix" },
      { property: "og:description", content: "Access your eDentix patient, doctor, reception or admin workspace." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Sign in" description="Access your eDentix patient, doctor, reception or admin workspace." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
