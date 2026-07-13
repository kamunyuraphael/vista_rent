import { Settings2, Users, Zap, Package } from "lucide-react";
import type { Vehicle } from "../../data/vehicles";
import { PrimaryBtn } from "../common/PrimaryBtn";

type VehicleCardProps = {
  vehicle: Vehicle;
  /** Navigate to this route when "Reserve" is clicked (e.g. the fleet page or a future booking route). */
  reserveTo?: string;
  /** Or handle the click imperatively (e.g. open a booking modal). Ignored if reserveTo is set. */
  onReserve?: () => void;
};

export function VehicleCard({ vehicle, reserveTo, onReserve }: VehicleCardProps) {
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200">
      <div className="relative h-48 bg-secondary overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {vehicle.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {vehicle.badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-foreground leading-tight">{vehicle.name}</h3>
          <div className="text-right shrink-0">
            <div className="text-primary font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              KES {vehicle.price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">/day</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: Settings2, label: vehicle.transmission },
            { icon: Users, label: `${vehicle.seats} Seats` },
            { icon: Zap, label: vehicle.engine },
            { icon: Package, label: vehicle.luggage },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon size={12} className="text-primary shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn full to={reserveTo} onClick={reserveTo ? undefined : onReserve}>
          Reserve This Vehicle
        </PrimaryBtn>
      </div>
    </div>
  );
}
