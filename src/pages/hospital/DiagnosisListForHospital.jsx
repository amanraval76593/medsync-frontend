import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const DiagnosisListForHospital = () => {
  const { username } = useParams();
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const res = await axios.get(`/api/medical/hospital/patient/${username}/diagnosis/`);
        setDiagnoses(res.data);
      } catch (err) {
        console.error("Failed to load diagnosis list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [username]);

  if (loading)
    return <div className="text-center mt-10 text-blue-600 font-medium">Loading diagnosis records...</div>;

  if (diagnoses.length === 0)
    return <div className="text-center mt-10 text-gray-500">No diagnosis records found for {username}.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
          Diagnosis History for <span className="text-black">{username}</span>
        </h2>

        <div className="space-y-6">
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="border rounded-lg bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{diagnosis.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Description:</strong> {diagnosis.description}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Created:</strong> {new Date(diagnosis.created_at).toLocaleString()}
              </p>

              <h4 className="text-md font-semibold text-green-700 mt-4">Visits:</h4>
              {diagnosis.visits.length === 0 ? (
                <p className="text-gray-500 text-sm mt-1">No visits recorded yet.</p>
              ) : (
                <ul className="space-y-3 mt-2">
                  {diagnosis.visits.map((visit) => (
                    <li
                      key={visit.id}
                      className="border rounded-md p-4 bg-white shadow hover:shadow-md transition"
                    >
                      <p className="text-sm text-gray-700">
                        <strong>Date:</strong> {new Date(visit.visit_date).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Doctor:</strong> {visit.doctor_name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong>{" "}
                        <span className="whitespace-pre-wrap">{visit.notes || "No notes"}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisListForHospital;
