package com.hotel.booking.repository;

import com.hotel.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * REPOSITORY for Bookings
 *
 * Same idea as HotelRepository - Spring creates SQL from method names.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Get all bookings for a specific hotel
    // SELECT * FROM bookings WHERE hotel_id = ?
    List<Booking> findByHotelId(Long hotelId);

    // Get all bookings by a guest's email
    List<Booking> findByGuestEmail(String email);

    // Get all bookings with a specific status
    List<Booking> findByStatus(String status);
}
