// src/pages/Booking.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI, paymentAPI, promoAPI } from '../utils/api';

const MOCK_ROOM = { id: 101, type: 'Deluxe Room', hotel: 'The Grand Meridian', location: 'Mumbai', price: 8500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' };

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const checkIn  = searchParams.get('checkIn')  || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests   = Number(searchParams.get('guests') || 2);
  const roomId   = searchParams.get('roomId');

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 1;

  const [room] = useState(MOCK_ROOM);
  const [payMethod, setPayMethod] = useState('card');
  const [promo, setPromo]         = useState({ code: '', discount: 0, msg: '', loading: false });
  const [cardForm, setCardForm]   = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const subtotal = room.price * nights;
  const taxes    = Math.round(subtotal * 0.12);
  const total    = subtotal + taxes - promo.discount;

  const handlePromo = async () => {
    if (!promo.code.trim()) return;
    setPromo(p => ({ ...p, loading: true, msg: '' }));
    // Simulate promo check
    await new Promise(r => setTimeout(r, 700));
    if (promo.code.toUpperCase() === 'LUXE10') {
      setPromo(p => ({ ...p, discount: Math.round(subtotal * 0.1), msg: '10% discount applied!', loading: false }));
    } else if (promo.code.toUpperCase() === 'FLAT500') {
      setPromo(p => ({ ...p, discount: 500, msg: '₹500 flat discount applied!', loading: false }));
    } else {
      setPromo(p => ({ ...p, discount: 0, msg: 'Invalid promo code.', loading: false }));
    }
  };

  const validateCard = () => {
    if (payMethod !== 'card') return '';
    if (!cardForm.number || cardForm.number.replace(/\s/g, '').length < 16) return 'Enter a valid 16-digit card number.';
    if (!cardForm.expiry) return 'Enter card expiry.';
    if (!cardForm.cvv || cardForm.cvv.length < 3) return 'Enter valid CVV.';
    if (!cardForm.name.trim()) return 'Enter cardholder name.';
    return '';
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const err = validateCard();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      // Simulate API booking + payment
      await new Promise(r => setTimeout(r, 1500));
      const reservationNo = 'RES' + Math.random().toString(36).slice(2,8).toUpperCase();
      navigate(`/booking-confirmation?res=${reservationNo}&hotel=${room.hotel}&room=${room.type}&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}`);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCard = (v) => v.replace(/\D/g, '').slice(0,16).replace(/(.{4})/g, '$1 ').trim();

  return (
    <div>
      <div className="page-header">
        <h1>Complete Your Booking</h1>
        <p>Secure checkout — your data is encrypted</p>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* ── Left: Payment ── */}
          <div className="col-12 col-lg-7">
            {/* Guest Info */}
            <div className="card-luxe p-4 mb-4">
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                <i className="bi bi-person me-2" style={{ color: 'var(--gold)' }}></i>Guest Details
              </h5>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label-luxe">First Name</label>
                  <input className="input-luxe" value={user?.firstName || ''} readOnly style={{ background: 'var(--cream)' }} />
                </div>
                <div className="col-6">
                  <label className="form-label-luxe">Last Name</label>
                  <input className="input-luxe" value={user?.lastName || ''} readOnly style={{ background: 'var(--cream)' }} />
                </div>
                <div className="col-12">
                  <label className="form-label-luxe">Email</label>
                  <input className="input-luxe" value={user?.email || ''} readOnly style={{ background: 'var(--cream)' }} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-luxe p-4 mb-4">
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                <i className="bi bi-credit-card me-2" style={{ color: 'var(--gold)' }}></i>Payment Method
              </h5>

              {/* Method tabs */}
              <div className="d-flex gap-2 mb-4">
                {[
                  { key: 'card', label: 'Card', icon: 'bi-credit-card' },
                  { key: 'upi', label: 'UPI', icon: 'bi-phone' },
                  { key: 'netbanking', label: 'Net Banking', icon: 'bi-bank' },
                ].map(m => (
                  <button
                    key={m.key}
                    onClick={() => setPayMethod(m.key)}
                    style={{
                      flex: 1, padding: '0.6rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem',
                      border: payMethod === m.key ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: payMethod === m.key ? '#fdf8f0' : 'var(--white)',
                      color: payMethod === m.key ? 'var(--gold)' : 'var(--slate)',
                      fontWeight: payMethod === m.key ? 600 : 400, transition: 'all 0.2s',
                    }}
                  >
                    <i className={`bi ${m.icon} me-1`}></i>{m.label}
                  </button>
                ))}
              </div>

              {error && <div className="alert-luxe-danger mb-3"><i className="bi bi-exclamation-circle"></i> {error}</div>}

              <form onSubmit={handlePay}>
                {payMethod === 'card' && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label-luxe">Card Number</label>
                      <input className="input-luxe" placeholder="1234 5678 9012 3456" maxLength={19}
                        value={cardForm.number}
                        onChange={e => setCardForm({ ...cardForm, number: formatCard(e.target.value) })} />
                    </div>
                    <div className="col-6">
                      <label className="form-label-luxe">Expiry (MM/YY)</label>
                      <input className="input-luxe" placeholder="12/27" maxLength={5}
                        value={cardForm.expiry}
                        onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })} />
                    </div>
                    <div className="col-6">
                      <label className="form-label-luxe">CVV</label>
                      <input className="input-luxe" type="password" placeholder="•••" maxLength={4}
                        value={cardForm.cvv}
                        onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-luxe">Cardholder Name</label>
                      <input className="input-luxe" placeholder="John Doe"
                        value={cardForm.name}
                        onChange={e => setCardForm({ ...cardForm, name: e.target.value })} />
                    </div>
                  </div>
                )}

                {payMethod === 'upi' && (
                  <div>
                    <label className="form-label-luxe">UPI ID</label>
                    <input className="input-luxe" placeholder="yourname@bank" />
                    <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginTop: 6 }}>
                      <i className="bi bi-info-circle me-1"></i>You'll receive a payment request on your UPI app.
                    </p>
                  </div>
                )}

                {payMethod === 'netbanking' && (
                  <div>
                    <label className="form-label-luxe">Select Bank</label>
                    <select className="input-luxe">
                      <option>SBI — State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Bank</option>
                    </select>
                    <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginTop: 6 }}>
                      <i className="bi bi-info-circle me-1"></i>You'll be redirected to your bank's secure page.
                    </p>
                  </div>
                )}

                <button
                  className="btn-gold w-100 mt-4"
                  type="submit"
                  disabled={loading}
                  style={{ padding: '0.8rem', fontSize: '1rem' }}
                >
                  {loading ? (
                    <><i className="bi bi-arrow-repeat me-2" style={{ animation: 'spin 1s linear infinite', display:'inline-block' }}></i>Processing…</>
                  ) : (
                    <><i className="bi bi-shield-lock me-2"></i>Pay ₹{total.toLocaleString()} Securely</>
                  )}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#aaa', marginTop: 10 }}>
                <i className="bi bi-lock me-1"></i>256-bit SSL encrypted · PCI DSS compliant
              </p>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="col-12 col-lg-5">
            <div className="card-luxe p-4" style={{ position: 'sticky', top: 80 }}>
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Booking Summary
              </h5>

              <div style={{ position: 'relative', height: 160, borderRadius: 8, overflow: 'hidden', marginBottom: '1rem' }}>
                <img src={room.image} alt={room.hotel} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <div style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>{room.hotel}</div>
                  <div style={{ color: '#ccc', fontSize: '0.8rem' }}>{room.location}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--slate)' }} className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <span>Room Type</span><strong style={{ color: 'var(--charcoal)' }}>{room.type}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Check-in</span><strong>{checkIn}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Check-out</span><strong>{checkOut}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Nights</span><strong>{nights}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Guests</span><strong>{guests}</strong>
                </div>
              </div>

              <hr className="divider-gold" />

              {/* Price breakdown */}
              <div className="d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
                <div className="d-flex justify-content-between">
                  <span>₹{room.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Taxes & fees (12%)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                {promo.discount > 0 && (
                  <div className="d-flex justify-content-between" style={{ color: 'var(--success)' }}>
                    <span>Promo discount</span>
                    <span>−₹{promo.discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <hr className="divider-gold" />
              <div className="d-flex justify-content-between">
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>Total</strong>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)' }}>
                  ₹{total.toLocaleString()}
                </strong>
              </div>

              {/* Promo code */}
              <hr className="divider-gold" />
              <label className="form-label-luxe">Promo Code</label>
              <div className="d-flex gap-2">
                <input className="input-luxe" placeholder="e.g. LUXE10" value={promo.code}
                  onChange={e => setPromo(p => ({ ...p, code: e.target.value, msg: '', discount: 0 }))} />
                <button className="btn-outline-gold" style={{ whiteSpace: 'nowrap' }} onClick={handlePromo} disabled={promo.loading}>
                  {promo.loading ? '…' : 'Apply'}
                </button>
              </div>
              {promo.msg && (
                <p style={{ fontSize: '0.78rem', marginTop: 6, color: promo.discount > 0 ? 'var(--success)' : 'var(--danger)' }}>
                  <i className={`bi ${promo.discount > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                  {promo.msg}
                </p>
              )}
              <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 8 }}>
                Try: <code>LUXE10</code> or <code>FLAT500</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
