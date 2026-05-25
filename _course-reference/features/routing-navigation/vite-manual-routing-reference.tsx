// VITE MANUAL ROUTING FAST REFERENCE
//
// USE THIS WHEN:
// - the project is Vite React, not Next.js
// - you do not want to install React Router
// - you only need a few simple pages
//
// IMPORTANT:
// In Vite, src/pages/index.tsx does not automatically become "/".
// The folder name "pages" is only for organisation.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Index from "./pages/index";
import LoanRequest from "./pages/loan-request";
import Requests from "./pages/requests";
import "./index.css";

function App() {
  const path = window.location.pathname;

  return (
    <>
      <Header />

      {path === "/" && <Index />}
      {path === "/loan-request" && <LoanRequest />}
      {path === "/requests" && <Requests />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export function HeaderExample() {
  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/loan-request">Loan Request</a>
        <a href="/requests">Requests</a>
      </nav>
    </header>
  );
}

