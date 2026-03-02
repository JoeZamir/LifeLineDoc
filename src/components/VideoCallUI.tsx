import { Doctor } from "@/types/emergency";
import { Video, Mic, MicOff, PhoneOff, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface VideoCallUIProps {
  doctor: Doctor;
  doctorLocation: string;
  connected: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  currentStatusMessage?: string;
  currentStatusType?: "info" | "success" | "warning" | "critical";
  connectionState?: "connecting" | "connected";
}

const VideoCallUI = ({
  doctor,
  doctorLocation,
  connected,
  isFullscreen = false,
  onToggleFullscreen,
  currentStatusMessage = "",
  currentStatusType = "info",
  connectionState = "connecting",
}: VideoCallUIProps) => {
  const [muted, setMuted] = useState(false);

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50"
    : "relative w-full h-full";

  const videoAreaClass = isFullscreen
    ? "w-full h-full flex items-center justify-center"
    : "relative bg-foreground/90 w-full h-full flex flex items-center justify-center";

  return (
    <div className={`${containerClass} bg-card rounded-2xl overflow-hidden`}>
      {/* Video area */}
      <div className={videoAreaClass}>
        {connectionState === "connecting" ? (
          // Connecting state - only show plain text status message
          <div className="text-center">
            <p className={`text-xs font-medium ${currentStatusType === "success" ? "text-success" : "text-primary-foreground/90"
              }`}>
              {currentStatusMessage || "Connecting video call..."}
            </p>
          </div>
        ) : (
          // Connected state - telemedicine interface
          <div className="w-full h-full relative">
            {/* Doctor info - Bottom Left */}
            <div className="absolute bottom-3 left-0 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg z-50">
              <p className="text-white text-xs font-semibold leading-tight">
                {doctor.name}
              </p>
            </div>

            {/* Doctor location - Top Right */}
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg z-10">
              <p className="text-primary-foreground text-[10px] leading-tight">
                {doctorLocation}
              </p>
            </div>

            {/* Self view (small) - Bottom Right */}
            <div className="absolute bottom-2 right-2 w-16 h-20 rounded-lg bg-foreground/70 border-2 border-primary-foreground/20 flex items-center justify-center z-10">
              <Video className="w-4 h-4 text-primary-foreground/40" />
            </div>
          </div>
        )}

        {/* Connection indicator - Top Left */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-foreground/50 rounded-full px-2 py-1 z-20">
          <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-success animate-blink" : "bg-warning"}`} />
          <span className="text-[10px] text-primary-foreground font-medium">
            {connected ? "Connected" : "Connecting…"}
          </span>
        </div>

        {/* Fullscreen toggle - Top Right */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/50 flex items-center justify-center hover:bg-foreground/70 transition-colors z-20"
            aria-label={isFullscreen ? "Minimize" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3 h-3 text-primary-foreground" />
            ) : (
              <Maximize2 className="w-3 h-3 text-primary-foreground" />
            )}
          </button>
        )}
      </div>

      {/* Call Controls - Only show when connected */}
      {connectionState === "connected" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 z-20 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-emergency/10 text-emergency" : "bg-secondary text-foreground"
              }`}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            className="w-12 h-12 rounded-full bg-emergency flex items-center justify-center text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Disconnect call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Toggle video"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCallUI;
