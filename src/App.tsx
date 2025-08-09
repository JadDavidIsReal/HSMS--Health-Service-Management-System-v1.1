import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import withAuthorization from "./components/withAuthorization";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientRecords from "./pages/PatientRecords";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import MedicalServices from "./pages/MedicalServices";
import StaffDirectory from "./pages/StaffDirectory";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Stocks from "./pages/Stocks";
import ClinicHistory from "./pages/ClinicHistory";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";
import BookAppointment from "./pages/BookAppointment";
import PatientLanding from "./pages/PatientLanding";
import AboutUs from "./pages/AboutUs";
import NursesByCampusPage from "./pages/NursesByCampusPage";
import CompleteProfile from "./pages/CompleteProfile";

const AuthorizedDashboard = withAuthorization(Dashboard);
const AuthorizedPatientRecords = withAuthorization(PatientRecords);
const AuthorizedAppointments = withAuthorization(Appointments);
const AuthorizedPatientLanding = withAuthorization(PatientLanding);
const AuthorizedPatients = withAuthorization(Patients);
const AuthorizedPatientProfile = withAuthorization(PatientProfile);
const AuthorizedStocks = withAuthorization(Stocks);
const AuthorizedClinicHistory = withAuthorization(ClinicHistory);
const AuthorizedAnalytics = withAuthorization(Analytics);
const AuthorizedChat = withAuthorization(Chat);
const AuthorizedBookAppointment = withAuthorization(BookAppointment);
const AuthorizedPrescriptions = withAuthorization(Prescriptions);
const AuthorizedMedicalServices = withAuthorization(MedicalServices);
const AuthorizedStaffDirectory = withAuthorization(StaffDirectory);
const AuthorizedAboutUs = withAuthorization(AboutUs);
const AuthorizedNursesByCampusPage = withAuthorization(NursesByCampusPage);
const AuthorizedCompleteProfile = withAuthorization(CompleteProfile);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          element={
            <Layout>
              <AuthorizedDashboard allowedRoles={["nurse", "doctor"]} />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <AuthorizedDashboard allowedRoles={["nurse", "doctor"]} />
            </Layout>
          }
        />
        <Route
          path="/patients"
          element={
            <Layout>
              <AuthorizedPatients allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/appointments"
          element={
            <Layout>
              <AuthorizedAppointments allowedRoles={["nurse", "doctor", "patient"]} />
            </Layout>
          }
        />
        <Route
          path="/prescriptions"
          element={
            <Layout>
              <AuthorizedPrescriptions allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <AuthorizedMedicalServices allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/staff"
          element={
            <Layout>
              <AuthorizedStaffDirectory allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <Layout>
              <AuthorizedPatientProfile allowedRoles={["nurse", "doctor", "patient"]} />
            </Layout>
          }
        />
        <Route
          path="/stocks"
          element={
            <Layout>
              <AuthorizedStocks allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <AuthorizedClinicHistory allowedRoles={["nurse", "doctor", "patient"]} />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <AuthorizedAnalytics allowedRoles={["nurse"]} />
            </Layout>
          }
        />
        <Route
          path="/chat"
          element={
            <Layout>
              <AuthorizedChat allowedRoles={["nurse", "doctor"]} />
            </Layout>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <Layout>
              <AuthorizedBookAppointment allowedRoles={["patient"]} />
            </Layout>
          }
        />
        <Route
          path="/patient-landing"
          element={
            <Layout>
              <AuthorizedPatientLanding allowedRoles={["patient"]} />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AuthorizedAboutUs allowedRoles={["nurse", "doctor", "patient"]} />
            </Layout>
          }
        />
        <Route
          path="/nurses-by-campus"
          element={
            <Layout>
              <AuthorizedNursesByCampusPage allowedRoles={["doctor"]} />
            </Layout>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <Layout>
              <AuthorizedCompleteProfile allowedRoles={["patient"]} />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
