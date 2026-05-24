// LAYOUT PATTERN: SEARCH/FILTER + CARDS
//
// Use this when the scenario asks for:
// - search by text
// - filter by category/status/type
// - display matching results
//
// Example scenarios:
// - find events by room type
// - filter products by category
// - search employees by name

import { useMemo, useState } from "react";

type EventItem = {
  id: number;
  name: string;
  roomType: "Standard" | "Premium" | "Conference Hall";
};

const events: EventItem[] = [
  { id: 1, name: "Careers Expo", roomType: "Conference Hall" },
  { id: 2, name: "Networking Night", roomType: "Premium" },
  { id: 3, name: "Workshop", roomType: "Standard" },
];

export default function SearchFilterCardsLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoom = roomFilter === "All" || event.roomType === roomFilter;
      return matchesSearch && matchesRoom;
    });
  }, [searchTerm, roomFilter]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Find events</h2>

      <section className="mb-6 grid grid-cols-1 gap-4 rounded border bg-white p-4 shadow-sm md:grid-cols-2">
        <label>
          <span className="mb-1 block font-medium">Search</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Search by event name"
          />
        </label>

        <label>
          <span className="mb-1 block font-medium">Room type</span>
          <select
            value={roomFilter}
            onChange={(event) => setRoomFilter(event.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option>All</option>
            <option>Standard</option>
            <option>Premium</option>
            <option>Conference Hall</option>
          </select>
        </label>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filteredEvents.map((event) => (
          <article key={event.id} className="rounded border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">{event.name}</h3>
            <p className="mt-2 text-gray-600">{event.roomType}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

