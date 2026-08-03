function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">

      <p className="text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-green-700 dark:text-green-400">
        {value}
      </h2>

    </div>
  );
}

export default function UsageOverview() {
  const usage =
    JSON.parse(localStorage.getItem("usage")) || {};

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  );

  const todayUsage =
    (usage[today]?.total || 0) / 3600;

  const totalWeek =
    Object.values(usage).reduce(
      (sum, day) => sum + (day.total || 0),
      0
    ) / 3600;

  const average =
    totalWeek / 7;

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <Card
        title="Today's Usage"
        value={`${todayUsage.toFixed(2)} hrs`}
      />

      <Card
        title="This Week"
        value={`${totalWeek.toFixed(2)} hrs`}
      />

      <Card
        title="Daily Average"
        value={`${average.toFixed(2)} hrs`}
      />

    </div>
  );
}