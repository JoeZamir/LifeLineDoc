import { Doctor, Ambulance, Patient, Location } from "@/types/emergency";

export const mockDoctors: Doctor[] = [
  {
    id: "doc-001",
    name: "Dr. Martha",
    licenseId: "KE-MED-28491",
    hospital: "Nakuru Provincial Hospital",
    specialty: "Emergency Medicine",
    rating: 4.9,
    avatar: "",
    phone: "+254 712 345 678",
  },
];

export const mockAmbulances: Ambulance[] = [
  {
    id: "amb-001",
    unitName: "Nakuru EMS 04",
    driverName: "Peter Kamau",
    vehicleReg: "KDG 421A",
    provider: "St. John Ambulance Kenya",
    eta: 12,
    location: { lat: -0.3031, lng: 36.0800, label: "Nakuru CBD", county: "Nakuru" },
  },
];

export const mockPatient: Patient = {
  id: "pat-001",
  name: "Pascal",
  phone: "+254 700 123 456",
  bloodType: "O+",
  allergies: ["Penicillin"],
  emergencyContacts: [
    { name: "Mama Pascal", phone: "+254 711 234 567", relation: "Mother" }
  ],
  county: "Nakuru",
  location: {
    lat: -0.3032,
    lng: 36.0800,
    label: "Section 58, Nakuru Town",
    county: "Nakuru County",
  },
};

export const nakuruLocations: Location[] = [
  { lat: -0.3032, lng: 36.0800, label: "Nakuru CBD", county: "Nakuru County" },
  { lat: -0.2950, lng: 36.0700, label: "Milimani Estate", county: "Nakuru County" },
  { lat: -0.3100, lng: 36.0850, label: "Lanet Barracks Area", county: "Nakuru County" },
  { lat: -0.2880, lng: 36.0650, label: "London Estate", county: "Nakuru County" },
  { lat: -0.3200, lng: 36.0950, label: "Menengai Area", county: "Nakuru County" },
];
