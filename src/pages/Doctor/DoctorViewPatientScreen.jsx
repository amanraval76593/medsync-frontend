import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { UserCircle, Calendar, Info, Stethoscope, Droplet, Ruler, Weight, AlertCircle } from "lucide-react";

const DoctorViewPatientScreen = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/doctor/view-patient/${username}/`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error loading patient profile:", err))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading)
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading patient profile...</div>;
  if (!profile)
    return <div className="text-center mt-20 text-red-500 text-lg">Patient not found.</div>;

  const p = profile.patient_profile || {};

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-100">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <UserCircle className="w-12 h-12 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-sm text-gray-600">@{profile.username}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-blue-500" />
            <p><strong>Blood Group:</strong> {p.blood_group || "N/A"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Weight className="w-5 h-5 text-blue-500" />
            <p><strong>Weight:</strong> {p.weight || "N/A"} kg</p>
          </div>

          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-blue-500" />
            <p><strong>Height:</strong> {p.height || "N/A"} cm</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <p><strong>Measured On:</strong> {p.weight_measured_on || "N/A"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <p><strong>Date of Birth:</strong> {p.date_of_birth || "N/A"}</p>
          </div>

          <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <Info className="w-5 h-5 text-blue-500" />
            <p><strong>Existing Conditions:</strong> {p.existing_conditions || "None"}</p>
          </div>

          <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <p><strong>Allergies:</strong> {p.allergies || "None"}</p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate(`/doctor/patient/${username}/diagnosis`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-5 h-5" />
            View Diagnosis List
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorViewPatientScreen;
