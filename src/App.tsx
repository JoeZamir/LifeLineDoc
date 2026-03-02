import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import Emergency from "./pages/Emergency";
import DoctorView from "./pages/DoctorView";
import DrTranscript from "./pages/DrTranscript";
import AmbulanceView from "./pages/AmbulanceView";
import Notifications from "./pages/notifications";
import DoctorsList from "./pages/DoctorsList";
import AmbulancesList from "./pages/AmbulancesList";
import HealthDashboard from "./pages/Health";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./context/AuthContext";
import { EmergencyProvider } from "./hooks/useEmergencySession.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <EmergencyProvider>
          <BrowserRouter>
            <div className="max-w-lg mx-auto min-h-screen">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/select-role" element={<RoleSelect />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/doctor" element={<DoctorView />} />
                <Route path="/doctor/transcript" element={<DrTranscript />} />
                <Route path="/ambulance" element={<AmbulanceView />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route path="/ambulances" element={<AmbulancesList />} />
                <Route path="/health" element={<HealthDashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNav />
            </div>
          </BrowserRouter>
        </EmergencyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
