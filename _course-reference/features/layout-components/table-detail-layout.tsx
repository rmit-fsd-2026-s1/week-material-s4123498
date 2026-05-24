// LAYOUT PATTERN: TABLE + DETAIL PANEL
//
// Use this when the scenario has many records and the user needs to compare rows.
//
// Example scenarios:
// - booking table + quote details
// - products table + selected product
// - employee table + salary details
//
// Tip:
// Use a table when there are repeated records with the same columns.
// Use cards when each item has different or more visual content.

import { useState } from "react";

type EventQuote = {
  id: number;
  organiserName: string;
  guests: number;
  roomType: string;
  status: "Draft" | "Submitted" | "Approved";
};

const quotes: EventQuote[] = [
  { id: 101, organiserName: "Alex", guests: 80, roomType: "Premium", status: "Submitted" },
  { id: 102, organiserName: "Sam", guests: 220, roomType: "Conference Hall", status: "Draft" },
];

export default function TableDetailLayout() {
  const [selectedQuote, setSelectedQuote] = useState<EventQuote | null>(quotes[0]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Quote records</h2>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="overflow-hidden rounded border bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Organiser</th>
                <th className="px-4 py-3">Guests</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  onClick={() => setSelectedQuote(quote)}
                  className="cursor-pointer border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{quote.organiserName}</td>
                  <td className="px-4 py-3">{quote.guests}</td>
                  <td className="px-4 py-3">{quote.roomType}</td>
                  <td className="px-4 py-3">{quote.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="rounded border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Details</h3>
          {selectedQuote && (
            <div className="space-y-2 text-gray-700">
              <p>ID: {selectedQuote.id}</p>
              <p>Organiser: {selectedQuote.organiserName}</p>
              <p>Status: {selectedQuote.status}</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

