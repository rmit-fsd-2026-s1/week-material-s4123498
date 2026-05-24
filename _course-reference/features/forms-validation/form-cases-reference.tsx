// FORM CASES REFERENCE
//
// Use this file to remember how each input type connects to React state.
//
// Main controlled component rule:
// input value comes from state, and onChange updates state.

import { type ChangeEvent, type FormEvent, useState } from "react";

type FormData = {
  organiserName: string;
  email: string;
  eventDate: string;
  numberOfGuests: number;
  roomType: string;
  cateringOption: string;
  needsProjector: boolean;
  notes: string;
};

export default function FormCasesReference() {
  const [formData, setFormData] = useState<FormData>({
    organiserName: "",
    email: "",
    eventDate: "",
    numberOfGuests: 0,
    roomType: "",
    cateringOption: "None",
    needsProjector: false,
    notes: "",
  });

  function handleTextChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    // Works for text, email, date, and textarea fields.
    // The input name must match the formData key.
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // Number inputs still give you a string from event.target.value.
    // Convert it with Number(...).
    setFormData((current) => ({
      ...current,
      [name]: Number(value),
    }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;

    // Checkbox uses checked, not value.
    setFormData((current) => ({
      ...current,
      [name]: checked,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Submit flow:
    // 1. validate formData
    // 2. if invalid, show errors and return
    // 3. if valid, call API
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block font-medium">Organiser name</span>
        <input
          name="organiserName"
          value={formData.organiserName}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Event date</span>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Number of guests</span>
        <input
          type="number"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleNumberChange}
          className="w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Room type</span>
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleSelectChange}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Select room</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="ConferenceHall">Conference Hall</option>
        </select>
      </label>

      <fieldset className="space-y-2">
        <legend className="font-medium">Catering option</legend>

        {["None", "LightRefreshments", "FullCatering"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="cateringOption"
              value={option}
              checked={formData.cateringOption === option}
              onChange={handleTextChange}
            />
            {option}
          </label>
        ))}
      </fieldset>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="needsProjector"
          checked={formData.needsProjector}
          onChange={handleCheckboxChange}
        />
        Needs projector
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Notes</span>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        />
      </label>

      <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  );
}

