import { useNavigate } from "react-router-dom";
import { HeartPulse, Hospital, UserPlus } from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full flex flex-col items-center">
        <div className="mb-4">
          <HeartPulse className="h-12 w-12 text-sky-600" />
        </div>

        <h1 className="text-4xl font-bold text-blue-800 text-center mb-2">
          Welcome to <span className="text-blue-900">MEDSYNC</span>
        </h1>

        <p className="text-md text-gray-600 text-center mb-8">
          A centralized medical record system for smarter and continuous treatment across hospitals.
        </p>

        <div className="w-full space-y-4">
          <button
            onClick={() => navigate("/register/patient")}
            className="w-full bg-sky-500 text-white py-3 rounded-lg shadow hover:bg-sky-600 transition flex items-center justify-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            Register as Patient
          </button>
          <button
            onClick={() => navigate("/register/doctor")}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg shadow hover:bg-emerald-600 transition flex items-center justify-center gap-2"
          >
            <HeartPulse className="h-5 w-5" />
            Register as Doctor
          </button>
          <button
            onClick={() => navigate("/register/hospital")}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg shadow hover:bg-indigo-600 transition flex items-center justify-center gap-2"
          >
            <Hospital className="h-5 w-5" />
            Register as Hospital
          </button>
        </div>

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-700 underline hover:text-blue-900"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
