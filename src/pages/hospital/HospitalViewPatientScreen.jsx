import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const HospitalViewPatientScreen = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/hospital/view-patient/${username}/`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error loading patient profile:", err))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="text-center mt-10 text-blue-600">Loading patient profile...</div>;
  if (!profile) return <div className="text-center mt-10 text-gray-600">Patient not found.</div>;

  const p = profile.patient_profile || {};
  const assignedDoctors = profile.assigned_doctors || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Patient Profile - {profile.username}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold text-gray-900">Email:</span> {profile.email}</p>
          <p><span className="font-semibold text-gray-900">Blood Group:</span> {p.blood_group || "N/A"}</p>
          <p><span className="font-semibold text-gray-900">Weight:</span> {p.weight || "N/A"} kg</p>
          <p><span className="font-semibold text-gray-900">Height:</span> {p.height || "N/A"} cm</p>
          <p><span className="font-semibold text-gray-900">Measured On:</span> {p.weight_measured_on || "N/A"}</p>
          <p><span className="font-semibold text-gray-900">DOB:</span> {p.date_of_birth || "N/A"}</p>
          <p className="sm:col-span-2"><span className="font-semibold text-gray-900">Existing Conditions:</span> {p.existing_conditions || "None"}</p>
          <p className="sm:col-span-2"><span className="font-semibold text-gray-900">Allergies:</span> {p.allergies || "None"}</p>
        </div>

        <button
          onClick={() => navigate(`/hospital/patient/${username}/diagnosis`)}
          className="mt-8 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Diagnosis List
        </button>

        {assignedDoctors.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Assigned Doctors</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              {assignedDoctors.map((doc) => (
                <li key={doc.id}>
                  Dr. {doc.first_name} {doc.last_name} ({doc.specialization})
                </li>
              ))}
            </ul>
            <button
             onClick={() => navigate(`/hospital/assign-doctor/${profile.username}`, {
              state: { reassign: true },
            })}
              className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
            >
              ReAssign Doctor
            </button>
          </div>
          
        ) : (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/hospital/assign-doctor/${profile.username}`, {
                state: { reassign: false },
              })}
              className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
            >
              Assign Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalViewPatientScreen;
