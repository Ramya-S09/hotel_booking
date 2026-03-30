// src/pages/BookingConfirmation.js
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const res      = searchParams.get('res')      || 'RESXXXXXX';
  const hotel    = searchParams.get('hotel')    || 'Hotel';
  const room     = searchParams.get('room')     || 'Room';
  const checkIn  = searchParams.get('checkIn')  || '';
  const checkOut = searchParams.get('checkOut') || '';
  const total    = Number(searchParams.get('total') || 0);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        {/* Success icon */}
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 8px 32px rgba(184,151,90,0.3)',
        }}>
          <i className="bi bi-check-lg" style={{ fontSize: '2.5rem', color: 'var(--charcoal)' }}></i>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Booking Confirmed!
        </h1>
        <p style={{ color: 'var(--slate)', marginBottom: '2rem' }}>
          Your reservation is confirmed. A confirmation email has been sent to your inbox.
        </p>

        {/* Reservation card */}
        <div className="card-luxe p-4 mb-4" style={{ textAlign: 'left' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Reservation Details</h6>
            <span className="badge-luxe badge-confirmed">
              <i className="bi bi-patch-check me-1"></i>Confirmed
            </span>
          </div>

          <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--slate)' }}>Reservation No.</span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gold)' }}>{res}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--slate)' }}>Hotel</span>
              <strong>{hotel}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--slate)' }}>Room</span>
              <strong>{room}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--slate)' }}>Check-in</span>
              <strong>{checkIn}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--slate)' }}>Check-out</span>
              <strong>{checkOut}</strong>
            </div>
            <hr className="divider-gold" />
            <div className="d-flex justify-content-between">
              <strong style={{ fontFamily: 'var(--font-display)' }}>Total Paid</strong>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold)' }}>
                ₹{total.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        {/* Info boxes */}
        <div className="row g-3 mb-4" style={{ textAlign: 'left' }}>
          {[
            { icon: 'bi-envelope-check', title: 'Email Sent', text: 'Confirmation sent to your registered email.' },
            { icon: 'bi-calendar-check', title: 'Free Cancellation', text: 'Cancel up to 24h before check-in for a full refund.' },
            { icon: 'bi-headset', title: '24/7 Support', text: 'Call 1800-LUXE-STAY anytime for assistance.' },
          ].map(info => (
            <div key={info.title} className="col-12">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'var(--sand)', borderRadius: 8, padding: '0.75rem 1rem' }}>
                <i className={`bi ${info.icon}`} style={{ fontSize: '1.2rem', color: 'var(--gold)', marginTop: 2 }}></i>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{info.title}</div>
                  <div style={{ color: 'var(--slate)', fontSize: '0.82rem' }}>{info.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex gap-3 justify-content-center">
          <button className="btn-gold" onClick={() => navigate('/my-bookings')}>
            <i className="bi bi-journal-bookmark me-1"></i>My Bookings
          </button>
          <button className="btn-outline-gold" onClick={() => navigate('/')}>
            <i className="bi bi-house me-1"></i>Home
          </button>
        </div>
      </div>
    </div>
  );
}
