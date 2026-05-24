// Google Books API code example 
// Programmed by: Matt
// Updated by: dipto-pratyaksa-rmit on 10/4/2026
// This code defines a React component that allows users to search for books using the Google Books API. 
// It includes a custom hook to manage the asynchronous search functionality and state management for loading and error handling. 
// The component renders a search form and displays the results in a grid format, showing book thumbnails, titles, and authors when available.

import { useState } from "react";

// Define the shape of a book object returned by the Google Books API
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

// Define the shape of what our custom hook returns
interface UseAsyncHookResult {
  results: Book[];
  loading: boolean;
  error: string | null;
  search: (term: string) => void;
}

// Custom hook that manages the book search functionality
const useAsyncHook = (): UseAsyncHookResult => {
  // State management for the search results, loading state, and any errors
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to perform the book search
  const search = async (term: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Read the API URL from environment variables NEXT_PUBLIC_ prefix is required for client-side access
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Read the API key from environment variables
    const apiAnyOtherEnvVariable = process.env.NEXT_PUBLIC_ANY_OTHER_ENV_VARIABLE; // Read any other environment variable for demonstration

    console.log("NEXT_PUBLIC_ANY_OTHER_ENV_VARIABLE:", apiAnyOtherEnvVariable ); // Log the API URL to verify it's being read correctly
    console.log("NEXT_PUBLIC_REACT_APP_BOOKS_API_URL:", apiUrl ); // Log the API URL to verify it's being read correctly

    if (!term) return;

    // Set loading state to true and clear any previous errors
    setLoading(true);
    setError(null);

    try {
      // Make the API call to Google Books
      const response = await fetch(
        `${apiUrl}=${encodeURIComponent(// Encode the search
          term // Ensure the search term is properly encoded for use in a URL
        )}&key=${apiKey}` // Ensure the API key is included in the request
        // Note: In a real application, you should handle API keys securely and not expose them in client-side code. Consider using a backend proxy to keep your API key safe.
        // For this example, we're including it directly for simplicity, but be cautious in production environments.
      );
      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch books");
      }

      // Update the results state with the fetched books
      setResults(data.items || []);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      // Always set loading back to false when done
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};

export default function Home() {
  // Initialize the custom hook and local search term state
  const { results, loading, error, search } = useAsyncHook();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Google Books Search</h1>

      {/* Search form with input and submit button */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display any errors that occur */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Grid of book results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((book) => (
          <div key={book.id} className="border p-4 rounded">
            {/* Display book thumbnail if available */}
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-32 h-48 object-cover mb-2"
              />
            )}
            {/* Display book title and authors */}
            <h2 className="font-bold">{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && (
              <p className="text-sm text-white">
                By {book.volumeInfo.authors.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
