import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserCircle, Stethoscope, CalendarCheck2 } from "lucide-react";
import { fetchDiagnoses } from "../../api/diagnosis";
import { useAuth } from "../../context/AuthContext";

const PatientHomeScreen = () => {
  const [user, setUser] = useState(null);
  const [lastDiagnosis, setLastDiagnosis] = useState(null);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const { authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const res = await axios.get("/api/patient/profile/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    const loadLastDiagnosis = async () => {
      try {
        const res = await fetchDiagnoses(authTokens.access);
        if (res.data && res.data.length > 0) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setLastDiagnosis(sorted[0]);
        }
      } catch (err) {
        console.error("Failed to load diagnosis:", err);
      }
    };

    const loadScheduledVisits = async () => {
      try {
        const res = await axios.get("/api/medical/patient/scheduled-visits/");
        setScheduledVisits(res.data);
      } catch (err) {
        console.error("Failed to load scheduled visits:", err);
      }
    };

    loadUserProfile();
    loadLastDiagnosis();
    loadScheduledVisits();
  }, [authTokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-green-800">
            {user ? `Welcome, ${user.first_name || user.username}` : "Loading..."}
          </h1>
          <p className="text-gray-600 mt-1">
            View your medical records and manage your health details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/diagnosis")}
            className="flex items-center gap-2 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition shadow"
          >
            <Stethoscope className="h-5 w-5" />
            Diagnosis History
          </button>
          <button
            onClick={() => navigate("/profile/view")}
            className="flex items-center gap-2 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition shadow"
          >
            <UserCircle className="h-5 w-5" />
            View Profile
          </button>
        </div>

        {/* Health Info */}
        {user && (
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Health Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-800 text-sm">
              <p><strong>Blood Group:</strong> {user.patient_profile?.blood_group || "Not set"}</p>
              <p><strong>Height:</strong> {user.patient_profile?.height || "Not set"} cm</p>
              <p><strong>Weight:</strong> {user.patient_profile?.weight || "Not set"} kg</p>
            </div>
          </div>
        )}

        {/* Last Diagnosis */}
        {lastDiagnosis && (
      <div
        onClick={() => navigate(`/diagnosis/${lastDiagnosis.id}`)}
        className="bg-white rounded-lg shadow p-5 cursor-pointer hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Last Diagnosis</h3>
        <div className="text-gray-800 text-sm space-y-1">
          <p>
            <strong>Title:</strong> {lastDiagnosis.title}
          </p>
          <p>
            <strong>Hospital:</strong> {lastDiagnosis.hospital}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(lastDiagnosis.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {lastDiagnosis.description || "N/A"}
          </p>
        </div>
      </div>
    )}

        {/* Upcoming Visits */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Upcoming Visit</h3>
          {scheduledVisits.length === 0 ? (
            <p className="text-gray-800 text-sm flex items-center gap-2">
              <CalendarCheck2 className="h-5 w-5 text-green-600" />
              No upcoming visits scheduled.
            </p>
          ) : (
            <ul className="text-gray-800 text-sm space-y-3">
              {scheduledVisits.map((visit) => (
                <li
                  key={visit.id}
                  className="border p-3 rounded bg-gray-50 shadow-sm hover:bg-gray-100 transition"
                >
                  <p><strong>Diagnosis:</strong> {visit.diagnosis_case_title}</p>
                  <p><strong>Date:</strong> {new Date(visit.visit_date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {visit.visit_time}</p>
                  <p><strong>Notes:</strong> {visit.notes || "No notes"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientHomeScreen;
