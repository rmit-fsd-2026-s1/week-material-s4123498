// LOCALSTORAGE FORM DRAFT FAST REFERENCE
//
// USE THIS WHEN:
// - the user types into a form
// - you want the form to survive refresh
// - you want a "clear saved draft" button
//
// IMPORTANT:
// - localStorage only exists in the browser.
// - Put localStorage reads/writes inside useEffect or event handlers.

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

type ProfileFormData = {
  fullName: string;
  email: string;
  studyGoal: string;
};

const STORAGE_KEY = "profileFormDraft";

const emptyForm: ProfileFormData = {
  fullName: "",
  email: "",
  studyGoal: "",
};

export default function LocalStorageFormDraftExample() {
  const [formData, setFormData] = useState<ProfileFormData>(emptyForm);
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);

    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      setStatusMessage("Draft loaded from localStorage");
    }

    setHasLoadedDraft(true);
  }, []);

  useEffect(() => {
    if (hasLoadedDraft) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, hasLoadedDraft]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Normal submit logic can go here:
    // validate -> call API -> show result.
    localStorage.removeItem(STORAGE_KEY);
    setStatusMessage("Form submitted and saved draft cleared");
  }

  function clearDraft() {
    setFormData(emptyForm);
    localStorage.removeItem(STORAGE_KEY);
    setStatusMessage("Saved draft cleared");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <label className="block">
        <span>Full name</span>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="block w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span>Study goal</span>
        <textarea
          name="studyGoal"
          value={formData.studyGoal}
          onChange={handleChange}
          className="block w-full rounded border px-3 py-2"
        />
      </label>

      <div className="flex gap-3">
        <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
          Submit
        </button>
        <button type="button" onClick={clearDraft} className="rounded border px-4 py-2">
          Clear draft
        </button>
      </div>

      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
}
