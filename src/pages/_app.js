// pages/_app.js
import "../app/globals.css"; // Import global styles if you have any
import { AuthProvider } from "../contexts/AuthContext"; // Import your AuthProvider

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
