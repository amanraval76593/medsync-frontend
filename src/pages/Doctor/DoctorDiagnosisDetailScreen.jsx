import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft, PlusCircle } from "lucide-react";

const DiagnosisDetailScreen = () => {
  const { diagnosisId, username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const res = await axios.get(
          `/api/medical/doctor/assigned-patient/${username}/diagnosis/`
        );
        const found = res.data.find(
          (item) => item.id.toString() === diagnosisId
        );
        setDiagnosis(found || null);
      } catch (err) {
        console.error("Failed to load diagnosis list:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosisList();
  }, [username, diagnosisId]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading diagnosis...</div>;

  if (!diagnosis)
    return <div className="text-center mt-10 text-red-600">Diagnosis not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {diagnosis.doctor?.toLowerCase() === user?.username?.toLowerCase() && (
  <div className="flex gap-3">
    <button
      onClick={() => navigate(`/doctor/add-visit/${diagnosis.id}`)}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      <PlusCircle className="w-5 h-5" />
      Add Visit
    </button>

    <button
      onClick={() => navigate(`/doctor/patient/${username}/diagnosis/${diagnosis.id}/schedule`)}
      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      <PlusCircle className="w-5 h-5" />
      Schedule Visit
    </button>
  </div>
)}

      </div>

      {/* Diagnosis Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          {diagnosis.title}
        </h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Description:</span>{" "}
          {diagnosis.description || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Created:</span>{" "}
          {new Date(diagnosis.created_at).toLocaleString()}
        </p>
      </div>

      {/* Visits */}
      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Visit History</h3>

        {diagnosis.visits.length === 0 ? (
          <p className="text-gray-600">No visits yet.</p>
        ) : (
          <div className="space-y-6">
            {diagnosis.visits.map((visit) => (
              <div
                key={visit.id}
                className="border rounded-lg p-5 bg-gray-50 shadow-sm hover:shadow transition"
              >
                <div className="mb-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(visit.visit_date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {visit.doctor_name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Notes:</span>{" "}
                    {visit.notes || "No notes"}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="font-semibold mb-1">Medications:</p>
                  {visit.medications?.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {visit.medications.map((med, idx) => (
                        <li key={idx}>
                          <strong>{med.name}</strong> – {med.dosage}, {med.frequency}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No medications prescribed.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisDetailScreen;
