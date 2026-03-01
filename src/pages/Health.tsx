import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const HealthDashboard = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    if (!role) {
        navigate("/login");
        return null;
    }
    if (role !== "patient") {
        // only patients see health dashboard
        navigate("/dashboard");
        return null;
    }
    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="px-5 pt-6 pb-4 flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-emergency" />
                <h1 className="text-xl font-display font-bold text-foreground">Health & Wellness</h1>
            </header>

            <div className="px-5 space-y-4">
                <p className="text-sm text-muted-foreground">
                    Track your BMI, calories, and other wellness metrics. (Mock data can be added here later.)
                </p>
            </div>
        </div>
    );
};

export default HealthDashboard;
