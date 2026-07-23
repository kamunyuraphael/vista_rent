import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginUser, registerUser, type AuthUser, type LoginInput, type RegisterInput } from "./api";

const STORAGE_KEY = "vistarent_auth";

interface StoredAuth {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  /** True while restoring session from localStorage on first mount. */
  initializing: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = readStoredAuth();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setInitializing(false);
  }, []);

  function persist(next: StoredAuth | null) {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setUser(next.user);
      setToken(next.token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setToken(null);
    }
  }

  async function login(input: LoginInput) {
    const result = await loginUser(input);
    persist(result);
  }

  async function register(input: RegisterInput) {
    const result = await registerUser(input);
    persist(result);
  }

  function logout() {
    persist(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
