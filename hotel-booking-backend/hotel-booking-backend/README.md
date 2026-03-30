# 🏨 Hotel Booking - Spring Boot Backend

A beginner-friendly REST API backend for the Hotel Booking frontend.

---

## 📁 Project Structure

```
src/main/java/com/hotel/booking/
│
├── HotelBookingApplication.java   ← App entry point (main method)
├── DataLoader.java                ← Loads sample data on startup
│
├── model/
│   ├── Hotel.java                 ← Hotel database table
│   ├── Booking.java               ← Booking database table
│   └── BookingRequest.java        ← What the frontend sends to book
│
├── repository/
│   ├── HotelRepository.java       ← Database access for Hotels
│   └── BookingRepository.java     ← Database access for Bookings
│
├── service/
│   ├── HotelService.java          ← Hotel business logic
│   └── BookingService.java        ← Booking business logic
│
└── controller/
    ├── HotelController.java        ← Hotel REST API endpoints
    └── BookingController.java      ← Booking REST API endpoints
```

---

## 🧠 How It Works (Simple Flow)

```
React Frontend
     ↓  HTTP Request
Controller  ← receives the request
     ↓
Service     ← applies business logic
     ↓
Repository  ← talks to database
     ↓
Database    ← stores / retrieves data
     ↑
Controller  ← sends JSON response back to frontend
```

---

## 🚀 How to Run

### Prerequisites
- Java 17+ installed
- Maven installed (or use the wrapper `./mvnw`)

### Steps

```bash
# 1. Go into the project folder
cd hotel-booking-backend

# 2. Run the app
mvn spring-boot:run

# OR using Maven wrapper (no Maven install needed)
./mvnw spring-boot:run
```

App starts at: **http://localhost:8080**

---

## 🌐 API Endpoints

### Hotels

| Method | URL                              | What it does               |
|--------|----------------------------------|----------------------------|
| GET    | /api/hotels                      | Get all hotels             |
| GET    | /api/hotels?category=luxury      | Filter by category         |
| GET    | /api/hotels?search=azure         | Search by name             |
| GET    | /api/hotels/{id}                 | Get one hotel by ID        |
| POST   | /api/hotels                      | Add a new hotel            |
| PUT    | /api/hotels/{id}                 | Update a hotel             |
| DELETE | /api/hotels/{id}                 | Delete a hotel             |

### Bookings

| Method | URL                              | What it does               |
|--------|----------------------------------|----------------------------|
| POST   | /api/bookings                    | Create a booking           |
| GET    | /api/bookings                    | Get all bookings           |
| GET    | /api/bookings/{id}               | Get one booking            |
| GET    | /api/bookings/guest?email=...    | Get bookings by email      |
| PUT    | /api/bookings/{id}/cancel        | Cancel a booking           |

---

## 📬 Example: Create a Booking

**POST** `http://localhost:8080/api/bookings`

```json
{
  "hotelId": 1,
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "roomType": "Ocean Suite",
  "pricePerNight": 420,
  "guestCount": 2,
  "checkIn": "2024-04-10",
  "checkOut": "2024-04-14"
}
```

**Response:**
```json
{
  "id": 1,
  "hotel": { "id": 1, "name": "The Azure Grand", ... },
  "guestName": "John Doe",
  "roomType": "Ocean Suite",
  "checkIn": "2024-04-10",
  "checkOut": "2024-04-14",
  "totalPrice": 1882,
  "status": "CONFIRMED",
  "bookedAt": "2024-03-30T10:00:00"
}
```

---

## 🗄️ View the Database

Visit: **http://localhost:8080/h2-console**

- JDBC URL: `jdbc:h2:mem:hoteldb`
- Username: `sa`
- Password: *(leave blank)*

---

## 🔗 Connect to React Frontend

In your React app, change the hotel data source to call the API:

```javascript
// In App.jsx - replace static import with:
const [hotels, setHotels] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/api/hotels")
    .then(res => res.json())
    .then(data => setHotels(data));
}, []);
```

For booking confirmation:
```javascript
fetch("http://localhost:8080/api/bookings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    hotelId: hotel.id,
    guestName: "John Doe",
    guestEmail: "john@example.com",
    roomType: room.name,
    pricePerNight: room.price,
    guestCount: 2,
    checkIn: "2024-04-10",
    checkOut: "2024-04-14"
  })
})
.then(res => res.json())
.then(booking => console.log("Booked!", booking));
```
