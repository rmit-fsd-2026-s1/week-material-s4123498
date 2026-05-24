// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/tests/api.test.ts
//
// WHAT THIS TEST CONNECTS TO:
// This imports postQuote from src/api/api.ts.
// If your API file talks to a real backend, testing it may be harder during A3.
// For the test, it is often safer to unit test a pure validation or calculation
// helper. Use this file when your API function is mockable or calculation-based.

import { describe, expect, it } from "vitest";
import { postQuote } from "./api-mock-pattern";

describe("postQuote", () => {
  it("calculates a quote result for a valid booking request", async () => {
    // This checks the API/helper logic for one normal valid booking.
    // Standard room: 80 per hour * 3 hours = 240
    // Light refreshments: 15 per guest * 20 guests = 300
    const result = await postQuote({
      numberOfGuests: 20,
      roomType: "Standard",
      cateringOption: "LightRefreshments",
      eventDuration: 3,
    });

    expect(result.baseRoomCost).toBe(240);
    expect(result.cateringCost).toBe(300);
    expect(result.totalEstimatedCost).toBe(540);
    expect(result.quoteReferenceNumber).toContain("Q-");
  });

  it("rejects a conference hall booking over 300 guests", async () => {
    // This checks the failure path, which is useful for API error handling.
    await expect(
      postQuote({
        numberOfGuests: 350,
        roomType: "ConferenceHall",
        cateringOption: "FullCatering",
        eventDuration: 4,
      })
    ).rejects.toThrow("manual approval");
  });
});
