import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router";
import { Loader2, CalendarDays } from "lucide-react";
import { ROUTES } from "../routes";
import { useAuth } from "../lib/auth-context";
import { fetchMyBookings, ApiError, type MyBooking } from "../lib/api";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";

const statusStyles: Record<MyBooking["status"], string> = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/30",
};

export function MyBookingsPage() {
  const { user, token, initializing } = useAuth();
  const [bookings, setBookings] = useState<MyBooking[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchMyBookings(token)
      .then(setBookings)
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Couldn't load your bookings right now.");
      });
  }, [token]);

  // Wait for localStorage restore before deciding to redirect, so a page
  // refresh doesn't briefly bounce a signed-in user to /sign-in.
  if (initializing) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="animate-spin" size={18} /> Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.signIn} state={{ from: ROUTES.myBookings }} replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-28">
      <SectionLabel>Your Account</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        My Bookings
      </h1>
      <p className="text-muted-foreground mb-10">Signed in as {user.name} ({user.email})</p>

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {bookings === null && !error && (
        <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
          <Loader2 className="animate-spin" size={18} /> Loading your bookings…
        </div>
      )}

      {bookings !== null && bookings.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <CalendarDays className="mx-auto mb-4 text-muted-foreground" size={28} />
          <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
          <Link to={ROUTES.fleet}>
            <PrimaryBtn>Browse the Fleet</PrimaryBtn>
          </Link>
        </div>
      )}

      {bookings !== null && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
              <img
                src={b.vehicle.image}
                alt={b.vehicle.name}
                className="w-24 h-16 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{b.vehicle.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.returnDate).toLocaleDateString()} ·{" "}
                  {b.pickupLocation}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  KES {b.totalPrice.toLocaleString()}
                </div>
                <span
                  className={`inline-block mt-1 text-xs font-semibold uppercase tracking-wide border rounded-full px-2.5 py-0.5 ${statusStyles[b.status]}`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
