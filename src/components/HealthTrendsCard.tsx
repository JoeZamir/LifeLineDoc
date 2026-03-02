import { useState } from "react";

const HealthTrendsCard = () => {
    const [tab, setTab] = useState<"weight" | "bmi">("weight");

    // mock data
    const weightData = [70, 72];
    const bmiData: number[] = []; // no data to trigger message

    const data = tab === "weight" ? weightData : bmiData;
    const hasEnough = data.length >= 2;

    const renderChart = () => {
        if (!hasEnough) return null;
        // simple line chart using svg
        const max = Math.max(...data);
        const min = Math.min(...data);
        const points = data.map((v, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((v - min) / (max - min)) * 100;
            return `${x},${y}`;
        });
        return (
            <svg className="w-full h-24" viewBox="0 0 100 100">
                <polyline
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    points={points.join(" ")}
                />
            </svg>
        );
    };

    return (
        <div className="bg-card rounded-2xl p-6 shadow">
            <div className="flex gap-4 mb-4">
                <button
                    className={`flex-1 py-2 rounded-lg ${tab === "weight" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
                    onClick={() => setTab("weight")}
                >
                    Weight
                </button>
                <button
                    className={`flex-1 py-2 rounded-lg ${tab === "bmi" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
                    onClick={() => setTab("bmi")}
                >
                    BMI
                </button>
            </div>
            {hasEnough ? (
                <div>{renderChart()}</div>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Record your health data to generate meaningful trends.
                </p>
            )}
        </div>
    );
};

export default HealthTrendsCard;
