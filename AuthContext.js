// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim())  return 'Last name is required.';
    if (!form.email.trim())     return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email.';
    if (!form.phone.trim())     return 'Phone number is required.';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) return 'Enter a valid 10-digit phone.';
    if (!form.password)         return 'Password is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError('');
    try {
      const { confirmPassword, ...payload } = form;
      const data = await authAPI.register(payload);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', half: true },
    { name: 'lastName',  label: 'Last Name',  type: 'text', placeholder: 'Doe',  half: true },
    { name: 'email',     label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { name: 'phone',     label: 'Phone Number',  type: 'tel',   placeholder: '+91 99999 00000' },
    { name: 'password',        label: 'Password',        type: 'password', placeholder: '••••••••', half: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••', half: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div className="text-center mb-4">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--charcoal)' }}>
            Luxe<span style={{ color: 'var(--gold)' }}>Stay</span>
          </h1>
          <p style={{ color: 'var(--slate)', fontSize: '0.9rem' }}>Join thousands of travellers enjoying luxury stays.</p>
        </div>

        <div className="card-luxe p-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
            Create Account
          </h2>

          {error && (
            <div className="alert-luxe-danger mb-3">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              {fields.map((f) => (
                <div key={f.name} className={f.half ? 'col-6' : 'col-12'}>
                  <label className="form-label-luxe">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    className="input-luxe"
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                    autoComplete={f.name}
                  />
                </div>
              ))}
            </div>

            <button className="btn-gold w-100 mt-4" type="submit" disabled={loading}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <hr className="divider-gold my-4" />
          <p className="text-center" style={{ fontSize: '0.88rem', color: 'var(--slate)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 500 }}>Sign in</Link>
          </p>
        </div>

        <p className="text-center mt-3">
          <Link to="/" style={{ color: '#aaa', fontSize: '0.8rem' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
