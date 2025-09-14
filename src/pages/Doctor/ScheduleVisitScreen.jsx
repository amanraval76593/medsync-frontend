import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosInstance";

const ScheduleVisitScreen = () => {
  const { patientUsername, diagnosisId } = useParams();
  const { user } = useAuth(); // for doctor username
  const navigate = useNavigate();

  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
   
    try {
        await axios.post("/api/medical/doctor/schedule-visit/", {
            patient_username: patientUsername,
            diagnosis_case_id: parseInt(diagnosisId),
            visit_date: visitDate,
            visit_time: visitTime,
            notes,
          });

      alert("Visit scheduled successfully!");
      navigate(-1); // go back
    } catch (err) {
      console.error("Error scheduling visit:", err.response?.data || err.message);
      alert("Failed to schedule visit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Schedule a Visit</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Visit Date</label>
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Visit Time</label>
          <input
            type="time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Enter any specific instructions or notes..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {submitting ? "Scheduling..." : "Schedule Visit"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleVisitScreen;
