import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const HospitalHomeScreen = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/hospital/profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load hospital:", err));
  }, []);

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading hospital data...
      </div>
    );

  const hospital = user.hospital_profile || {};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            Welcome to MedSync Hospital Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Manage your hospital's doctors and patient records efficiently
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Hospital Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>Hospital Name:</strong> {hospital.name || "Not set"}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {hospital.phone || "Not set"}</p>
            <p className="sm:col-span-2"><strong>Address:</strong> {hospital.address || "Not set"}</p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/hospital/add-patient")}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              + Add New Patient
            </button>

            <button
              onClick={() => navigate("/hospital/recent-patients")}
              className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition text-sm"
            >
              🧾 View Patient List
            </button>

            <button
              onClick={() => navigate("/hospital/add-doctor")}
              className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition text-sm"
            >
              👨‍⚕️ Add Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalHomeScreen;
