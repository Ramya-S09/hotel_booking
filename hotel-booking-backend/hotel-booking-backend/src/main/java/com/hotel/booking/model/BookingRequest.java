package com.hotel.booking.model;

import lombok.Data;

/**
 * DTO - Data Transfer Object
 *
 * This is NOT a database entity. It's just a simple class
 * to receive JSON data from the frontend when a user books a hotel.
 *
 * Example JSON the frontend sends:
 * {
 *   "hotelId": 1,
 *   "guestName": "John Doe",
 *   "guestEmail": "john@example.com",
 *   "roomType": "Ocean Suite",
 *   "pricePerNight": 420,
 *   "guestCount": 2,
 *   "checkIn": "2024-04-10",
 *   "checkOut": "2024-04-14"
 * }
 */
@Data
public class BookingRequest {
    private Long hotelId;
    private String guestName;
    private String guestEmail;
    private String roomType;
    private int pricePerNight;
    private int guestCount;
    private String checkIn;   // "YYYY-MM-DD" format
    private String checkOut;  // "YYYY-MM-DD" format
}
