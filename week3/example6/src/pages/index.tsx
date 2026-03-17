import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <nav className="w-full max-w-4xl mb-8">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to Next.js Multi-Page Example
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Next.js Page Routing Demo
          </h2>
          <p className="text-gray-600 mb-4">
            This example demonstrates how Next.js handles page-based routing and
            navigation. Click the links above to navigate between different
            pages.
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Key Features Shown:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>File-system based routing</li>
              <li>Client-side navigation with Link component</li>
              <li>Clean and semantic URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
