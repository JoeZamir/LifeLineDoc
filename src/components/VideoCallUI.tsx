import { Doctor } from "@/types/emergency";
import { Video, Mic, MicOff, PhoneOff, MapPin } from "lucide-react";
import { useState } from "react";

interface VideoCallUIProps {
  doctor: Doctor;
  patientLocation: string;
  connected: boolean;
}

const VideoCallUI = ({ doctor, patientLocation, connected }: VideoCallUIProps) => {
  const [muted, setMuted] = useState(false);

  return (
    <div className="medical-card p-0 overflow-hidden animate-slide-up">
      {/* Video area */}
      <div className="relative bg-foreground/90 aspect-[4/3] flex items-center justify-center">
        {/* Simulated doctor video */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto">
            {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
          </div>
          <div>
            <p className="text-primary-foreground font-semibold">{doctor.name}</p>
            <p className="text-primary-foreground/60 text-sm">{doctor.hospital}</p>
          </div>
        </div>

        {/* Connection indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-foreground/50 rounded-full px-3 py-1.5">
          <span className={`w-2 h-2 rounded-full ${connected ? "bg-success animate-blink" : "bg-warning"}`} />
          <span className="text-xs text-primary-foreground font-medium">
            {connected ? "Connected" : "Connecting…"}
          </span>
        </div>

        {/* Location badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-foreground/50 rounded-full px-2.5 py-1.5">
          <MapPin className="w-3 h-3 text-emergency" />
          <span className="text-xs text-primary-foreground">{patientLocation}</span>
        </div>

        {/* Critical label */}
        <div className="absolute bottom-3 left-3">
          <span className="status-badge-emergency text-xs font-bold">
            ⚠ CRITICAL CASE
          </span>
        </div>

        {/* Self view (small) */}
        <div className="absolute bottom-3 right-3 w-20 h-28 rounded-xl bg-foreground/70 border-2 border-primary-foreground/20 flex items-center justify-center">
          <Video className="w-5 h-5 text-primary-foreground/40" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 py-4 bg-card">
        <button
          onClick={() => setMuted(!muted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            muted ? "bg-emergency/10 text-emergency" : "bg-secondary text-foreground"
          }`}
        >
          {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button className="w-14 h-14 rounded-full gradient-emergency flex items-center justify-center text-primary-foreground shadow-lg">
          <PhoneOff className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground">
          <Video className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoCallUI;
