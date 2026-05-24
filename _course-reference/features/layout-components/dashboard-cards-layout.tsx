// LAYOUT PATTERN: DASHBOARD CARDS
//
// Use this when the scenario says:
// - show overview statistics
// - show multiple summaries
// - show status cards after fetching API data
//
// Example scenarios:
// - event dashboard
// - booking stats
// - product inventory summary
// - student progress overview

type StatCard = {
  label: string;
  value: string;
  helperText: string;
};

const stats: StatCard[] = [
  { label: "Total bookings", value: "24", helperText: "This week" },
  { label: "Pending quotes", value: "6", helperText: "Need review" },
  { label: "Estimated revenue", value: "$8,420", helperText: "Confirmed events" },
];

export default function DashboardCardsLayout() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-600">Overview of current event bookings.</p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.helperText}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded border bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Recent activity</h3>
        <p className="text-gray-600">Put API-loaded recent items here.</p>
      </section>
    </main>
  );
}

