import Header from "./components/Header";
import Index from "./pages/index";
import LoanRequest from "./pages/loan-request";
import Requests from "./pages/requests";

export default function App() {
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

