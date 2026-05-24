// USEEFFECT CASE REFERENCE
//
// useEffect is for side effects:
// - loading data from an API when the page opens
// - refetching when an ID/filter changes
// - saving to localStorage when state changes
// - setting up timers/listeners and cleaning them up
//
// Do not use useEffect just because something is "async".
// A form submit POST should usually happen inside handleSubmit, not useEffect.

import { type FormEvent, useEffect, useState } from "react";

type QuoteResult = {
  quoteReferenceNumber: string;
  totalEstimatedCost: number;
};

async function getQuoteById(quoteId: string): Promise<QuoteResult> {
  const response = await fetch(`http://localhost:3001/api/quotes/${quoteId}`);

  if (!response.ok) {
    throw new Error("Could not load quote");
  }

  return response.json();
}

export function Case1GetOnPageLoad() {
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Empty dependency array means:
    // run this once when the component first appears.
    async function loadQuote() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getQuoteById("12345");
        setQuote(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadQuote();
  }, []);

  if (isLoading) return <p>Loading quote...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (quote === null) return <p>No quote found.</p>;

  return <p>Total: ${quote.totalEstimatedCost}</p>;
}

export function Case2RefetchWhenIdChanges({ quoteId }: { quoteId: string }) {
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  useEffect(() => {
    // [quoteId] means:
    // run on first render, then run again whenever quoteId changes.
    async function loadQuote() {
      const data = await getQuoteById(quoteId);
      setQuote(data);
    }

    loadQuote();
  }, [quoteId]);

  return <p>{quote ? quote.quoteReferenceNumber : "Loading..."}</p>;
}

export function Case3SaveToLocalStorage({ quote }: { quote: QuoteResult | null }) {
  useEffect(() => {
    // [quote] means:
    // every time quote changes, save it.
    if (quote !== null) {
      localStorage.setItem("latestQuote", JSON.stringify(quote));
    }
  }, [quote]);

  return <p>Latest quote is saved when it changes.</p>;
}

export function Case4LoadFromLocalStorageOnce() {
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  useEffect(() => {
    // Load saved data once when page opens.
    const savedQuote = localStorage.getItem("latestQuote");

    if (savedQuote !== null) {
      setQuote(JSON.parse(savedQuote));
    }
  }, []);

  return <p>{quote ? quote.quoteReferenceNumber : "No saved quote"}</p>;
}

export function Case5TimerWithCleanup() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Setup side effect.
    const timerId = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    // Cleanup side effect.
    // This prevents old timers from staying alive after the component unmounts.
    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return <p>Seconds: {seconds}</p>;
}

export function NotForFormSubmit() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Correct place for POST after button click:
    // validate form -> call API -> set result
  }

  return <form onSubmit={handleSubmit}>Form fields here</form>;
}
