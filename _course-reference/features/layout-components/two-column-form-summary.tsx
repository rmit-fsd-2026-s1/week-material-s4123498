// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/components/MainContent.tsx
//
// USE THIS WHEN THE QUESTION SAYS:
// - two-column layout
// - left column form
// - right column result or summary
//
// HOW IT LINKS TO OTHER FILES:
// 1. App.tsx renders <Header />, <MainContent />, <Footer />.
// 2. MainContent renders the form and summary side by side.
// 3. MainContent owns quoteResult state because Form and QuoteSummary are siblings.
// 4. BookingForm sends the API result upward with onQuoteReceived.
// 5. QuoteSummary receives quoteResult as a prop.

import { useState } from "react";

// In your real project, import these from your components/api types:
// import BookingForm from "./BookingForm";
// import QuoteSummary from "./QuoteSummary";
// import type { QuoteResult } from "../api/api";

type QuoteResult = {
  quoteReferenceNumber: string;
  baseRoomCost: number;
  cateringCost: number;
  totalEstimatedCost: number;
};

export default function MainContent() {
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Booking Quote</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Quote form</h3>

          {/* Real version:
              <BookingForm onQuoteReceived={setQuoteResult} />

              The form calls onQuoteReceived(result) after the API succeeds.
          */}
          <p className="text-gray-600">Put your form component here.</p>
        </section>

        <section className="rounded border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Quote summary</h3>

          {/* Real version:
              <QuoteSummary result={quoteResult} />

              The summary displays "No quote yet" when result is null.
          */}
          {quoteResult === null ? (
            <p className="text-gray-600">No quote yet. Submit the form to calculate one.</p>
          ) : (
            <div className="space-y-2 text-gray-700">
              <p>Reference: {quoteResult.quoteReferenceNumber}</p>
              <p>Total: ${quoteResult.totalEstimatedCost}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

