import { Doctor } from "@/types/emergency";
import { Star, ShieldCheck, Building2 } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

const DoctorCard = ({ doctor, compact }: DoctorCardProps) => {
  return (
    <div className="medical-card animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
          {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">{doctor.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="w-3 h-3" />
            <span className="truncate">{doctor.hospital}</span>
          </div>
          {!compact && (
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="w-3 h-3 text-success" />
                <span>{doctor.licenseId}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-xs font-medium text-foreground">{doctor.rating}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {!compact && (
        <div className="mt-3 flex items-center gap-2">
          <span className="status-badge-active">
            <span className="w-1.5 h-1.5 rounded-full bg-medical-green animate-blink" />
            Verified
          </span>
          <span className="status-badge bg-primary/10 text-primary">{doctor.specialty}</span>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
