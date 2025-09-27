import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { ClipboardList, PlusCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DiagnosisListForDoctor = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const location = useLocation();
  const { patientName } = location.state || {};
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const res = await axios.get(
          `/api/medical/doctor/assigned-patient/${username}/diagnosis/`
        );
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
    return <div className="text-center mt-10 text-gray-500">Loading diagnosis...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-blue-700" />
          Diagnosis for {patientName}
        </h2>
        <button
          onClick={() => navigate(`/doctor/patient/${username}/add-diagnosis`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add Diagnosis
        </button>
      </div>

      {diagnoses.length === 0 ? (
        <div className="text-center text-gray-600">No diagnoses found.</div>
      ) : (
        diagnoses.map((diagnosis) => (
          <div
            key={diagnosis.id}
            onClick={() => navigate(`/doctor/patient/${username}/diagnosis/${diagnosis.id}`)}
            className="cursor-pointer border border-gray-200 rounded-lg bg-white p-6 mb-6 shadow hover:shadow-md transition hover:bg-gray-50"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {diagnosis.title}
            </h3>
            {diagnosis.description && (
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                {diagnosis.description}
              </p>
            )}
            <p className="text-sm text-gray-500">
              <strong>Created:</strong>{" "}
              {new Date(diagnosis.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default DiagnosisListForDoctor;
