import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const RecentPatientsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/hospital/patient-list/")
      .then((res) => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recent patients:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-blue-600">Loading patients...</div>;

  if (patients.length === 0)
    return <div className="text-center mt-10 text-gray-600">No recent patients found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Recent Patients</h2>

        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/hospital/patient/${patient.username}`)}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 transition cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="font-semibold text-gray-800">
                    {patient.first_name} {patient.last_name}
                  </p>
                  <p className="text-sm text-gray-600">@{patient.username}</p>
                </div>
                <p className="text-sm text-gray-700">{patient.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPatientsScreen;
