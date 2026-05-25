import From from "../components/From";


export default function LoanRequest() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="mx-auto max-w-6xl p-8">
                <h2 className="mb-4 text-3xl font-bold">Loan Request</h2>
                <p className="mb-6 text-lg text-gray-700">
                    This is where the loan request form will go.
                </p>
            </section>
            <section className="mx-auto max-w-6xl p-8">
                
                <From />
            </section>
        </div>  
    );
}