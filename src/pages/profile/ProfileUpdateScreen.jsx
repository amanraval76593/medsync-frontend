import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

const ProfileUpdateScreen = () => {
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/patient/profile/");
        const p = res.data.patient_profile || {};
        setFormData({
          blood_group: p.blood_group || "",
          weight: p.weight || "",
          weight_measured_on: p.weight_measured_on || "",
          height: p.height || "",
          date_of_birth: p.date_of_birth || "",
          existing_conditions: p.existing_conditions || "",
          allergies: p.allergies || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/patient/create/profile/", formData);
      alert("Profile updated!");
      navigate("/home/patient");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Update Medical Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Row: Blood Group */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
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
            <label className="block mb-1 font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="Enter weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Weight Measured On */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Weight Measured On</label>
            <input
              type="date"
              name="weight_measured_on"
              value={formData.weight_measured_on}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              placeholder="Enter height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Existing Conditions */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Existing Conditions</label>
            <textarea
              name="existing_conditions"
              placeholder="Mention if any chronic illnesses..."
              value={formData.existing_conditions}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Allergies</label>
            <textarea
              name="allergies"
              placeholder="Mention any known allergies..."
              value={formData.allergies}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {submitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateScreen;
