// NEXT ROUTING FAST REFERENCE
//
// USE THIS WHEN:
// - the app has multiple pages
// - the nav needs clickable links
// - the form/login should redirect after success
//
// FILE LOCATIONS IN A NEXT PROJECT:
// src/pages/index.tsx      -> route "/"
// src/pages/login.tsx      -> route "/login"
// src/pages/dashboard.tsx  -> route "/dashboard"
// src/components/NavBar.tsx

import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";

export function NavBarExample() {
  const router = useRouter();

  function linkClass(path: string) {
    return router.pathname === path ? "font-bold text-blue-700" : "text-gray-700";
  }

  return (
    <nav className="flex gap-4 border-b p-4">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>
      <Link href="/login" className={linkClass("/login")}>
        Login
      </Link>
      <Link href="/dashboard" className={linkClass("/dashboard")}>
        Dashboard
      </Link>
    </nav>
  );
}

export function LoginRedirectExample() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required");
      return;
    }

    // Replace this with real auth logic if the test provides it.
    const isLoginValid = username === "admin" && password === "password";

    if (!isLoginValid) {
      setErrorMessage("Invalid login details");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <label className="block">
        <span>Username</span>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="block w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="block w-full rounded border px-3 py-2"
        />
      </label>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
        Login
      </button>
    </form>
  );
}

