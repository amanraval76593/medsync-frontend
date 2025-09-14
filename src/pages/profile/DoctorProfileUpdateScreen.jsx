import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const DoctorProfileUpdateScreen = () => {
  const [formData, setFormData] = useState({
    specialization: "",
    license_number: "",
    hospital: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/doctor/profile/")
      .then((res) => {
        const doctor = res.data.doctor_profile || {};
        setFormData({
          specialization: doctor.specialization || "",
          license_number: doctor.license_number || "",
          hospital: doctor.hospital || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor profile:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/doctor/create/profile/", 
        formData,
      );
      alert("Profile updated!");
      navigate("/home/doctor");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          placeholder="License Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {submitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileUpdateScreen;
