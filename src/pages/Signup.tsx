import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole } = useAuth();
  const [roleSelect, setRoleSelect] = useState<"patient" | "doctor" | "ambulance" | "">("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stateRole = (location.state as { role?: string })?.role;
    if (stateRole) {
      setRoleSelect(stateRole as "patient" | "doctor" | "ambulance");
    } else {
      // nothing selected, redirect back
      navigate("/select-role");
    }
  }, [location, navigate]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleSelect) {
      setError("Role information missing");
      return;
    }
    setRole(roleSelect as "patient" | "doctor" | "ambulance");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-12">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center">
        <img
            src="/assets/logo-64.png"
            alt="LifelineDoc Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-lg font-display text-primary font-bold">Lifeline<span className="text-red-500">Doc</span></h1>
      </div>

      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground">Create Account</h2>
        {roleSelect && <p className="text-sm text-muted-foreground">Signing up as <strong>{roleSelect}</strong></p>}
        <p className="text-muted-foreground">Register for emergency medical services</p>
      </div>

      <form onSubmit={handleSignup} className="w-[60vw] max-w-md px-6 space-y-4 flex-1 justify-center">
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Mwangi"
            className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 7XX XXX XXX"
            className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base shadow-lg mt-4 transition"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground py-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
