import { validateLoanRequest } from "../utils/validation";
import type { LoanRequest } from "../types/types";
import { describe, expect, it } from "vitest";

describe("validateLoanRequest", () => {
    it("should return an empty array for a valid loan request", () => {
        const validRequest: LoanRequest = {
            id: 1,
            studentName: "John Doe", studentEmail: "example@example.com", laptopModel: "Dell XPS 13",
            startDate: "2023-10-01",
            numberOfDays: 5,
            reason: "Need for project work"
        };

        const errors = validateLoanRequest(validRequest);
        expect(errors).toEqual([]);
    });
});

describe("validateLoanRequest", () => {
    it("should return errors for an invalid loan request", () => {
        const invalidRequest: LoanRequest = {
            id: 1,
            studentName: "",
            studentEmail: "",
            laptopModel: "",
            startDate: "",
            numberOfDays: 0,
            reason: ""
        };

        const errors = validateLoanRequest(invalidRequest);
        expect(errors).toEqual([
            "Student name is required.",
            "Student email is required.",
            "Student email is invalid.",
            "Laptop model is required.",
            "Start date is required.",
            "Number of days is required.",
            "Reason is required.",
        ]);
    });
});


