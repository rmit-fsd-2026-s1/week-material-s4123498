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
    QuoteSummary.tsx
    Footer.tsx
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

## What Goes Where

### `api/`

Put REST API functions here.

Examples:

- `postQuote(formData)`
- `getQuote(id)`
- `getBookings()`

Do not put JSX in this folder. Use `.ts`, not `.tsx`.

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
