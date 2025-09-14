// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegisterScreen from './pages/auth/PatientRegisterScreen';
import LoginScreen from "./pages/auth/LoginScreen";
import DiagnosisListScreen from "./pages/diagnosis/DiagnosisListScreen";
import DiagnosisDetailScreen from "./pages/diagnosis/DiagnosisDetailScreen";
import ProfileUpdateScreen from "./pages/profile/ProfileUpdateScreen";
import ViewProfileScreen from "./pages/profile/ViewProfileScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import HospitalRegisterScreen from './pages/auth/HospitalRegistrationScreen';
import DoctorRegisterScreen from './pages/auth/DoctorRegistrationScreen';
import PatientHomeScreen from './pages/home/PatientHomeScreen';
import DoctorHomeScreen from './pages/home/DoctorHomeScreen';
import HospitalHomeScreen from './pages/home/HospitalHomeScreen';
import HospitalProfileUpdateScreen from './pages/profile/HospitalProfileUpdateScreen';
import ViewHospitalProfileScreen from './pages/profile/ViewHospitalProfileScreen';
import DoctorProfileUpdateScreen from './pages/profile/DoctorProfileUpdateScreen';
import ViewDoctorProfileScreen from './pages/profile/ViewDoctorProfileScreen';
import AddRecentPatientScreen from './pages/hospital/AddRecentPatientScreen';
import HospitalViewPatientScreen from './pages/hospital/HospitalViewPatientScreen';
import RecentPatientsScreen from './pages/hospital/RecentPatientsScreen';
import DiagnosisListForHospital from './pages/hospital/DiagnosisListForHospital';
import AddDoctorScreen from './pages/hospital/AddDoctorScreen';
import ViewDoctorListScreen from './pages/hospital/ViewDoctorListScreen';
import AssignDoctorScreen from './pages/hospital/AssignDoctorScreen';
import DoctorPatientListScreen from './pages/Doctor/DoctorPatientListScreen';
import DoctorViewPatientScreen from './pages/Doctor/DoctorViewPatientScreen';
import DiagnosisListForDoctor from './pages/Doctor/DiagnosisListForDoctor';
import AddDiagnosisScreen from './pages/Doctor/AddDiagnosisScreen';
import AddDiagnosisVisitScreen from './pages/Doctor/AddDiagnosisVisitScreen';
import DoctorDiagnosisDetailScreen from './pages/Doctor/DoctorDiagnosisDetailScreen';
import ScheduleVisitScreen from './pages/Doctor/ScheduleVisitScreen';
import CompleteProfileScreen from './pages/profile/CompleteProfileScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home/patient" element={<PatientHomeScreen />} />
        <Route path="/home/doctor" element={<DoctorHomeScreen />} />
        <Route path="/home/hospital" element={<HospitalHomeScreen />} />
        <Route path="/register/patient" element={<PatientRegisterScreen />} />
        <Route path="/register/doctor" element={<DoctorRegisterScreen />} />
        <Route path="/register/hospital" element={<HospitalRegisterScreen />} />
        <Route path="/hospital/profile/edit" element={<HospitalProfileUpdateScreen />} />
        <Route path="/hospital/profile/view" element={<ViewHospitalProfileScreen />} />
        <Route path="/doctor/profile/edit" element={<DoctorProfileUpdateScreen />} />
        <Route path="/doctor/profile/view" element={<ViewDoctorProfileScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/diagnosis" element={<DiagnosisListScreen />} />
        <Route path="/diagnosis/:id" element={<DiagnosisDetailScreen />} />
        <Route path="/profile/edit" element={<ProfileUpdateScreen />} />
        <Route path="/profile/view" element={<ViewProfileScreen />} />
        <Route path="hospital/add-patient" element={<AddRecentPatientScreen />} />
        <Route path="/hospital/patient/:username" element={<HospitalViewPatientScreen />} />
        <Route path="/hospital/recent-patients" element={<RecentPatientsScreen />} />
        <Route path="/hospital/patient/:username/diagnosis" element={<DiagnosisListForHospital />} />
        <Route path="/hospital/add-doctor" element={<AddDoctorScreen />} />
        <Route path="/hospital/doctor-list" element={<ViewDoctorListScreen />} />
        <Route path="/hospital/assign-doctor/:username" element={<AssignDoctorScreen />} />
        <Route path="/doctor/assigned-patients" element={<DoctorPatientListScreen />} />
        <Route path="/doctor/patient/:username" element={<DoctorViewPatientScreen />} />
        <Route path="/doctor/patient/:username/diagnosis" element={<DiagnosisListForDoctor />} />
        <Route path="/doctor/patient/:username/add-diagnosis" element={<AddDiagnosisScreen />} />
        <Route path="/doctor/add-visit/:caseId" element={<AddDiagnosisVisitScreen />} />
        <Route path="/doctor/patient/:username/diagnosis/:diagnosisId" element={<DoctorDiagnosisDetailScreen />} />
        <Route  path="/doctor/patient/:patientUsername/diagnosis/:diagnosisId/schedule" element={<ScheduleVisitScreen />} />
        <Route path="patient/profile/complete" element={<CompleteProfileScreen />} />

      </Routes>
    </Router>
  );
}

export default App;
