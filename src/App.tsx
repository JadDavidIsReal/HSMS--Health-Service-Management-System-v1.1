import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientRecords from "./pages/PatientRecords";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import MedicalServices from "./pages/MedicalServices";
import StaffDirectory from "./pages/StaffDirectory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['nurse', 'doctor']}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <Layout>
                  <PatientRecords />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Layout>
                  <Appointments />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/prescriptions" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Layout>
                  <Prescriptions />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <Layout>
                  <MedicalServices />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/staff" element={
              <ProtectedRoute allowedRoles={['nurse']}>
                <Layout>
                  <StaffDirectory />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
