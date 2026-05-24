// LAYOUT PATTERN: SIMPLE STEP FORM
//
// Use this when the scenario has a long form and you want to split it into
// logical parts. Only use it if you have time; the simple two-column form is
// usually faster for A3.
//
// Example scenarios:
// - Step 1: organiser details
// - Step 2: event details
// - Step 3: quote summary

import { useState } from "react";

export default function StepFormLayout() {
  const [step, setStep] = useState(1);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Create booking</h2>

      <section className="rounded border bg-white p-6 shadow-sm">
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded ${item <= step ? "bg-blue-700" : "bg-gray-200"}`}
            />
          ))}
        </div>

        {step === 1 && <div>Step 1: organiser fields go here.</div>}
        {step === 2 && <div>Step 2: event fields go here.</div>}
        {step === 3 && <div>Step 3: summary goes here.</div>}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(1, current - 1))}
            className="rounded border px-4 py-2"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(3, current + 1))}
            className="rounded bg-blue-700 px-4 py-2 text-white"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

