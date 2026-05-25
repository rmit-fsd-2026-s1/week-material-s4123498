// VITE FILE MAP FAST REFERENCE
//
// Use this when your project has vite.config.ts.
// Vite does not turn src/pages into routes automatically.
// You must connect the files yourself in App.tsx.

// FILE: src/types/types.ts
export type LaptopModel = {
  id: number;
  name: string;
  dailyRate: number;
};

export type LoanRequest = {
  id: number;
  studentName: string;
  studentEmail: string;
  laptopModel: string;
  startDate: string;
  numberOfDays: number;
  reason: string;
};

// FILE: src/api/api.ts
// import type { LaptopModel, LoanRequest } from "../types/types";
//
// const API_BASE_URL = "http://localhost:3001/api";
//
// export async function getLaptopModels(): Promise<LaptopModel[]> {
//   const response = await fetch(`${API_BASE_URL}/laptops`);
//   if (!response.ok) throw new Error("Could not load laptop models");
//   return response.json();
// }
//
// export async function postLoanRequest(request: LoanRequest): Promise<LoanRequest> {
//   const response = await fetch(`${API_BASE_URL}/loan-requests`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(request),
//   });
//   if (!response.ok) throw new Error("Could not submit loan request");
//   return response.json();
// }

// FILE: src/utils/validation.ts
// import type { LoanRequest } from "../types/types";
//
// export function validateLoanRequest(request: LoanRequest): string[] {
//   const errors: string[] = [];
//
//   if (request.studentName.trim() === "") errors.push("Student name is required.");
//   if (!request.studentEmail.includes("@")) errors.push("Student email is invalid.");
//   if (request.laptopModel === "") errors.push("Laptop model is required.");
//   if (request.startDate === "") errors.push("Start date is required.");
//   if (request.numberOfDays < 1 || request.numberOfDays > 14) {
//     errors.push("Number of days must be between 1 and 14.");
//   }
//   if (request.reason.trim().length < 10) {
//     errors.push("Reason must be at least 10 characters.");
//   }
//
//   return errors;
// }

// FILE: src/App.tsx
// import Header from "./components/Header";
// import Index from "./pages/index";
// import LoanRequest from "./pages/loan-request";
// import Requests from "./pages/requests";
//
// export default function App() {
//   const path = window.location.pathname;
//
//   return (
//     <>
//       <Header />
//       {path === "/" && <Index />}
//       {path === "/loan-request" && <LoanRequest />}
//       {path === "/requests" && <Requests />}
//     </>
//   );
// }

// FILE: src/components/Header.tsx
// export default function Header() {
//   return (
//     <nav>
//       <a href="/">Home</a>
//       <a href="/loan-request">Loan Request</a>
//       <a href="/requests">Requests</a>
//     </nav>
//   );
// }

// FILE: src/components/LoanRequestForm.tsx
// Import pattern:
// import { useEffect, useState } from "react";
// import { getLaptopModels, postLoanRequest } from "../api/api";
// import type { LaptopModel, LoanRequest } from "../types/types";
// import { validateLoanRequest } from "../utils/validation";
//
// Form flow:
// 1. useEffect loads laptop models.
// 2. select displays laptopModels.map(...).
// 3. handleSubmit validates.
// 4. if errors exist, return.
// 5. postLoanRequest submits.
// 6. save successful result to localStorage.

// FILE: src/pages/requests.tsx
// LocalStorage read pattern:
// const savedRequests = localStorage.getItem("loanRequests");
// const requests: LoanRequest[] = savedRequests ? JSON.parse(savedRequests) : [];

// FILE: src/tests/validation.test.ts
// import { describe, expect, it } from "vitest";
// import { validateLoanRequest } from "../utils/validation";

// FILE: src/tests/api.test.ts
// import { describe, expect, it, vi } from "vitest";
// import { getLaptopModels } from "../api/api";
// Mock fetch. Do not call the real API in a unit test.
