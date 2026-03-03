import { User, PenSquare, LogOut, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  name: string;
}

const Profile = ({ isOpen, onClose, onLogout, name }: ProfileProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
            aria-label="Close profile modal"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="mt-3 text-lg font-semibold text-foreground">{name}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full p-4 rounded-xl bg-secondary text-foreground font-medium flex items-center gap-3">
            <PenSquare className="w-5 h-5" />
            <span>Edit your profile</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full p-4 rounded-xl bg-secondary text-foreground font-medium flex items-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>

          <button className="w-full p-4 rounded-xl bg-secondary font-medium flex items-center gap-3 text-destructive">
            <Trash2 className="w-5 h-5" />
            <span>Delete account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
