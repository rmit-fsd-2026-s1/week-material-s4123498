// VALIDATION DISPLAY PATTERN
//
// Use this when you forget how to show field-level errors.
//
// Main idea:
// errors is an object.
// Each key matches one form field.
// Under each input, render the matching error if it exists.

import { type FormEvent, useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginData, string>>;

export default function ValidationDisplayPattern() {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});

  function validate(): LoginErrors {
    const nextErrors: LoginErrors = {};

    if (!formData.email.includes("@")) {
      nextErrors.email = "Email must be valid";
    }

    if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log("Valid form", formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span>Email</span>
        <input
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          className="w-full rounded border px-3 py-2"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </label>

      <label className="block">
        <span>Password</span>
        <input
          type="password"
          value={formData.password}
          onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          className="w-full rounded border px-3 py-2"
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </label>

      <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  );
}

