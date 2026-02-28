import { useEmergencySession } from "@/hooks/useEmergencySession";
import { useEffect } from "react";
import { ArrowLeft, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusLog from "@/components/StatusLog";
import DoctorCard from "@/components/DoctorCard";
import VideoCallUI from "@/components/VideoCallUI";
import AmbulanceCard from "@/components/AmbulanceCard";
import SimulatedMap from "@/components/SimulatedMap";
import { mockPatient } from "@/data/mockData";

const Emergency = () => {
  const { session, startEmergency, cancelEmergency } = useEmergencySession();
  const navigate = useNavigate();

  useEffect(() => {
    startEmergency();
    return () => cancelEmergency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDoctor = session.doctor && ["DOCTOR_FOUND", "CONNECTING_VIDEO", "VIDEO_CONNECTED", "DISPATCHING_AMBULANCE", "AMBULANCE_ASSIGNED", "AMBULANCE_EN_ROUTE", "SUMMARY_SYNC", "COMPLETED"].includes(session.status);
  const showVideo = session.videoConnected;
  const showAmbulance = session.ambulance && ["AMBULANCE_ASSIGNED", "AMBULANCE_EN_ROUTE", "SUMMARY_SYNC", "COMPLETED"].includes(session.status);
  const showMap = showAmbulance;
  const showSummary = session.summaryDispatched;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => {
            cancelEmergency();
            navigate("/dashboard");
          }}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground">Emergency Session</h1>
          <p className="text-xs text-muted-foreground font-mono">{session.id}</p>
        </div>
        <span className="status-badge-emergency animate-blink">
          ● LIVE
        </span>
      </header>

      <div className="px-5 space-y-4">
        {/* Video Call */}
        {showVideo && session.doctor && (
          <VideoCallUI
            doctor={session.doctor}
            patientLocation={mockPatient.location.label}
            connected={session.videoConnected}
          />
        )}

        {/* Doctor Card (when found but before video or compact during video) */}
        {showDoctor && session.doctor && !showVideo && (
          <DoctorCard doctor={session.doctor} />
        )}

        {/* Map */}
        {showMap && session.ambulance && (
          <SimulatedMap
            patientLocation={mockPatient.location}
            ambulanceLocation={session.ambulance.location}
            ambulanceEta={session.ambulance.eta}
          />
        )}

        {/* Ambulance */}
        {showAmbulance && session.ambulance && (
          <AmbulanceCard ambulance={session.ambulance} />
        )}

        {/* Summary Badge */}
        {showSummary && (
          <div className="medical-card bg-medical-green-light flex items-center gap-3 animate-slide-up">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Summary Dispatched</p>
              <p className="text-xs text-muted-foreground">Emergency summary sent to dispatch center</p>
            </div>
          </div>
        )}

        {/* Status Log */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Live Status Log</h2>
          <StatusLog entries={session.statusLog} />
        </div>
      </div>
    </div>
  );
};

export default Emergency;
