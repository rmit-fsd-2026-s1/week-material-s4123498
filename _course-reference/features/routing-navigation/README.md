# Routing And Navigation Reference

Use this folder when the task asks for multiple pages, navigation links, or redirecting after login/form submit.

## Which File To Open

- `next-link-use-router-reference.tsx`: Next.js `Link`, active nav state, and `router.push`.

## Fast Memory

```text
Link             -> user clicks to move between pages
useRouter        -> code redirects after an action
router.push("/") -> send user to another page
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

