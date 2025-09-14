import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { PlusCircle, Trash2 } from "lucide-react";

const AddDiagnosisVisitScreen = () => {
  const { caseId } = useParams();
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState([
    { name: "", dosageDuration: "", noOfDays: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosageDuration: "", noOfDays: "" },
    ]);
  };

  const handleRemoveMedication = (index) => {
    const updated = [...medications];
    updated.splice(index, 1);
    setMedications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/medical/doctor/diagnosis/visit/create/", {
        case_id: parseInt(caseId),
        notes,
        medications: medications.filter(
          (med) => med.name && med.dosageDuration && med.noOfDays
        ),
      });

      alert("Visit added successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Failed to add visit:", err.response?.data || err.message);
      alert(
        "Error adding visit. You might not be assigned to this patient."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Add Diagnosis Visit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notes Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Visit Notes
          </label>
          <textarea
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Enter your notes here..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Medications Section */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Medications
          </label>

          {medications.map((med, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
            >
              <input
                type="text"
                placeholder="Name"
                value={med.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Dosage Duration"
                value={med.dosageDuration}
                onChange={(e) =>
                  handleMedicationChange(index, "dosageDuration", e.target.value)
                }
                className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="No.of Days"
                value={med.noOfDays}
                onChange={(e) =>
                  handleMedicationChange(index, "noOfDays", e.target.value)
                }
                className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:outline-none"
                required
              />

              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(index)}
                  className="md:col-span-3 text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddMedication}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            Add Another Medication
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {submitting ? "Submitting..." : "Add Visit"}
        </button>
      </form>
    </div>
  );
};

export default AddDiagnosisVisitScreen;
