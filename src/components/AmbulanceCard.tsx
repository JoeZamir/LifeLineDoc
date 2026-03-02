import { Ambulance as AmbulanceType } from "@/types/emergency";
import { Truck, User, Clock, MapPin, Bell } from "lucide-react";

interface AmbulanceCardProps {
  ambulance: AmbulanceType;
  onMapClick?: () => void;
  isDispatching?: boolean;
}

const AmbulanceCard = ({
  ambulance,
  onMapClick,
  isDispatching = false,
}: AmbulanceCardProps) => {
  return (
    <div className="medical-card animate-slide-up overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emergency/10 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 text-emergency" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-xs truncate">{ambulance.unitName}</h3>
            <p className="text-[10px] text-muted-foreground truncate">{ambulance.provider}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="flex items-center gap-0.5 text-emergency font-bold text-sm">
            <Clock className="w-3 h-3" />
            <span>{Math.max(0, ambulance.eta)} min</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 flex-grow overflow-hidden">
        <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
          <User className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">Driver: {ambulance.driverName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-[9px] font-mono bg-secondary px-1.5 py-0.5 rounded whitespace-nowrap">{ambulance.vehicleReg}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{ambulance.location.label}</span>
          </div>
          {onMapClick && (
            <button
              onClick={onMapClick}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isDispatching
                ? "bg-emergency/20 text-emergency animate-blink"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              aria-label="View map"
            >
              <MapPin className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ETA Progress */}
      <div className="mt-2 flex-shrink-0">
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-emergency rounded-full transition-all duration-1000"
            style={{ width: `${Math.max(5, 100 - (ambulance.eta / 20) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbulanceCard;
