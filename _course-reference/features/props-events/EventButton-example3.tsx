import React from "react";

const EventButton = () => {
  const handleClick = (name: string) => {
    alert(`Button was clicked by ${name}`);
  };

  return (
    <button
      onClick={() => handleClick("Matt")}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Click Me!
    </button>
  );
};

export default EventButton;
