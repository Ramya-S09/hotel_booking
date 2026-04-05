-- =============================================
-- Hotel Booking System - Database Schema
-- SQL Server
-- =============================================

CREATE DATABASE HotelBookingDB;
GO
USE HotelBookingDB;
GO

-- Users Table
CREATE TABLE users (
    id          BIGINT IDENTITY(1,1) PRIMARY KEY,
    email       NVARCHAR(255) NOT NULL UNIQUE,
    password    NVARCHAR(255) NOT NULL,
    full_name   NVARCHAR(255) NOT NULL,
    phone       NVARCHAR(50),
    role        NVARCHAR(20)  NOT NULL DEFAULT 'USER',
    active      BIT           NOT NULL DEFAULT 1,
    created_at  DATETIME2     DEFAULT GETDATE()
);

-- Hotels Table
CREATE TABLE hotels (
    id            BIGINT IDENTITY(1,1) PRIMARY KEY,
    name          NVARCHAR(255) NOT NULL,
    location      NVARCHAR(500) NOT NULL,
    city          NVARCHAR(100),
    country       NVARCHAR(100),
    description   NVARCHAR(MAX),
    image_url     NVARCHAR(500),
    rating        DECIMAL(3,1),
    review_count  INT DEFAULT 0,
    amenities     NVARCHAR(500),
    category      NVARCHAR(50),
    active        BIT DEFAULT 1
);

-- Rooms Table
CREATE TABLE rooms (
    id               BIGINT IDENTITY(1,1) PRIMARY KEY,
    hotel_id         BIGINT NOT NULL REFERENCES hotels(id),
    room_type        NVARCHAR(100) NOT NULL,
    price_per_night  DECIMAL(10,2) NOT NULL,
    max_guests       INT,
    total_rooms      INT,
    available_rooms  INT,
    amenities        NVARCHAR(500),
    image_url        NVARCHAR(500),
    active           BIT DEFAULT 1
);

-- Bookings Table
CREATE TABLE bookings (
    id                  BIGINT IDENTITY(1,1) PRIMARY KEY,
    booking_reference   NVARCHAR(50) NOT NULL UNIQUE,
    user_id             BIGINT NOT NULL REFERENCES users(id),
    hotel_id            BIGINT NOT NULL REFERENCES hotels(id),
    room_id             BIGINT NOT NULL REFERENCES rooms(id),
    check_in            DATE NOT NULL,
    check_out           DATE NOT NULL,
    guests              INT,
    total_amount        DECIMAL(10,2) NOT NULL,
    status              NVARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
    special_requests    NVARCHAR(1000),
    guest_name          NVARCHAR(255),
    guest_email         NVARCHAR(255),
    guest_phone         NVARCHAR(50),
    created_at          DATETIME2 DEFAULT GETDATE()
);

-- =============================================
-- Seed Data
-- =============================================

-- Admin User (password: admin123 -> BCrypt)
INSERT INTO users (email, password, full_name, phone, role)
VALUES ('admin@hotel.com',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        'Admin User', '+91 9876543210', 'ADMIN');

-- Sample Hotels
INSERT INTO hotels (name, location, city, country, description, rating, review_count, amenities, category)
VALUES
('Grand Palace Hotel',    'Connaught Place, New Delhi',   'New Delhi',  'India', 'A luxury hotel in the heart of Delhi with world-class amenities.', 4.8, 1240, 'WiFi,Pool,Gym,Spa,Restaurant,Parking',   'LUXURY'),
('Sea Pearl Resort',      'Marine Drive, Mumbai',          'Mumbai',     'India', 'Stunning sea-view resort on Marine Drive with premium services.',  4.6,  980, 'WiFi,Pool,Beach Access,Restaurant,Bar',   'DELUXE'),
('Green Valley Inn',      'MG Road, Bangalore',            'Bangalore',  'India', 'Modern business hotel close to tech parks and shopping malls.',   4.2,  640, 'WiFi,Gym,Restaurant,Conference Room',     'STANDARD'),
('Heritage Haveli',       'Johari Bazaar, Jaipur',         'Jaipur',     'India', 'Historic haveli converted into a boutique hotel.',                4.9,  520, 'WiFi,Pool,Spa,Cultural Events,Restaurant','LUXURY'),
('Budget Stay Express',   'Sector 17, Chandigarh',         'Chandigarh', 'India', 'Comfortable rooms at budget-friendly rates.',                     3.8,  310, 'WiFi,Parking,Laundry',                    'BUDGET'),
('Coastal Breeze Hotel',  'Koregaon Park, Pune',           'Pune',       'India', 'Modern hotel with great dining options and cosy rooms.',          4.4,  780, 'WiFi,Pool,Restaurant,Bar,Gym',            'DELUXE');

-- Sample Rooms
INSERT INTO rooms (hotel_id, room_type, price_per_night, max_guests, total_rooms, available_rooms, amenities)
VALUES
(1, 'Standard', 4500.00,  2,  20, 15, 'AC,TV,WiFi,Minibar'),
(1, 'Deluxe',   7500.00,  2,  15, 10, 'AC,TV,WiFi,Minibar,Bathtub'),
(1, 'Suite',    15000.00, 4,   5,  3, 'AC,TV,WiFi,Minibar,Jacuzzi,Living Area'),
(2, 'Standard', 3800.00,  2,  25, 20, 'AC,TV,WiFi,Sea View'),
(2, 'Deluxe',   6200.00,  2,  15, 12, 'AC,TV,WiFi,Sea View,Balcony'),
(3, 'Standard', 2800.00,  2,  30, 25, 'AC,TV,WiFi'),
(3, 'Deluxe',   4500.00,  2,  20, 15, 'AC,TV,WiFi,Work Desk'),
(4, 'Standard', 5500.00,  2,  20, 18, 'AC,TV,WiFi,Heritage Decor'),
(4, 'Suite',    12000.00, 4,   8,  6, 'AC,TV,WiFi,Heritage Decor,Private Courtyard'),
(5, 'Standard', 1200.00,  2,  40, 35, 'AC,TV,WiFi'),
(6, 'Standard', 3200.00,  2,  25, 20, 'AC,TV,WiFi'),
(6, 'Deluxe',   5500.00,  3,  15, 10, 'AC,TV,WiFi,Balcony,Bathtub');
