import { describe, expect, it } from "vitest";
import { postQuote } from "../api/api";

describe("postQuote", () => {
  it("calculates a quote result", async () => {
    const result = await postQuote({
      organiserName: "Remy Martin",
      email: "remy@example.com",
      eventDate: "2026-05-25",
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
});

