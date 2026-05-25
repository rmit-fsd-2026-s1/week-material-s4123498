import type { LaptopModel, LoanRequest } from "../types/types";

const API_BASE_URL = "http://localhost:3001/api";

export async function getLaptopModels(): Promise<LaptopModel[]> {
  const response = await fetch(`${API_BASE_URL}/laptops`);

  if (!response.ok) {
    throw new Error("Could not load laptop models");
  }

  return response.json();
}

export async function getLoanRequests(): Promise<LoanRequest[]> {
  const response = await fetch(`${API_BASE_URL}/loan-requests`);

  if (!response.ok) {
    throw new Error("Could not load loan requests");
  }

  return response.json();
}

export async function postLoanRequest(
  request: LoanRequest
): Promise<LoanRequest> {
  const response = await fetch(`${API_BASE_URL}/loan-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Could not submit loan request");
  }

  return response.json();
}
