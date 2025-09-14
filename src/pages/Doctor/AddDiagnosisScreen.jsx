import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const AddDiagnosisScreen = () => {
  const { username } = useParams(); // Patient username from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    hospital: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/medical/doctor/diagnosis/create/", {
        patient_username: username,
        ...formData,
      });
      alert("Diagnosis created successfully");
      navigate(`/doctor/patient/${username}/diagnosis`);
    } catch (err) {
      console.error("Error adding diagnosis:", err);
      alert("Failed to create diagnosis");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Diagnosis for {username}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Diagnosis Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="hospital"
          placeholder="Hospital Name"
          value={formData.hospital}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
         <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {submitting ? "Adding..." : "Add Diagnosis"}
        </button>
      </form>
    </div>
  );
};

export default AddDiagnosisScreen;
