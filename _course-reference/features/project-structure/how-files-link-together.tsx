// QUICK CONNECTION MAP FOR A3-STYLE REACT APPS
//
// This is a reference skeleton showing how the main files link together.
// You would normally split this into separate files:
//
// src/components/MainContent.tsx
// src/components/BookingForm.tsx
// src/components/QuoteSummary.tsx
// src/api/api.ts
// src/utils/validation.ts
//
// Main idea:
// MainContent owns the quote result state.
// BookingForm submits data and sends the result upward.
// QuoteSummary receives the result and displays it.

import { type FormEvent, useState } from "react";

// In a real project, import these from your own files:
// import { postQuote, type QuoteResult } from "../api/api";
// import { validateBookingForm, type BookingFormData } from "../utils/validation";

type BookingFormData = {
  organiserName: string;
  email: string;
  eventDate: string;
  numberOfGuests: number;
  roomType: "Standard" | "Premium" | "ConferenceHall" | "";
  cateringOption: "None" | "LightRefreshments" | "FullCatering" | "";
  eventDuration: number;
};

type QuoteResult = {
  baseRoomCost: number;
  cateringCost: number;
  totalEstimatedCost: number;
  quoteReferenceNumber: string;
};

type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (data.organiserName.trim() === "") {
    errors.organiserName = "Organiser name is required";
  }

  if (!data.email.includes("@") || !data.email.includes(".")) {
    errors.email = "Email must look valid";
  }

  if (data.numberOfGuests < 10 || data.numberOfGuests > 500) {
    errors.numberOfGuests = "Guests must be between 10 and 500";
  }

  if (data.roomType === "") {
    errors.roomType = "Room type is required";
  }

  return errors;
}

async function postQuote(data: BookingFormData): Promise<QuoteResult> {
  // In the real app this function belongs in src/api/api.ts.
  // The component should not know how the API calculates or fetches the quote.
  const roomRate = data.roomType === "Premium" ? 120 : data.roomType === "ConferenceHall" ? 200 : 80;
  const cateringRate =
    data.cateringOption === "FullCatering" ? 35 : data.cateringOption === "LightRefreshments" ? 15 : 0;

  const baseRoomCost = roomRate * data.eventDuration;
  const cateringCost = cateringRate * data.numberOfGuests;

  return {
    baseRoomCost,
    cateringCost,
    totalEstimatedCost: baseRoomCost + cateringCost,
    quoteReferenceNumber: "Q-12345",
  };
}

export function MainContentExample() {
  // Parent owns the result because the form and summary are sibling components.
  // If Form owns this state, QuoteSummary cannot see it directly.
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <section>
        {/* Passing setQuoteResult gives BookingForm a way to send data upward. */}
        <BookingForm onQuoteReceived={setQuoteResult} />
      </section>

      <section>
        {/* QuoteSummary only displays data. It does not submit the form. */}
        <QuoteSummary result={quoteResult} />
      </section>
    </main>
  );
}

type BookingFormProps = {
  // Function prop meaning:
  // "When the form receives a quote result, call this function and pass it up."
  onQuoteReceived: (result: QuoteResult) => void;
};

function BookingForm({ onQuoteReceived }: BookingFormProps) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 1. Validate first. Do not call API if validation fails.
    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // 2. API call second. Use loading/error state for rubric marks.
    try {
      setIsLoading(true);
      setApiError("");

      const result = await postQuote(formData);

      // 3. Send result to parent.
      // This updates quoteResult inside MainContentExample.
      onQuoteReceived(result);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Organiser name
        <input
          value={formData.organiserName}
          onChange={(event) => setFormData({ ...formData, organiserName: event.target.value })}
        />
      </label>
      {errors.organiserName && <p>{errors.organiserName}</p>}

      {/* Add the rest of the fields with the same pattern:
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
      */}

      {apiError && <p>{apiError}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Calculating..." : "Get quote"}
      </button>
    </form>
  );
}

type QuoteSummaryProps = {
  result: QuoteResult | null;
};

function QuoteSummary({ result }: QuoteSummaryProps) {
  if (result === null) {
    return <p>No quote yet. Submit the form to calculate a quote.</p>;
  }

  return (
    <div>
      <p>Reference: {result.quoteReferenceNumber}</p>
      <p>Room cost: ${result.baseRoomCost}</p>
      <p>Catering: ${result.cateringCost}</p>
      <p>Total: ${result.totalEstimatedCost}</p>
    </div>
  );
}
