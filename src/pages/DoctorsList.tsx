import { mockDoctors } from "@/data/mockData";
import DoctorCard from "@/components/DoctorCard";
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
                    <DoctorCard key={doc.id} doctor={doc} />
                ))}
                {mockDoctors.length === 0 && (
                    <p className="text-sm text-muted-foreground">No doctors registered yet.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorsList;
