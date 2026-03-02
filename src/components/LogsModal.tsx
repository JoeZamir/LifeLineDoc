import { StatusLogEntry } from "@/types/emergency";
import { X } from "lucide-react";

interface LogsModalProps {
    logs: StatusLogEntry[];
    onClose: () => void;
}

const LogsModal = ({ logs, onClose }: LogsModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <h2 className="text-lg font-semibold text-foreground">Emergency Session Logs</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Close logs modal"
                    >
                        <X className="w-4 h-4 text-foreground" />
                    </button>
                </div>

                {/* Logs List - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="space-y-3">
                        {logs.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">No logs available</p>
                        ) : (
                            logs.map((entry) => {
                                const bgColors = {
                                    info: "bg-primary/5",
                                    success: "bg-success/10",
                                    warning: "bg-warning/10",
                                    critical: "bg-emergency/10",
                                };
                                const textColors = {
                                    info: "text-primary",
                                    success: "text-success",
                                    warning: "text-warning",
                                    critical: "text-emergency",
                                };
                                const borderColors = {
                                    info: "border-primary/20",
                                    success: "border-success/20",
                                    warning: "border-warning/20",
                                    critical: "border-emergency/20",
                                };

                                return (
                                    <div
                                        key={entry.id}
                                        className={`p-3 rounded-lg ${bgColors[entry.type]} border border-${entry.type === "success" ? "success" : entry.type === "critical" ? "emergency" : entry.type === "warning" ? "warning" : "primary"}/20 flex items-start gap-3`}
                                    >
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${textColors[entry.type]}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-foreground">{entry.message}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {entry.timestamp.toLocaleTimeString("en-KE")}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogsModal;
