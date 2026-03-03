/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockPatient, mockDoctors, mockAmbulances } from "@/data/mockData";
import {
  MapPin,
  Bell,
  User,
  Phone,
  Droplets,
  AlertTriangle,
  Stethoscope,
  Truck,
  CheckCircle2,
  Video,
  Clock,
  Navigation,
  Cake,
  Power,
  Building2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEmergencySession } from "@/hooks/useEmergencySession";
import Profile from "@/components/profile";

// Dashboard homes for each role

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { setVideoConnected } = useEmergencySession();

  // guard
  if (!role) {
    navigate("/login");
    return null;
  }

  // patient home (existing content)
  const PatientHome = () => {
    const patient = mockPatient;
    const [showProfile, setShowProfile] = useState(false);

    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <h1 className="text-xl font-display font-bold text-foreground">{patient.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emergency border-2 border-background" />
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center"
                aria-label="Open profile"
              >
                <User className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{patient.location.label}, {patient.location.county}</span>
          </div>
        </header>

        {/* SOS */}
        <div className="px-5 py-6">
          <div className="relative flex flex-col items-center">
            <button
              onClick={() => navigate("/emergency")}
              className="sos-button w-36 h-36 flex flex-col items-center justify-center gap-1 text-destructive-foreground"
            >
              <span className="text-3xl font-display font-bold">SOS</span>
              <span className="text-xs opacity-80">Tap for help</span>
            </button>
            <p className="text-xs text-muted-foreground mt-4">Press to activate emergency protocol</p>
          </div>
        </div>

        {/* Medical Profile */}
        <div className="px-5 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Medical Profile</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="medical-card flex items-center gap-3">
              <Droplets className="w-5 h-5 text-emergency" />
              <div>
                <p className="text-xs text-muted-foreground">Blood Type</p>
                <p className="font-semibold text-foreground">{patient.bloodType}</p>
              </div>
            </div>
            <div className="medical-card flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Allergies</p>
                <p className="font-semibold text-foreground text-sm">{patient.allergies.join(", ")}</p>
              </div>
            </div>
            <div className="medical-card flex items-center gap-3">
              <Cake className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-semibold text-foreground">{patient.age} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="px-5 mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Emergency Contacts</h2>
          {patient.emergencyContacts.map((contact, idx) => (
            <div key={idx} className="medical-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.relation}</p>
                </div>
              </div>
              <Phone className="w-4 h-4 text-primary" />
            </div>
          ))}
        </div>


        {/* Floating location */}
        <div className="fixed bottom-20 right-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
          <MapPin className="w-5 h-5 text-primary-foreground" />
        </div>

        <Profile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          name={patient.name}
        />
      </div>
    );
  };

  // doctor home: header styled like patient but with doctor info
  const DoctorHome = () => {
    const doctor = mockDoctors[0];
    const location = "Nairobi";
    const [state, setState] = useState<"WAITING" | "INCOMING" | "ACCEPTED">("WAITING");
    const [onCall, setOnCall] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
      let t1: NodeJS.Timeout | null = null;
      if (onCall && state === "WAITING") {
        t1 = setTimeout(() => setState("INCOMING"), 3000);
      }
      return () => {
        if (t1) clearTimeout(t1);
      };
    }, [onCall, state]);

    useEffect(() => {
      setVideoConnected(false);
    }, [state, setVideoConnected]);


    return (
      <div className="min-h-screen bg-background pb-24">
        {/* header */}
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <h1 className="text-xl font-display font-bold text-foreground">{`Dr. ${doctor.name.split(" ")[1]}`}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emergency border-2 border-background" />
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center"
                aria-label="Open profile"
              >
                <User className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
        </header>

        {/* doctor home content */}
        <div className="px-5 space-y-4">
          {/* doctor card */}
          <div className="medical-card space-y-4 p-5">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                {doctor.name.replace("Dr. ", "").charAt(0)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-semibold text-foreground text-[28px] leading-[1.15]">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 min-w-0">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{doctor.hospital}</span>
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-success" />{doctor.licenseId}</span>
                  <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-warning fill-warning" />{doctor.rating.toFixed(1)}</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2.5 shrink-0 pt-0.5">
                <span className={onCall ? "status-badge-active text-success" : "status-badge bg-destructive/10 text-destructive"}>
                  <span className={`w-1.5 h-1.5 rounded-full ${onCall ? "bg-medical-green" : "bg-destructive"} animate-blink`} />
                  {onCall ? "Online" : "Offline"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground">{onCall ? "On Call" : "Off Call"}</span>
                  <button
                    onClick={() => {
                      setOnCall((currentValue) => {
                        if (currentValue) {
                          setState("WAITING");
                          setVideoConnected(false);
                        }
                        return !currentValue;
                      });
                    }}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="Toggle on call status"
                  >
                    <Power className={`w-5 h-5 ${onCall ? "text-success" : "text-destructive"}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success">
                <span className="w-2 h-2 rounded-full bg-success" />
                Verified
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {doctor.specialty}
              </span>
            </div>
          </div>

          {state === "WAITING" && (
            <div className="medical-card flex flex-col items-center py-8 space-y-3">
              <Stethoscope className="w-10 h-10 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                {onCall ? "Waiting for emergency alerts…" : "You are currently off call."}
              </p>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${onCall ? "bg-success animate-blink" : "bg-destructive"}`} />
                <span className="text-xs text-muted-foreground">{onCall ? "Available" : "Unavailable"}</span>
              </div>
            </div>
          )}

          {state === "INCOMING" && (
            <div className="medical-card border-emergency/30 bg-emergency/5 space-y-4 animate-slide-up">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-emergency animate-blink" />
                <span className="font-semibold text-emergency text-sm">INCOMING EMERGENCY</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Cake className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.age} years</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.location.label}, {mockPatient.location.county}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setState("ACCEPTED")}
                className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm"
              >
                Accept Emergency Call
              </button>
            </div>
          )}

          {state === "ACCEPTED" && (
            <>
              <div className="medical-card bg-success/5 flex items-center gap-3 animate-slide-up">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-foreground">Emergency call accepted</span>
              </div>

              <button
                onClick={() => navigate("/doctor/emergency-pov")}
                className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Start Video Call
              </button>
            </>
          )}
        </div>

        <Profile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          name={doctor.name}
        />
      </div>
    );
  };

  // ambulance home: show AmbulanceView content without back button
  const AmbulanceHome = () => {
    const amb = mockAmbulances[0];
    const [state, setState] = useState<"WAITING" | "ASSIGNED" | "ACCEPTED" | "EN_ROUTE" | "ARRIVED">("WAITING");
    const [eta, setEta] = useState(amb.eta);
    const [currentLocation, setCurrentLocation] = useState(amb.location.label);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const t = setTimeout(() => setState("ASSIGNED"), 2000);
      return () => clearTimeout(t);
    }, []);

    useEffect(() => {
      if (state !== "EN_ROUTE") return;
      let idx = 0;
      const interval = setInterval(() => {
        setEta((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setState("ARRIVED");
            return 0;
          }
          return prev - 1;
        });
        idx = (idx + 1) % mockAmbulances.length;
        setCurrentLocation(mockAmbulances[idx].location.label);
        setProgress((prev) => Math.min(100, prev + 100 / amb.eta));
      }, 2500);
      return () => clearInterval(interval);
    }, [state, amb.eta]);

    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="px-5 pt-6 pb-4 flex items-center gap-3">
          <div className="flex-1">
            <h1 className="font-display font-bold text-foreground">Ambulance Dashboard</h1>
            <p className="text-xs text-muted-foreground">{amb.unitName}</p>
          </div>
        </header>

        <div className="px-5 space-y-4">
          {/* Unit info */}
          <div className="medical-card flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emergency/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-emergency" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{amb.unitName}</h3>
              <p className="text-xs text-muted-foreground">{amb.provider} • {amb.vehicleReg}</p>
              <p className="text-xs text-muted-foreground">Driver: {amb.driverName}</p>
            </div>
          </div>

          {state === "WAITING" && (
            <div className="medical-card flex flex-col items-center py-8 space-y-3">
              <Truck className="w-10 h-10 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Standby — waiting for dispatch…</p>
            </div>
          )}

          {state === "ASSIGNED" && (
            <div className="medical-card border-emergency/30 bg-emergency/5 space-y-4 animate-slide-up">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emergency" />
                <span className="font-semibold text-emergency text-sm">NEW DISPATCH</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Cake className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.age} years</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{mockPatient.location.label}</span>
                </div>
              </div>
              <button
                onClick={() => { setState("ACCEPTED"); setTimeout(() => setState("EN_ROUTE"), 1500); }}
                className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm"
              >
                Accept Dispatch
              </button>
            </div>
          )}

          {state === "ACCEPTED" && (
            <div className="medical-card bg-success/5 flex items-center gap-3 animate-slide-up">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-foreground">Dispatch accepted — preparing route…</span>
            </div>
          )}

          {(state === "EN_ROUTE" || state === "ARRIVED") && (
            <>
              <div className="medical-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {state === "ARRIVED" ? "✅ Arrived" : "En Route"}
                  </span>
                  <div className="flex items-center gap-1 text-emergency font-bold">
                    <Clock className="w-4 h-4" />
                    <span>{eta} min</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  {/* eslint-disable-next-line react/style-prop-object */}
                  <div
                    className="h-full bg-success rounded-full transition-all duration-1000"
                    style={{ width: `${state === "ARRIVED" ? 100 : progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{state === "ARRIVED" ? mockPatient.location.label : currentLocation}</span>
                </div>
              </div>

              {state === "ARRIVED" && (
                <div className="medical-card bg-medical-green-light flex items-center gap-3 animate-slide-up">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Patient Reached</p>
                    <p className="text-xs text-muted-foreground">{mockPatient.location.label}, {mockPatient.location.county}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // render appropriate home
  if (role === "patient") return <PatientHome />;
  if (role === "doctor") return <DoctorHome />;
  if (role === "ambulance") return <AmbulanceHome />;
  return null;
};

export default Dashboard;
