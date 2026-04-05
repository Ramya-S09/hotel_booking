// src/pages/HotelDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const MOCK_HOTEL = {
  id: 1,
  name: 'The Grand Meridian',
  location: 'Mumbai, Maharashtra',
  stars: 5,
  rating: 4.8,
  description: 'Nestled in the heart of South Mumbai, The Grand Meridian offers an unparalleled luxury experience. Each room is a masterpiece of contemporary design, blending modern comforts with the warmth of Indian hospitality.',
  amenities: ['Free WiFi', 'Outdoor Pool', 'Full-Service Spa', 'Fine Dining Restaurant', 'Fitness Center', 'Valet Parking', '24h Concierge', 'Airport Shuttle'],
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
  ],
  rooms: [
    { id: 101, type: 'Standard Room', price: 5500, maxGuests: 2, amenities: ['King Bed', 'City View', 'Free WiFi', 'TV'], available: 5 },
    { id: 102, type: 'Deluxe Room', price: 8500, maxGuests: 2, amenities: ['King Bed', 'Sea View', 'Free WiFi', 'Minibar', 'Bathtub'], available: 3 },
    { id: 103, type: 'Junior Suite', price: 12000, maxGuests: 3, amenities: ['King Bed', 'Living Area', 'Sea View', 'Jacuzzi', 'Butler Service'], available: 2 },
    { id: 104, type: 'Presidential Suite', price: 28000, maxGuests: 4, amenities: ['2 Bedrooms', 'Panoramic View', 'Private Pool', 'Concierge', 'Kitchen'], available: 1 },
  ],
  reviews: [
    { id: 1, user: 'Priya S.', rating: 5, title: 'Absolutely stunning!', comment: 'Every detail was perfect. The staff anticipated every need. Will definitely return.', date: '2024-12-15', verified: true },
    { id: 2, user: 'Rahul M.', rating: 4, title: 'Great stay overall', comment: 'Beautiful hotel with excellent service. The spa was a highlight. Minor issue with AC but quickly resolved.', date: '2024-11-28', verified: true },
    { id: 3, user: 'Aisha K.', rating: 5, title: 'Dream anniversary trip', comment: 'The team arranged a surprise room decoration. Could not have asked for more. The sea view suite was breathtaking.', date: '2025-01-02', verified: true },
  ],
};

