import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0); // The useState hook is used to create a state variable called count, initialized to 0, and a function setCount to update it.

  // Load count from localStorage on initial render
  useEffect(() => {
    const savedCount = localStorage.getItem("counter");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []); // The empty dependency array [] ensures that this effect only runs ONCE when the component mounts,
  // allowing us to load the initial count value from localStorage without causing an infinite loop of updates.

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("counter", count.toString()); // Whenever the count state changes, 
    // this effect runs and saves the new count value to localStorage under the key "counter".

  }, [count]); // The dependency array [count] ensures that this effect only runs when the count state changes,
  // preventing unnecessary writes to localStorage on every render.

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl mb-4">Counter with LocalStorage</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          -
        </button>
        <span className="text-xl font-[family-name:var(--font-geist-mono)]">
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1) // The onClick handler for the "+" button calls setCount with the current count plus one,
          // allowing the user to increment the counter. The updated count will then be saved to localStorage due to the second useEffect.
          // I need to ensure that the count is updated correctly and that the new value is saved to localStorage whenever it changes.
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Try refreshing the page - the count will persist!
      </p>
    </div>
  );
}
