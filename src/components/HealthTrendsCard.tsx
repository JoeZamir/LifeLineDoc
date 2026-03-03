import { useMemo, useState } from "react";
import { Scale, Activity } from "lucide-react";

type TrendTab = "weight" | "bmi";

interface TrendEntry {
  label: string;
  weight: number;
  bmi: number;
}

const trendData: TrendEntry[] = [
  { label: "Jan", weight: 78.4, bmi: 27.5 },
  { label: "Feb", weight: 77.8, bmi: 27.2 },
  { label: "Mar", weight: 77.3, bmi: 27.0 },
  { label: "Apr", weight: 76.9, bmi: 26.7 },
  { label: "May", weight: 76.2, bmi: 26.4 },
  { label: "Jun", weight: 75.8, bmi: 26.1 },
];

const HealthTrendsCard = () => {
  const [tab, setTab] = useState<TrendTab>("weight");

  const chart = useMemo(() => {
    const values = trendData.map((entry) => entry[tab]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);

    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 92 - ((value - min) / range) * 74;
      return { x, y, value: value.toFixed(1), label: trendData[index].label };
    });

    const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
    const currentValue = values.at(-1) ?? values[0];
    const previousValue = values.at(-2) ?? values[0];
    const delta = currentValue - previousValue;

    return {
      min,
      max,
      points,
      polylinePoints,
      currentValue,
      delta,
      labels: trendData.map((entry) => entry.label),
    };
  }, [tab]);

  const tabMeta = {
    weight: {
      title: "Weight trend",
      subtitle: "Last 6 months",
      unit: "kg",
      Icon: Scale,
      stroke: "#3b82f6",
      fill: "url(#trendFillWeight)",
    },
    bmi: {
      title: "BMI trend",
      subtitle: "Last 6 months",
      unit: "BMI",
      Icon: Activity,
      stroke: "#8b5cf6",
      fill: "url(#trendFillBmi)",
    },
  } satisfies Record<TrendTab, { title: string; subtitle: string; unit: string; Icon: typeof Scale; stroke: string; fill: string }>;

  const activeTab = tabMeta[tab];
  const trendPositive = chart.delta <= 0;

  return (
    <div className="bg-card rounded-2xl p-5 shadow border border-border/50">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Trends</h3>
          <p className="text-xs text-muted-foreground">Mock overview from recorded health readings</p>
        </div>
        <div className="bg-secondary/70 rounded-xl p-2">
          <activeTab.Icon className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 bg-secondary/60 rounded-xl p-1 mb-4">
        {(["weight", "bmi"] as const).map((value) => (
          <button
            key={value}
            className={`rounded-lg py-2 text-sm font-medium transition-all ${
              tab === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setTab(value)}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-b from-background to-secondary/40 p-4 border border-border/50">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">{activeTab.title}</p>
            <p className="text-xs text-muted-foreground">{activeTab.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-lg leading-none font-bold text-foreground">
              {chart.currentValue.toFixed(1)} <span className="text-sm font-medium text-muted-foreground">{activeTab.unit}</span>
            </p>
            <p className={`text-xs font-medium ${trendPositive ? "text-emerald-600" : "text-amber-600"}`}>
              {trendPositive ? "↓" : "↑"} {Math.abs(chart.delta).toFixed(1)} vs last month
            </p>
          </div>
        </div>

        <svg className="w-full h-40" viewBox="0 0 100 100" role="img" aria-label={`${activeTab.title} line chart`}>
          <defs>
            <linearGradient id="trendFillWeight" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="trendFillBmi" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {[25, 50, 75].map((line) => (
            <line key={line} x1="0" y1={line} x2="100" y2={line} stroke="currentColor" className="text-border/70" strokeDasharray="2 2" />
          ))}

          <path d={`M 0 92 L ${chart.polylinePoints} L 100 92 Z`} fill={activeTab.fill} />
          <polyline fill="none" stroke={activeTab.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chart.polylinePoints} />

          {chart.points.map((point) => (
            <g key={`${point.label}-${point.x}`}>
              <circle cx={point.x} cy={point.y} r="1.5" fill={activeTab.stroke} />
            </g>
          ))}
        </svg>

        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          {chart.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTrendsCard;
