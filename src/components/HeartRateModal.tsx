import { useState } from "react";
import { X } from "lucide-react";

interface HeartRateModalProps {
    onClose: () => void;
}

const HeartRateModal = ({ onClose }: HeartRateModalProps) => {
    const [loading, setLoading] = useState(false);
    const [rate, setRate] = useState<number | null>(null);
    const [classification, setClassification] = useState("");

    const start = () => {
        setLoading(true);
        setRate(null);
        setClassification("");
        setTimeout(() => {
            const rand = Math.floor(Math.random() * 80) + 40; // 40-119
            setRate(rand);
            if (rand < 60) setClassification("Low");
            else if (rand <= 100) setClassification("Normal");
            else setClassification("Elevated");
            setLoading(false);
        }, 3000);
    };

    const colorClass = () => {
        if (classification === "Normal") return "text-success";
        if (classification === "Elevated") return "text-warning";
        if (classification === "Low") return "text-emergency"; // maybe red
        return "text-foreground";
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between w-full mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Heart Rate Monitor</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Close heart rate modal"
                    >
                        <X className="w-4 h-4 text-foreground" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    {rate !== null && !loading && (
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-emergency/20 animate-ping" />
                            </div>
                            <p className={`text-4xl font-bold ${colorClass()}`}>{rate} bpm</p>
                        </div>
                    )}
                    {loading && <p className="text-sm text-muted-foreground">Measuring...</p>}
                    {!loading && rate === null && (
                        <p className="text-sm text-muted-foreground">Press start to measure your heart rate.</p>
                    )}
                    <button
                        onClick={start}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        disabled={loading}
                    >
                        Start Measurement
                    </button>
                    {rate !== null && classification && (
                        <p className={`text-sm font-medium ${colorClass()}`}>{classification}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeartRateModal;
