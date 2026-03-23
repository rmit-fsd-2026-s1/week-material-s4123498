import { useAuth } from "../context/AuthContext";
import Head from "next/head";

export default function Home() {
  const { user, users } = useAuth();

  return (
    <>
      <Head>
        <title>Auth Demo</title>
        <meta
          name="description"
          content="A simple authentication demo using Next.js"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Auth Demo</h1>

        {user ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Please log in to view your profile.</p>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <div className="grid gap-4">
            {users.map((u) => (
              <div key={u.id} className="bg-white p-4 rounded-lg shadow-md">
                <p>
                  <strong>Username:</strong> {u.username}
                </p>
                <p>
                  <strong>ID:</strong> {u.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
