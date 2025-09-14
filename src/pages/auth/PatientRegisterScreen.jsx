import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/auth";
const PatientRegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/patient/", {
        ...formData,
        role: "PATIENT",
      });
  
      const loginResponse = await login({
        username: formData.username,
        password: formData.password,
      });
  
      loginUser(loginResponse.data); 
      // Redirect to complete profile screen
      navigate("/patient/profile/complete");
    } catch (err) {
      alert("Registration failed");
      console.error(err.response?.data || err.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
      >
        <div className="flex flex-col items-center mb-4">
          <UserPlus className="h-10 w-10 text-sky-600 mb-1" />
          <h2 className="text-2xl font-bold text-blue-800">Patient Registration</h2>
          <p className="text-sm text-gray-500 text-center">
            Create your account to access and manage your medical records.
          </p>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition shadow"
        >
          Register
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
};

export default PatientRegisterScreen;
