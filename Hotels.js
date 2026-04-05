// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock featured hotels for the landing page
const FEATURED = [
  { id: 1, name: 'The Grand Meridian', location: 'Mumbai', stars: 5, price: 8500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', tag: 'Most Popular' },
  { id: 2, name: 'Palazzo Heritage', location: 'Delhi', stars: 5, price: 12000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', tag: 'Luxury Pick' },
  { id: 3, name: 'Serene Backwaters', location: 'Kerala', stars: 4, price: 5500, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', tag: 'Nature Escape' },
];

const AMENITY_ICONS = {
  'Free WiFi': 'bi-wifi',
  'Pool': 'bi-water',
  'Spa': 'bi-heart-pulse',
  'Restaurant': 'bi-cup-hot',
  'Gym': 'bi-lightning-charge',
  'Parking': 'bi-p-circle',
};

export default function Home() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [search, setSearch] = useState({
    location: '', checkIn: today, checkOut: tomorrow, guests: 2,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.location.trim()) { setError('Please enter a location.'); return; }
    if (search.checkIn >= search.checkOut) { setError('Check-out must be after check-in.'); return; }
    setError('');
    const params = new URLSearchParams(search).toString();
    navigate(`/hotels?${params}`);
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--charcoal) 0%, #3a3020 100%)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=60)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18,
        }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 700 }}>
          <p style={{ color: 'var(--gold)', fontSize: '0.82rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ✦ Premium Hotel Booking ✦
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            color: 'var(--white)', lineHeight: 1.1, marginBottom: '1.2rem',
          }}>
            Find Your Perfect<br /><em style={{ color: 'var(--gold)' }}>Luxury Stay</em>
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            Discover handpicked hotels across India — from heritage palaces to serene beach retreats.
          </p>

          {/* Search Box */}
          <div className="card-luxe p-3 p-md-4" style={{ textAlign: 'left', borderRadius: '12px' }}>
            {error && (
              <div className="alert-luxe-danger mb-3">
                <i className="bi bi-exclamation-circle"></i> {error}
              </div>
            )}
            <form onSubmit={handleSearch}>
              <div className="row g-2 align-items-end">
                <div className="col-12 col-md-4">
                  <label className="form-label-luxe">
                    <i className="bi bi-geo-alt me-1"></i>Location
                  </label>
                  <input
                    className="input-luxe"
                    name="location"
                    placeholder="Mumbai, Delhi, Goa…"
                    value={search.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label-luxe">
                    <i className="bi bi-calendar3 me-1"></i>Check-in
                  </label>
                  <input
                    type="date"
                    className="input-luxe"
                    name="checkIn"
                    min={today}
                    value={search.checkIn}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label-luxe">
                    <i className="bi bi-calendar3 me-1"></i>Check-out
                  </label>
                  <input
                    type="date"
                    className="input-luxe"
                    name="checkOut"
                    min={search.checkIn}
                    value={search.checkOut}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label-luxe">
                    <i className="bi bi-people me-1"></i>Guests
                  </label>
                  <select className="input-luxe" name="guests" value={search.guests} onChange={handleChange}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div className="col-6 col-md-2">
                  <button className="btn-gold w-100" type="submit" style={{ height: '42px' }}>
                    <i className="bi bi-search me-1"></i>Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: 'var(--charcoal)', padding: '1.5rem 0' }}>
        <div className="container">
          <div className="row text-center g-2">
            {[
              { val: '500+', label: 'Hotels' },
              { val: '50,000+', label: 'Happy Guests' },
              { val: '100+', label: 'Cities' },
              { val: '4.8★', label: 'Avg Rating' },
            ].map(s => (
              <div key={s.label} className="col-6 col-md-3">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>{s.val}</div>
                <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Hotels ── */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Handpicked for You</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>Featured Properties</h2>
        </div>

        <div className="row g-4">
          {FEATURED.map(hotel => (
            <div key={hotel.id} className="col-12 col-md-4">
              <div className="card-luxe h-100" style={{ cursor: 'pointer' }} onClick={() => navigate(`/hotels/${hotel.id}`)}>
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  />
                  <span style={{
                    position: 'absolute', top: 12, left: 12,
                    background: 'var(--gold)', color: 'var(--charcoal)',
                    padding: '0.2rem 0.7rem', borderRadius: '20px',
                    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                  }}>
                    {hotel.tag}
                  </span>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: 2 }}>{hotel.name}</h5>
                      <p style={{ color: 'var(--slate)', fontSize: '0.82rem', marginBottom: 4 }}>
                        <i className="bi bi-geo-alt me-1"></i>{hotel.location}
                      </p>
                      <span className="stars" style={{ fontSize: '0.8rem' }}>
                        {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold)', fontWeight: 600 }}>
                        ₹{hotel.price.toLocaleString()}
                      </div>
                      <div style={{ color: '#aaa', fontSize: '0.75rem' }}>per night</div>
                    </div>
                  </div>
                  <hr className="divider-gold" style={{ margin: '0.8rem 0' }} />
                  <button
                    className="btn-gold w-100"
                    style={{ padding: '0.5rem', fontSize: '0.82rem' }}
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn-outline-gold" onClick={() => navigate('/hotels')}>
            Explore All Hotels <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
      </section>

      {/* ── Amenities strip ── */}
      <section style={{ background: 'var(--sand)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="row justify-content-center text-center g-3">
            {Object.entries(AMENITY_ICONS).map(([name, icon]) => (
              <div key={name} className="col-4 col-md-2">
                <i className={`bi ${icon}`} style={{ fontSize: '1.6rem', color: 'var(--gold)' }}></i>
                <p style={{ fontSize: '0.78rem', color: 'var(--slate)', marginTop: '0.4rem', letterSpacing: '0.05em' }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
