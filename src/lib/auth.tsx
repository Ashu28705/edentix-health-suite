import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Role = "patient" | "doctor" | "receptionist" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatarSeed: string;
  createdAt: string;
};

type StoredUser = User & { password: string };

const USERS_KEY = "edentix.users";
const SESSION_KEY = "edentix.session";

export const demoAccounts: { email: string; password: string; role: Role; label: string }[] = [
  { email: "patient@edentix.com", password: "edentix123", role: "patient", label: "Patient" },
  { email: "doctor@edentix.com", password: "edentix123", role: "doctor", label: "Doctor" },
  { email: "reception@edentix.com", password: "edentix123", role: "receptionist", label: "Receptionist" },
  { email: "admin@edentix.com", password: "edentix123", role: "admin", label: "Administrator" },
];

const seedUsers: StoredUser[] = [
  { id: "u1", name: "Sarah Miller", email: "patient@edentix.com", phone: "+91 90000 10001", role: "patient", password: "edentix123", avatarSeed: "SM", createdAt: "2025-11-02" },
  { id: "u2", name: "Dr. Neeraj Verma", email: "doctor@edentix.com", phone: "+91 98250 20001", role: "doctor", password: "edentix123", avatarSeed: "NV", createdAt: "2024-03-11" },
  { id: "u3", name: "Priya Nair", email: "reception@edentix.com", phone: "+91 98250 11221", role: "receptionist", password: "edentix123", avatarSeed: "PN", createdAt: "2024-06-19" },
  { id: "u4", name: "System Administrator", email: "admin@edentix.com", phone: "+91 98250 90001", role: "admin", password: "edentix123", avatarSeed: "SA", createdAt: "2023-01-05" },
];

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return seedUsers;
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
      return seedUsers;
    }
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return seedUsers;
  }
}

function writeUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function publicUser(u: StoredUser): User {
  const { password: _password, ...rest } = u;
  return rest;
}

export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (input: { name: string; email: string; phone: string; password: string; role?: Role }) => AuthResult;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "phone" | "email">>) => void;
  hasRole: (...roles: Role[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    readUsers();
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore corrupt session */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(SESSION_KEY);
  }, []);

  const login = useCallback<AuthContextValue["login"]>(
    (email, password) => {
      const users = readUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!found) return { ok: false, error: "No account found with that email address." };
      if (found.password !== password) return { ok: false, error: "Incorrect password. Please try again." };
      const pub = publicUser(found);
      persist(pub);
      return { ok: true, user: pub };
    },
    [persist],
  );

  const register = useCallback<AuthContextValue["register"]>(
    ({ name, email, phone, password, role = "patient" }) => {
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { ok: false, error: "An account already exists with that email address." };
      }
      const created: StoredUser = {
        id: `u${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        role,
        password,
        avatarSeed: name
          .trim()
          .split(/\s+/)
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      writeUsers([...users, created]);
      const pub = publicUser(created);
      persist(pub);
      return { ok: true, user: pub };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>(
    (patch) => {
      if (!user) return;
      const users = readUsers();
      const next = users.map((u) => (u.id === user.id ? { ...u, ...patch } : u));
      writeUsers(next);
      persist({ ...user, ...patch });
    },
    [user, persist],
  );

  const hasRole = useCallback<AuthContextValue["hasRole"]>(
    (...roles) => !!user && roles.includes(user.role),
    [user],
  );

  const value = useMemo(
    () => ({ user, ready, login, register, logout, updateProfile, hasRole }),
    [user, ready, login, register, logout, updateProfile, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
