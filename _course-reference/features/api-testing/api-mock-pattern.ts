// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/api/api.ts
//
// WHY THIS FILE EXISTS:
// The assignment says a REST API service will be provided. In practice, your UI
// should call a function from an API file instead of doing the API work directly
// inside the component.
//
// HOW IT LINKS TO THE REST OF THE APP:
// 1. Form.tsx imports postQuote from "../api/api".
// 2. Form.tsx calls await postQuote(formData) after validation passes.
// 3. postQuote returns a QuoteResult.
// 4. Form.tsx sends that result to the parent with onQuoteReceived(result).
// 5. MainContent/App stores the result in state.
// 6. QuoteSummary receives the result as a prop and displays it.
//
// Example import inside Form.tsx:
// import { postQuote, type QuoteResult } from "../api/api";
//
// This version is a mock backend for practice. If the real test gives you an
// actual URL, use the fetch pattern in api-real-fetch-pattern.ts instead.

export type QuoteRequest = {
  numberOfGuests: number;
  roomType: "Standard" | "Premium" | "ConferenceHall";
  cateringOption: "None" | "LightRefreshments" | "FullCatering";
  eventDuration: number;
};

export type QuoteResult = {
  baseRoomCost: number;
  cateringCost: number;
  totalEstimatedCost: number;
  quoteReferenceNumber: string;
};

const roomRates: Record<QuoteRequest["roomType"], number> = {
  Standard: 80,
  Premium: 120,
  ConferenceHall: 200,
};

const cateringRates: Record<QuoteRequest["cateringOption"], number> = {
  None: 0,
  LightRefreshments: 15,
  FullCatering: 35,
};

export async function postQuote(data: QuoteRequest): Promise<QuoteResult> {
  // Simulates network delay so you can practise loading spinners/messages.
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulates a backend validation/error response.
  // In Form.tsx, catch this error and show it in an error message.
  if (data.roomType === "ConferenceHall" && data.numberOfGuests > 300) {
    throw new Error("Conference Hall bookings over 300 guests require manual approval.");
  }

  // This is the "backend calculation" for the practice scenario.
  // In the real test, the backend may calculate this and return JSON instead.
  const baseRoomCost = roomRates[data.roomType] * data.eventDuration;
  const cateringCost = cateringRates[data.cateringOption] * data.numberOfGuests;

  return {
    baseRoomCost,
    cateringCost,
    totalEstimatedCost: baseRoomCost + cateringCost,
    quoteReferenceNumber: `Q-${Date.now()}`,
  };
}
