package com.hotel.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * BOOKING ENTITY
 *
 * Represents a hotel room booking made by a guest.
 * Each booking links to a Hotel using a foreign key (hotel_id).
 */
@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many bookings can belong to one hotel
    // @ManyToOne → hotel_id column is created as foreign key
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    // Guest's full name
    @Column(nullable = false)
    private String guestName;

    // Guest's email
    @Column(nullable = false)
    private String guestEmail;

    // Room type chosen: e.g. "Ocean Suite"
    private String roomType;

    // Price per night at time of booking
    private int pricePerNight;

    // Number of guests
    private int guestCount;

    // Check-in and check-out dates
    private LocalDate checkIn;
    private LocalDate checkOut;

    // Total price (calculated in service layer)
    private int totalPrice;

    // When this booking was created
    private LocalDateTime bookedAt;

    // Status: CONFIRMED, CANCELLED
    private String status;
}
