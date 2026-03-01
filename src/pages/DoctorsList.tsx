import { mockDoctors } from "@/data/mockData";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const DoctorsList = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    if (!role) {
        navigate("/login");
        return null;
    }
    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="px-5 pt-6 pb-4">
                <h1 className="text-xl font-display font-bold text-foreground">Available Doctors</h1>
            </header>

            <div className="px-5 space-y-4">
                {mockDoctors.map((doc) => (
                    <div key={doc.id} className="medical-card flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.specialty} • {doc.hospital}</p>
                        </div>
                    </div>
                ))}
                {mockDoctors.length === 0 && (
                    <p className="text-sm text-muted-foreground">No doctors registered yet.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorsList;
