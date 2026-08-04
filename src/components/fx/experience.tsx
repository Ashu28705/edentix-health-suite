import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ToothMark } from "./primitives";

/* ---------- Lenis smooth scroll ---------- */

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis = instance as unknown as { raf: (t: number) => void; destroy: () => void };
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}

/* ---------- Premium loading screen ---------- */

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("edentix.loaded");
    if (seen) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => {
      window.sessionStorage.setItem("edentix.loaded", "1");
      setDone(true);
    }, 1900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-primary"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <ToothMark className="size-16 text-primary-foreground" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.5em] text-primary-foreground/90">
            eDentix
          </p>
          <div className="mt-6 h-px w-40 overflow-hidden bg-primary-foreground/25">
            <motion.div
              className="h-full bg-primary-foreground"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Animated cursor (pointer devices only) ---------- */

export function LuxeCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 340, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 340, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(!!el?.closest("a,button,[role='button'],input,select,textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-[2px]"
        animate={{ width: hot ? 44 : 20, height: hot ? 44 : 20, opacity: hot ? 1 : 0.7 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </motion.div>
  );
}

/* ---------- Scroll progress bar ---------- */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[120] h-0.5 bg-transparent">
      <div className="h-full bg-gradient-mint transition-[width] duration-150" style={{ width: `${p * 100}%` }} />
    </div>
  );
}
