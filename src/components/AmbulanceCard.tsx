import { Ambulance as AmbulanceType } from "@/types/emergency";
import { Truck, User, Clock, MapPin } from "lucide-react";

interface AmbulanceCardProps {
  ambulance: AmbulanceType;
}

const AmbulanceCard = ({ ambulance }: AmbulanceCardProps) => {
  return (
    <div className="medical-card animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emergency/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-emergency" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{ambulance.unitName}</h3>
            <p className="text-xs text-muted-foreground">{ambulance.provider}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-emergency font-bold text-lg">
            <Clock className="w-4 h-4" />
            <span>{Math.max(0, ambulance.eta)} min</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>Driver: {ambulance.driverName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">{ambulance.vehicleReg}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{ambulance.location.label}</span>
        </div>
      </div>

      {/* ETA Progress */}
      <div className="mt-3">
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-emergency rounded-full transition-all duration-1000"
            style={{ width: `${Math.max(5, 100 - (ambulance.eta / 12) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbulanceCard;
