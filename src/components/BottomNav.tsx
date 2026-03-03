import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Heart, Stethoscope, Truck, Activity, FileCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEmergencySession } from "@/hooks/useEmergencySession.tsx";
import SummaryModal from "@/components/SummaryModal";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role } = useAuth();
    const { session, clearSummaryNotification } = useEmergencySession();
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const ambulancesRef = useRef<HTMLDivElement | null>(null);
    const [iconPos, setIconPos] = useState<{ left: number; bottom: number }>({ left: 0, bottom: 0 });
    const [showDispatchIcon, setShowDispatchIcon] = useState(false);

    // manage timer for dispatch icon based on video connection state
    useEffect(() => {
        let tid: NodeJS.Timeout | null = null;
        if (session.videoConnected) {
            // start 30s delay to show indicator
            tid = setTimeout(() => {
                setShowDispatchIcon(true);
            }, 40000);
        } else {
            setShowDispatchIcon(false);
        }
        return () => {
            if (tid) clearTimeout(tid);
        };
    }, [session.videoConnected]);

    // hide navigation on non-auth pages (do not return early until after hooks are declared)
    const hidePaths = ["/", "/login", "/signup", "/select-role"]; // extend if needed
    const hideNav = hidePaths.includes(location.pathname);

    const isActive = (path: string) => location.pathname === path;

    // helper for ambulances button with summary badge
    const renderAmbulancesBtn = () => {
        return (
            <div key="ambulances" className="relative" ref={ambulancesRef}>
                <button
                    onClick={() => {
                        navigate("/ambulances");
                    }}
                    className={`flex flex-col items-center gap-1 ${isActive("/ambulances") ? "text-primary" : "text-muted-foreground"}`}
                >
                    <Truck className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Ambulances</span>
                </button>
            </div>
        );
    };

    // compute overlay icon position when nav is rendered or summary state changes
    useEffect(() => {
        if (!ambulancesRef.current) return;
        const rect = ambulancesRef.current.getBoundingClientRect();
        const size = 40; // 10 based on w-10 h-10
        setIconPos({
            left: rect.left + rect.width / 2 - size / 2,
            bottom: window.innerHeight - rect.top + 8, // a little above nav
        });
    }, [showDispatchIcon, location.pathname]);

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
            renderAmbulancesBtn(),
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
            renderAmbulancesBtn(),
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

    if (hideNav) return null;

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-around items-center max-w-lg mx-auto">
                {buttons}
            </nav>

            {showDispatchIcon && (
                <button
                    onClick={() => setShowSummaryModal(true)}
                    style={{ left: iconPos.left, bottom: iconPos.bottom }}
                    className="fixed w-10 h-10 bg-success rounded-full flex items-center justify-center z-50 shadow-lg"
                >
                    <FileCheck className="w-5 h-5 text-foreground" />
                </button>
            )}

            {showSummaryModal && (
                <SummaryModal
                    onClose={() => {
                        setShowSummaryModal(false);
                        clearSummaryNotification();
                        setShowDispatchIcon(false);
                    }}
                />
            )}
        </>
    );
};

export default BottomNav;
