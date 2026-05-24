import { useCounter } from "../../context/CounterContext";

export default function LevelThree() {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="p-4 border-2 border-purple-500 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Level Three (Context)</h2>
      <p className="mb-4">Count: {count}</p>
      <div className="flex gap-2 mb-4">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
