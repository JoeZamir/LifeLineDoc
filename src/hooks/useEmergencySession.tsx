import { useState, useCallback, useRef, createContext, useContext, ReactNode, useEffect } from "react";
import {
  EmergencyState,
  EmergencySession,
  StatusLogEntry,
  Ambulance,
} from "@/types/emergency";
import { mockPatient } from "@/data/mockData";
import {
  mockSendGPS,
  mockFindDoctor,
  mockStartVideoCall,
  mockDispatchAmbulance,
  mockStreamAmbulanceLocation,
  mockSendSummaryReport,
} from "@/services/mockEmergencyService";

const generateId = () => `EM-${Date.now().toString(36).toUpperCase()}`;

interface EmergencyContextType {
  session: EmergencySession;
  startEmergency: () => Promise<void>;
  cancelEmergency: () => void;
  clearSummaryNotification: () => void;
  /** set the videoConnected flag manually */
  setVideoConnected: (connected: boolean) => void;
  /**
   * force the summaryDispatched flag to true (used by doctor UI simulation)
   * kept for backward compatibility but no longer necessary
   */
  markSummaryDispatched: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [session, setSession] = useState<EmergencySession>({
    id: "",
    patientName: mockPatient.name,
    patientPhone: mockPatient.phone,
    location: mockPatient.location,
    doctor: null,
    ambulance: null,
    status: "IDLE",
    statusLog: [],
    startedAt: new Date(),
    videoConnected: false,
    summaryDispatched: false,
  });

  const cleanupRef = useRef<(() => void) | null>(null);
  const summaryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback((log: StatusLogEntry) => {
    setSession((prev) => ({
      ...prev,
      statusLog: [...prev.statusLog, log],
    }));
  }, []);

  const setState = useCallback((status: EmergencyState) => {
    setSession((prev) => ({ ...prev, status }));
  }, []);

  const startEmergency = useCallback(async () => {
    const id = generateId();
    setSession((prev) => ({
      ...prev,
      id,
      status: "INITIATED",
      startedAt: new Date(),
      statusLog: [
        {
          id: "log-init",
          timestamp: new Date(),
          message: "SOS activated — initiating emergency protocol",
          type: "critical",
        },
      ],
      doctor: null,
      ambulance: null,
      videoConnected: false,
      summaryDispatched: false,
    }));

    // STATE 1: Send GPS
    addLog({
      id: "log-gps-start",
      timestamp: new Date(),
      message: "Sending GPS coordinates…",
      type: "info",
    });

    const gpsResult = await mockSendGPS(mockPatient.location);
    addLog(gpsResult.log);

    // STATE 2: Search doctor
    setState("SEARCHING_DOCTOR");
    addLog({
      id: "log-doc-search",
      timestamp: new Date(),
      message: "Searching for nearest available doctor in your area…",
      type: "info",
    });

    const docResult = await mockFindDoctor();
    setState("DOCTOR_FOUND");
    setSession((prev) => ({ ...prev, doctor: docResult.doctor }));
    addLog(docResult.log);

    // STATE 4: Connect video
    setState("CONNECTING_VIDEO");
    addLog({
      id: "log-video-start",
      timestamp: new Date(),
      message: "Connecting secure video call…",
      type: "info",
    });

    const videoResult = await mockStartVideoCall(docResult.doctor);
    setState("VIDEO_CONNECTED");
    setSession((prev) => ({ ...prev, videoConnected: videoResult.connected }));
    addLog(videoResult.log);

    // STATE 6: Dispatch ambulance (parallel)
    setState("DISPATCHING_AMBULANCE");
    addLog({
      id: "log-amb-dispatch",
      timestamp: new Date(),
      message: "Notifying nearest partner ambulance…",
      type: "info",
    });

    const ambResult = await mockDispatchAmbulance();
    setState("AMBULANCE_ASSIGNED");
    setSession((prev) => ({ ...prev, ambulance: ambResult.ambulance }));
    addLog(ambResult.log);

    // STATE 8: En route
    setState("AMBULANCE_EN_ROUTE");
    const cleanup = mockStreamAmbulanceLocation(
      ambResult.ambulance,
      mockPatient.location,
      (updated: Ambulance, log: StatusLogEntry) => {
        setSession((prev) => ({ ...prev, ambulance: updated }));
        addLog(log);
      },
      async (log: StatusLogEntry) => {
        addLog(log);
        setState("SUMMARY_SYNC");

        const summaryResult = await mockSendSummaryReport();
        addLog(summaryResult.log);
        setSession((prev) => ({ ...prev, summaryDispatched: true }));
        setState("COMPLETED");
      },
    );
    cleanupRef.current = cleanup;
  }, [addLog, setState]);

  const cancelEmergency = useCallback(() => {
    if (cleanupRef.current) cleanupRef.current();
    if (summaryTimeoutRef.current) clearTimeout(summaryTimeoutRef.current);
    setSession((prev) => ({
      ...prev,
      status: "IDLE",
      statusLog: [],
      doctor: null,
      ambulance: null,
      videoConnected: false,
      summaryDispatched: false,
    }));
  }, []);

  const clearSummaryNotification = useCallback(() => {
    setSession((prev) => ({ ...prev, summaryDispatched: false }));
  }, []);

  const setVideoConnected = useCallback((connected: boolean) => {
    setSession((prev) => ({ ...prev, videoConnected: connected }));
  }, []);

  // automatically set summaryDispatched 30 seconds after videoConnected becomes true
  useEffect(() => {
    if (session.videoConnected) {
      summaryTimeoutRef.current = setTimeout(() => {
        addLog({
          id: "log-summary-ready",
          timestamp: new Date(),
          message: "Emergency summary dispatched to ambulance providers",
          type: "success",
        });
        setSession((prev) => ({ ...prev, summaryDispatched: true }));
      }, 30000);
    } else {
      if (summaryTimeoutRef.current) {
        clearTimeout(summaryTimeoutRef.current);
        summaryTimeoutRef.current = null;
      }
      // optionally clear flag when connection drops
      setSession((prev) => ({ ...prev, summaryDispatched: false }));
    }

    return () => {
      if (summaryTimeoutRef.current) {
        clearTimeout(summaryTimeoutRef.current);
      }
    };
  }, [session.videoConnected, addLog]);

  const markSummaryDispatched = useCallback(() => {
    setSession((prev) => ({ ...prev, summaryDispatched: true }));
  }, []);

  return (
    <EmergencyContext.Provider
      value={{
        session,
        startEmergency,
        cancelEmergency,
        clearSummaryNotification,
        setVideoConnected,
        markSummaryDispatched,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencySession = () => {
  const ctx = useContext(EmergencyContext);
  if (!ctx) {
    throw new Error("useEmergencySession must be used within EmergencyProvider");
  }
  return ctx;
};
