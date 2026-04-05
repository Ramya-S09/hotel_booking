// src/pages/Hotels.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hotelAPI } from '../utils/api';
import StarRating from '../components/StarRating';

// Mock hotels data (replace with API call)
const MOCK_HOTELS = [
  { id: 1, name: 'The Grand Meridian', location: 'Mumbai', stars: 5, rating: 4.8, price: 8500, amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', availableRooms: 3 },
  { id: 2, name: 'Palazzo Heritage', location: 'Delhi', stars: 5, rating: 4.9, price: 12000, amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', availableRooms: 1 },
  { id: 3, name: 'Serene Backwaters', location: 'Kerala', stars: 4, rating: 4.6, price: 5500, amenities: ['Free WiFi', 'Pool', 'Spa'], image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', availableRooms: 7 },
  { id: 4, name: 'Dunes Resort', location: 'Jaisalmer', stars: 4, rating: 4.4, price: 4200, amenities: ['Free WiFi', 'Restaurant', 'Parking'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', availableRooms: 5 },
  { id: 5, name: 'Coastal Retreat', location: 'Goa', stars: 3, rating: 4.1, price: 3200, amenities: ['Free WiFi', 'Pool', 'Parking'], image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', availableRooms: 10 },
  { id: 6, name: 'Himalayan Lodge', location: 'Manali', stars: 4, rating: 4.5, price: 6000, amenities: ['Free WiFi', 'Restaurant', 'Spa'], image: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=600&q=80', availableRooms: 4 },
];

export default function Hotels() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '', maxPrice: '', minRating: '', amenity: '',
    sortBy: 'rating',
  });

  const location = searchParams.get('location') || '';
  const checkIn  = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests   = searchParams.get('guests') || 1;

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let results = MOCK_HOTELS;
      if (location) {
        results = results.filter(h =>
          h.location.toLowerCase().includes(location.toLowerCase()) ||
          h.name.toLowerCase().includes(location.toLowerCase())
        );
      }
      setHotels(results);
      setLoading(false);
    }, 600);
  }, [location]);

  const applyFilters = (list) => {
    let r = [...list];
    if (filters.minPrice)  r = r.filter(h => h.price >= Number(filters.minPrice));
    if (filters.maxPrice)  r = r.filter(h => h.price <= Number(filters.maxPrice));
    if (filters.minRating) r = r.filter(h => h.rating >= Number(filters.minRating));
    if (filters.amenity)   r = r.filter(h => h.amenities.includes(filters.amenity));
    if (filters.sortBy === 'price_asc')  r.sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price_desc') r.sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'rating')     r.sort((a, b) => b.rating - a.rating);
    return r;
  };

  const displayed = applyFilters(hotels);

  const goToHotel = (id) => {
    navigate(`/hotels/${id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1>
          {location ? `Hotels in ${location}` : 'All Hotels'}
        </h1>
        {checkIn && checkOut && (
          <p>
            <i className="bi bi-calendar3 me-1"></i>
            {checkIn} → {checkOut} &nbsp;·&nbsp;
            <i className="bi bi-people me-1"></i>{guests} Guest{guests > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* ── Filters Sidebar ── */}
          <div className="col-12 col-md-3">
            <div className="card-luxe p-3" style={{ position: 'sticky', top: 80 }}>
              <h6 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '1rem' }}>
                <i className="bi bi-funnel me-2"></i>Filters
              </h6>

              <div className="mb-3">
                <label className="form-label-luxe">Sort By</label>
                <select className="input-luxe" value={filters.sortBy}
                  onChange={e => setFilters({ ...filters, sortBy: e.target.value })}>
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label-luxe">Price Range (₹/night)</label>
                <div className="d-flex gap-2">
                  <input className="input-luxe" type="number" placeholder="Min" value={filters.minPrice}
                    onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
                  <input className="input-luxe" type="number" placeholder="Max" value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-luxe">Min Rating</label>
                <select className="input-luxe" value={filters.minRating}
                  onChange={e => setFilters({ ...filters, minRating: e.target.value })}>
                  <option value="">Any</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label-luxe">Amenity</label>
                <select className="input-luxe" value={filters.amenity}
                  onChange={e => setFilters({ ...filters, amenity: e.target.value })}>
                  <option value="">Any</option>
                  {['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'].map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <button className="btn-outline-gold w-100" onClick={() => setFilters({ minPrice: '', maxPrice: '', minRating: '', amenity: '', sortBy: 'rating' })}>
                Clear Filters
              </button>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p style={{ color: 'var(--slate)', fontSize: '0.88rem' }}>
                {loading ? 'Searching…' : `${displayed.length} propert${displayed.length === 1 ? 'y' : 'ies'} found`}
              </p>
            </div>

            {loading ? (
              <div className="spinner-gold"></div>
            ) : displayed.length === 0 ? (
              <div className="card-luxe p-5 text-center">
                <i className="bi bi-building-x" style={{ fontSize: '3rem', color: 'var(--sand)' }}></i>
                <h4 style={{ fontFamily: 'var(--font-display)', marginTop: '1rem' }}>No hotels found</h4>
                <p style={{ color: 'var(--slate)' }}>Try a different location or adjust your filters.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {displayed.map(hotel => (
                  <div key={hotel.id} className="card-luxe" style={{ cursor: 'pointer' }}>
                    <div className="row g-0">
                      <div className="col-12 col-md-4" style={{ position: 'relative', minHeight: 180 }}>
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 180, borderRadius: '10px 0 0 10px' }}
                        />
                        {hotel.availableRooms <= 3 && (
                          <span style={{
                            position: 'absolute', bottom: 10, left: 10,
                            background: '#c0392b', color: '#fff',
                            padding: '0.15rem 0.6rem', borderRadius: '20px',
                            fontSize: '0.72rem', fontWeight: 500,
                          }}>
                            Only {hotel.availableRooms} left!
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-8 p-3 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 4 }}>{hotel.name}</h5>
                              <p style={{ color: 'var(--slate)', fontSize: '0.83rem', marginBottom: 6 }}>
                                <i className="bi bi-geo-alt me-1"></i>{hotel.location}
                              </p>
                              <StarRating rating={hotel.rating} />
                            </div>
                            <div style={{ textAlign: 'right', minWidth: 120 }}>
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', lineHeight: 1 }}>
                                ₹{hotel.price.toLocaleString()}
                              </div>
                              <div style={{ color: '#aaa', fontSize: '0.73rem' }}>per night</div>
                            </div>
                          </div>

                          <div className="d-flex flex-wrap gap-1 mt-2">
                            {hotel.amenities.map(a => (
                              <span key={a} style={{
                                background: 'var(--sand)', color: 'var(--slate)',
                                padding: '0.15rem 0.55rem', borderRadius: '20px',
                                fontSize: '0.72rem',
                              }}>
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>
                            <i className="bi bi-door-open me-1"></i>
                            {hotel.availableRooms} rooms available
                          </span>
                          <button className="btn-gold" style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}
                            onClick={() => goToHotel(hotel.id)}>
                            View Rooms <i className="bi bi-arrow-right ms-1"></i>
                          </button>
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
  );
}
