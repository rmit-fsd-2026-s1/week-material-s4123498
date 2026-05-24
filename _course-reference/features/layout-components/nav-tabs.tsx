// NAV PATTERN: TABS INSIDE MAIN CONTENT
//
// Use this when the app has multiple related views inside one page.
//
// Example scenarios:
// - Quote form / Previous quotes
// - Details / Pricing / Notes
// - List / Summary / Settings

import { useState } from "react";

type TabName = "form" | "summary" | "history";

export default function TabsLayout() {
  const [activeTab, setActiveTab] = useState<TabName>("form");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Event quote</h2>

      <div className="mb-6 border-b border-gray-200">
        <nav aria-label="Quote sections" className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`border-b-2 px-2 py-3 ${
              activeTab === "form" ? "border-blue-700 text-blue-700" : "border-transparent text-gray-600"
            }`}
          >
            Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("summary")}
            className={`border-b-2 px-2 py-3 ${
              activeTab === "summary" ? "border-blue-700 text-blue-700" : "border-transparent text-gray-600"
            }`}
          >
            Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`border-b-2 px-2 py-3 ${
              activeTab === "history" ? "border-blue-700 text-blue-700" : "border-transparent text-gray-600"
            }`}
          >
            History
          </button>
        </nav>
      </div>

      <section className="rounded border bg-white p-6 shadow-sm">
        {activeTab === "form" && <div>Put the booking form here.</div>}
        {activeTab === "summary" && <div>Put the quote summary here.</div>}
        {activeTab === "history" && <div>Put previous quotes here.</div>}
      </section>
    </main>
  );
}

