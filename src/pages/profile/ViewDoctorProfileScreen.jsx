import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ViewDoctorProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/doctor/profile/")
      .then((res) => {
        console.log("Doctor Profile Data:", res.data);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading doctor profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (!profile) return <div className="text-center mt-10">No profile found.</div>;

  const doctor = profile.doctor_profile;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctor Profile</h2>

      <div className="space-y-3 text-gray-800">
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Specialization:</strong> {doctor?.specialization || "Not set"}</p>
        <p><strong>License Number:</strong> {doctor?.license_number || "Not set"}</p>
        <p><strong>Hospital:</strong> {doctor?.hospital || "Not set"}</p>
      </div>

      <button
        onClick={() => navigate("/doctor/profile/edit")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ViewDoctorProfileScreen;
