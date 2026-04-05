# 🏨 Hotel Booking System — Full Stack

> Spring Boot + React + SQL Server | JWT Auth | Docker | Swagger

---

## 📁 Project Structure

```
hotel-booking/
├── backend/                  ← Spring Boot Application
│   ├── src/main/java/com/hotel/
│   │   ├── auth/             ← Auth Service (Register/Login/JWT)
│   │   │   ├── controller/   AuthController.java
│   │   │   ├── service/      AuthService.java
│   │   │   ├── security/     JwtUtil.java, JwtAuthenticationFilter.java
│   │   │   ├── entity/       User.java
│   │   │   ├── dto/          AuthDto.java
│   │   │   ├── repository/   UserRepository.java
│   │   │   └── exception/    AuthException.java
│   │   ├── booking/          ← Booking Business Service
│   │   │   ├── controller/   HotelController.java, BookingController.java
│   │   │   ├── service/      HotelService.java, BookingService.java
│   │   │   ├── entity/       Hotel.java, Room.java, Booking.java
│   │   │   ├── dto/          BookingDto.java
│   │   │   ├── repository/   HotelRepository.java, RoomRepository.java, BookingRepository.java
│   │   │   └── exception/    ResourceNotFoundException.java, BookingException.java
│   │   ├── config/           SecurityConfig.java, OpenApiConfig.java
│   │   └── common/           GlobalExceptionHandler.java
│   ├── src/test/             ← JUnit + Mockito Tests
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                 ← React Application
│   ├── src/
│   │   ├── context/          AuthContext.js
│   │   ├── services/         api.js (Axios)
│   │   ├── components/
│   │   │   ├── layout/       Navbar.js, ProtectedRoute.js
│   │   │   └── hotel/        HotelCard.js, SearchBar.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── HotelDetailPage.js
│   │   │   ├── BookingPage.js
│   │   │   ├── BookingConfirmationPage.js
│   │   │   ├── MyBookingsPage.js
│   │   │   └── AdminPage.js
│   │   ├── App.js            ← React Router setup
│   │   └── index.css         ← Global styles
│   ├── Dockerfile
│   └── package.json
│
├── database/
│   └── schema.sql            ← SQL Server DDL + seed data
└── docker-compose.yml

```

---

## 🔐 Security Flow

```
Register  →  POST /api/auth/register  →  BCrypt password  →  Save User  →  Return JWT
Login     →  POST /api/auth/login     →  Validate creds   →  Return JWT
API Call  →  Authorization: Bearer <token>  →  JwtFilter validates  →  Grants access
ADMIN API →  Role check via @PreAuthorize("hasRole('ADMIN')")
```

---

## 🚀 API Endpoints

### Auth
| Method | URL                    | Auth | Description        |
|--------|------------------------|------|--------------------|
| POST   | /api/auth/register     | No   | Register new user  |
| POST   | /api/auth/login        | No   | Login, get token   |

### Hotels
| Method | URL                    | Auth | Description        |
|--------|------------------------|------|--------------------|
| GET    | /api/hotels            | No   | List all hotels    |
| POST   | /api/hotels/search     | No   | Search hotels      |
| GET    | /api/hotels/{id}       | No   | Hotel detail       |
| GET    | /api/hotels/{id}/rooms | No   | Available rooms    |

### Bookings
| Method | URL                       | Auth  | Description        |
|--------|---------------------------|-------|--------------------|
| POST   | /api/bookings             | User  | Create booking     |
| GET    | /api/bookings/my          | User  | My bookings        |
| GET    | /api/bookings/ref/{ref}   | User  | Get by reference   |
| PUT    | /api/bookings/{id}/cancel | User  | Cancel booking     |
| GET    | /api/bookings/admin/all   | Admin | All bookings       |

---

## 🖥 Run Locally (Without Docker)

### Prerequisites
- Java 17+
- Node.js 18+
- SQL Server 2019+
- Maven 3.9+

### 1. Database Setup
```sql
-- Run database/schema.sql in SQL Server Management Studio
```

### 2. Backend
```bash
cd backend
# Edit src/main/resources/application.properties with your DB credentials
mvn clean install
mvn spring-boot:run
# → Runs on http://localhost:8080
# → Swagger: http://localhost:8080/swagger-ui.html
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
# → Runs on http://localhost:3000
```

### Default Credentials
| Role  | Email            | Password |
|-------|------------------|----------|
| ADMIN | admin@hotel.com  | admin123 |

---

## 🐳 Run with Docker Compose

```bash
# Build and start everything
docker-compose up --build

# Services:
# Frontend  → http://localhost:3000
# Backend   → http://localhost:8080
# Swagger   → http://localhost:8080/swagger-ui.html
# SQL Server → localhost:1433
```

---

## 📋 Sample API Requests (Swagger Format)

### Register
```json
POST /api/auth/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 9876543210"
}
```

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "userId": 2
}
```

### Create Booking
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "hotelId": 1,
  "roomId": 2,
  "checkIn": "2024-04-01",
  "checkOut": "2024-04-03",
  "guests": 2,
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "+91 9876543210",
  "specialRequests": "High floor room please"
}
```

### Booking Response
```json
{
  "id": 1,
  "bookingReference": "HB-A1B2C3D4",
  "hotelName": "Grand Palace Hotel",
  "roomType": "Deluxe",
  "checkIn": "2024-04-01",
  "checkOut": "2024-04-03",
  "guests": 2,
  "totalAmount": 15000.00,
  "status": "CONFIRMED",
  "guestName": "John Doe"
}
```

---

## 🧪 Run Tests

```bash
cd backend
mvn test
```

Tests cover:
- `AuthServiceTest` — register success, duplicate email, login
- `BookingServiceTest` — create booking, no availability, cancel

---

## ⚙️ CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]
jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with: { java-version: '17', distribution: 'temurin' }
      - run: cd backend && mvn clean test

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: cd frontend && npm install && npm run build
```
