import { useNavigate } from "react-router-dom";
import { mockPatient } from "@/data/mockData";
import {
  MapPin,
  Bell,
  User,
  Phone,
  Heart,
  Droplets,
  AlertTriangle,
  Stethoscope,
  Truck,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const patient = mockPatient;

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
            <button className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
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
        <div className="grid grid-cols-2 gap-3">
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

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-around items-center max-w-lg mx-auto">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => navigate("/doctor")} className="flex flex-col items-center gap-1 text-muted-foreground">
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] font-medium">Doctor</span>
        </button>
        <button onClick={() => navigate("/ambulance")} className="flex flex-col items-center gap-1 text-muted-foreground">
          <Truck className="w-5 h-5" />
          <span className="text-[10px] font-medium">Ambulance</span>
        </button>
      </nav>

      {/* Floating location */}
      <div className="fixed bottom-20 right-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
        <MapPin className="w-5 h-5 text-primary-foreground" />
      </div>
    </div>
  );
};

export default Dashboard;
