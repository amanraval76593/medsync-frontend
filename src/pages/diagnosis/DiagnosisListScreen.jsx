import { useEffect, useState } from "react";
import { fetchDiagnoses } from "../../api/diagnosis";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Hospital, CalendarDays, FileText } from "lucide-react";

const DiagnosisListScreen = () => {
  const { authTokens } = useAuth();
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (!authTokens) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetchDiagnoses(authTokens.access);
        setDiagnoses(res.data);
      } catch (err) {
        console.error("Diagnosis fetch failed", err);
        alert("Session expired or unauthorized");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authTokens, navigate]);

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading diagnosis records...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-emerald-700">Your Diagnosis History</h2>

        {diagnoses.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">No diagnosis records found.</p>
        ) : (
          diagnoses.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/diagnosis/${item.id}`)}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                {item.title}
              </h3>

              <div className="text-sm text-gray-700 space-y-1 pl-1">
                <p className="flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Hospital:</span> {item.hospital}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Description:</span> {item.description || "—"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiagnosisListScreen;
