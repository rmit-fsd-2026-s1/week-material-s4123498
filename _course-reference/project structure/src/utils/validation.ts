export type BookingFormData = {
  organiserName: string;
  email: string;
  eventDate: string;
  numberOfGuests: number;
  roomType: "Standard" | "Premium" | "ConferenceHall" | "";
  cateringOption: "None" | "LightRefreshments" | "FullCatering" | "";
  eventDuration: number;
};

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

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

  return errors;
}

