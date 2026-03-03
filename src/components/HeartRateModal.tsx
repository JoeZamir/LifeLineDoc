import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Heart, X } from "lucide-react";
import { mockPatient } from "@/data/mockData";

interface HeartRateModalProps {
    onClose: () => void;
}

type MeasureState = "idle" | "measuring" | "completed";

const MEASUREMENT_DURATION = 60;

const HeartRateModal = ({ onClose }: HeartRateModalProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [measureState, setMeasureState] = useState<MeasureState>("idle");
    const [secondsLeft, setSecondsLeft] = useState(MEASUREMENT_DURATION);
    const [currentBpm, setCurrentBpm] = useState<number | null>(null);
    const [finalBpm, setFinalBpm] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([74, 76, 75, 77, 76, 78, 74, 75]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    }, []);

    useEffect(() => {
        if (measureState !== "measuring") return;

        const timer = window.setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    window.clearInterval(timer);
                    setMeasureState("completed");
                    setCurrentBpm(null);
                    setFinalBpm((existing) => {
                        if (existing !== null) return existing;
                        const avg = Math.round(history.reduce((sum, val) => sum + val, 0) / history.length);
                        return avg;
                    });
                    return 0;
                }

                const nextBpm = Math.floor(68 + Math.random() * 20);
                setCurrentBpm(nextBpm);
                setHistory((prevHistory) => {
                    const nextHistory = [...prevHistory.slice(-11), nextBpm];
                    if (prev - 1 === 0) {
                        const avg = Math.round(nextHistory.reduce((sum, value) => sum + value, 0) / nextHistory.length);
                        setFinalBpm(avg);
                    }
                    return nextHistory;
                });
                return prev - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [measureState, history]);

    const startMeasurement = () => {
        setMeasureState("measuring");
        setSecondsLeft(MEASUREMENT_DURATION);
        setFinalBpm(null);
        const baseline = Math.floor(72 + Math.random() * 8);
        setCurrentBpm(baseline);
        setHistory([baseline - 1, baseline, baseline + 1, baseline, baseline + 2, baseline - 1, baseline, baseline + 1]);
    };

    const progress = ((MEASUREMENT_DURATION - secondsLeft) / MEASUREMENT_DURATION) * 100;
    const circumference = 2 * Math.PI * 112;
    const dashOffset = circumference - (progress / 100) * circumference;

    const getHeartRateComment = (bpm: number) => {
        if (bpm < 60) return "Your pulse is slightly lower than expected. Consider resting and retaking the measurement.";
        if (bpm <= 100) return "Normal resting heart rate for a teen. Keep up your healthy routine.";
        return "Your pulse looks a little elevated. Try relaxing for a few minutes and check again.";
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-card rounded-3xl p-6 max-w-md w-full shadow-2xl border border-border animate-slide-up"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="heart-rate-title"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 id="heart-rate-title" className="text-lg font-semibold text-foreground">Heart Rate Monitor</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsCollapsed((prev) => !prev)}
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            aria-label={isCollapsed ? "Expand heart rate modal" : "Collapse heart rate modal"}
                        >
                            {isCollapsed ? <ChevronDown className="w-4 h-4 text-foreground" /> : <ChevronUp className="w-4 h-4 text-foreground" />}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            aria-label="Close heart rate modal"
                        >
                            <X className="w-4 h-4 text-foreground" />
                        </button>
                    </div>
                </div>

                {isCollapsed ? (
                    <p className="text-sm text-muted-foreground">Measurement panel collapsed. Tap the arrow to continue.</p>
                ) : (
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-muted-foreground">{greeting},</p>
                            <h3 className="text-xl font-display font-bold text-foreground">{mockPatient.name}</h3>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={startMeasurement}
                                disabled={measureState === "measuring"}
                                className="relative w-[250px] h-[250px] flex items-center justify-center rounded-full focus:outline-none disabled:cursor-not-allowed"
                                aria-label="Tap heart to start pulse measurement"
                            >
                                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 250 250">
                                    <circle
                                        cx="125"
                                        cy="125"
                                        r="112"
                                        stroke="hsl(var(--secondary))"
                                        strokeWidth="10"
                                        fill="none"
                                    />
                                    <circle
                                        cx="125"
                                        cy="125"
                                        r="112"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                        fill="none"
                                        className="transition-all duration-1000"
                                    />
                                </svg>

                                <div
                                    className="relative w-44 h-44 rounded-full flex items-center justify-center"
                                    style={{
                                        background: "radial-gradient(circle, hsl(var(--destructive) / 0.2), transparent 70%)",
                                    }}
                                >
                                    <Heart
                                        className={`w-24 h-24 fill-emergency text-emergency drop-shadow-[0_8px_20px_hsl(var(--emergency)/0.45)] ${measureState === "measuring" ? "animate-pulse" : ""}`}
                                    />
                                    <div className="absolute inset-x-9 bottom-14 flex items-end gap-1.5">
                                        {history.slice(-8).map((value, index) => (
                                            <span
                                                key={`${value}-${index}`}
                                                className="flex-1 rounded-full bg-card/90"
                                                style={{
                                                    height: `${Math.max(6, (value - 60) * 1.2)}px`,
                                                    opacity: 0.35 + index * 0.07,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="text-center space-y-1">
                            {measureState === "measuring" ? (
                                <>
                                    <p className="text-sm font-medium text-foreground">Measuring your pulse, please hold on...</p>
                                    <p className="text-xs text-primary">{secondsLeft}s remaining {currentBpm ? `• ${currentBpm} bpm` : ""}</p>
                                </>
                            ) : (
                                <p className="text-base font-medium text-primary">Tap to measure</p>
                            )}
                        </div>

                        {measureState === "completed" && finalBpm !== null && (
                            <div className="medical-card border-primary/20 bg-primary/5 space-y-1.5">
                                <p className="text-sm text-muted-foreground">Measured heart rate</p>
                                <p className="text-3xl font-bold text-foreground">{finalBpm} <span className="text-base font-medium text-muted-foreground">bpm</span></p>
                                <p className="text-xs text-muted-foreground">{getHeartRateComment(finalBpm)}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeartRateModal;
