import React from "react";
import "../styles/components/EventButton.css";

const EventButton = () => {
  const handleClick = (name: string) => {
    alert(`Button was clicked by ${name}`);
  };

  return (
    <button onClick={() => handleClick("Matt")} className="button">
      Click Me!
    </button>
  );
};

export default EventButton;
