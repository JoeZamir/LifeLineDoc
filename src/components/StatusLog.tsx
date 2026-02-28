import { StatusLogEntry } from "@/types/emergency";
import { Activity, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface StatusLogProps {
  entries: StatusLogEntry[];
}

const iconMap = {
  info: Activity,
  success: CheckCircle2,
  warning: AlertTriangle,
  critical: AlertCircle,
};

const colorMap = {
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  critical: "text-emergency",
};

const bgMap = {
  info: "bg-primary/5",
  success: "bg-success/10",
  warning: "bg-warning/10",
  critical: "bg-emergency/10",
};

const StatusLog = ({ entries }: StatusLogProps) => {
  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => {
        const Icon = iconMap[entry.type];
        return (
          <div
            key={entry.id + idx}
            className={`flex items-start gap-3 p-3 rounded-xl ${bgMap[entry.type]} animate-slide-up`}
          >
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${colorMap[entry.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">{entry.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {entry.timestamp.toLocaleTimeString("en-KE")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusLog;
