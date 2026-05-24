// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/api/api.ts
//
// USE THIS WHEN THE TEST GIVES YOU A REAL REST API URL.
//
// HOW IT LINKS TO THE REST OF THE APP:
// 1. Form.tsx imports postData or a wrapper such as postQuote.
// 2. Form.tsx calls the API inside handleSubmit after validation passes.
// 3. The API returns JSON.
// 4. Form.tsx passes that JSON back to the parent using onQuoteReceived(result).
//
// Recommended exam pattern:
// export function postQuote(data: QuoteRequest) {
//   return postData<QuoteRequest, QuoteResult>("/quotes", data);
// }

const baseURL = "http://localhost:3001/api";

export async function getData<T>(path: string): Promise<T> {
  // GET example:
  // const quote = await getData<QuoteResult>("/quotes/12345");
  const response = await fetch(`${baseURL}${path}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function postData<TRequest, TResponse>(
  path: string,
  body: TRequest
): Promise<TResponse> {
  // POST example:
  // const result = await postData<QuoteRequest, QuoteResult>("/quotes", formData);
  const response = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
