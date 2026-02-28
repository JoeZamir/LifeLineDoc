import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

type NotificationItem = {
  id: number;
  message: string;
  timestamp: string;
};

const notifications: NotificationItem[] = [
  { id: 1, message: "Dr Martha joined!", timestamp: "Yesterday, 9:00 PM" },
  { id: 2, message: "Dr. Eliud left.", timestamp: "Yesterday, 8:30 PM" },
  { id: 3, message: "Dr. Thomas left.", timestamp: "Yesterday, 8:10 PM" },
  { id: 4, message: "Dr. Eliud joined!", timestamp: "Yesterday, 7:55 PM" },
  { id: 5, message: "Dr. Thomas joined!", timestamp: "Yesterday, 7:20 PM" },
  { id: 6, message: "Thank you for signing up", timestamp: "Yesterday, 6:45 PM" },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <header className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Notifications</h1>
          <p className="text-xs text-muted-foreground">Recent activity</p>
        </div>
      </header>

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div key={item.id} className={`medical-card flex items-start gap-3 ${index === 0 ? 'bg-primary/10' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mt-0.5">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
