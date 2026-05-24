import { useState, useMemo } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [count, setCount] = useState(0);

  // Expensive calculation that we want to memoize
  const expensiveCalculation = useMemo(() => {
    console.log("Performing expensive calculation...");
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]); // Only recalculate when numbers array changes

  const addNumber = () => {
    setNumbers([...numbers, Math.floor(Math.random() * 100)]);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">useMemo Example</h1>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={addNumber}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Random Number
          </button>
          <button
            onClick={() => setCount((c) => c + 1)
              // This will trigger a re-render, 
              // but the expensive calculation will not run because the numbers array has not changed
              // This demonstrates how useMemo helps to optimize performance 
              // by avoiding unnecessary calculations on every render
              // If we were to calculate the sum directly in the render without useMemo, 
              // it would run on every render, which could be inefficient if the numbers array is large
              // By using useMemo, we ensure that the expensive calculation only runs when it needs to, 
              // which can significantly improve performance in cases where the calculation is costly              
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment Counter
          </button>
        </div>

        <div className="space-y-2">
          <p>Numbers: {numbers.join(", ")}</p>
          <p>Sum: {expensiveCalculation
            // The expensive calculation is memoized, 
            // so it will only be recalculated when the numbers array changes

            }</p>
          <p>Counter: {count
            // The counter is independent of the expensive calculation,
            // so it can be updated without triggering the expensive calculation
            }</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded text-gray-800">
        <h2 className="font-bold mb-2">How it works:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Click "Add Random Number" to add a number to the array</li>
          <li>Click "Increment Counter" to trigger a re-render</li>
          <li>
            Notice that the expensive calculation only runs when numbers change,
            not on every counter increment
          </li>
          <li>Check the console to see when calculations occur</li>
        </ul>
      </div>
    </div>
  );
}
