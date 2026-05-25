# Vite React Project Structure Setup

Use this folder as the starter pattern for Assignment 3 style practice projects.

This template uses:

```text
Vite
React
TypeScript
Tailwind CSS v4
Vitest
React Testing Library
```

## Folder Map

```text
project structure/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  src/
    api/
      api.ts
    components/
      Header.tsx
      MainContent.tsx
      Footer.tsx
    tests/
      api.test.ts
      setup.ts
    utils/
      validation.ts
    App.tsx
    main.tsx
    index.css
```

## Setup Commands

Run commands from the project folder that contains `package.json`.

```powershell
cd "C:\Users\user\OneDrive\桌面\RMIT\semester 4\web dev meterail\week-material-s4123498\_course-reference\project structure"
npm install
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173
```

## Common Commands

```powershell
npm install
```

Installs dependencies from `package.json`.

```powershell
npm run dev
```

Starts the Vite development server.

```powershell
npm run build
```

Checks TypeScript and creates a production build.

```powershell
npm run test
```

Runs Vitest in watch mode.

```powershell
npm run test:run
```

Runs tests once. Use this for final checking.

```powershell
npm run preview
```

Previews the production build after `npm run build`.

## Tailwind CSS Setup

This template uses Tailwind CSS v4.

Already installed in `package.json`:

```json
"tailwindcss": "^4.1.12",
"@tailwindcss/vite": "^4.1.12"
```

Already connected in `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Already imported in `src/index.css`:

```css
@import "tailwindcss";
```

With Tailwind v4, you do not need a `tailwind.config.ts` file for basic class usage.

Example Tailwind classes:

```tsx
<main className="mx-auto max-w-6xl p-8">
  <h1 className="text-3xl font-bold text-gray-900">Title</h1>
</main>
```

## Testing Setup

Testing is already configured with Vitest and jsdom.

Installed in `package.json`:

```json
"vitest": "^3.2.4",
"jsdom": "^26.1.0",
"@testing-library/react": "^16.3.0",
"@testing-library/jest-dom": "^6.7.0",
"@testing-library/user-event": "^14.6.1"
```

Configured in `vite.config.ts`:

```ts
test: {
  environment: "jsdom",
  setupFiles: "./src/tests/setup.ts",
}
```

Configured in `src/tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Best quick test target:

```text
src/utils/validation.ts
```

Example test command:

```powershell
npm run test:run
```

## API File Rule

Put fetch logic in:

```text
src/api/api.ts
```

Example:

```ts
export async function getData() {
  const response = await fetch("http://localhost:3001/api/items");

  if (!response.ok) {
    throw new Error("Could not load data");
  }

  return response.json();
}
```

Component rule:

```text
api.ts does fetch + response.json()
component does state + display
```

When the business case gives an API URL, test it in Postman first:

```text
1. Confirm method: GET, POST, PUT, DELETE
2. Confirm full URL
3. Confirm request body for POST
4. Confirm response JSON shape
5. Copy the working URL/body into src/api/api.ts
```

More detailed reference:

```text
_course-reference/features/api-fetch-loading-error/api-endpoint-connection-checklist.md
```

## Validation File Rule

Put pure validation helpers in:

```text
src/utils/validation.ts
```

Example:

```ts
export function validateName(name: string): string[] {
  const errors: string[] = [];

  if (name.trim() === "") {
    errors.push("Name is required");
  }

  return errors;
}
```

## TypeScript File Rule

Use `.tsx` for files that return JSX:

```text
App.tsx
components/Header.tsx
pages/index.tsx
```

Use `.ts` for files with no JSX:

```text
api/api.ts
utils/validation.ts
tests/validation.test.ts
types/types.ts
```

## If `vitest` Is Not Recognized

You are probably in the wrong folder or dependencies are not installed.

Check you are in the folder with `package.json`:

```powershell
pwd
dir package.json
```

Then run:

```powershell
npm install
npm run test:run
```

## If Tailwind Classes Do Not Work

Check these three files:

```text
package.json            -> has tailwindcss and @tailwindcss/vite
vite.config.ts          -> has tailwindcss() plugin
src/index.css           -> has @import "tailwindcss";
```

## If Page Links Do Not Work

This is a Vite project, not Next.js.

```text
src/pages/index.tsx does not automatically become route "/"
```

Use one of these:

```text
Manual path switch in App.tsx
React Router with react-router-dom
```

Do not use relative links like:

```tsx
<a href="./pages/index">Home</a>
```

Use absolute paths:

```tsx
<a href="/">Home</a>
```
