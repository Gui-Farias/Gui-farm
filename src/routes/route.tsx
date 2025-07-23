import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/index';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}