# API Fetch Reference

Use this folder when a component needs to call an API and show loading, error, or result state.

## Which File To Open

- `api-component-get-post-reference.tsx`: smallest exam-style component with GET on page load and POST on form submit.
- `async-fetch-loading-error.tsx`: Google Books API example with a custom hook.
- `api-query-loading-error.tsx`: React Query example.

## Fast API Flow

```text
GET on page load:
useEffect -> async function -> fetch -> set state -> loading/error/result UI

POST from form:
onSubmit -> preventDefault -> validate -> fetch with method POST -> set result
```

## Memory Pattern

```ts
const response = await fetch("/api/items");

if (!response.ok) {
  throw new Error("Could not load data");
}

const data = await response.json();
```
