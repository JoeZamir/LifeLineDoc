import { useState } from "react";
import { X } from "lucide-react";

interface BMIModalProps {
    onClose: () => void;
}

const BMIModal = ({ onClose }: BMIModalProps) => {
    const [height, setHeight] = useState<number | string>("");
    const [weight, setWeight] = useState<number | string>("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");

    const calculate = () => {
        if (!height || !weight) return;
        const h = Number(height) / 100;
        const val = Number(weight) / (h * h);
        const rounded = Math.round(val * 100) / 100;
        setBmi(rounded);
        if (rounded < 18.5) setCategory("Underweight");
        else if (rounded < 25) setCategory("Normal");
        else if (rounded < 30) setCategory("Overweight");
        else setCategory("Obese");
    };

    const colorClass = () => {
        if (category === "Normal") return "text-success";
        if (category === "Overweight") return "text-warning";
        if (category === "Obese") return "text-emergency";
        if (category === "Underweight") return "text-warning";
        return "text-foreground";
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="bmi-title"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 id="bmi-title" className="text-lg font-semibold text-foreground">BMI Calculator</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Close BMI modal"
                    >
                        <X className="w-4 h-4 text-foreground" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="bmi-height" className="block text-sm text-muted-foreground">Height (cm)</label>
                        <input
                            id="bmi-height"
                            type="number"
                            inputMode="numeric"
                            value={height}
                            onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none"
                            placeholder="e.g. 170"
                            title="Height in centimeters"
                        />
                    </div>

                    <div>
                        <label htmlFor="bmi-weight" className="block text-sm text-muted-foreground">Weight (kg)</label>
                        <input
                            id="bmi-weight"
                            type="number"
                            inputMode="numeric"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none"
                            placeholder="e.g. 70"
                            title="Weight in kilograms"
                        />
                    </div>

                    <button
                        onClick={calculate}
                        className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                        Calculate
                    </button>

                    {bmi !== null && (
                        <div className="pt-4 border-t border-border">
                            <p className={`text-xl font-semibold ${colorClass()}`}>{bmi.toFixed(2)}</p>
                            <p className={`text-sm font-medium ${colorClass()}`}>{category}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                BMI is a simple index of weight-for-height commonly used to classify underweight, overweight and obesity in adults.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BMIModal;
