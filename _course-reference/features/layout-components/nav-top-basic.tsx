// NAV PATTERN: BASIC TOP NAV
//
// Use this when the app just needs header links.
//
// Good for:
// - Home / Bookings / Contact
// - Dashboard / Quotes / Reports
//
// File idea:
// src/components/Header.tsx

export default function Header() {
  return (
    <header className="bg-blue-700 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">RMIT City Events</h1>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-6">
            <li>
              <a href="#" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Bookings</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

