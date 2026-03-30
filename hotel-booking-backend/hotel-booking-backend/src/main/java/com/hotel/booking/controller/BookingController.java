package com.hotel.booking.controller;

import com.hotel.booking.model.Booking;
import com.hotel.booking.model.BookingRequest;
import com.hotel.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * CONTROLLER for Booking APIs
 *
 * Handles all booking-related HTTP requests.
 */
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ─────────────────────────────────────────
    // POST /api/bookings
    // Body: BookingRequest JSON
    // Returns: created booking with ID
    // ─────────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            // Return 400 Bad Request with error message
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ─────────────────────────────────────────
    // GET /api/bookings
    // Returns: all bookings
    // ─────────────────────────────────────────
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ─────────────────────────────────────────
    // GET /api/bookings/1
    // Returns: single booking or 404
    // ─────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ─────────────────────────────────────────
    // GET /api/bookings/guest?email=john@example.com
    // Returns: all bookings for a guest
    // ─────────────────────────────────────────
    @GetMapping("/guest")
    public List<Booking> getByEmail(@RequestParam String email) {
        return bookingService.getBookingsByEmail(email);
    }

    // ─────────────────────────────────────────
    // PUT /api/bookings/1/cancel
    // Returns: cancelled booking
    // ─────────────────────────────────────────
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        try {
            Booking cancelled = bookingService.cancelBooking(id);
            return ResponseEntity.ok(cancelled);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
