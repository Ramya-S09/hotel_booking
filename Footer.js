// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email.';
    if (!form.password) return 'Password is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError('');
    try {
      const data = await authAPI.login(form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--charcoal)' }}>
            Luxe<span style={{ color: 'var(--gold)' }}>Stay</span>
          </h1>
          <p style={{ color: 'var(--slate)', fontSize: '0.9rem' }}>Welcome back. Sign in to continue.</p>
        </div>

        <div className="card-luxe p-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--charcoal)' }}>
            Sign In
          </h2>

          {error && (
            <div className="alert-luxe-danger mb-3">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label-luxe">Email Address</label>
              <input
                type="email"
                name="email"
                className="input-luxe"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <label className="form-label-luxe">Password</label>
              <input
                type="password"
                name="password"
                className="input-luxe"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            <button className="btn-gold w-100" type="submit" disabled={loading}>
              {loading ? (
                <><i className="bi bi-arrow-repeat me-2" style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}></i>Signing In…</>
              ) : 'Sign In'}
            </button>
          </form>

          <hr className="divider-gold my-4" />

          <p className="text-center" style={{ fontSize: '0.88rem', color: 'var(--slate)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 500 }}>
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center mt-3" style={{ fontSize: '0.8rem', color: '#aaa' }}>
          <Link to="/" style={{ color: '#aaa' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
