import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Droplet,
  Ruler,
  Stethoscope,
  Weight,
  CalendarDays,
  AlertTriangle,
  Info,
} from "lucide-react";

const ViewProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/patient/profile/")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  if (!profile)
    return <div className="text-center mt-10 text-gray-500">No profile found.</div>;

  const patient = profile.patient_profile || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">Patient Profile</h2>

        <div className="space-y-4 text-gray-800">
          <div className="flex items-center gap-3">
            <Droplet className="w-5 h-5 text-red-500" />
            <p><strong>Blood Group:</strong> {patient.blood_group || "Not set"}</p>
          </div>

          <div className="flex items-center gap-3">
            <Weight className="w-5 h-5 text-yellow-600" />
            <p><strong>Weight:</strong> {patient.weight ? `${patient.weight} kg` : "Not set"}</p>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <p><strong>Measured On:</strong> {patient.weight_measured_on || "Not set"}</p>
          </div>

          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-green-600" />
            <p><strong>Height:</strong> {patient.height ? `${patient.height} cm` : "Not set"}</p>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <p><strong>Date of Birth:</strong> {patient.date_of_birth || "Not set"}</p>
          </div>

          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-purple-600" />
            <p><strong>Existing Conditions:</strong> {patient.existing_conditions || "None"}</p>
          </div>

          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-pink-600" />
            <p><strong>Allergies:</strong> {patient.allergies || "None"}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfileScreen;
