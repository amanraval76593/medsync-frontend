import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const CompleteProfileScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blood_group: "",
    weight: "",
    weight_measured_on: "",
    height: "",
    date_of_birth: "",
    existing_conditions: "",
    allergies: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/patient/create/profile/", formData);
      alert("Profile completed successfully!");
      navigate("/home/patient"); // redirect to dashboard
    } catch (err) {
      console.error("Profile completion failed:", err);
      alert("Failed to complete profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Complete Your Medical Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A−</option>
              <option value="B+">B+</option>
              <option value="B-">B−</option>
              <option value="O+">O+</option>
              <option value="O-">O−</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB−</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>

          {/* Weight Measured On */}
          <div>
            <label className="block text-sm font-medium">Weight Measured On</label>
            <input
              type="date"
              name="weight_measured_on"
              value={formData.weight_measured_on}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>

          {/* Existing Conditions */}
          <div>
            <label className="block text-sm font-medium">Existing Conditions</label>
            <textarea
              name="existing_conditions"
              value={formData.existing_conditions}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              placeholder="e.g. diabetes, asthma, etc."
              rows={3}
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium">Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full mt-1 border rounded p-2"
              placeholder="e.g. penicillin, pollen, etc."
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
          >
            {submitting ? "Submitting..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileScreen;
