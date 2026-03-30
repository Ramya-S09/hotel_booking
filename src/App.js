// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home               from './pages/Home';
import Login              from './pages/Login';
import Register           from './pages/Register';
import Hotels             from './pages/Hotels';
import HotelDetail        from './pages/HotelDetail';
import Booking            from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import Dashboard          from './pages/Dashboard';
import MyBookings         from './pages/MyBookings';

import './styles/global.css';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public — no navbar wrapping for auth pages */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public with layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/hotels" element={<Layout><Hotels /></Layout>} />
          <Route path="/hotels/:id" element={<Layout><HotelDetail /></Layout>} />

          {/* Protected */}
          <Route path="/booking" element={
            <ProtectedRoute><Layout><Booking /></Layout></ProtectedRoute>
          } />
          <Route path="/booking-confirmation" element={
            <ProtectedRoute><Layout><BookingConfirmation /></Layout></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute><Layout><MyBookings /></Layout></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'var(--gold)' }}>404</h1>
                <p style={{ color: 'var(--slate)' }}>Page not found.</p>
                <a href="/" className="btn-gold" style={{ display: 'inline-block' }}>Go Home</a>
              </div>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
