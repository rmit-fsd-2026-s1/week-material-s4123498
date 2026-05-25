// COMPONENT API CALL FAST REFERENCE
//
// USE THIS WHEN:
// - the component must GET data when the page opens
// - the component must POST form data when the user clicks submit
// - you need loading, error, and result state for rubric marks
//
// IMPORTANT:
// - GET on page load belongs in useEffect.
// - POST after a button click belongs in handleSubmit, not useEffect.

import { type FormEvent, useEffect, useState } from "react";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export default function ApiComponentExample() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadMessages() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch("http://localhost:3001/api/messages");

        if (!response.ok) {
          throw new Error("Could not load messages");
        }

        const data: ContactMessage[] = await response.json();
        setMessages(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.name.trim() === "" || formData.email.trim() === "" || formData.message.trim() === "") {
      setErrorMessage("Please complete every field");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch("http://localhost:3001/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Could not send message");
      }

      const savedMessage: ContactMessage = await response.json();

      setMessages((currentMessages) => [savedMessage, ...currentMessages]);
      setFormData(emptyForm);
      setSuccessMessage("Message sent successfully");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="space-y-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span>Name</span>
          <input
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="block w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span>Email</span>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="block w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span>Message</span>
          <textarea
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="block w-full rounded border px-3 py-2"
          />
        </label>

        <button type="submit" disabled={isSubmitting} className="rounded bg-blue-700 px-4 py-2 text-white">
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-700">{successMessage}</p>}

      <section>
        <h2 className="text-xl font-bold">Messages</h2>
        {isLoading && <p>Loading messages...</p>}
        {!isLoading && messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((message) => (
          <article key={message.id} className="rounded border p-4">
            <h3 className="font-bold">{message.name}</h3>
            <p>{message.email}</p>
            <p>{message.message}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
