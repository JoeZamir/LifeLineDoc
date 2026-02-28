import { Doctor, Ambulance, Location, StatusLogEntry } from "@/types/emergency";
import { mockDoctors, mockAmbulances, nakuruLocations } from "@/data/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let logId = 0;
const createLog = (message: string, type: StatusLogEntry["type"] = "info"): StatusLogEntry => ({
  id: `log-${++logId}`,
  timestamp: new Date(),
  message,
  type,
});

export const mockSendGPS = async (location: Location): Promise<{ success: boolean; log: StatusLogEntry }> => {
  await delay(2000);
  return {
    success: true,
    log: createLog(`GPS coordinates sent: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)} — ${location.label}`, "success"),
  };
};

export const mockFindDoctor = async (): Promise<{ doctor: Doctor; log: StatusLogEntry }> => {
  await delay(3000);
  const doctor = mockDoctors[Math.floor(Math.random() * mockDoctors.length)];
  return {
    doctor,
    log: createLog(`Doctor found: ${doctor.name} — ${doctor.hospital}`, "success"),
  };
};

export const mockStartVideoCall = async (doctor: Doctor): Promise<{ connected: boolean; log: StatusLogEntry }> => {
  await delay(2000);
  return {
    connected: true,
    log: createLog(`Secure video call connected with ${doctor.name}`, "success"),
  };
};

export const mockDispatchAmbulance = async (): Promise<{ ambulance: Ambulance; log: StatusLogEntry }> => {
  await delay(2000);
  const ambulance = { ...mockAmbulances[0] };
  return {
    ambulance,
    log: createLog(`Ambulance dispatched: ${ambulance.unitName} — Driver: ${ambulance.driverName}`, "success"),
  };
};

export const mockStreamAmbulanceLocation = (
  ambulance: Ambulance,
  destination: Location,
  onUpdate: (amb: Ambulance, log: StatusLogEntry) => void,
  onArrival: (log: StatusLogEntry) => void
): (() => void) => {
  let eta = ambulance.eta;
  let currentLat = ambulance.location.lat;
  let currentLng = ambulance.location.lng;

  const latStep = (destination.lat - currentLat) / eta;
  const lngStep = (destination.lng - currentLng) / eta;

  const locationLabels = nakuruLocations.map((l) => l.label);
  let labelIdx = 0;

  const interval = setInterval(() => {
    eta -= 1;
    currentLat += latStep;
    currentLng += lngStep;
    labelIdx = (labelIdx + 1) % locationLabels.length;

    const updated: Ambulance = {
      ...ambulance,
      eta,
      location: {
        lat: currentLat,
        lng: currentLng,
        label: locationLabels[labelIdx],
        county: "Nakuru County",
      },
    };

    onUpdate(updated, createLog(`Ambulance passing ${locationLabels[labelIdx]} — ETA: ${eta} min`, "info"));

    if (eta <= 0) {
      clearInterval(interval);
      onArrival(createLog("Ambulance has arrived at patient location", "success"));
    }
  }, 3000);

  return () => clearInterval(interval);
};

export const mockSendSummaryReport = async (): Promise<{ success: boolean; log: StatusLogEntry }> => {
  await delay(1500);
  return {
    success: true,
    log: createLog("Emergency summary sent to dispatch center", "success"),
  };
};
