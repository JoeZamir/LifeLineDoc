import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cake, FileCheck, History } from "lucide-react";
import { mockAmbulances, mockPatient } from "@/data/mockData";
import VideoCallUI from "@/components/VideoCallUI";
import AmbulanceCard from "@/components/AmbulanceCard";
import LogsModal from "@/components/LogsModal";
import { useEmergencySession } from "@/hooks/useEmergencySession";
import { StatusLogEntry } from "@/types/emergency";

const statusReports = [
  "Teacher collapsed and responsive",
  "No pulse",
  "Dyslipidemia",
  "CPR initiated",
  "Emergency risk level: critical",
  "Ambulance notified",
];

const EmergencyDocPOV = () => {
  const navigate = useNavigate();
  const patient = mockPatient;
  const ambulance = mockAmbulances[0];
  const { setVideoConnected } = useEmergencySession();

  const [connectionState, setConnectionState] = useState<"connecting" | "connected">("connecting");
  const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(-1);
  const [showAmbulanceCard, setShowAmbulanceCard] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const patientAsVideoParticipant = useMemo(
    () => ({
      id: patient.id,
      name: patient.name,
      licenseId: "",
      hospital: "Patient Stream",
      specialty: "Emergency",
      rating: 5,
      avatar: "",
      phone: patient.phone,
    }),
    [patient.id, patient.name, patient.phone],
  );

  const currentStatusMessage = currentStatusIndex >= 0
    ? statusReports[currentStatusIndex]
    : "Video connected. Awaiting first field report...";

  const logs: StatusLogEntry[] = statusReports
    .slice(0, Math.max(currentStatusIndex + 1, 0))
    .map((message, index) => ({
      id: `doc-status-${index}`,
      message,
      timestamp: new Date(),
      type: message.includes("critical") || message.includes("No pulse") ? "critical" : "info",
    }));

  useEffect(() => {
    const connectTimeout = setTimeout(() => {
      setConnectionState("connected");
      setVideoConnected(true);
    }, 3000);

    return () => {
      clearTimeout(connectTimeout);
      setVideoConnected(false);
    };
  }, [setVideoConnected]);

  useEffect(() => {
    if (connectionState !== "connected") {
      return;
    }

    setCurrentStatusIndex(0);

    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev >= statusReports.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 5000);

    const ambulanceTimeout = setTimeout(() => {
      setShowAmbulanceCard(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(ambulanceTimeout);
    };
  }, [connectionState]);

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex flex-col overflow-hidden">
      <header className="px-5 pt-4 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-foreground text-lg truncate">Emergency Call</h1>
          <p className="text-xs text-muted-foreground truncate">{patient.name} · {patient.location.label}</p>
        </div>
        <span className="status-badge-emergency">● LIVE</span>
      </header>

      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-none max-h-[12%] px-4 py-2 border-b border-border bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 h-full">
            <div className="w-7 h-7 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Status report</p>
              <p className="text-xs text-foreground truncate">{connectionState === "connected" ? currentStatusMessage : "Connecting to patient video..."}</p>
            </div>
            <button
              onClick={() => setShowLogsModal(true)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              aria-label="View all logs"
            >
              <History className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-[10] px-3 py-2 overflow-hidden">
          <VideoCallUI
            doctor={patientAsVideoParticipant}
            doctorLocation={`${patient.location.label}, ${patient.location.county}`}
            connected={connectionState === "connected"}
            currentStatusMessage={connectionState === "connecting" ? "Connecting emergency video call..." : currentStatusMessage}
            currentStatusType={currentStatusMessage.includes("critical") || currentStatusMessage.includes("No pulse") ? "critical" : "info"}
            connectionState={connectionState}
          />
        </div>

        <div className="flex-[4] px-3 py-1 overflow-hidden">
          <div className="medical-card h-full py-2.5">
            <h3 className="text-sm font-semibold text-foreground mb-2">Patient Details</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              <p className="text-xs text-muted-foreground truncate">Phone: <span className="text-foreground">{patient.phone}</span></p>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1"><Cake className="w-3 h-3" />Age: <span className="text-foreground">{patient.age} years</span></p>
              <p className="text-xs text-muted-foreground truncate">Blood Type: <span className="text-foreground">{patient.bloodType}</span></p>
              <p className="text-xs text-muted-foreground truncate col-span-2">Allergies: <span className="text-foreground">{patient.allergies.join(", ")}</span></p>
              <p className="text-xs text-muted-foreground truncate">County: <span className="text-foreground">{patient.county}</span></p>
              <p className="text-xs text-muted-foreground truncate">Contact: <span className="text-foreground">{patient.emergencyContacts[0]?.phone ?? "N/A"}</span></p>
            </div>
          </div>
        </div>

        <div className="flex-[5] px-3 py-2 overflow-hidden">
          {showAmbulanceCard ? (
            <AmbulanceCard ambulance={ambulance} isDispatching />
          ) : (
            <div className="medical-card h-full flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Dispatching ambulance details...</p>
            </div>
          )}
        </div>
      </div>

      {showLogsModal && (
        <LogsModal
          logs={logs}
          onClose={() => setShowLogsModal(false)}
        />
      )}
    </div>
  );
};

export default EmergencyDocPOV;
