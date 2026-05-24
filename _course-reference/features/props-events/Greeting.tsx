import React from "react";

interface GreetingProps {
  name: string;
  timeOfDay?: "morning" | "afternoon" | "evening";
  isSpecialGreeting?: boolean;
  customMessage?: string;
}

const Greeting = ({
  name,
  timeOfDay = "morning",
  isSpecialGreeting = false,
  customMessage,
}: GreetingProps) => {
  const getTimeBasedGreeting = () => {
    switch (timeOfDay) {
      case "afternoon":
        return "Good afternoon";
      case "evening":
        return "Good evening";
      default:
        return "Good morning";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        isSpecialGreeting ? "bg-purple-100" : "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">
        {getTimeBasedGreeting()}, {name}!
      </h2>
      {customMessage && <p className="text-gray-600">{customMessage}</p>}
      {isSpecialGreeting && (
        <div className="mt-2 text-purple-600">
          ✨ Special greeting just for you! ✨
        </div>
      )}
    </div>
  );
};

export default Greeting;
