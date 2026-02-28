import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockDoctors, mockPatient } from "@/data/mockData";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Video,
  User,
} from "lucide-react";
import DoctorCard from "@/components/DoctorCard";

type DoctorViewState = "WAITING" | "INCOMING" | "ACCEPTED" | "IN_CALL";

const DoctorView = () => {
  const navigate = useNavigate();
  const doctor = mockDoctors[0];
  const patient = mockPatient;
  const [state, setState] = useState<DoctorViewState>("WAITING");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Simulate incoming alert after 2s
    const t1 = setTimeout(() => setState("INCOMING"), 2000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (state === "IN_CALL") {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [state]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-xs text-muted-foreground">{doctor.name}</p>
        </div>
        <span className="status-badge-active">
          <span className="w-1.5 h-1.5 rounded-full bg-medical-green animate-blink" />
          Online
        </span>
      </header>

      <div className="px-5 space-y-4">
        <DoctorCard doctor={doctor} />

        {state === "WAITING" && (
          <div className="medical-card flex flex-col items-center py-8 space-y-3">
            <Stethoscope className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Waiting for emergency alerts…</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-blink" />
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
          </div>
        )}

        {state === "INCOMING" && (
          <div className="medical-card border-emergency/30 bg-emergency/5 space-y-4 animate-slide-up">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emergency animate-blink" />
              <span className="font-semibold text-emergency text-sm">INCOMING EMERGENCY</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{patient.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{patient.location.label}, {patient.location.county}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
            </div>

            <button
              onClick={() => setState("ACCEPTED")}
              className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm"
            >
              Accept Emergency Call
            </button>
          </div>
        )}

        {(state === "ACCEPTED" || state === "IN_CALL") && (
          <>
            <div className="medical-card bg-success/5 flex items-center gap-3 animate-slide-up">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-foreground">Emergency call accepted</span>
            </div>

            {state === "ACCEPTED" && (
              <button
                onClick={() => setState("IN_CALL")}
                className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Start Video Call
              </button>
            )}

            {state === "IN_CALL" && (
              <>
                {/* Simulated video */}
                <div className="medical-card p-0 overflow-hidden">
                  <div className="bg-foreground/90 aspect-[4/3] flex items-center justify-center relative">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
                        {patient.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-primary-foreground font-medium">{patient.name}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-foreground/50 px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary-foreground" />
                      <span className="text-xs text-primary-foreground font-mono">{formatTime(timer)}</span>
                    </div>
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-foreground/50 rounded-full px-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-success animate-blink" />
                      <span className="text-xs text-primary-foreground">Live</span>
                    </div>
                  </div>
                </div>

                {/* Patient details */}
                <div className="medical-card space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Patient Details</h3>
                  <p className="text-xs text-muted-foreground">Blood: {patient.bloodType} | Allergies: {patient.allergies.join(", ")}</p>
                  <p className="text-xs text-muted-foreground">Location: {patient.location.label}</p>
                  <p className="text-xs text-muted-foreground">Ambulance ETA: ~8 min</p>
                </div>

                {/* Status reporting */}
                <div className="medical-card space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Status Report</h3>
                  {["Patient conscious", "Vitals stable", "Ambulance notified"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorView;