export default function HotelDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const checkIn  = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests   = Number(searchParams.get('guests') || 2);

  const [hotel, setHotel]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 1;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHotel(MOCK_HOTEL);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBook = (room) => {
    if (!isAuthenticated) {
      navigate(`/login`);
      return;
    }
    navigate(`/booking?hotelId=${id}&roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  if (loading) return <div className="spinner-gold mt-5"></div>;
  if (!hotel) return <div className="container py-5 text-center"><h3>Hotel not found.</h3></div>;

  return (
    <div>
      {/* Image Gallery */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', background: '#111' }}>
        <img
          src={hotel.images[activeImg]}
          alt={hotel.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92, transition: 'opacity 0.3s' }}
        />
        {/* Thumbnails */}
        <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 8 }}>
          {hotel.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                width: 56, height: 42, borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                border: i === activeImg ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'border 0.2s',
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: 16, left: 16,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            border: 'none', borderRadius: 4, padding: '0.4rem 0.9rem',
            cursor: 'pointer', fontSize: '0.85rem',
          }}
        >
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* ── Left: Hotel Info ── */}
          <div className="col-12 col-lg-8">
            {/* Hotel Header */}
            <div className="card-luxe p-4 mb-4">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 4 }}>{hotel.name}</h1>
                  <p style={{ color: 'var(--slate)' }}>
                    <i className="bi bi-geo-alt me-1"></i>{hotel.location}
                  </p>
                  <StarRating rating={hotel.rating} size="lg" />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#999', fontSize: '0.8rem' }}>Starting from</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', fontWeight: 600 }}>
                    ₹{hotel.rooms[0].price.toLocaleString()}
                  </div>
                  <div style={{ color: '#aaa', fontSize: '0.75rem' }}>per night</div>
                </div>
              </div>

              <hr className="divider-gold" />
              <p style={{ color: 'var(--slate)', lineHeight: 1.8 }}>{hotel.description}</p>

              <div className="mt-3">
                <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 10 }}>Hotel Amenities</h6>
                <div className="d-flex flex-wrap gap-2">
                  {hotel.amenities.map(a => (
                    <span key={a} style={{
                      background: 'var(--sand)', color: 'var(--charcoal)',
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem',
                    }}>
                      <i className="bi bi-check2 me-1" style={{ color: 'var(--gold)' }}></i>{a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Selection */}
            <div className="card-luxe p-4 mb-4">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                <i className="bi bi-door-open me-2" style={{ color: 'var(--gold)' }}></i>Select Your Room
              </h3>

              {checkIn && checkOut && (
                <div style={{ background: 'var(--sand)', borderRadius: 6, padding: '0.6rem 1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--slate)' }}>
                  <i className="bi bi-calendar3 me-2"></i>
                  {checkIn} → {checkOut} &nbsp;·&nbsp;
                  <strong>{nights} night{nights > 1 ? 's' : ''}</strong> &nbsp;·&nbsp;
                  <i className="bi bi-people me-1"></i>{guests} guest{guests > 1 ? 's' : ''}
                </div>
              )}

              <div className="d-flex flex-column gap-3">
                {hotel.rooms.map(room => (
                  <div
                    key={room.id}
                    className="card-luxe p-3"
                    style={{
                      border: selectedRoom?.id === room.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: 4 }}>{room.type}</h6>
                        <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 6 }}>
                          <i className="bi bi-people me-1"></i>Up to {room.maxGuests} guests
                        </p>
                        <div className="d-flex flex-wrap gap-1">
                          {room.amenities.map(a => (
                            <span key={a} style={{ background: 'var(--sand)', padding: '0.1rem 0.45rem', borderRadius: '20px', fontSize: '0.72rem', color: 'var(--slate)' }}>
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', lineHeight: 1 }}>
                          ₹{room.price.toLocaleString()}
                        </div>
                        <div style={{ color: '#aaa', fontSize: '0.72rem', marginBottom: 4 }}>per night</div>
                        {nights > 1 && (
                          <div style={{ color: 'var(--slate)', fontSize: '0.78rem', marginBottom: 8 }}>
                            Total: ₹{(room.price * nights).toLocaleString()}
                          </div>
                        )}
                        {room.available <= 2 && (
                          <div style={{ color: 'var(--danger)', fontSize: '0.73rem', marginBottom: 6 }}>
                            <i className="bi bi-exclamation-triangle me-1"></i>Only {room.available} left!
                          </div>
                        )}
                        <button
                          className="btn-gold"
                          style={{ padding: '0.4rem 1.1rem', fontSize: '0.82rem' }}
                          onClick={e => { e.stopPropagation(); handleBook(room); }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card-luxe p-4">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                <i className="bi bi-chat-quote me-2" style={{ color: 'var(--gold)' }}></i>
                Guest Reviews
                <span style={{ fontSize: '1rem', color: 'var(--slate)', fontFamily: 'var(--font-body)', marginLeft: 10 }}>
                  ({hotel.reviews.length} reviews)
                </span>
              </h3>

              <div className="d-flex flex-column gap-3">
                {hotel.reviews.map(review => (
                  <div key={review.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>{review.user}</strong>
                        {review.verified && (
                          <span style={{ marginLeft: 8, color: 'var(--success)', fontSize: '0.72rem' }}>
                            <i className="bi bi-patch-check-fill me-1"></i>Verified Stay
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#aaa', fontSize: '0.78rem' }}>{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 6, marginBottom: 2 }}>{review.title}</p>
                    <p style={{ color: 'var(--slate)', fontSize: '0.85rem', lineHeight: 1.7 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky Booking CTA ── */}
          <div className="col-12 col-lg-4">
            <div className="card-luxe p-4" style={{ position: 'sticky', top: 80 }}>
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>Book Your Stay</h5>

              {selectedRoom ? (
                <>
                  <div style={{ background: 'var(--sand)', borderRadius: 6, padding: '0.8rem 1rem', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selectedRoom.type}</div>
                    <div style={{ color: 'var(--slate)', fontSize: '0.82rem', marginTop: 2 }}>
                      {nights} night{nights > 1 ? 's' : ''} × ₹{selectedRoom.price.toLocaleString()}
                    </div>
                    <hr className="divider-gold" style={{ margin: '0.6rem 0' }} />
                    <div className="d-flex justify-content-between">
                      <span style={{ fontWeight: 600 }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)' }}>
                        ₹{(selectedRoom.price * nights).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="btn-gold w-100" onClick={() => handleBook(selectedRoom)}>
                    <i className="bi bi-shield-check me-2"></i>Book Now — Secure
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#aaa', marginTop: 8 }}>
                    <i className="bi bi-lock me-1"></i>Free cancellation · Best price guaranteed
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--slate)', fontSize: '0.88rem', padding: '1rem 0' }}>
                  <i className="bi bi-hand-index" style={{ fontSize: '1.5rem', display: 'block', marginBottom: 8, color: 'var(--gold)' }}></i>
                  Select a room above to see pricing and proceed to booking.
                </div>
              )}

              <hr className="divider-gold" />
              <div style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>
                <p><i className="bi bi-telephone me-2" style={{ color: 'var(--gold)' }}></i>24/7 Support: 1800-LUXE-STAY</p>
                <p className="mb-0"><i className="bi bi-envelope me-2" style={{ color: 'var(--gold)' }}></i>help@luxestay.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
