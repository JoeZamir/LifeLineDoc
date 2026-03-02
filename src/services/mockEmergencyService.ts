import { Doctor, Ambulance, Location, StatusLogEntry } from "@/types/emergency";
import { mockDoctors, mockAmbulances, nakuruLocations } from "@/data/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let logId = 0;
const createLog = (
  message: string,
  type: StatusLogEntry["type"] = "info",
): StatusLogEntry => ({
  id: `log-${++logId}`,
  timestamp: new Date(),
  message,
  type,
});

export const mockSendGPS = async (
  location: Location,
): Promise<{ success: boolean; log: StatusLogEntry }> => {
  await delay(5000);
  return {
    success: true,
    log: createLog(
      `GPS coordinates sent: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)} — ${location.label}`,
      "success",
    ),
  };
};

export const mockFindDoctor = async (): Promise<{
  doctor: Doctor;
  log: StatusLogEntry;
}> => {
  await delay(5000);
  const doctor = mockDoctors[Math.floor(Math.random() * mockDoctors.length)];
  return {
    doctor,
    log: createLog(
      `Doctor found: ${doctor.name} — ${doctor.hospital}`,
      "success",
    ),
  };
};

export const mockStartVideoCall = async (
  doctor: Doctor,
): Promise<{ connected: boolean; log: StatusLogEntry }> => {
  await delay(5000);
  return {
    connected: true,
    log: createLog(
      `Secure video call connected with ${doctor.name}`,
      "success",
    ),
  };
};

export const mockDispatchAmbulance = async (): Promise<{
  ambulance: Ambulance;
  log: StatusLogEntry;
}> => {
  await delay(5000);
  const ambulance = { ...mockAmbulances[0], eta: 20 }; // Start with 20 min ETA
  return {
    ambulance,
    log: createLog(
      `Ambulance dispatched: ${ambulance.unitName} — Driver: ${ambulance.driverName}`,
      "success",
    ),
  };
};

export const mockStreamAmbulanceLocation = (
  ambulance: Ambulance,
  destination: Location,
  onUpdate: (amb: Ambulance, log: StatusLogEntry) => void,
  onArrival: (log: StatusLogEntry) => void,
): (() => void) => {
  let eta = ambulance.eta; // 20 min
  let currentLat = ambulance.location.lat;
  let currentLng = ambulance.location.lng;

  const latStep = (destination.lat - currentLat) / eta;
  const lngStep = (destination.lng - currentLng) / eta;

  const locationLabels = nakuruLocations.map((l) => l.label);
  let labelIdx = 0;

  // Ambulance location updates every 2 minutes (120000ms)
  const intervalMs = 120000;

  const interval = setInterval(() => {
    eta -= 2; // Decrease by 2 minutes per update
    currentLat += latStep * 2;
    currentLng += lngStep * 2;
    labelIdx = (labelIdx + 1) % locationLabels.length;

    const updated: Ambulance = {
      ...ambulance,
      eta: Math.max(0, eta),
      location: {
        lat: currentLat,
        lng: currentLng,
        label: locationLabels[labelIdx],
        county: "Nakuru County",
      },
    };

    onUpdate(
      updated,
      createLog(
        `Ambulance passing ${locationLabels[labelIdx]} — ETA: ${Math.max(0, eta)} min`,
        "info",
      ),
    );

    if (eta <= 0) {
      clearInterval(interval);
      onArrival(
        createLog("Ambulance has arrived at patient location", "success"),
      );
    }
  }, intervalMs);

  return () => clearInterval(interval);
};

export const mockSendSummaryReport = async (): Promise<{
  success: boolean;
  log: StatusLogEntry;
}> => {
  await delay(1500);
  return {
    success: true,
    log: createLog("Emergency summary sent to dispatch center", "success"),
  };
};
