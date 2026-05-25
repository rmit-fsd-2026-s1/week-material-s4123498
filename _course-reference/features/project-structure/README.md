# Project Structure Reference

Use this when you first open a test starter project and need to organise files quickly.

## Simple A3 Structure

```text
src/
  api/
    api.ts
  components/
    Header.tsx
    BookingForm.tsx
    BookingList.tsx
    QuoteSummary.tsx
    Footer.tsx
  pages/
    index.tsx
    booking-form.tsx
    bookings.tsx
  types/
    types.ts
  context/
    QuoteContext.tsx
  utils/
    validation.ts
  tests/
    validation.test.ts
  App.tsx
  main.tsx
  index.css
```

## Vite React Structure

Use this if the starter project has `vite.config.ts`.

```text
src/
  api/
    api.ts
  components/
    Header.tsx
    LoanRequestForm.tsx
  pages/
    index.tsx
    loan-request.tsx
    requests.tsx
  types/
    types.ts
  utils/
    validation.ts
  tests/
    api.test.ts
    validation.test.ts
  App.tsx
  main.tsx
  index.css
```

Important:

```text
Vite does not auto-route src/pages.
You must connect pages in App.tsx with React Router or a manual path switch.
```

Open this file for a full Vite map:

```text
_course-reference/features/project-structure/vite-file-map-reference.ts
```

## What Goes Where

### `api/`

Put REST API functions here.

Examples:

- `postQuote(formData)`
- `getQuote(id)`
- `getBookings()`

Do not put JSX in this folder. Use `.ts`, not `.tsx`.

Correct imports:

```ts
import type { LoanRequest, LaptopModel } from "../types/types";
```

### `components/`

Put visual React components here.

Examples:

- form component
- result/summary component
- header/footer
- layout sections

### `context/`

Put shared state here when more than one component needs the same data.

Good shared data:

- latest quote result
- submitted form summary
- selected option
- reset/update function

### `utils/`

Put pure helper functions here.

Good helper functions:

- validation
- calculation
- formatting
- data transformation

These are the easiest files to unit test.

Correct imports:

```ts
import type { LoanRequest } from "../types/types";
```

### `tests/`

Put unit tests here.

Good test targets:

- validation helper
- calculation helper
- formatting helper
- API response transformation helper

## Fast Build Order

1. `App.tsx`: render header, two-column main area, footer.
2. Form component: fields and controlled state.
3. Validation helper or validation inside submit.
4. API file: separate function for request.
5. Result component: shows empty/result/error state.
6. Context if shared state is required.
7. Unit test for one meaningful helper.

## Import Examples

```ts
import { postQuote } from "../api/api";
import { validateBookingForm } from "../utils/validation";
import QuoteSummary from "./QuoteSummary";
```

## Common Wrong vs Right

### Types Import

Wrong:

```ts
import LoanRequest from "../types/types";
```

Right:

```ts
import type { LoanRequest } from "../types/types";
```

Reason:

```text
types.ts usually exports named types, not default exports.
```

### API Type Path

Wrong inside `src/api/api.ts`:

```ts
import type { LoanRequest } from "./types/types";
```

Right:

```ts
import type { LoanRequest } from "../types/types";
```

Reason:

```text
api.ts is inside src/api, so ../types/types means go back to src, then into types.
```

### API Function Use

If `api.ts` already does `response.json()`, the component should not do it again.

Wrong:

```ts
const response = await getLoanRequests();
const data = await response.json();
```

Right:

```ts
const data = await getLoanRequests();
setLoanRequests(data);
```

### Form Submit

Wrong:

```ts
setErrors(errors);
postLoanRequest(formData);
```

Right:

```ts
const errors = validateLoanRequest(formData);
setErrors(errors);

if (errors.length > 0) {
  return;
}

await postLoanRequest(formData);
```

### LocalStorage

Submit page saves:

```ts
localStorage.setItem("loanRequests", JSON.stringify(updatedRequests));
```

List page reads:

```ts
const saved = localStorage.getItem("loanRequests");
const requests = saved ? JSON.parse(saved) : [];
```

## How Files Link Together

Open this file when you forget how the form, validation, API, parent state, and summary component connect:

```text
_course-reference/features/project-structure/how-files-link-together.tsx
```

Flow:

```text
BookingForm state -> validateBookingForm -> postQuote -> onQuoteReceived -> parent state -> QuoteSummary
```

## File Extension Rule

- Use `.tsx` for files that return JSX.
- Use `.ts` for API files, validation helpers, types, and tests with no JSX.
