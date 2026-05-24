// A3 FORM PATTERN: FORM + VALIDATION + API + CALLBACK TO PARENT
//
// WHERE TO PUT THIS:
// src/components/BookingForm.tsx
//
// HOW THIS LINKS TO OTHER FILES:
// MainContent.tsx:
//   const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
//   <BookingForm onQuoteReceived={setQuoteResult} />
//   <QuoteSummary result={quoteResult} />
//
// api/api.ts:
//   export async function postQuote(data: BookingFormData): Promise<QuoteResult> { ... }
//
// utils/validation.ts:
//   export function validateBookingForm(data: BookingFormData): BookingFormErrors { ... }

import { type ChangeEvent, type FormEvent, useState } from "react";

type BookingFormData = {
  organiserName: string;
  email: string;
  eventDate: string;
  numberOfGuests: number;
  roomType: "Standard" | "Premium" | "ConferenceHall" | "";
  cateringOption: "None" | "LightRefreshments" | "FullCatering" | "";
  eventDuration: number;
};

type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

type QuoteResult = {
  quoteReferenceNumber: string;
  baseRoomCost: number;
  cateringCost: number;
  totalEstimatedCost: number;
};

type BookingFormProps = {
  onQuoteReceived: (result: QuoteResult) => void;
};

function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (data.organiserName.trim() === "") errors.organiserName = "Organiser name is required";
  if (!data.email.includes("@")) errors.email = "Email must be valid";
  if (data.eventDate === "") errors.eventDate = "Event date is required";
  if (data.numberOfGuests < 10 || data.numberOfGuests > 500) {
    errors.numberOfGuests = "Guests must be between 10 and 500";
  }
  if (data.roomType === "") errors.roomType = "Room type is required";
  if (data.cateringOption === "") errors.cateringOption = "Catering option is required";
  if (data.eventDuration < 1 || data.eventDuration > 12) {
    errors.eventDuration = "Duration must be between 1 and 12";
  }

  return errors;
}

async function postQuote(data: BookingFormData): Promise<QuoteResult> {
  // In the real project, move this function to src/api/api.ts.
  const roomRate = data.roomType === "Premium" ? 120 : data.roomType === "ConferenceHall" ? 200 : 80;
  const cateringRate =
    data.cateringOption === "FullCatering" ? 35 : data.cateringOption === "LightRefreshments" ? 15 : 0;

  const baseRoomCost = roomRate * data.eventDuration;
  const cateringCost = cateringRate * data.numberOfGuests;

  return {
    quoteReferenceNumber: "Q-12345",
    baseRoomCost,
    cateringCost,
    totalEstimatedCost: baseRoomCost + cateringCost,
  };
}

export default function BookingForm({ onQuoteReceived }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    organiserName: "",
    email: "",
    eventDate: "",
    numberOfGuests: 0,
    roomType: "",
    cateringOption: "",
    eventDuration: 1,
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleTextChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: Number(value) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      setApiError("");

      const result = await postQuote(formData);

      // This is the important link to the summary component.
      // Parent receives result, stores it in state, then passes it to QuoteSummary.
      onQuoteReceived(result);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Could not submit quote");
    } finally {
      setIsSubmitting(false);
    }
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
        {errors.organiserName && <p className="mt-1 text-sm text-red-600">{errors.organiserName}</p>}
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
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
        {errors.eventDate && <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>}
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
        {errors.numberOfGuests && <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Room type</span>
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Select room</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="ConferenceHall">Conference Hall</option>
        </select>
        {errors.roomType && <p className="mt-1 text-sm text-red-600">{errors.roomType}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Catering option</span>
        <select
          name="cateringOption"
          value={formData.cateringOption}
          onChange={handleTextChange}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Select catering</option>
          <option value="None">None</option>
          <option value="LightRefreshments">Light Refreshments</option>
          <option value="FullCatering">Full Catering</option>
        </select>
        {errors.cateringOption && <p className="mt-1 text-sm text-red-600">{errors.cateringOption}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block font-medium">Event duration in hours</span>
        <input
          type="number"
          name="eventDuration"
          value={formData.eventDuration}
          onChange={handleNumberChange}
          className="w-full rounded border px-3 py-2"
        />
        {errors.eventDuration && <p className="mt-1 text-sm text-red-600">{errors.eventDuration}</p>}
      </label>

      {apiError && <p className="rounded bg-red-50 p-3 text-red-700">{apiError}</p>}

      <button type="submit" disabled={isSubmitting} className="w-full rounded bg-blue-700 px-4 py-2 text-white">
        {isSubmitting ? "Calculating..." : "Get quote"}
      </button>
    </form>
  );
}

