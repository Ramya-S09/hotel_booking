package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingDto.*;
import com.hotel.booking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Bookings", description = "Booking management APIs")
public class BookingController {

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired private BookingService bookingService;

    @Operation(summary = "Create a new booking")
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("POST /api/bookings by {}", userDetails.getUsername());
        return ResponseEntity.ok(bookingService.createBooking(req, userDetails.getUsername()));
    }

    @Operation(summary = "Get my bookings")
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getMyBookings(userDetails.getUsername()));
    }

    @Operation(summary = "Get booking by reference")
    @GetMapping("/ref/{reference}")
    public ResponseEntity<BookingResponse> getByReference(@PathVariable String reference) {
        return ResponseEntity.ok(bookingService.getBookingByRef(reference));
    }

    @Operation(summary = "Cancel a booking")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, userDetails.getUsername()));
    }

    @Operation(summary = "Get all bookings (Admin only)")
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
