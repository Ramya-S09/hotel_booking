package com.hotel.booking.service;

import com.hotel.booking.model.Booking;
import com.hotel.booking.model.BookingRequest;
import com.hotel.booking.model.Hotel;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * SERVICE for Booking Business Logic
 *
 * Handles:
 *  - Creating a booking
 *  - Calculating total price
 *  - Cancelling a booking
 *  - Fetching bookings
 */
@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Create a new booking from the request data sent by frontend
     */
    public Booking createBooking(BookingRequest request) {

        // Step 1: Find the hotel - throw error if not found
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + request.getHotelId()));

        // Step 2: Parse check-in and check-out dates
        LocalDate checkIn  = LocalDate.parse(request.getCheckIn());
        LocalDate checkOut = LocalDate.parse(request.getCheckOut());

        // Step 3: Calculate number of nights
        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        if (nights <= 0) {
            throw new RuntimeException("Check-out must be after check-in!");
        }

        // Step 4: Calculate total price
        // Total = price per night × nights + 12% tax
        int base  = request.getPricePerNight() * (int) nights;
        int tax   = (int) Math.round(base * 0.12);
        int total = base + tax;

        // Step 5: Create and save booking
        Booking booking = new Booking();
        booking.setHotel(hotel);
        booking.setGuestName(request.getGuestName());
        booking.setGuestEmail(request.getGuestEmail());
        booking.setRoomType(request.getRoomType());
        booking.setPricePerNight(request.getPricePerNight());
        booking.setGuestCount(request.getGuestCount());
        booking.setCheckIn(checkIn);
        booking.setCheckOut(checkOut);
        booking.setTotalPrice(total);
        booking.setBookedAt(LocalDateTime.now());
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    /**
     * Get all bookings
     */
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    /**
     * Get a booking by ID
     */
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    /**
     * Get all bookings for a guest email
     */
    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    /**
     * Cancel a booking (sets status to CANCELLED, doesn't delete)
     */
    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}
