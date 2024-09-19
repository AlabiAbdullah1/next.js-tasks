import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting
    setError(""); // Clear any previous errors

    try {
      const res = await axios.post("/api/auth/signup", formData);
      login(res.data.token);
      router.push("/login");
    } catch (err) {
      setError(err.response.data.message || "Error occurred");
    } finally {
      setIsLoading(false); // Set loading to false after processing
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-white shadow-md"
      >
        <h1 className="text-2xl mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading} // Disable button during loading
          className={`mt-4 w-full p-2 text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
