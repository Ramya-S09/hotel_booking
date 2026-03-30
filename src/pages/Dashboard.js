// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MOCK_BOOKINGS = [
  { id: 1, res: 'RESAB1234', hotel: 'The Grand Meridian', location: 'Mumbai', room: 'Deluxe Room', checkIn: '2025-02-10', checkOut: '2025-02-13', nights: 3, total: 28050, status: 'Confirmed', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=70' },
  { id: 2, res: 'RESCD5678', hotel: 'Palazzo Heritage', location: 'Delhi', room: 'Junior Suite', checkIn: '2024-12-25', checkOut: '2024-12-28', nights: 3, total: 42120, status: 'Completed', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=70' },
  { id: 3, res: 'RESEF9012', hotel: 'Coastal Retreat', location: 'Goa', room: 'Standard Room', checkIn: '2024-11-05', checkOut: '2024-11-07', nights: 2, total: 7616, status: 'Cancelled', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=70' },
];

const LOYALTY = { points: 1850, tier: 'Silver', nextTier: 'Gold', nextAt: 2000 };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings] = useState(MOCK_BOOKINGS);
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status.toLowerCase() === activeTab);

  const statusColor = { Confirmed: 'badge-confirmed', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {user?.firstName || 'Guest'}</h1>
        <p>Manage your bookings, rewards, and preferences</p>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* ── Sidebar ── */}
          <div className="col-12 col-lg-3">
            {/* Profile card */}
            <div className="card-luxe p-4 mb-3 text-center">
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.8rem',
                fontSize: '1.8rem', color: 'var(--charcoal)',
              }}>
                {(user?.firstName?.[0] || 'U').toUpperCase()}
              </div>
              <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                {user?.firstName} {user?.lastName}
              </h6>
              <p style={{ color: 'var(--slate)', fontSize: '0.82rem' }}>{user?.email}</p>
              <span className="badge-luxe badge-confirmed">{LOYALTY.tier} Member</span>
            </div>

            {/* Loyalty */}
            <div className="card-luxe p-3 mb-3">
              <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 10 }}>
                <i className="bi bi-trophy me-2" style={{ color: 'var(--gold)' }}></i>Loyalty Points
              </h6>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>
                {LOYALTY.points.toLocaleString()}
              </div>
              <div style={{ color: 'var(--slate)', fontSize: '0.78rem', marginBottom: 8 }}>
                {LOYALTY.nextAt - LOYALTY.points} pts to {LOYALTY.nextTier}
              </div>
              <div style={{ background: 'var(--sand)', borderRadius: 20, height: 8, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(LOYALTY.points / LOYALTY.nextAt) * 100}%`,
                  background: 'linear-gradient(to right, var(--gold), var(--gold-light))',
                  borderRadius: 20, transition: 'width 0.5s',
                }} />
              </div>
              <div className="d-flex justify-content-between mt-1" style={{ fontSize: '0.7rem', color: '#aaa' }}>
                <span>{LOYALTY.tier}</span><span>{LOYALTY.nextTier}</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="card-luxe p-3">
              <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 10 }}>Quick Actions</h6>
              {[
                { icon: 'bi-search', label: 'Search Hotels', action: () => navigate('/hotels') },
                { icon: 'bi-person-gear', label: 'Edit Profile', action: () => {} },
                { icon: 'bi-bell', label: 'Notifications', action: () => {} },
                { icon: 'bi-box-arrow-right', label: 'Logout', action: handleLogout },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.action}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '0.5rem 0.4rem', marginBottom: 4,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: item.label === 'Logout' ? 'var(--danger)' : 'var(--charcoal)',
                    fontSize: '0.85rem', borderRadius: 4, textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--sand)'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <i className={`bi ${item.icon}`} style={{ color: item.label === 'Logout' ? 'var(--danger)' : 'var(--gold)' }}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Main ── */}
          <div className="col-12 col-lg-9">
            {/* Stats */}
            <div className="row g-3 mb-4">
              {[
                { label: 'Total Bookings', value: bookings.length, icon: 'bi-calendar2-check', color: 'var(--gold)' },
                { label: 'Upcoming', value: bookings.filter(b => b.status === 'Confirmed').length, icon: 'bi-clock', color: '#27ae60' },
                { label: 'Total Spent', value: `₹${bookings.filter(b => b.status !== 'Cancelled').reduce((a,b) => a+b.total, 0).toLocaleString()}`, icon: 'bi-currency-rupee', color: '#8e44ad' },
                { label: 'Loyalty Points', value: LOYALTY.points.toLocaleString(), icon: 'bi-trophy', color: '#d4920a' },
              ].map(stat => (
                <div key={stat.label} className="col-6 col-sm-3">
                  <div className="card-luxe p-3 text-center">
                    <i className={`bi ${stat.icon}`} style={{ fontSize: '1.4rem', color: stat.color }}></i>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: 4 }}>{stat.value}</div>
                    <div style={{ color: 'var(--slate)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bookings */}
            <div className="card-luxe p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                  <i className="bi bi-journal-bookmark me-2" style={{ color: 'var(--gold)' }}></i>My Bookings
                </h5>
                {/* Tabs */}
                <div className="d-flex gap-1">
                  {['all', 'confirmed', 'completed', 'cancelled'].map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      style={{
                        padding: '0.3rem 0.75rem', borderRadius: 20, cursor: 'pointer', fontSize: '0.78rem',
                        border: activeTab === t ? '1px solid var(--gold)' : '1px solid var(--border)',
                        background: activeTab === t ? 'var(--gold)' : 'transparent',
                        color: activeTab === t ? 'var(--charcoal)' : 'var(--slate)',
                        textTransform: 'capitalize', fontWeight: activeTab === t ? 600 : 400,
                      }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '2.5rem', color: 'var(--sand)' }}></i>
                  <p style={{ color: 'var(--slate)', marginTop: 10 }}>No bookings found.</p>
                  <button className="btn-gold mt-2" onClick={() => navigate('/hotels')}>Browse Hotels</button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filtered.map(b => (
                    <div key={b.id} className="card-luxe" style={{ overflow: 'hidden' }}>
                      <div className="row g-0">
                        <div className="col-3 col-md-2" style={{ minHeight: 100 }}>
                          <img src={b.image} alt={b.hotel} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 100 }} />
                        </div>
                        <div className="col-9 col-md-10 p-3">
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-1">
                            <div>
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{b.hotel}</div>
                              <div style={{ color: 'var(--slate)', fontSize: '0.78rem' }}>
                                <i className="bi bi-geo-alt me-1"></i>{b.location} · {b.room}
                              </div>
                              <div style={{ color: 'var(--slate)', fontSize: '0.78rem', marginTop: 2 }}>
                                <i className="bi bi-calendar3 me-1"></i>{b.checkIn} → {b.checkOut} · {b.nights} nights
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span className={`badge-luxe ${statusColor[b.status]}`}>{b.status}</span>
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', marginTop: 4 }}>
                                ₹{b.total.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-2 mt-2">
                            <span style={{ color: '#aaa', fontSize: '0.72rem' }}>
                              <i className="bi bi-hash me-1"></i>{b.res}
                            </span>
                            {b.status === 'Confirmed' && (
                              <button
                                style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                              >
                                <i className="bi bi-x-circle me-1"></i>Cancel
                              </button>
                            )}
                            {b.status === 'Completed' && (
                              <button
                                style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                                onClick={() => navigate(`/hotels/${1}?rebook=true`)}
                              >
                                <i className="bi bi-arrow-repeat me-1"></i>Rebook
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
