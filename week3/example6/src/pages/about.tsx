import Link from "next/link";

export default function About() {
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
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Understanding Next.js Routing
          </h2>
          <p className="text-gray-600 mb-4">
            This page exists because we created an <code>about.tsx</code> file
            in the pages directory. Next.js automatically creates a route at{" "}
            <code>/about</code> for this page.
          </p>

          <div className="bg-blue-50 p-4 rounded-md mt-4">
            <h3 className="text-lg font-medium mb-2">
              How Next.js Routing Works:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Files in the pages directory automatically become routes</li>
              <li>The file name determines the route path</li>
              <li>
                Use <code>index.tsx</code> for the root route (/)
              </li>
              <li>Nested folders create nested routes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
