// NAV PATTERN: ACTIVE NAV WITH STATE
//
// Use this if the test wants simple page switching but you are not using
// React Router.
//
// Main idea:
// activePage state decides which content to show.
// Button clicks change activePage.

import { useState } from "react";

type PageName = "home" | "bookings" | "contact";

export default function ActiveStateNavLayout() {
  const [activePage, setActivePage] = useState<PageName>("home");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-blue-700 px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">RMIT City Events</h1>

          <nav aria-label="Main navigation">
            <ul className="flex gap-3">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage("home")}
                  className={`rounded px-3 py-2 ${activePage === "home" ? "bg-white text-blue-700" : "hover:bg-blue-800"}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage("bookings")}
                  className={`rounded px-3 py-2 ${activePage === "bookings" ? "bg-white text-blue-700" : "hover:bg-blue-800"}`}
                >
                  Bookings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage("contact")}
                  className={`rounded px-3 py-2 ${activePage === "contact" ? "bg-white text-blue-700" : "hover:bg-blue-800"}`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {activePage === "home" && <section>Home content goes here.</section>}
        {activePage === "bookings" && <section>Booking form/list goes here.</section>}
        {activePage === "contact" && <section>Contact content goes here.</section>}
      </main>
    </div>
  );
}

