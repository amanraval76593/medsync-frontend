import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ViewHospitalProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching hospital profile...");
    axios
      .get("/api/hospital/profile/")
      .then((res) => {
        console.log("Hospital Profile Data:", res.data);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hospital profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (!profile) return <div className="text-center mt-10">No profile found.</div>;

  const hospital = profile.hospital_profile;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Hospital Profile</h2>

      <div className="space-y-3 text-gray-800">
        <p><strong>Hospital Name:</strong> {hospital?.name || "Not set"}</p>
        <p><strong>Address:</strong> {hospital?.address || "Not set"}</p>
        <p><strong>Phone:</strong> {hospital?.phone || "Not set"}</p>
        <p><strong>Email:</strong> {hospital?.email || profile.email || "Not set"}</p>
      </div>

      <button
        onClick={() => navigate("/hospital/profile/edit")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ViewHospitalProfileScreen;
