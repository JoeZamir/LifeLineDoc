import { Activity, Ambulance, Stethoscope, UserRound } from "lucide-react";

const formatDayLabel = (timestamp: number, dayOffset: number) => {
  if (dayOffset === 0) return "Today";
  if (dayOffset === 1) return "Yesterday";

  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(timestamp);
};

const now = Date.now();

const trendData = [11, 10, 8, 7, 5, 3].map((users, index, values) => {
  const dayOffset = values.length - 1 - index;
  const timestamp = now - dayOffset * 24 * 60 * 60 * 1000;

  return {
    users,
    label: formatDayLabel(timestamp, dayOffset),
  };
});

const statCards = [
  {
    title: "Ambulance",
    icon: Ambulance,
    active: 1,
    joined: 1,
    left: 0,
  },
  {
    title: "Doctor",
    icon: Stethoscope,
    active: 1,
    joined: 3,
    left: 2,
  },
  {
    title: "Patients",
    icon: UserRound,
    active: 1,
    joined: 5,
    left: 4,
  },
];

const maxUsers = Math.max(...trendData.map((item) => item.users));
const minUsers = Math.min(...trendData.map((item) => item.users));

const chartPoints = trendData
  .map((entry, index) => {
    const x = (index / (trendData.length - 1)) * 100;
    const y = 92 - ((entry.users - minUsers) / Math.max(maxUsers - minUsers, 1)) * 74;

    return `${x},${y}`;
  })
  .join(" ");

const Admin = () => {
  return (
    <main className="min-h-screen bg-background px-4 pb-8 pt-5 md:px-8 md:pt-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl space-y-4 md:space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground md:text-base">Private internal metrics overview</p>
        </header>

        <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold md:text-base">Active Users</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center md:gap-3">
            <div className="rounded-xl bg-secondary/60 p-3 md:p-4">
              <p className="text-xs text-muted-foreground md:text-sm">Patient</p>
              <p className="text-xl font-bold text-foreground md:text-2xl">1</p>
            </div>
            <div className="rounded-xl bg-secondary/60 p-3 md:p-4">
              <p className="text-xs text-muted-foreground md:text-sm">Doctor</p>
              <p className="text-xl font-bold text-foreground md:text-2xl">1</p>
            </div>
            <div className="rounded-xl bg-secondary/60 p-3 md:p-4">
              <p className="text-xs text-muted-foreground md:text-sm">Ambulance</p>
              <p className="text-xl font-bold text-foreground md:text-2xl">1</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {statCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <card.icon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground md:text-base">{card.title}</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-success">
                  <p className="text-xs md:text-sm">Active</p>
                  <p className="text-sm font-bold md:text-base">{card.active}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2">
                  <p className="text-xs text-muted-foreground md:text-sm">Joined</p>
                  <p className="text-sm font-bold text-foreground md:text-base">{card.joined}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-destructive/90">
                  <p className="text-xs md:text-sm">Left</p>
                  <p className="text-sm font-bold md:text-base">{card.left}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground md:text-base">User Trend</h2>
            <span className="text-xs font-medium text-destructive">Down trend</span>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/20 p-3 md:p-4">
            <svg className="h-40 w-full md:h-52" viewBox="0 0 100 100" role="img" aria-label="User history trend chart by day">
              {[25, 50, 75].map((line) => (
                <line key={line} x1="0" y1={line} x2="100" y2={line} stroke="currentColor" className="text-border/80" strokeDasharray="2 2" />
              ))}
              <polyline
                fill="none"
                stroke="hsl(var(--destructive))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={chartPoints}
              />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground md:text-xs">
              {trendData.map((entry) => (
                <span key={entry.label}>{entry.label}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
