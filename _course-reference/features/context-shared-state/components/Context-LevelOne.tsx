import LevelTwo from "./LevelTwo";

export default function LevelOne() {
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Level One (Context)</h2>
      <LevelTwo />
    </div>
  );
}
