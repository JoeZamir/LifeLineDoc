import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Stethoscope, Truck, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role } = useAuth();

    // hide navigation on non-auth pages
    const hidePaths = ["/", "/login", "/signup", "/select-role"]; // extend if needed
    if (hidePaths.includes(location.pathname)) return null;

    const isActive = (path: string) => location.pathname === path;

    // depending on role, show different buttons
    let buttons: JSX.Element[] = [];
    if (role === "patient") {
        buttons = [
            <button
                key="home"
                onClick={() => navigate("/dashboard")}
                className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </button>,
            <button
                key="doctors"
                onClick={() => navigate("/doctors")}
                className={`flex flex-col items-center gap-1 ${isActive("/doctors") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Stethoscope className="w-5 h-5" />
                <span className="text-[10px] font-medium">Doctors</span>
            </button>,
            <button
                key="ambulances"
                onClick={() => navigate("/ambulances")}
                className={`flex flex-col items-center gap-1 ${isActive("/ambulances") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Truck className="w-5 h-5" />
                <span className="text-[10px] font-medium">Ambulances</span>
            </button>,
            <button
                key="health"
                onClick={() => navigate("/health")}
                className={`flex flex-col items-center gap-1 ${isActive("/health") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Activity className="w-5 h-5" />
                <span className="text-[10px] font-medium">Health</span>
            </button>,
        ];
    } else if (role === "doctor") {
        buttons = [
            <button
                key="home"
                onClick={() => navigate("/dashboard")}
                className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </button>,
            <button
                key="ambulances"
                onClick={() => navigate("/ambulances")}
                className={`flex flex-col items-center gap-1 ${isActive("/ambulances") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Truck className="w-5 h-5" />
                <span className="text-[10px] font-medium">Ambulances</span>
            </button>,
        ];
    } else if (role === "ambulance") {
        buttons = [
            <button
                key="home"
                onClick={() => navigate("/dashboard")}
                className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </button>,
            <button
                key="doctors"
                onClick={() => navigate("/doctors")}
                className={`flex flex-col items-center gap-1 ${isActive("/doctors") ? "text-primary" : "text-muted-foreground"}`}
            >
                <Stethoscope className="w-5 h-5" />
                <span className="text-[10px] font-medium">Doctors</span>
            </button>,
        ];
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-around items-center max-w-lg mx-auto">
            {buttons}
        </nav>
    );
};

export default BottomNav;
