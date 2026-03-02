const RiskIndicatorCard = () => {
    // static score for now
    const score = 3.2;
    const level = score < 4 ? "Low" : score < 7 ? "Moderate" : "High";
    const colorClass = () => {
        if (level === "Low") return "text-success";
        if (level === "Moderate") return "text-warning";
        return "text-emergency";
    };
    return (
        <div className="bg-card rounded-2xl p-6 shadow mt-6">
            <h3 className="text-lg font-semibold text-foreground">Risk Indicator Score</h3>
            <p className={`text-2xl font-bold ${colorClass()}`}>{score.toFixed(1)} / 10</p>
            <p className="text-sm font-medium">{level}</p>
            <p className="text-xs text-muted-foreground mt-2">
                Based on BMI and recorded vitals.
            </p>
        </div>
    );
};

export default RiskIndicatorCard;
