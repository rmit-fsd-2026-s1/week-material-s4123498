import { useState, useEffect } from "react";

// Child component that receives a prop and demonstrates useEffect
function ChildComponent({ parentCount }: { parentCount: number }) {
  const [effectCount, setEffectCount] = useState<number>(0);

  // This effect will run whenever parentCount changes
  useEffect(() => {
    setEffectCount((prev) => prev + 1);
  }, [parentCount]);

  return (
    <div className="p-4 border rounded bg-gray-50 text-gray-800">
      <h2 className="font-semibold mb-2">Child Component</h2>
      <p>Parent Count: {parentCount}</p>
      <p>Effect has run {effectCount} times</p>
    </div>
  );
}

export default function Home() {
  const [parentCount, setParentCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist)]">
      <main className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-8">
          useEffect with Props Example
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">
                Parent Counter: {parentCount}
              </h2>
              <button
                onClick={() => setParentCount((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment Parent Counter
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

          <ChildComponent parentCount={parentCount} />

          <div className="p-4 border rounded bg-white">
            <h2 className="font-semibold mb-2 text-gray-800">Explanation:</h2>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>• The ChildComponent receives parentCount as a prop</li>
              <li>
                • The useEffect in ChildComponent has parentCount in its
                dependency array
              </li>
              <li>
                • The effect will run every time parentCount changes, but not
                when Counter 2 changes
              </li>
              <li>
                • This demonstrates how useEffect can respond to prop changes
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
