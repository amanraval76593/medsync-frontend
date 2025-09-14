import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Make sure `lucide-react` is installed

const DoctorPatientListScreen = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/medical/doctor/assigned-patients/")
      .then((res) => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assigned patients:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading assigned patients...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Assigned Patients
      </h2>

      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.username}
              onClick={() => navigate(`/doctor/patient/${patient.username}`)}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl border border-blue-100 transition-all cursor-pointer"
            >
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <User className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-blue-800">
                    {patient.full_name || "Unknown"} 
                  </p>
                  <p className="text-sm text-gray-600">@{patient.username}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {patient.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPatientListScreen;
