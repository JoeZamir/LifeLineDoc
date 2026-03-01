import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface CreditLine {
    id: number;
    line: string;
}

interface ScrollingCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
    lines: CreditLine[];
    title?: string;
}

const ScrollingCreditsModal = ({
    isOpen,
    onClose,
    lines,
    title = "Credits",
}: ScrollingCreditsModalProps) => {
    const [displayedLines, setDisplayedLines] = useState<CreditLine[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentIndexRef = useRef(0);
    const completionRef = useRef<NodeJS.Timeout | null>(null);

    // helper to schedule next line if not paused
    const scheduleNext = useCallback(() => {
        if (isPaused) return;
        if (currentIndexRef.current < lines.length) {
            intervalRef.current = setTimeout(() => {
                // push next line and schedule again
                setDisplayedLines((prev) => [
                    ...prev,
                    lines[currentIndexRef.current],
                ]);
                currentIndexRef.current += 1;

                // if we've reached the end, start completion timer
                if (currentIndexRef.current >= lines.length) {
                    // clear any previous completion timer
                    if (completionRef.current) {
                        clearTimeout(completionRef.current);
                        completionRef.current = null;
                    }
                    if (!isPaused) {
                        completionRef.current = setTimeout(() => {
                            onClose();
                        }, 10000);
                    }
                    // no further scheduling of lines
                    intervalRef.current = null;
                    return;
                }

                scheduleNext();
            }, 4000);
        }
    }, [isPaused, lines, onClose]);

    // Reset and start the scrolling effect
    useEffect(() => {
        // clear any previous timer
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
            intervalRef.current = null;
        }

        if (!isOpen) {
            setDisplayedLines([]);
            currentIndexRef.current = 0;
            return;
        }

        setDisplayedLines([]);
        currentIndexRef.current = 0;

        if (lines.length > 0) {
            // display first line immediately
            setDisplayedLines([lines[0]]);
            currentIndexRef.current = 1;
            scheduleNext();
        }

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
                intervalRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, lines]);

    // Handle pause/resume
    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
                intervalRef.current = null;
            }
            if (completionRef.current) {
                clearTimeout(completionRef.current);
                completionRef.current = null;
            }
        } else {
            // resumed and there are remaining lines
            if (
                !intervalRef.current &&
                isOpen &&
                currentIndexRef.current < lines.length
            ) {
                scheduleNext();
            }
            // if resumed and we've already finished lines, restart completion countdown
            if (
                !completionRef.current &&
                isOpen &&
                currentIndexRef.current >= lines.length
            ) {
                completionRef.current = setTimeout(() => {
                    onClose();
                }, 5000);
            }
        }
    }, [isPaused, isOpen, lines, scheduleNext, onClose]);

    // clear completion timer when modal closes/unmounts
    useEffect(() => {
        return () => {
            if (completionRef.current) {
                clearTimeout(completionRef.current);
                completionRef.current = null;
            }
        };
    }, []);

    // keep scroll at bottom so new line is visible
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedLines]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                className="w-full max-w-lg bg-card rounded-lg flex flex-col max-h-[70vh] relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4 text-foreground" />
                    </button>
                </div>

                {/* Scrolling Content */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4"
                >
                    {displayedLines.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-sm">
                                {isPaused ? "Paused" : "Starting..."}
                            </p>
                        </div>
                    )}
                    {displayedLines.map((item) => (
                        <div
                            key={item.id}
                            className="text-foreground text-sm leading-relaxed animate-fade-in"
                        >
                            {item.line}
                        </div>
                    ))}
                </div>

                {/* Pause Indicator */}
                {isPaused && (
                    <div className="px-6 py-2 bg-secondary/20 text-center text-xs text-muted-foreground border-t border-border">
                        Paused
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ScrollingCreditsModal;
