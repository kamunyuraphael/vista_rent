import { useEffect, useState, type FormEvent } from "react";
import { useParams, Link } from "react-router";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import { ROUTES } from "../routes";
import { fetchVehicle, createBooking, ApiError, type Booking } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import type { Vehicle } from "../data/vehicles";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

type LoadState = "loading" | "ready" | "not-found" | "offline";

export function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { user, token } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    pickupDate: "",
    returnDate: "",
    notes: "",
  });

  // Prefill contact details once we know who's signed in, without clobbering
  // anything the person may have already started typing.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      fullName: f.fullName || user.name,
      email: f.email || user.email,
    }));
  }, [user]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoadState("not-found");
      return;
    }
    fetchVehicle(vehicleId)
      .then((v) => {
        setVehicle(v);
        setLoadState("ready");
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) {
          setLoadState("not-found");
        } else {
          // Backend likely isn't running — this route can't fall back to local
          // data since it needs a real vehicle _id to book against.
          setLoadState("offline");
        }
      });
  }, [vehicleId]);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const days =
    form.pickupDate && form.returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(form.returnDate).getTime() - new Date(form.pickupDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const estimatedTotal = vehicle && days > 0 ? days * vehicle.price : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!vehicle) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const booking = await createBooking({ vehicleId: vehicle.id, ...form }, token);
      setConfirmed(booking);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadState === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="animate-spin" size={18} /> Loading vehicle…
      </div>
    );
  }

  if (loadState === "not-found") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold mb-3">Vehicle not found</h1>
        <p className="text-muted-foreground mb-6">This vehicle may no longer be available.</p>
        <Link to={ROUTES.fleet} className="text-primary font-semibold">
          Back to fleet
        </Link>
      </div>
    );
  }

  if (loadState === "offline") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold mb-3">Booking is temporarily unavailable</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't reach the booking service. Please check your connection and try again shortly.
        </p>
        <Link to={ROUTES.fleet} className="text-primary font-semibold">
          Back to fleet
        </Link>
      </div>
    );
  }

  if (!vehicle) return null;

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="text-primary" size={26} />
        </div>
        <h1 className="text-3xl font-black uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Booking Confirmed
        </h1>
        <p className="text-muted-foreground mb-8">
          We've reserved the {vehicle.name} for you. A confirmation has been sent to {confirmed.email}.
          Total: <span className="text-foreground font-semibold">KES {confirmed.totalPrice.toLocaleString()}</span>
        </p>
        <Link to={ROUTES.fleet}>
          <PrimaryBtn>Browse More Vehicles</PrimaryBtn>
        </Link>
        {user && (
          <div className="mt-4">
            <Link to={ROUTES.myBookings} className="text-sm text-primary font-semibold">
              View in My Bookings
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-28">
      <Link to={ROUTES.fleet} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={14} /> Back to fleet
      </Link>

      <SectionLabel>Reserve Your Vehicle</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {vehicle.name}
      </h1>

      <div className="flex items-center gap-4 mb-10 bg-card border border-border rounded-xl p-4">
        <img src={vehicle.image} alt={vehicle.name} className="w-24 h-16 object-cover rounded-lg" />
        <div>
          <div className="font-semibold">{vehicle.name}</div>
          <div className="text-sm text-muted-foreground">
            KES {vehicle.price.toLocaleString()} / day · {vehicle.seats} seats · {vehicle.transmission}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Full name">
            <Input required value={form.fullName} onChange={update("fullName")} />
          </Field>
          <Field label="Email">
            <Input required type="email" value={form.email} onChange={update("email")} />
          </Field>
          <Field label="Phone">
            <Input required value={form.phone} onChange={update("phone")} placeholder="+254 7xx xxx xxx" />
          </Field>
          <Field label="Pickup location">
            <Input required value={form.pickupLocation} onChange={update("pickupLocation")} placeholder="e.g. JKIA, Westlands" />
          </Field>
          <Field label="Pickup date">
            <Input required type="date" value={form.pickupDate} onChange={update("pickupDate")} />
          </Field>
          <Field label="Return date">
            <Input required type="date" value={form.returnDate} onChange={update("returnDate")} />
          </Field>
        </div>

        <Field label="Notes (optional)">
          <Textarea value={form.notes} onChange={update("notes")} className="min-h-20" placeholder="Chauffeur requested, child seat, etc." />
        </Field>

        {estimatedTotal !== null && (
          <div className="flex items-center justify-between bg-secondary border border-border rounded-xl px-5 py-4">
            <span className="text-sm text-muted-foreground">
              {days} day{days !== 1 ? "s" : ""} × KES {vehicle.price.toLocaleString()}
            </span>
            <span className="font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              KES {estimatedTotal.toLocaleString()}
            </span>
          </div>
        )}

        {submitError && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            {submitError}
          </div>
        )}

        <PrimaryBtn full large>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Reserving…
            </span>
          ) : (
            "Confirm Reservation"
          )}
        </PrimaryBtn>
      </form>
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
