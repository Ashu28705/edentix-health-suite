import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — eDentix" },
      { name: "description", content: "Talk to the eDentix care team." },
      { property: "og:title", content: "Contact — eDentix" },
      { property: "og:description", content: "Talk to the eDentix care team." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Contact" description="Talk to the eDentix care team." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
