import { Shield, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LoadingSplash = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length < 3 ? d + "." : ""));
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(dotsInterval);
    }, 4000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center flex-col">
      <img
        src="/assets/logo-128.png"
        alt="logo"
        className="w-28 h-28 mb-6"
      />
      <h1 className="text-2xl font-display font-bold">
        <span className="text-primary">Lifeline</span><span className="text-destructive">Doc</span>
        <span className="text-foreground">{dots}</span>
      </h1>
    </div>
  );
};

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <LoadingSplash />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center">
            <img
              src="/assets/logo-64.png"
              alt="LifelineDoc Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-primary">Lifeline<span className="text-destructive">Doc</span></h1>
            <p className="text-xs text-muted-foreground">When Every Second Counts</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="space-y-6 ">
          <div className="space-y-3 px-7">
            <div className="status-badge-active w-fit">
              <span className="w-2 h-2 rounded-full bg-medical-green animate-blink" />
              <span>System Active</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-foreground leading-tight">
              Emergency Help<br />
              <span className="text-primary">Across Kenya</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              One tap connects you to certified doctors and dispatches the nearest ambulance to your location.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 px-6">
            <div className="medical-card space-y-2">
              <Shield className="w-5 h-5 text-primary" />
              <p className="text-sm font-medium text-foreground">Verified Doctors</p>
              <p className="text-xs text-muted-foreground">Licensed Kenyan medical professionals</p>
            </div>
            <div className="medical-card space-y-2">
              <Phone className="w-5 h-5 text-primary" />
              <p className="text-sm font-medium text-foreground">Instant Video</p>
              <p className="text-xs text-muted-foreground">Connect in under 30 seconds</p>
            </div>
          </div>

          {/* CTA */}
          <div className="w-[60vw] max-w-md px-6 mx-auto space-y-3 pt-4">
            <Link
              to="/login"
              className="block w-full py-4 rounded-2xl gradient-primary text-center text-primary-foreground font-semibold text-base shadow-lg"
            >
              Sign In
            </Link>
            <Link
              to="/select-role"
              className="block w-full py-4 rounded-2xl bg-secondary text-center text-secondary-foreground font-semibold text-base"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-6 text-center">
        <p className="text-xs text-muted-foreground">
          🇰🇪 Designed for Kenya's Emergency Response System
        </p>
      </footer>
    </div>
  );
};

export default Landing;
