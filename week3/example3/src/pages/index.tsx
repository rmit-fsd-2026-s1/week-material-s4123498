import React, { useState, useEffect } from "react";

type AgeGroup = {
  image: string;
  label: string;
};

interface PersonState {
  age: number;
  numberOfSiblings: number;
}

const getAgeGroupImage = (age: number): AgeGroup => {
  if (age < 3) {
    return {
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&h=400",
      label: "Baby",
    };
  } else if (age >= 3 && age < 5) {
    return {
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=400",
      label: "Toddler",
    };
  } else if (age >= 5 && age < 12) {
    return {
      image:
        "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&h=400",
      label: "Child",
    };
  } else if (age >= 12 && age < 20) {
    return {
      image:
        "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?auto=format&fit=crop&w=400&h=400",
      label: "Teenager",
    };
  } else if (age >= 20 && age < 40) {
    return {
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&h=400",
      label: "Young Adult",
    };
  } else if (age >= 40 && age < 65) {
    return {
      image:
        "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&h=400",
      label: "Adult",
    };
  }

  return {
    image:
      "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?auto=format&fit=crop&w=400&h=400",
    label: "Senior",
  };
};

export default function Home() {
  const [person, setPerson] = useState<PersonState>({
    age: 0,
    numberOfSiblings: 1,
  });

  // Effect that sets up an automatic age increment timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPerson((prevState) => ({
        ...prevState,
        age: prevState.age + 1,
      }));
    }, 1000); // Run every second

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="text-xl">
        <p>Age: {person.age}</p>
        <p>Number of Siblings: {person.numberOfSiblings}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-64 h-64 rounded-lg overflow-hidden">
          <img
            src={getAgeGroupImage(person.age).image}
            alt={getAgeGroupImage(person.age).label}
          />
        </div>
        <p className="text-lg font-semibold">
          {getAgeGroupImage(person.age).label}
        </p>
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

      {/* We can also use inline ternary operators to conditionally render content */}
      {person.numberOfSiblings >= 2 && (
        <img src="https://i.pinimg.com/originals/25/bf/fc/25bffca989924c1cd303228ee7482e65.gif" />
      )}
    </div>
  );
}
