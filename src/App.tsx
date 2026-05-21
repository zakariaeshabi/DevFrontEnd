import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import LoginMUI from './features/auth/LoginMUI';
import LoginBS from './features/auth/LoginBS';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import Tp4Lab from './pages/Tp4Lab';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-mui" element={<LoginMUI />} />
      <Route path="/login-bs" element={<LoginBS />} />
      <Route path="/tp4" element={<Tp4Lab />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
