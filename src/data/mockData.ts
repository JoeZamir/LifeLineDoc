import { Doctor, Ambulance, Patient, Location } from "@/types/emergency";

export const mockDoctors: Doctor[] = [
  {
    id: "doc-001",
    name: "Dr. Martha Wanjiku",
    licenseId: "KE-MED-28491",
    hospital: "Nairobi Hospital",
    specialty: "Emergency Medicine",
    rating: 4.9,
    avatar: "",
    phone: "+254 712 345 678",
  },
  {
    id: "doc-002",
    name: "Dr. James Ochieng",
    licenseId: "KE-MED-31052",
    hospital: "Aga Khan University Hospital",
    specialty: "Critical Care",
    rating: 4.8,
    avatar: "",
    phone: "+254 723 456 789",
  },
  {
    id: "doc-003",
    name: "Dr. Amina Hassan",
    licenseId: "KE-MED-27836",
    hospital: "Kenyatta National Hospital",
    specialty: "Trauma Surgery",
    rating: 4.7,
    avatar: "",
    phone: "+254 734 567 890",
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
  {
    id: "amb-002",
    unitName: "Lanet Rapid 07",
    driverName: "Samuel Mwangi",
    vehicleReg: "KCZ 882B",
    provider: "Nairobi EMS Unit",
    eta: 8,
    location: { lat: -1.2864, lng: 36.8172, label: "Westlands", county: "Nairobi" },
  },
  {
    id: "amb-003",
    unitName: "Nakuru Rapid 02",
    driverName: "Grace Akinyi",
    vehicleReg: "KDF 115C",
    provider: "Nakuru Rapid Response",
    eta: 15,
    location: { lat: -0.2900, lng: 36.0650, label: "Milimani", county: "Nakuru" },
  },
];

export const mockPatient: Patient = {
  id: "pat-001",
  name: "Pascal",
  phone: "+254 700 123 456",
  bloodType: "O+",
  allergies: ["Penicillin"],
  emergencyContacts: [
    { name: "Millicent Atieno", phone: "+254 711 234 567", relation: "Mother" }
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
