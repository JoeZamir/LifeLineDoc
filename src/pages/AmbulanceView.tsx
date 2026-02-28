import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockAmbulances, mockPatient, nakuruLocations } from "@/data/mockData";
import {
  ArrowLeft,
  Truck,
  MapPin,
  User,
  CheckCircle2,
  Navigation,
  Clock,
} from "lucide-react";

type AmbViewState = "WAITING" | "ASSIGNED" | "ACCEPTED" | "EN_ROUTE" | "ARRIVED";

const AmbulanceView = () => {
  const navigate = useNavigate();
  const amb = mockAmbulances[0];
  const [state, setState] = useState<AmbViewState>("WAITING");
  const [eta, setEta] = useState(amb.eta);
  const [currentLocation, setCurrentLocation] = useState(amb.location.label);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setState("ASSIGNED"), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (state !== "EN_ROUTE") return;
    let idx = 0;
    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setState("ARRIVED");
          return 0;
        }
        return prev - 1;
      });
      idx = (idx + 1) % nakuruLocations.length;
      setCurrentLocation(nakuruLocations[idx].label);
      setProgress((prev) => Math.min(100, prev + 100 / amb.eta));
    }, 2500);
    return () => clearInterval(interval);
  }, [state, amb.eta]);

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground">Ambulance Dashboard</h1>
          <p className="text-xs text-muted-foreground">{amb.unitName}</p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Unit info */}
        <div className="medical-card flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emergency/10 flex items-center justify-center">
            <Truck className="w-6 h-6 text-emergency" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{amb.unitName}</h3>
            <p className="text-xs text-muted-foreground">{amb.provider} • {amb.vehicleReg}</p>
            <p className="text-xs text-muted-foreground">Driver: {amb.driverName}</p>
          </div>
        </div>

        {state === "WAITING" && (
          <div className="medical-card flex flex-col items-center py-8 space-y-3">
            <Truck className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Standby — waiting for dispatch…</p>
          </div>
        )}

        {state === "ASSIGNED" && (
          <div className="medical-card border-emergency/30 bg-emergency/5 space-y-4 animate-slide-up">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emergency" />
              <span className="font-semibold text-emergency text-sm">NEW DISPATCH</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{mockPatient.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{mockPatient.location.label}</span>
              </div>
            </div>
            <button
              onClick={() => { setState("ACCEPTED"); setTimeout(() => setState("EN_ROUTE"), 1500); }}
              className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm"
            >
              Accept Dispatch
            </button>
          </div>
        )}

        {state === "ACCEPTED" && (
          <div className="medical-card bg-success/5 flex items-center gap-3 animate-slide-up">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-foreground">Dispatch accepted — preparing route…</span>
          </div>
        )}

        {(state === "EN_ROUTE" || state === "ARRIVED") && (
          <>
            <div className="medical-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {state === "ARRIVED" ? "✅ Arrived" : "En Route"}
                </span>
                <div className="flex items-center gap-1 text-emergency font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{eta} min</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all duration-1000"
                  style={{ width: `${state === "ARRIVED" ? 100 : progress}%` }}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{state === "ARRIVED" ? mockPatient.location.label : currentLocation}</span>
              </div>
            </div>

            {state === "ARRIVED" && (
              <div className="medical-card bg-medical-green-light flex items-center gap-3 animate-slide-up">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Patient Reached</p>
                  <p className="text-xs text-muted-foreground">{mockPatient.location.label}, {mockPatient.location.county}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AmbulanceView;
