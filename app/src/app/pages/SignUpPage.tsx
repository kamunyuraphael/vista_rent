import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "../routes";
import { ApiError } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { Input } from "../components/ui/input";

export function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register(form);
      toast.success("Account created — welcome to VistaRent!");
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-20 pb-28">
      <SectionLabel>Join VistaRent</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Full name">
          <Input required autoComplete="name" value={form.name} onChange={update("name")} />
        </Field>
        <Field label="Email">
          <Input required type="email" autoComplete="email" value={form.email} onChange={update("email")} />
        </Field>
        <Field label="Phone (optional)">
          <Input autoComplete="tel" value={form.phone} onChange={update("phone")} placeholder="+254 7xx xxx xxx" />
        </Field>
        <Field label="Password">
          <Input
            required
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={update("password")}
          />
          <span className="block text-xs text-muted-foreground mt-1.5">At least 8 characters.</span>
        </Field>

        {error && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <PrimaryBtn full large>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Creating account…
            </span>
          ) : (
            "Create Account"
          )}
        </PrimaryBtn>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.signIn} className="text-primary font-semibold">
          Sign in
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
