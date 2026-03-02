import { X, FileCheck } from "lucide-react";

interface SummaryModalProps {
    onClose: () => void;
}

const SummaryModal = ({ onClose }: SummaryModalProps) => {
    const summaryItems = [
        "Collapsed, unresponsive",
        "CPR initiated",
        "Dyslipidemia",
        "Dispatch",
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-success" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Emergency Summary</h2>
                            <p className="text-xs text-muted-foreground">Sent to ambulance providers</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-foreground" />
                    </button>
                </div>

                <div className="space-y-3">
                    {summaryItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                                {idx + 1}
                            </div>
                            <p className="text-sm text-foreground">{item}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                    Acknowledge
                </button>
            </div>
        </div>
    );
};

export default SummaryModal;
