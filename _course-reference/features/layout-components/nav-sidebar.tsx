// NAV PATTERN: SIDEBAR NAV
//
// Use this only when the scenario asks for dashboard-style navigation.
// Do not use this for a simple "left form, right summary" requirement.

import { useState } from "react";

type SidebarPage = "dashboard" | "quotes" | "settings";

export default function SidebarNavLayout() {
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r bg-white p-4">
        <h1 className="mb-6 text-xl font-bold">Event Admin</h1>

        <nav aria-label="Sidebar navigation" className="space-y-2">
          <button
            type="button"
            onClick={() => setActivePage("dashboard")}
            className={`block w-full rounded px-3 py-2 text-left ${
              activePage === "dashboard" ? "bg-blue-700 text-white" : "hover:bg-gray-100"
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActivePage("quotes")}
            className={`block w-full rounded px-3 py-2 text-left ${
              activePage === "quotes" ? "bg-blue-700 text-white" : "hover:bg-gray-100"
            }`}
          >
            Quotes
          </button>
          <button
            type="button"
            onClick={() => setActivePage("settings")}
            className={`block w-full rounded px-3 py-2 text-left ${
              activePage === "settings" ? "bg-blue-700 text-white" : "hover:bg-gray-100"
            }`}
          >
            Settings
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {activePage === "dashboard" && <section>Dashboard content.</section>}
        {activePage === "quotes" && <section>Quotes content.</section>}
        {activePage === "settings" && <section>Settings content.</section>}
      </main>
    </div>
  );
}

