# Routing And Navigation Reference

Use this folder when the task asks for multiple pages, navigation links, or redirecting after login/form submit.

## Which File To Open

- `next-link-use-router-reference.tsx`: Next.js `Link`, active nav state, and `router.push`.
- `vite-react-router-reference.tsx`: Vite React routing with React Router.
- `vite-manual-routing-reference.tsx`: Vite React routing without installing a router.

## Fast Memory

```text
Link             -> user clicks to move between pages
useRouter        -> code redirects after an action
router.push("/") -> send user to another page
```

## Next vs Vite Warning

```text
Next.js:
src/pages/index.tsx automatically becomes route "/"

Vite React:
src/pages/index.tsx is only a normal file.
Routes do not exist unless you create them with React Router or your own route switch.
```

Avoid relative links like this:

```tsx
<a href="./pages/index">Home</a>
```

That can create repeated URLs like:

```text
/pages/pages/pages/index
```

Use absolute paths instead:

```tsx
<a href="/">Home</a>
```

## Common Patterns

```ts
import Link from "next/link";
import { useRouter } from "next/router";
```

```ts
const router = useRouter();
router.push("/dashboard");
```

