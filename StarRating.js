// src/pages/MyBookings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKINGS = [
  { id: 1, res: 'RESAB1234', hotel: 'The Grand Meridian', location: 'Mumbai', room: 'Deluxe Room', checkIn: '2025-02-10', checkOut: '2025-02-13', nights: 3, total: 28050, status: 'Confirmed', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=70', canReview: false },
  { id: 2, res: 'RESCD5678', hotel: 'Palazzo Heritage', location: 'Delhi', room: 'Junior Suite', checkIn: '2024-12-25', checkOut: '2024-12-28', nights: 3, total: 42120, status: 'Completed', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=70', canReview: true },
  { id: 3, res: 'RESEF9012', hotel: 'Coastal Retreat', location: 'Goa', room: 'Standard Room', checkIn: '2024-11-05', checkOut: '2024-11-07', nights: 2, total: 7616, status: 'Cancelled', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=70', canReview: false },
  { id: 4, res: 'RESGH3456', hotel: 'Himalayan Lodge', location: 'Manali', room: 'Standard Room', checkIn: '2024-10-01', checkOut: '2024-10-04', nights: 3, total: 19404, status: 'Completed', image: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=300&q=70', canReview: true },
];

const STATUS_CLASS = { Confirmed: 'badge-confirmed', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings] = useState(MOCK_BOOKINGS);
  const [filter, setFilter] = useState('all');
  const [reviewModal, setReviewModal] = useState(null);
  const [review, setReview] = useState({ rating: 5, title: '', comment: '' });
  const [reviewSent, setReviewSent] = useState({});

  const displayed = filter === 'all' ? bookings : bookings.filter(b => b.status.toLowerCase() === filter);

  const submitReview = (bookingId) => {
    setReviewSent(prev => ({ ...prev, [bookingId]: true }));
    setReviewModal(null);
    setReview({ rating: 5, title: '', comment: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>View and manage all your reservations</p>
      </div>

      <div className="container py-4" style={{ maxWidth: 860 }}>
        {/* Filter tabs */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {['all', 'confirmed', 'completed', 'cancelled'].map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '0.35rem 1rem', borderRadius: 20, cursor: 'pointer', fontSize: '0.82rem',
              border: filter === t ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: filter === t ? 'var(--gold)' : 'transparent',
              color: filter === t ? 'var(--charcoal)' : 'var(--slate)',
              textTransform: 'capitalize', fontWeight: filter === t ? 600 : 400,
            }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span style={{ marginLeft: 6, fontSize: '0.75rem' }}>
                ({t === 'all' ? bookings.length : bookings.filter(b => b.status.toLowerCase() === t).length})
              </span>
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div className="card-luxe p-5 text-center">
            <i className="bi bi-inbox" style={{ fontSize: '3rem', color: 'var(--sand)' }}></i>
            <h4 style={{ fontFamily: 'var(--font-display)', marginTop: '1rem' }}>No bookings yet</h4>
            <p style={{ color: 'var(--slate)' }}>Start exploring hotels to make your first booking.</p>
            <button className="btn-gold mt-2" onClick={() => navigate('/hotels')}>Browse Hotels</button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {displayed.map(b => (
              <div key={b.id} className="card-luxe" style={{ overflow: 'hidden' }}>
                <div className="row g-0">
                  <div className="col-3 col-md-2" style={{ minHeight: 120 }}>
                    <img src={b.image} alt={b.hotel} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 120 }} />
                  </div>
                  <div className="col-9 col-md-10 p-3">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: 2 }}>{b.hotel}</h6>
                        <p style={{ color: 'var(--slate)', fontSize: '0.78rem', marginBottom: 2 }}>
                          <i className="bi bi-geo-alt me-1"></i>{b.location} · {b.room}
                        </p>
                        <p style={{ color: 'var(--slate)', fontSize: '0.78rem', marginBottom: 2 }}>
                          <i className="bi bi-calendar3 me-1"></i>{b.checkIn} → {b.checkOut} · {b.nights} nights
                        </p>
                        <p style={{ color: '#aaa', fontSize: '0.72rem' }}>
                          <i className="bi bi-hash me-1"></i>{b.res}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge-luxe ${STATUS_CLASS[b.status]}`}>{b.status}</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', marginTop: 6 }}>
                          ₹{b.total.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {b.status === 'Confirmed' && (
                        <button style={{ background: 'none', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.25rem 0.7rem', borderRadius: 4, fontSize: '0.78rem', cursor: 'pointer' }}>
                          <i className="bi bi-x-circle me-1"></i>Cancel Booking
                        </button>
                      )}
                      {b.status === 'Completed' && (
                        <button onClick={() => navigate('/hotels/1')} style={{ background: 'none', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.25rem 0.7rem', borderRadius: 4, fontSize: '0.78rem', cursor: 'pointer' }}>
                          <i className="bi bi-arrow-repeat me-1"></i>Rebook
                        </button>
                      )}
                      {b.canReview && !reviewSent[b.id] && (
                        <button onClick={() => setReviewModal(b)} style={{ background: 'none', border: '1px solid var(--slate)', color: 'var(--slate)', padding: '0.25rem 0.7rem', borderRadius: 4, fontSize: '0.78rem', cursor: 'pointer' }}>
                          <i className="bi bi-star me-1"></i>Write Review
                        </button>
                      )}
                      {reviewSent[b.id] && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--success)' }}>
                          <i className="bi bi-check-circle me-1"></i>Review submitted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card-luxe p-4" style={{ maxWidth: 480, width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Review {reviewModal.hotel}</h5>
              <button onClick={() => setReviewModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--slate)' }}>×</button>
            </div>

            <div className="mb-3">
              <label className="form-label-luxe">Your Rating</label>
              <div className="d-flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReview(r => ({ ...r, rating: n }))} style={{ background: 'none', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: n <= review.rating ? 'var(--gold)' : '#ddd', transition: 'color 0.15s' }}>★</button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label-luxe">Title</label>
              <input className="input-luxe" placeholder="Great stay!" value={review.title} onChange={e => setReview(r => ({ ...r, title: e.target.value }))} />
            </div>
            <div className="mb-4">
              <label className="form-label-luxe">Your Review</label>
              <textarea className="input-luxe" rows={4} placeholder="Share your experience..." value={review.comment} onChange={e => setReview(r => ({ ...r, comment: e.target.value }))} style={{ resize: 'vertical' }} />
            </div>
            <div className="d-flex gap-2">
              <button className="btn-gold flex-grow-1" onClick={() => submitReview(reviewModal.id)} disabled={!review.title || !review.comment}>
                Submit Review
              </button>
              <button className="btn-outline-gold" onClick={() => setReviewModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
