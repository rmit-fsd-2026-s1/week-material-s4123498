// USEEFFECT PATTERN: GET DATA ON PAGE LOAD
//
// Where to put this:
// inside a component that needs initial API data.
//
// When to use:
// - load options for a select input
// - load existing booking details
// - load previous quote by ID

import { useEffect, useState } from "react";

type Room = {
  id: number;
  name: string;
};

export default function RoomOptionsExample() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch("http://localhost:3001/api/rooms");

        if (!response.ok) {
          throw new Error("Could not load rooms");
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadRooms();
  }, []);

  if (isLoading) return <p>Loading rooms...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <select>
      {rooms.map((room) => (
        <option key={room.id} value={room.name}>
          {room.name}
        </option>
      ))}
    </select>
  );
}

