import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "../routes";
import { ApiError } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { Input } from "../components/ui/input";

export function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the user was redirected here from a protected page (e.g. My Bookings),
  // send them back there after a successful sign-in.
  const redirectTo = (location.state as { from?: string } | null)?.from ?? ROUTES.home;

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(form);
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-20 pb-28">
      <SectionLabel>Welcome Back</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email">
          <Input required type="email" autoComplete="email" value={form.email} onChange={update("email")} />
        </Field>
        <Field label="Password">
          <Input
            required
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={update("password")}
          />
        </Field>

        {error && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <PrimaryBtn full large>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Signing in…
            </span>
          ) : (
            "Sign In"
          )}
        </PrimaryBtn>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.signUp} className="text-primary font-semibold">
          Create one
        </Link>
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
