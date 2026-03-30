# LuxeStay — Hotel Booking Frontend

React + Bootstrap frontend for the Hotel Booking system.

## Project Structure

```
src/
├── context/
│   └── AuthContext.js          # Global auth state (JWT + user)
├── components/
│   ├── Navbar.js               # Sticky top navigation
│   ├── Footer.js               # Site footer
│   ├── ProtectedRoute.js       # Auth guard for private pages
│   └── StarRating.js           # Reusable star rating display
├── pages/
│   ├── Home.js                 # Landing + hero search
│   ├── Login.js                # Sign in
│   ├── Register.js             # Create account
│   ├── Hotels.js               # Search results + filters
│   ├── HotelDetail.js          # Hotel info, rooms, reviews
│   ├── Booking.js              # Booking summary + payment
│   ├── BookingConfirmation.js  # Success screen
│   ├── Dashboard.js            # User dashboard + loyalty
│   └── MyBookings.js           # Booking history + reviews
├── utils/
│   └── api.js                  # All API calls with JWT header
└── styles/
    └── global.css              # Design system (CSS variables, components)
```

## Setup

```bash
npm install
npm start        # http://localhost:3000
npm run build    # Production build
```

## Environment Variable

Create `.env` in project root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Key Features

- **JWT Auth** — token stored in localStorage, sent in Authorization header
- **Protected Routes** — redirect to /login if unauthenticated
- **Search & Filter** — location, dates, guests, price, rating, amenity
- **Room Selection** — real-time availability display
- **Payment** — Card / UPI / Net Banking with promo code support
- **Promo Codes** — Try `LUXE10` (10% off) or `FLAT500` (₹500 off)
- **Dashboard** — stats, loyalty points progress bar, booking history
- **Reviews** — submit reviews only for completed stays
- **Rebook** — one-tap rebook from booking history

## Hooks Used

- `useState` — form state, UI toggles, data
- `useEffect` — data fetching on mount
- `useNavigate` — programmatic navigation
- `useParams` — hotel ID from URL
- `useSearchParams` — read/write query string (search, booking params)

## Pages & Routes

| Path | Component | Auth Required |
|------|-----------|--------------|
| `/` | Home | No |
| `/hotels` | Hotels | No |
| `/hotels/:id` | HotelDetail | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/booking` | Booking | ✅ Yes |
| `/booking-confirmation` | BookingConfirmation | ✅ Yes |
| `/dashboard` | Dashboard | ✅ Yes |
| `/my-bookings` | MyBookings | ✅ Yes |

## API Integration

All API calls are in `src/utils/api.js`. Replace mock data in pages with actual API calls once backend is ready. JWT token is automatically attached to every protected request.

```js
// Example — replace mock in Hotels.js:
const data = await hotelAPI.search({ location, checkIn, checkOut, guests });
setHotels(data.hotels);
```
