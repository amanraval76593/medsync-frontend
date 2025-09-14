import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const ViewDoctorListScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/hospital/doctor-list/")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor list:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading doctors...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctors in Your Hospital</h2>
      {doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found.</p>
      ) : (
        <div className="space-y-4">
          {doctors.map((doc, index) => (
            <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
              <p><strong>Name:</strong> {doc.full_name} </p>
              <p><strong>Username:</strong> {doc.username}</p>
              <p><strong>Email:</strong> {doc.email}</p>
              {doc.doctor_profile && (
                <>
                  <p><strong>Specialization:</strong> {doc.doctor_profile.specialization || "N/A"}</p>
                  <p><strong>License:</strong> {doc.doctor_profile.license_number || "N/A"}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDoctorListScreen;
