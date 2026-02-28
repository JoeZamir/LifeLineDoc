import { useState } from "react";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
        <h2 className="text-2xl font-display font-bold text-foreground">Welcome back</h2>
        <p className="text-muted-foreground">Sign in to access emergency services</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 flex-1">
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base shadow-lg mt-4"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground py-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
