import React, { useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const resetFirstName = () => {
    setFirstName("");
  };

  const resetLastName = () => {
    setLastName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Controlled vs Uncontrolled Inputs Demo
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name (Controlled Input)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={resetFirstName}
                className="mt-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name (Non Controlled Input)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="lastName"
                onChange={handleLastNameChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={resetLastName}
                className="mt-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <p className="mt-1 text-sm text-gray-500">Current form state</p>

          <pre>{JSON.stringify({ firstName, lastName }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
