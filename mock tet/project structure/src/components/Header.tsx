export default function Header() {
    return (
        <header className="bg-blue-700 px-6 py-5 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold">Student Laptop Loan App</h1>

                <nav aria-label="Main navigation">
                    <ul className="flex flex-wrap gap-6">
                        <li>
                            <a href="/" className="hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="/loan-request" className="hover:underline">Loan Request</a>
                        </li>
                        <li>
                            <a href="/requests" className="hover:underline">Requests</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
