import React, { useState, useEffect } from "react";

interface PersonState {
  age: number;
  numberOfSiblings: number;
}

export default function Home() {
  const [person, setPerson] = useState<PersonState>({
    age: 25,
    numberOfSiblings: 1,
  });

  // Effect that sets up an automatic age increment timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPerson((prevState) => ({
        ...prevState,
        age: prevState.age + 1,
      }));
    }, 5000); // Run every 5 seconds

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array means setup once on mount

  // Effect that runs when age changes
  useEffect(() => {
    console.log(`Age has been updated to: ${person.age}`);
    document.title = `Age: ${person.age}`;
  }, [person.age]); // Only re-run when age changes

  // Effect that runs only once on component mount
  useEffect(() => {
    console.log("Component has mounted!");
    return () => {
      console.log("Component will unmount!");
    };
  }, []); // Empty dependency array means run only on mount

  const increaseAge = () => {
    setPerson((prevState) => ({
      ...prevState,
      age: prevState.age + 1,
    }));
  };

  const increaseSiblings = () => {
    setPerson((prevState) => ({
      ...prevState,
      numberOfSiblings: prevState.numberOfSiblings + 1,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-xl">
        <p>Age: {person.age}</p>
        <p>Number of Siblings: {person.numberOfSiblings}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={increaseAge}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Increase Age
        </button>
        <button
          onClick={increaseSiblings}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Sibling
        </button>
      </div>
    </div>
  );
}
