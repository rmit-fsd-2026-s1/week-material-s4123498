import type { LoanRequest } from "../types/types";

export function validateLoanRequest(booking: LoanRequest): string[] {
    const errors: string[] = [];
    if (!booking.studentName.trim()) {
        errors.push("Student name is required.");
    } 
    if (!booking.studentEmail.trim()) {
        errors.push("Student email is required.");
    } 
    if (!/\S+@\S+\.\S+/.test(booking.studentEmail)) {
        errors.push("Student email is invalid.");
    }
    if (!booking.laptopModel.trim()) {
        errors.push("Laptop model is required.");
    }
    if (!booking.startDate.trim()) {
        errors.push("Start date is required.");
    }
    if (booking.numberOfDays <= 0) {
        errors.push("Number of days is required.");
    }
    if (!booking.reason.trim()) {
        errors.push("Reason is required.");
    } 

    return errors;
}
