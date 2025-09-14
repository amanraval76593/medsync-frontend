import { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddDoctorScreen = () => {
  const [username, setUsername] = useState("");
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setDoctorProfile(null);
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await axios.get(`/api/hospital/view-doctor/${username}/`);
      setDoctorProfile(res.data);
    } catch (err) {
      const error =
        err.response?.data?.detail ||
        err.response?.data?.username ||
        "Doctor not found.";
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async () => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post("/api/hospital/add-doctor/", { username });
      setSuccessMessage(`Doctor "${username}" added successfully!`);
      setTimeout(() => navigate("/hospital/doctor-list"), 1000);
    } catch (err) {
      const error =
        err.response?.data?.detail ||
        "Failed to add doctor. Make sure the username is valid.";
      setErrorMessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
          Add Doctor to Hospital
        </h2>

        <form onSubmit={handleSearch} className="space-y-5">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
              Doctor's Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter doctor's MedSync username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-md font-semibold transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Doctor Profile */}
        {doctorProfile && (
          <div className="mt-6 bg-gray-50 border rounded p-4 text-gray-800">
            <p className="text-lg font-semibold text-gray-900">
              Dr. {doctorProfile.first_name} {doctorProfile.last_name}
            </p>
            <p className="text-sm">
              <strong>Username:</strong> {doctorProfile.username}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {doctorProfile.email}
            </p>
            <p className="text-sm">
              <strong>Specialization:</strong> {doctorProfile.doctor_profile.specialization}
            </p>
            <p className="text-sm">
              <strong>License Number:</strong> {doctorProfile.doctor_profile.license_number}
            </p>

            <button
              onClick={handleAddDoctor}
              disabled={isSubmitting}
              className={`mt-4 w-full py-2 text-white font-semibold rounded ${
                isSubmitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
            </button>
          </div>
        )}

        {/* Feedback messages */}
        {successMessage && (
          <div className="mt-4 text-green-600 text-center font-medium">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center font-medium">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AddDoctorScreen;
