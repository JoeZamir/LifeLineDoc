import { useEmergencySession } from "@/hooks/useEmergencySession.tsx";
import { useEffect, useState } from "react";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "@/components/DoctorCard";
import VideoCallUI from "@/components/VideoCallUI";
import AmbulanceCard from "@/components/AmbulanceCard";
import MapOverlay from "@/components/MapOverlay";
import LogsModal from "@/components/LogsModal";
import { mockPatient } from "@/data/mockData";
import { StatusLogEntry } from "@/types/emergency";

const Emergency = () => {
  const { session, startEmergency, cancelEmergency } = useEmergencySession();
  const navigate = useNavigate();
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [currentStatusMessage, setCurrentStatusMessage] = useState("");
  const [currentStatusType, setCurrentStatusType] = useState<StatusLogEntry["type"]>("info");

  useEffect(() => {
    startEmergency();
    return () => cancelEmergency();
  }, [startEmergency, cancelEmergency]);

  // Synchronize with log messages to display in video UI
  useEffect(() => {
    if (session.statusLog.length === 0) {
      setCurrentStatusMessage("");
      setCurrentStatusType("info");
      return;
    }

    const lastLog = session.statusLog[session.statusLog.length - 1];
    setCurrentStatusMessage(lastLog.message);
    setCurrentStatusType(lastLog.type);
  }, [session.statusLog]);

  const showDoctor =
    session.doctor &&
    ["DOCTOR_FOUND", "CONNECTING_VIDEO", "VIDEO_CONNECTED", "DISPATCHING_AMBULANCE", "AMBULANCE_ASSIGNED", "AMBULANCE_EN_ROUTE", "SUMMARY_SYNC", "COMPLETED"].includes(
      session.status
    );
  const showVideo =
    session.videoConnected || ["SEARCHING_DOCTOR", "CONNECTING_VIDEO", "VIDEO_CONNECTED"].includes(session.status);
  const showAmbulance =
    session.ambulance &&
    ["AMBULANCE_ASSIGNED", "AMBULANCE_EN_ROUTE", "SUMMARY_SYNC", "COMPLETED"].includes(session.status);

  const doctorLocation = "Milimani Estate, Nakuru";
  const isDispatching = ["DISPATCHING_AMBULANCE", "AMBULANCE_ASSIGNED", "AMBULANCE_EN_ROUTE"].includes(session.status);

  // Get the latest log for display in sticky section
  const latestLog = session.statusLog.length > 0
    ? session.statusLog[session.statusLog.length - 1]
    : null;

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-5 pt-4 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => {
            cancelEmergency();
            navigate("/dashboard");
          }}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground text-lg">Emergency Session</h1>
          <p className="text-xs text-muted-foreground font-mono">{session.id}</p>
        </div>
        <span className="status-badge-emergency animate-blink">● LIVE</span>
      </header>

      {/* Main Content - divide remaining height via flex */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Sticky Status Log - Max 15% of available height */}
        <div className="flex-none max-h-[15%] px-4 py-2 border-b border-border bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 h-full">
            <div className="flex-1 min-w-0">
              {latestLog ? (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${latestLog.type === "success"
                      ? "text-success"
                      : latestLog.type === "critical"
                        ? "text-emergency"
                        : latestLog.type === "warning"
                          ? "text-warning"
                          : "text-primary"
                      }`}
                  />
                  <p className="text-xs text-foreground truncate">{latestLog.message}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Waiting for activity...</p>
              )}
            </div>
            {/* History Icon Button */}
            <button
              onClick={() => setShowLogsModal(true)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              aria-label="View all logs"
            >
              <History className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Video area - ~50% of available height */}
        <div className="flex-[10] px-3 py-2 overflow-hidden">
          {(showVideo || showDoctor) && (
            showVideo && session.doctor ? (
              <VideoCallUI
                doctor={session.doctor}
                doctorLocation={doctorLocation}
                connected={session.videoConnected}
                isFullscreen={isVideoFullscreen}
                onToggleFullscreen={() => setIsVideoFullscreen(!isVideoFullscreen)}
                currentStatusMessage={currentStatusMessage}
                currentStatusType={currentStatusType}
                connectionState={session.videoConnected ? "connected" : "connecting"}
              />
            ) : showDoctor && session.doctor && !showVideo ? (
              <DoctorCard doctor={session.doctor} />
            ) : null
          )}
        </div>

        {/* Ambulance section - ~35% of available height */}
        <div className="flex-[7] px-3 py-2 overflow-hidden">
          {showAmbulance && session.ambulance && (
            <AmbulanceCard
              ambulance={session.ambulance}
              onMapClick={() => setShowMapOverlay(true)}
              isDispatching={isDispatching}
            />
          )}
        </div>
      </div>

      {/* Map Overlay Modal */}
      {showMapOverlay && session.ambulance && (
        <MapOverlay
          patientLocation={mockPatient.location}
          ambulanceLocation={session.ambulance.location}
          ambulanceEta={session.ambulance.eta}
          onClose={() => setShowMapOverlay(false)}
        />
      )}


      {/* Logs Modal */}
      {showLogsModal && (
        <LogsModal
          logs={session.statusLog}
          onClose={() => setShowLogsModal(false)}
        />
      )}
    </div>
  );
};

export default Emergency;
