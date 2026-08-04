import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoAppointments, demoNotifications } from "./data";

export type Appointment = {
  id: string;
  patientEmail: string;
  patientName: string;
  date: string;
  time: string;
  doctorId: string;
  clinicId: string;
  service: string;
  reason: string;
  status: "Confirmed" | "Completed" | "Cancelled" | "Pending";
  paid: boolean;
  amount: number;
};

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "success" | "info" | "warning";
  read?: boolean;
};

const APPT_KEY = "edentix.appointments";
const FAV_KEY = "edentix.favorites";
const NOTIF_KEY = "edentix.notifications";

const seedAppointments: Appointment[] = demoAppointments.map((a) => ({
  id: a.id,
  patientEmail: "patient@edentix.com",
  patientName: "Sarah Miller",
  date: a.date,
  time: a.time,
  doctorId: a.doctorId,
  clinicId: a.clinicId,
  service: a.service,
  reason: a.reason,
  status: a.status as Appointment["status"],
  paid: a.status === "Completed",
  amount: a.status === "Completed" ? 5000 : 2200,
}));

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export type BookResult = { ok: true; appointment: Appointment } | { ok: false; error: string };

type StoreValue = {
  appointments: Appointment[];
  notifications: Notification[];
  favorites: string[];
  ready: boolean;
  book: (input: Omit<Appointment, "id" | "status" | "paid">) => BookResult;
  cancel: (id: string) => void;
  toggleFavorite: (doctorId: string) => void;
  markAllRead: () => void;
  pushNotification: (n: Omit<Notification, "id" | "time">) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [favorites, setFavorites] = useState<string[]>(["d1"]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAppointments(read(APPT_KEY, seedAppointments));
    setNotifications(read(NOTIF_KEY, demoNotifications as Notification[]));
    setFavorites(read(FAV_KEY, ["d1"]));
    setReady(true);
  }, []);

  const pushNotification = useCallback<StoreValue["pushNotification"]>((n) => {
    setNotifications((prev) => {
      const next = [{ ...n, id: `n${Date.now()}`, time: "Just now", read: false }, ...prev].slice(0, 30);
      write(NOTIF_KEY, next);
      return next;
    });
  }, []);

  const book = useCallback<StoreValue["book"]>(
    (input) => {
      const current = read(APPT_KEY, seedAppointments);

      const slotTaken = current.some(
        (a) =>
          a.status !== "Cancelled" &&
          a.doctorId === input.doctorId &&
          a.date === input.date &&
          a.time === input.time,
      );
      if (slotTaken) {
        return { ok: false, error: "That slot has just been taken with this specialist. Please choose another time." };
      }

      const duplicate = current.some(
        (a) =>
          a.status !== "Cancelled" &&
          a.patientEmail === input.patientEmail &&
          a.date === input.date &&
          a.time === input.time,
      );
      if (duplicate) {
        return { ok: false, error: "You already have an appointment at this date and time." };
      }

      const appointment: Appointment = {
        ...input,
        id: `A-${Date.now().toString().slice(-6)}`,
        status: "Confirmed",
        paid: false,
      };
      const next = [appointment, ...current];
      setAppointments(next);
      write(APPT_KEY, next);
      pushNotification({
        title: "Appointment confirmed",
        detail: `${input.date} at ${input.time} · ${input.service}`,
        kind: "success",
      });
      pushNotification({
        title: "Email & SMS reminder scheduled",
        detail: "Confirmation sent now, reminder 2 hours before your visit",
        kind: "info",
      });
      return { ok: true, appointment };
    },
    [pushNotification],
  );

  const cancel = useCallback((id: string) => {
    setAppointments((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" as const } : a));
      write(APPT_KEY, next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((doctorId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(doctorId) ? prev.filter((d) => d !== doctorId) : [...prev, doctorId];
      write(FAV_KEY, next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      write(NOTIF_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ appointments, notifications, favorites, ready, book, cancel, toggleFavorite, markAllRead, pushNotification }),
    [appointments, notifications, favorites, ready, book, cancel, toggleFavorite, markAllRead, pushNotification],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAppStore must be used inside <AppStoreProvider>");
  return ctx;
}
