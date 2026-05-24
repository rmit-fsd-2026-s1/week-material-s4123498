import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [effect2Count, setEffect2Count] = useState<number>(0);
  const [effect3Count, setEffect3Count] = useState<number>(0);

  // Case 1: No dependency array - runs on every render
  useEffect(() => {
    console.log("Effect 1");
  });

  // Case 2: Empty dependency array - runs only once on mount
  useEffect(() => {
    setEffect2Count((prev) => prev + 1);
  }, []);

  // Case 3: With dependencies - runs when count changes
  useEffect(() => {
    setEffect3Count((prev) => prev + 1);
  }, [count]);

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist)]">
      <main className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-8">
          useEffect Dependency Array Examples
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">Counter 1: {count}</h2>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment Counter 1
              </button>
            </div>

            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">Counter 2: {count2}</h2>
              <button
                onClick={() => setCount2((prev) => prev + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increment Counter 2
              </button>
            </div>
          </div>

          <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Effect Counts:</h2>
            <ul className="space-y-2">
              <li>
                No dependency array (runs every render): Check console log
              </li>
              <li>Empty dependency array (runs once): {effect2Count}</li>
              <li>With count dependency: {effect3Count}</li>
            </ul>
          </div>

          <div className="p-4 border rounded bg-white">
            <h2 className="font-semibold mb-2 text-gray-800">Explanation:</h2>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                • The first effect runs on every render because it has no
                dependency array
              </li>
              <li>
                • The second effect only runs once when the component mounts
                because it has an empty dependency array
              </li>
              <li>
                • The third effect only runs when Counter 1 changes because
                count is in its dependency array. Notice it doesn't run when
                Counter 2 changes!
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
