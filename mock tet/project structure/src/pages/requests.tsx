import { useEffect, useState } from "react";
import { getLoanRequests } from "../api/api";
import type { LoanRequest } from "../types/types";


export default function Requests() {
    const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadLoanRequests() {
            try {
                const data = await getLoanRequests();
                setLoanRequests(data);
            } catch (error) {
                setErrorMessage(
                    error instanceof Error ? error.message : "Something went wrong"
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadLoanRequests();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {!isLoading && !errorMessage && (
                <div className="min-h-screen bg-gray-50">
                    <main className="mx-auto max-w-6xl p-8">
                        <h2 className="mb-4 text-3xl font-bold">Your Requests</h2>
                        {loanRequests.length === 0 && (
                            <p className="mb-6 text-lg text-gray-700">No loan requests yet.</p>
                        )}
                        <div className="space-y-4">
                            {loanRequests.map((loanRequest) => (
                                <div key={loanRequest.id} className="mb-4 p-4 bg-white rounded shadow">
                                    <h3 className="text-xl font-bold">{loanRequest.studentName}</h3>
                                    <p>{loanRequest.studentEmail}</p>
                                    <p>{loanRequest.laptopModel}</p>
                                    <p>{loanRequest.startDate}</p>
                                    <p>{loanRequest.numberOfDays} days</p>
                                    <p>{loanRequest.reason}</p>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            )}    
        </div>

    );
}
