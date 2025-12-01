import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { PlusCircle, Trash2, Upload } from "lucide-react";

const AddDiagnosisVisitScreen = () => {
  const { caseId } = useParams();
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState([
    { name: "", dosageDuration: "", noOfDays: "" },
  ]);

  const [documents, setDocuments] = useState([
    { documentType: "", file: null },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ---------- Medication Handlers ----------
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

  // ---------- Document Handlers ----------
  const handleDocumentChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const handleFileChange = (index, file) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, and PNG files are allowed!");
      return;
    }

    const updated = [...documents];
    updated[index].file = file;
    setDocuments(updated);
  };

  const handleAddDocument = () => {
    setDocuments([...documents, { documentType: "", file: null }]);
  };

  const handleRemoveDocument = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("case_id", caseId);
      formData.append("notes", notes);

      formData.append(
        "medications",
        JSON.stringify(
          medications.filter(
            (m) => m.name && m.dosageDuration && m.noOfDays
          )
        )
      );

      // Attach each document
      documents.forEach((doc, index) => {
        if (doc.documentType && doc.file) {
          formData.append(`documents[${index}][documentType]`, doc.documentType);
          formData.append(`documents[${index}][file]`, doc.file);
        }
      });

      await axios.post("/api/medical/doctor/diagnosis/visit/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Visit added successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Failed to add visit:", err.response?.data || err.message);
      alert("Error adding visit. You might not be assigned to this patient.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- JSX ----------
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
                placeholder="No. of Days"
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

        {/* Documents Section */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Documents
          </label>

          {documents.map((doc, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            >
              <input
                type="text"
                placeholder="Document Type (e.g. Blood Report, X-Ray)"
                value={doc.documentType}
                onChange={(e) =>
                  handleDocumentChange(index, "documentType", e.target.value)
                }
                className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="border border-gray-300 p-2 rounded-lg"
                required
              />

              {documents.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  className="md:col-span-2 text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddDocument}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            Add Another Document
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
