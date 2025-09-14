import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const DoctorHomeScreen = () => {
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctor profile
    axios
      .get("/api/doctor/profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load doctor:", err));

    // Fetch scheduled visits
    axios
      .get("/api/medical/doctor/scheduled-visits/")
      .then((res) => setVisits(res.data))
      .catch((err) => console.error("Failed to load scheduled visits:", err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-blue-800">
          {user ? `Welcome, Dr. ${user.first_name || user.username}` : "Loading..."}
        </h1>
        <p className="mt-2 text-gray-600">
          Access your patient assignments and case records.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/doctor/assigned-patients")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View Assigned Patients
          </button>
        </div>
      </div>

      {/* Scheduled Visits Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Upcoming Scheduled Visits</h2>

        {visits.length === 0 ? (
          <p className="text-gray-500 text-center">No upcoming visits.</p>
        ) : (
          <ul className="space-y-4">
            {visits.map((visit) => (
              <li
                key={visit.id}
                className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-sm text-gray-700">
                  <strong>Patient:</strong> {visit.patient_username}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Diagnosis Case:</strong> {visit.diagnosis_case_title}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(visit.visit_date).toLocaleDateString()} at {visit.visit_time}
                </p>
                {visit.notes && (
                  <p className="text-sm text-gray-600">
                    <strong>Notes:</strong> {visit.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorHomeScreen;

