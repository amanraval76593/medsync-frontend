import { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddRecentPatientScreen = () => {
  const [username, setUsername] = useState("");
  const [searchedProfile, setSearchedProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchedProfile(null);
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const res = await axios.get(`/api/hospital/view-patient/${username}/`);
      setSearchedProfile(res.data);
    } catch (err) {
      const error =
        err.response?.data?.detail ||
        err.response?.data?.username ||
        "User not found.";
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      await axios.post("/api/hospital/add-recent-patient/", {
        username,
      });
      setSuccessMessage(`Patient "${username}" added successfully.`);
      setTimeout(() => navigate(`/hospital/patient/${username}`), 1000);
    } catch (err) {
      const error =
        err.response?.data?.detail ||
        err.response?.data?.username ||
        "Something went wrong.";
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Search Patient by Username
        </h2>

        <form onSubmit={handleSearch} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter patient username"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Patient Info Preview */}
        {searchedProfile && (
          <div className="mt-6 bg-gray-50 border rounded p-4">
            <p className="font-semibold text-lg text-gray-800 mb-2">
              {searchedProfile.first_name} {searchedProfile.last_name}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Username:</strong> {searchedProfile.username}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Email:</strong> {searchedProfile.email}
            </p>

            <button
              onClick={handleAddPatient}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Patient"}
            </button>
          </div>
        )}

        {/* Feedback messages */}
        {successMessage && (
          <div className="mt-4 text-green-600 text-center font-medium">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecentPatientScreen;
