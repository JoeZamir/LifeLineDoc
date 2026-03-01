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
  const [role, setRoleLocal] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stateRole = (location.state as any)?.role;
    if (stateRole) {
      setRoleLocal(stateRole);
    } else {
      // nothing selected, redirect back
      navigate("/select-role");
    }
  }, [location, navigate]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("Role information missing");
      return;
    }
    setRole(role as any);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-12">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-display font-bold text-foreground">LifelineDoc</h1>
      </div>

      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground">Create Account</h2>
        {role && <p className="text-sm text-muted-foreground">Signing up as <strong>{role}</strong></p>}
        <p className="text-muted-foreground">Register for emergency medical services</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4 flex-1">
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
          className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base shadow-lg mt-4"
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
