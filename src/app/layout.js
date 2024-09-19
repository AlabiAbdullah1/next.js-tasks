// src/app/layout.js
import "./globals.css"; // Import global CSS
import { AuthProvider } from "../contexts/AuthContext"; // Import AuthProvider
import Link from "next/link"; // Import Link from next/link

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Header with navigation */}
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <div className="text-2xl font-bold">
              <Link className="hover:opacity-80" href="/">
                YOUSEAI
              </Link>
            </div>
            <ul className="flex space-x-6">
              <li>
                <Link className="hover:text-gray-300" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-300" href="/task">
                  Tasks Dashboard
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-300" href="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-300" href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-300" href="/Kaban">
                  Kaban Board
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main content area where different components/pages will be rendered */}
        <main className="container mx-auto flex-grow py-6 px-4">
          {children}{" "}
          {/* This is where dynamic content from different components will be rendered */}
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 YousefAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
