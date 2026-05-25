import type { LoanRequest, LaptopModel } from "../types/types";
import { useEffect, useState } from "react";
import { validateLoanRequest } from "../utils/validation";
import { postLoanRequest, getLaptopModels } from "../api/api";


type SubmissionStatus = "success" | "error" | "";

export default function From() {



    const [loanRequest, setLoanRequest] = useState<LoanRequest>({
        id: 0,
        studentName: "",
        studentEmail: "",
        laptopModel: "",
        startDate: "",
        numberOfDays: 0,
        reason: "",
    });

    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("");

    const [errors, setErrors] = useState<string[]>([]);
    const [resultMessage, setResultMessage] = useState<string>("");
    const [laptopModels, setLaptopModels] = useState<LaptopModel[]>([]);

    useEffect(() => {
        async function loadLaptopModels() {
            try {
                const models: LaptopModel[] = await getLaptopModels();
                if (models.length > 0) {
                    setLaptopModels(models);
                }
            } catch (error) {
                console.error("Error loading laptop models:", error);
            }
        }

        loadLaptopModels();
    }, []);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const validationErrors = validateLoanRequest(loanRequest);
        setErrors(validationErrors);
        if (validationErrors.length > 0) {
            console.error("Form has errors:", errors);
            return;
        }

        postLoanRequest(loanRequest)
            .then((response) => {
                console.log("Loan request submitted successfully:", response);
                setSubmissionStatus("success");
                setResultMessage(`Loan request submitted for ${response.studentName}.`)
            })
            .catch((error) => {
                console.error("Error submitting loan request:", error);
                setSubmissionStatus("error");
            });

    }



    return (
        <div>
            {submissionStatus === "success" && (
                <p className="text-green-500">{resultMessage}</p>
            )}

            {submissionStatus === "error" && (
                <p className="text-red-500">
                    Error submitting loan request. Please try again.
                    <a href="/loan-request" className="ml-2 text-blue-500 underline">Try again</a>
                </p>
            )}

            {submissionStatus === "" && (
                < form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="mb-1 block font-medium">Student name</span>
                        <input
                            name="studentName"
                            value={loanRequest.studentName}
                            onChange={(e) => setLoanRequest({ ...loanRequest, studentName: e.target.value })}
                            className="w-full rounded border px-3 py-2"

                        />
                        {errors.includes("Student name is required.") && (
                            <p className="text-red-500">Student name is required.</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="mb-1 block font-medium">Email</span>
                        <input
                            type="email"
                            name="studentEmail"
                            value={loanRequest.studentEmail}
                            onChange={(e) => setLoanRequest({ ...loanRequest, studentEmail: e.target.value })}
                            className="w-full rounded border px-3 py-2"

                        />
                        {errors.includes("Student email is required.") && (
                            <p className="text-red-500">Student email is required.</p>
                        )}
                        {errors.includes("Student email is invalid.") && (
                            <p className="text-red-500">Student email is invalid.</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="mb-1 block font-medium">Laptop Model</span>
                        <select
                            name="laptopModel"
                            value={loanRequest.laptopModel}
                            onChange={(e) =>
                                setLoanRequest({ ...loanRequest, laptopModel: e.target.value })
                            }
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="">Select laptop model</option>

                            {laptopModels.map((model) => (
                                <option key={model.id} value={model.name}>
                                    {model.name} - ${model.dailyRate}/day
                                </option>
                            ))}
                        </select>
                        {errors.includes("Laptop model is required.") && (
                            <p className="text-red-500">Laptop model is required.</p>
                        )}
                    </label>



                    <label className="block">
                        <span className="mb-1 block font-medium">Start Date</span>
                        <input
                            type="date"
                            name="startDate"
                            value={loanRequest.startDate}
                            onChange={(e) => setLoanRequest({ ...loanRequest, startDate: e.target.value })}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.includes("Start date is required.") && (
                            <p className="text-red-500">Start date is required.</p>
                        )}
                        {errors.includes("Start date format is invalid.") && (
                            <p className="text-red-500">Start date format is invalid.</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="mb-1 block font-medium">Number of days</span>
                        <input
                            type="number"
                            name="numberOfDays"
                            value={loanRequest.numberOfDays}
                            onChange={(e) => setLoanRequest({ ...loanRequest, numberOfDays: Number(e.target.value) })}
                            className="w-full rounded border px-3 py-2"

                        />
                        {errors.includes("Number of days is required.") && (
                            <p className="text-red-500">Number of days is required.</p>
                        )}
                    </label>


                    <label className="block">
                        <span className="mb-1 block font-medium">Reason</span>
                        <input
                            type="text"
                            name="reason"
                            value={loanRequest.reason}
                            onChange={(e) => setLoanRequest({ ...loanRequest, reason: e.target.value })}
                            className="w-full rounded border px-3 py-2"

                        />
                        {errors.includes("Reason is required.") && (
                            <p className="text-red-500">Reason is required.</p>
                        )}
                    </label>


                    <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );

}



