import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link"; // Import Link from next/link

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to YousefAI Assignment
      </h1>

      {user ? (
        <div className="text-center">
          <h2 className="text-2xl text-gray-800">
            Welcome back, {user.email}!
          </h2>
          <p className="mt-4 text-gray-600">
            Head over to your tasks dashboard to get started.
          </p>
          <Link href="/task">
            <a className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              Go to Tasks Dashboard
            </a>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-gray-800">Join Us Today!</h2>
          <p className="mt-4 text-gray-600">
            Create an account to manage your tasks efficiently.
          </p>
          <Link href="/register">
            <a className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              Register Now
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
