import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(endpoint, { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token); // Save the token in localStorage

      router.push("/tasks"); // Redirect to tasks after login/register
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
