import { Location } from "@/types/emergency";
import { Navigation } from "lucide-react";

interface SimulatedMapProps {
  patientLocation: Location;
  ambulanceLocation?: Location;
  ambulanceEta?: number;
}

const SimulatedMap = ({ patientLocation, ambulanceLocation, ambulanceEta }: SimulatedMapProps) => {
  const patientX = 50;
  const patientY = 60;

  // Compute ambulance relative position based on ETA
  const maxEta = 12;
  const progress = ambulanceEta !== undefined ? Math.max(0, 1 - ambulanceEta / maxEta) : 0;
  const ambX = 15 + progress * (patientX - 15);
  const ambY = 20 + progress * (patientY - 20);

  return (
    <div className="medical-card p-0 overflow-hidden">
      <div className="relative w-full aspect-[16/10] bg-medical-blue-light">
        {/* Grid lines for map feel */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(10)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Road paths */}
        {ambulanceLocation && (
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1={`${ambX}%`} y1={`${ambY}%`}
              x2={`${patientX}%`} y2={`${patientY}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.5"
            />
          </svg>
        )}

        {/* Patient marker */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: `${patientX}%`, top: `${patientY}%`, transform: "translate(-50%, -100%)" }}
        >
          <div className="w-8 h-8 rounded-full bg-emergency flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground text-xs font-bold">SOS</span>
          </div>
          <div className="w-3 h-3 bg-emergency/40 rounded-full animate-ping absolute -bottom-1" />
        </div>

        {/* Ambulance marker */}
        {ambulanceLocation && (
          <div
            className="absolute flex flex-col items-center transition-all duration-2000"
            style={{ left: `${ambX}%`, top: `${ambY}%`, transform: "translate(-50%, -100%)" }}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Navigation className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}

        {/* Location labels */}
        <div className="absolute bottom-2 left-3 text-xs text-primary font-medium bg-card/80 rounded px-2 py-1">
          📍 {patientLocation.label}
        </div>
        {ambulanceLocation && (
          <div className="absolute top-2 left-3 text-xs text-primary font-medium bg-card/80 rounded px-2 py-1">
            🚑 {ambulanceLocation.label}
          </div>
        )}

        {/* Coordinates */}
        <div className="absolute bottom-2 right-3 text-[10px] text-muted-foreground font-mono bg-card/80 rounded px-2 py-1">
          {patientLocation.lat.toFixed(4)}, {patientLocation.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default SimulatedMap;
