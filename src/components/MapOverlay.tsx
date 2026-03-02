import { X } from "lucide-react";
import SimulatedMap from "./SimulatedMap";
import { Location } from "@/types/emergency";

interface MapOverlayProps {
    patientLocation: Location;
    ambulanceLocation: Location;
    ambulanceEta: number;
    onClose: () => void;
}

const MapOverlay = ({ patientLocation, ambulanceLocation, ambulanceEta, onClose }: MapOverlayProps) => {
    return (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg h-[65vh] max-h-[80vh] relative bg-background rounded-2xl overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="Close map"
                >
                    <X className="w-4 h-4 text-foreground" />
                </button>
                <SimulatedMap
                    patientLocation={patientLocation}
                    ambulanceLocation={ambulanceLocation}
                    ambulanceEta={ambulanceEta}
                />
            </div>
        </div>
    );
};

export default MapOverlay;
