import { Stethoscope, Truck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
    const navigate = useNavigate();

    const chooseRole = (role: "patient" | "doctor" | "ambulance") => {
        navigate("/signup", { state: { role } });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col px-6 pt-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                I want to sign up as a
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={() => chooseRole("patient")}
                    className="medical-card flex items-center gap-3 py-4 px-5"
                >
                    <User className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Patient</span>
                </button>
                <button
                    onClick={() => chooseRole("doctor")}
                    className="medical-card flex items-center gap-3 py-4 px-5"
                >
                    <Stethoscope className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Doctor</span>
                </button>
                <button
                    onClick={() => chooseRole("ambulance")}
                    className="medical-card flex items-center gap-3 py-4 px-5"
                >
                    <Truck className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Ambulance Provider</span>
                </button>
            </div>
        </div>
    );
};

export default RoleSelect;
