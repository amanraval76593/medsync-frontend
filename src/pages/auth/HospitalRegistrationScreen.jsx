import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hospital } from "lucide-react";

const HospitalRegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/hospital/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Hospital registered successfully!");
      const loginResponse = await axios.post("http://localhost:8000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      const token = loginResponse.data.token;
  
      localStorage.setItem("token", token);
      navigate("/home/hospital");
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
          <Hospital className="h-10 w-10 text-indigo-600 mb-1" />
          <h2 className="text-2xl font-bold text-indigo-800">Hospital Registration</h2>
          <p className="text-sm text-gray-500 text-center">
            Register your institution to manage patients and assign doctors efficiently.
          </p>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition shadow"
        >
          Register
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
};

export default HospitalRegisterScreen;
