import { useState, useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null); // we create a ref using the useRef hook and specify that it will be a reference to an HTMLInputElement,
  // this allows us to access the input element directly through the ref and call methods on it, such as focus()
  
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    // Focus the input element using the ref
    inputRef.current?.focus(); // the optional chaining operator (?.) is used to safely access the focus method,
    // this means that if inputRef.current is null (which can happen if the component hasn't rendered yet), 
    // it won't throw an error and will simply do nothing
    // this allows us to programmatically focus the input element when the button is clicked
    console.log("Input focused:", inputRef.current); // log the current state of the inputRef 
    // to the console for debugging purposes
  };

  const handleClear = () => {
    // Clear the input value
    setInputValue("");
    // Focus the input after clearing
    inputRef.current?.focus(); // after clearing the input value, 
    // we also call the focus method to keep the input focused, allowing the user to immediately start typing again without having to click on the input field first
    console.log("Input cleared and focused:", inputRef.current); // log the current state of the inputRef to the console for debugging purposes after clearing and focusing the input
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          useRef with Input Focus Example
        </h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)
                  // we update the inputValue state whenever the user types in the input field,
                  // this allows us to keep track of the current value of the input and display it elsewhere in the component
                  // the input is a controlled component, meaning its value is controlled by React state,
                  // this allows us to easily manage the input's value and respond to changes in it

                }
                placeholder="Type something..."
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                onClick={handleFocus
                  // when the "Focus Input" button is clicked, 
                  // the handleFocus function is called, 
                  // which uses the inputRef to focus the input element, 
                  // allowing the user to start typing immediately without having to click on the input field first

                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Focus Input
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear & Focus
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h2 className="text-lg font-semibold mb-2 text-black">
                Current Input Value:
              </h2>
              <p className="text-black">{inputValue || "No input yet"}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Points:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>useRef is used to create a reference to the input element</li>
            <li>The ref is attached to the input using the ref prop</li>
            <li>We can access the input element using inputRef.current</li>
            <li>focus() method is called on the input element to focus it</li>
            <li>This is useful for programmatically controlling input focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
