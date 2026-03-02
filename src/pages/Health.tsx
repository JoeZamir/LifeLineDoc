import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

import BMIModal from "@/components/BMIModal";
import HeartRateModal from "@/components/HeartRateModal";
import HealthTrendsCard from "@/components/HealthTrendsCard";
import RiskIndicatorCard from "@/components/RiskIndicatorCard";

const HealthDashboard = () => {
    const { role } = useAuth();
    const navigate = useNavigate();

    const [showBmi, setShowBmi] = useState(false);
    const [showHr, setShowHr] = useState(false);

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
                    Track your BMI, calories, and other wellness metrics.
                </p>

                {/* top cards */}
                <div className="flex gap-4 flex-wrap">
                    <div
                        onClick={() => setShowBmi(true)}
                        className="flex-1 min-w-[140px] bg-card rounded-2xl p-4 shadow hover:cursor-pointer hover:bg-card/90 transition-colors"
                    >
                        <h2 className="font-medium text-foreground">BMI Calculator</h2>
                    </div>
                    <div
                        onClick={() => setShowHr(true)}
                        className="flex-1 min-w-[140px] bg-card rounded-2xl p-4 shadow hover:cursor-pointer hover:bg-card/90 transition-colors"
                    >
                        <h2 className="font-medium text-foreground">Heart Rate Monitor</h2>
                    </div>
                </div>

                {/* trends and risk */}
                <div className="pt-6">
                    <HealthTrendsCard />
                </div>
                <RiskIndicatorCard />

            </div>

            {showBmi && <BMIModal onClose={() => setShowBmi(false)} />}
            {showHr && <HeartRateModal onClose={() => setShowHr(false)} />}
        </div>
    );
};

export default HealthDashboard;
