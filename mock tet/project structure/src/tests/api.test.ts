import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  getLaptopModels,
  getLoanRequests,
  postLoanRequest,
} from "../api/api";

describe("api functions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getLaptopModels returns laptop models from API", async () => {
    const mockLaptops = [
      { id: 1, name: "Dell Latitude", dailyRate: 8 },
      { id: 2, name: "MacBook Air", dailyRate: 15 },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockLaptops,
      })
    );

    const result = await getLaptopModels();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/laptops");
    expect(result).toEqual(mockLaptops);
  });

  it("getLoanRequests returns loan requests from API", async () => {
    const mockRequests = [
      {
        id: 1,
        studentName: "Alex",
        studentEmail: "alex@example.com",
        laptopModel: "Dell Latitude",
        startDate: "2026-05-25",
        numberOfDays: 5,
        reason: "Assignment work",
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRequests,
      })
    );

    const result = await getLoanRequests();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/loan-requests"
    );
    expect(result).toEqual(mockRequests);
  });

  it("postLoanRequest sends a POST request", async () => {
    const request = {
      id: 1,
      studentName: "Alex",
      studentEmail: "alex@example.com",
      laptopModel: "MacBook Air",
      startDate: "2026-05-25",
      numberOfDays: 3,
      reason: "Need laptop for test practice",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => request,
      })
    );

    const result = await postLoanRequest(request);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/loan-requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    expect(result).toEqual(request);
  });

  it("throws an error when API response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    await expect(getLaptopModels()).rejects.toThrow(
      "Could not load laptop models"
    );
  });
});