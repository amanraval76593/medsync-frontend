import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck } from "lucide-react";

const LoginScreen = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      loginUser(response.data);

      const res = await fetch("http://localhost:8000/api/user/me/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);
      const userData = await res.json();

      if (userData.role === "PATIENT") {
        navigate("/home/patient");
      } else if (userData.role === "DOCTOR") {
        navigate("/home/doctor");
      } else if (userData.role === "HOSPITAL") {
        navigate("/home/hospital");
      } else {
        alert("Unknown role!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="h-10 w-10 text-blue-600 mb-2" />
          <h2 className="text-3xl font-bold text-blue-800 text-center">Secure Login</h2>
          <p className="text-sm text-gray-600 text-center">
            Access your MedSync account to manage medical records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Forgot your password?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Reset here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
