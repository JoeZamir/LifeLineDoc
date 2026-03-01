import { mockAmbulances } from "@/data/mockData";
import { Truck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AmbulancesList = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    if (!role) {
        navigate("/login");
        return null;
    }
    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="px-5 pt-6 pb-4">
                <h1 className="text-xl font-display font-bold text-foreground">Available Ambulances</h1>
            </header>

            <div className="px-5 space-y-4">
                {mockAmbulances.map((amb) => (
                    <div key={amb.id} className="medical-card flex items-center gap-3">
                        <Truck className="w-6 h-6 text-emergency" />
                        <div>
                            <p className="font-medium text-foreground">{amb.unitName}</p>
                            <p className="text-xs text-muted-foreground">{amb.provider} • {amb.vehicleReg}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{amb.location.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {mockAmbulances.length === 0 && (
                    <p className="text-sm text-muted-foreground">No ambulances registered yet.</p>
                )}
            </div>
        </div>
    );
};

export default AmbulancesList;
