export interface Location {
  lat: number;
  lng: number;
  label: string;
  county: string;
}

export interface Doctor {
  id: string;
  name: string;
  licenseId: string;
  hospital: string;
  specialty: string;
  rating: number;
  avatar: string;
  phone: string;
}

export interface Ambulance {
  id: string;
  unitName: string;
  driverName: string;
  vehicleReg: string;
  provider: string;
  eta: number; // minutes
  location: Location;
}

export interface StatusLogEntry {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "critical";
}

export interface EmergencySession {
  id: string;
  patientName: string;
  patientPhone: string;
  location: Location;
  doctor: Doctor | null;
  ambulance: Ambulance | null;
  status: EmergencyState;
  statusLog: StatusLogEntry[];
  startedAt: Date;
  videoConnected: boolean;
  summaryDispatched: boolean;
}

export type EmergencyState =
  | "IDLE"
  | "INITIATED"
  | "SEARCHING_DOCTOR"
  | "DOCTOR_FOUND"
  | "CONNECTING_VIDEO"
  | "VIDEO_CONNECTED"
  | "DISPATCHING_AMBULANCE"
  | "AMBULANCE_ASSIGNED"
  | "AMBULANCE_EN_ROUTE"
  | "SUMMARY_SYNC"
  | "COMPLETED";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  emergencyContacts: { name: string; phone: string; relation: string }[];
  county: string;
  location: Location;
}
