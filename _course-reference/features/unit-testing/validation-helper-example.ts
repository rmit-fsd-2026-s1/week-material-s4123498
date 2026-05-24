// WHERE TO PUT THIS IN YOUR TEST PROJECT:
// src/utils/validation.ts
//
// WHY THIS FILE EXISTS:
// Keep validation outside the Form component so the rules are easy to read,
// reuse, and unit test. This file has no React code, no JSX, and no API call.
//
// HOW IT LINKS TO THE REST OF THE APP:
// 1. Form.tsx imports validateBookingForm.
// 2. Form.tsx builds a BookingFormData object from state.
// 3. Form.tsx calls validateBookingForm(formData) inside handleSubmit.
// 4. If errors object is not empty, show messages and do not call the API.
// 5. validation.test.ts imports this same function and tests the rules.
//
// Example import inside Form.tsx:
// import { validateBookingForm, type BookingFormData } from "../utils/validation";

export type BookingFormData = {
  organiserName: string;
  email: string;
  eventDate: string;
  numberOfGuests: number;
  roomType: string;
  cateringOption: string;
  eventDuration: number;
};

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  // Each if-statement checks one form rule.
  // The key name must match the form field name so Form.tsx can show
  // errors.organiserName, errors.email, errors.numberOfGuests, etc.
  if (data.organiserName.trim() === "") {
    errors.organiserName = "Organiser name is required";
  }

  if (!data.email.includes("@") || !data.email.includes(".")) {
    errors.email = "Email must look valid";
  }

  if (data.eventDate === "") {
    errors.eventDate = "Event date is required";
  }

  if (data.numberOfGuests < 10 || data.numberOfGuests > 500) {
    errors.numberOfGuests = "Guests must be between 10 and 500";
  }

  if (data.roomType === "") {
    errors.roomType = "Room type is required";
  }

  if (data.cateringOption === "") {
    errors.cateringOption = "Catering option is required";
  }

  if (data.eventDuration < 1 || data.eventDuration > 12) {
    errors.eventDuration = "Duration must be between 1 and 12";
  }

  // Empty object means valid form.
  // Example in Form.tsx:
  // const errors = validateBookingForm(formData);
  // if (Object.keys(errors).length > 0) return;
  return errors;
}
