import { Stethoscope, Truck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
    const navigate = useNavigate();

    const chooseRole = (role: "patient" | "doctor" | "ambulance") => {
        navigate("/signup", { state: { role } });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col px-6 pt-12">
            <div className="flex items-center gap-2 mb-10">
                <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center">
                    <img
                        src="/assets/logo-64.png"
                        alt="LifelineDoc Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-lg font-display font-bold text-primary">Lifeline<span className="text-destructive">Doc</span></h1>
            </div>

            <div className="space-y-2 mb-8">
                <h2 className="text-2xl font-display font-bold text-foreground">Welcome</h2>
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-6">
                I want to sign up as a
            </h3>
            <div className="w-[60vw] max-w-md mx-auto p-6 flex flex-col items-center gap-4">
                <button
                    onClick={() => chooseRole("patient")}
                    className="medical-card w-full flex items-center justify-self-start gap-3 py-4 px-5"
                >
                    <User className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Patient</span>
                </button>
                <button
                    onClick={() => chooseRole("doctor")}
                    className="medical-card w-full flex items-center justify-self-start gap-3 py-4 px-5"
                >
                    <Stethoscope className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Doctor</span>
                </button>
                <button
                    onClick={() => chooseRole("ambulance")}
                    className="medical-card w-full flex items-center justify-self-start gap-3 py-4 px-5"
                >
                    <Truck className="w-6 h-6 text-primary" />
                    <span className="font-medium text-foreground">Ambulance Provider</span>
                </button>
            </div>
        </div>
    );
};

export default RoleSelect;
