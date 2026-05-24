import type { BookingFormData } from "../utils/validation";

export type QuoteResult = {
  quoteReferenceNumber: string;
  baseRoomCost: number;
  cateringCost: number;
  totalEstimatedCost: number;
};

const roomRates: Record<Exclude<BookingFormData["roomType"], "">, number> = {
  Standard: 80,
  Premium: 120,
  ConferenceHall: 200,
};

const cateringRates: Record<Exclude<BookingFormData["cateringOption"], "">, number> = {
  None: 0,
  LightRefreshments: 15,
  FullCatering: 35,
};

export async function postQuote(data: BookingFormData): Promise<QuoteResult> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (data.roomType === "" || data.cateringOption === "") {
    throw new Error("Room and catering are required");
  }

  const baseRoomCost = roomRates[data.roomType] * data.eventDuration;
  const cateringCost = cateringRates[data.cateringOption] * data.numberOfGuests;

  return {
    quoteReferenceNumber: `Q-${Date.now()}`,
    baseRoomCost,
    cateringCost,
    totalEstimatedCost: baseRoomCost + cateringCost,
  };
}

