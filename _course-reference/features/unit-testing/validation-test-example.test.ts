// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/tests/validation.test.ts
//
// WHAT THIS TEST CONNECTS TO:
// This imports the pure helper from src/utils/validation.ts.
// It does not test the whole React form. That is okay for A3 because the rubric
// wants a meaningful unit test for logic, and validation logic is easy to prove.
//
// Vitest import:
// import { describe, expect, it } from "vitest";
//
// Jest is similar, but many Jest setups do not need this import.

import { describe, expect, it } from "vitest";
import { validateBookingForm } from "./validation-helper-example";

describe("validateBookingForm", () => {
  it("rejects invalid guest count and event duration", () => {
    // This test checks two business rules:
    // guests must be between 10 and 500, and duration must be between 1 and 12.
    const errors = validateBookingForm({
      organiserName: "Remy Martin",
      email: "remy@example.com",
      eventDate: "2026-05-25",
      numberOfGuests: 5,
      roomType: "Standard",
      cateringOption: "None",
      eventDuration: 13,
    });

    expect(errors.numberOfGuests).toBe("Guests must be between 10 and 500");
    expect(errors.eventDuration).toBe("Duration must be between 1 and 12");
  });

  it("returns no errors for a valid booking form", () => {
    // This test checks that a complete valid form can pass validation.
    const errors = validateBookingForm({
      organiserName: "Remy Martin",
      email: "remy@example.com",
      eventDate: "2026-05-25",
      numberOfGuests: 80,
      roomType: "Premium",
      cateringOption: "FullCatering",
      eventDuration: 4,
    });

    expect(errors).toEqual({});
  });
});
