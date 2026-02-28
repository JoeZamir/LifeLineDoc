import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Stethoscope, Truck } from "lucide-react";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // hide navigation on non-auth pages
    const hidePaths = ["/", "/login", "/signup"]; // extend if needed
    if (hidePaths.includes(location.pathname)) return null;

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-around items-center max-w-lg mx-auto">
            <button
                onClick={() => navigate("/dashboard")}
                className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                    }`}
            >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </button>
            <button
                onClick={() => navigate("/doctor")}
                className={`flex flex-col items-center gap-1 ${isActive("/doctor") ? "text-primary" : "text-muted-foreground"
                    }`}
            >
                <Stethoscope className="w-5 h-5" />
                <span className="text-[10px] font-medium">Doctor</span>
            </button>
            <button
                onClick={() => navigate("/ambulance")}
                className={`flex flex-col items-center gap-1 ${isActive("/ambulance") ? "text-primary" : "text-muted-foreground"
                    }`}
            >
                <Truck className="w-5 h-5" />
                <span className="text-[10px] font-medium">Ambulance</span>
            </button>
        </nav>
    );
};

export default BottomNav;
