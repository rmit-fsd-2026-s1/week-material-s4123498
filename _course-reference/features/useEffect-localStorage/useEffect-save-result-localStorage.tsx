// USEEFFECT PATTERN: SAVE RESULT WHEN IT CHANGES
//
// Use this when the app should remember the latest quote/result.
// This is not required for every A3 question, but it is a useful pattern.

import { useEffect, useState } from "react";

type QuoteResult = {
  quoteReferenceNumber: string;
  totalEstimatedCost: number;
};

export default function SaveLatestQuoteExample() {
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  useEffect(() => {
    if (quoteResult !== null) {
      localStorage.setItem("latestQuote", JSON.stringify(quoteResult));
    }
  }, [quoteResult]);

  function createFakeQuote() {
    // In the real app, this would be the result returned from your API call.
    setQuoteResult({
      quoteReferenceNumber: "Q-12345",
      totalEstimatedCost: 540,
    });
  }

  return (
    <div>
      <button type="button" onClick={createFakeQuote}>
        Create quote
      </button>

      {quoteResult && <p>Saved latest quote: {quoteResult.quoteReferenceNumber}</p>}
    </div>
  );
}

