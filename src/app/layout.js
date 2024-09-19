// src/app/layout.js
import "./globals.css"; // Import global CSS
import { AuthProvider } from "../contexts/AuthContext"; // Import AuthProvider

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {/* Header with navigation */}
          <header className="bg-blue-600 text-white py-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-4">
              <div className="text-2xl font-bold">
                <a href="/" className="hover:opacity-80">
                  YOUSEFAI
                </a>
              </div>
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/task" className="hover:text-gray-300">
                    Tasks Dashboard
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-gray-300">
                    Register
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-gray-300">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/Kaban" className="hover:text-gray-300">
                    Kaban Board
                  </a>
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
    </>
  );
}
