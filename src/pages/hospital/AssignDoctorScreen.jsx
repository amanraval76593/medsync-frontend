import { useParams,useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AssignDoctorScreen = () => {
  const { username: patientUsername } = useParams(); // from route
  const [doctorUsername, setDoctorUsername] = useState("");
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDoctorProfile(null);
    setSearching(true);

    try {
      const res = await axios.get(`/api/hospital/view-doctor/${doctorUsername}/`);
      setDoctorProfile(res.data);
    } catch (err) {
      const error =
        err.response?.data?.detail ||
        err.response?.data?.username ||
        "Doctor not found.";
      setErrorMessage(error);
    } finally {
      setSearching(false);
    }
  };

  const handleAssign = async () => {
    setSubmitting(true);
    try {
      await axios.post("/api/medical/hospital/assign-doctor/", {
        patient_username: patientUsername,
        doctor_username: doctorUsername,
      });
      alert("Doctor assigned successfully!");
      navigate("/home/hospital");
    } catch (err) {
      console.error("Assignment failed:", err.response?.data || err.message);
      alert("Failed to assign doctor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow border">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Assign Doctor</h2>

        {/* Patient Username Display */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Patient Username</label>
          <input
            type="text"
            value={patientUsername}
            readOnly
            className="w-full bg-gray-100 border p-2 rounded text-gray-700"
          />
        </div>

        {/* Search Doctor by Username */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Doctor Username</label>
            <input
              type="text"
              value={doctorUsername}
              onChange={(e) => setDoctorUsername(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className={`w-full py-2 text-white font-semibold rounded transition ${
              searching ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {searching ? "Searching..." : "Search Doctor"}
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
              onClick={handleAssign}
              disabled={submitting}
              className={`mt-4 w-full py-2 text-white font-semibold rounded ${
                submitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitting ? "Assigning..." : "Assign Doctor"}
            </button>
          </div>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="mt-4 text-center text-red-600 font-medium">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AssignDoctorScreen;
