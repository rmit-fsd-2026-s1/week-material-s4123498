// VITE REACT ROUTER FAST REFERENCE
//
// USE THIS WHEN:
// - the project is Vite React
// - you are allowed to install react-router-dom
// - you want proper client-side navigation without full page reloads
//
// INSTALL:
// npm install react-router-dom

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import LoanRequest from "./pages/loan-request";
import Requests from "./pages/requests";
import "./index.css";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/loan-request">Loan Request</Link>
        <Link to="/requests">Requests</Link>
      </nav>
    </header>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/loan-request" element={<LoanRequest />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

