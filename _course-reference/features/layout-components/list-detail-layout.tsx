// LAYOUT PATTERN: LIST + DETAIL
//
// Use this when the scenario says:
// - show a list of items
// - user selects one item
// - show selected item details on the right
//
// Example scenarios:
// - appointments list + appointment details
// - products list + product summary
// - bookings list + selected booking
// - students list + student profile
//
// File idea:
// src/components/MainContent.tsx

import { useState } from "react";

type Booking = {
  id: number;
  organiserName: string;
  roomType: string;
  totalCost: number;
};

const bookings: Booking[] = [
  { id: 1, organiserName: "Remy Martin", roomType: "Standard", totalCost: 540 },
  { id: 2, organiserName: "Dip Rao", roomType: "Conference Hall", totalCost: 1800 },
];

export default function ListDetailLayout() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(bookings[0]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Bookings</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <section className="rounded border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Booking list</h3>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => setSelectedBooking(booking)}
                className="w-full rounded border px-4 py-3 text-left hover:bg-gray-50"
              >
                <p className="font-medium">{booking.organiserName}</p>
                <p className="text-sm text-gray-600">{booking.roomType}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Selected booking</h3>

          {selectedBooking === null ? (
            <p className="text-gray-600">Select a booking to view details.</p>
          ) : (
            <div className="space-y-2 text-gray-700">
              <p>Organiser: {selectedBooking.organiserName}</p>
              <p>Room: {selectedBooking.roomType}</p>
              <p>Total: ${selectedBooking.totalCost}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

