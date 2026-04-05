package com.hotel.booking.service;

import com.hotel.auth.entity.User;
import com.hotel.auth.repository.UserRepository;
import com.hotel.booking.dto.BookingDto.*;
import com.hotel.booking.entity.*;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    @Autowired private BookingRepository bookingRepository;
    @Autowired private HotelRepository hotelRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private UserRepository userRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest req, String userEmail) {
        logger.info("Creating booking for user: {}", userEmail);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Hotel hotel = hotelRepository.findById(req.getHotelId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.getAvailableRooms() < 1) {
            throw new BookingException("No rooms available for selected dates");
        }

        if (req.getCheckOut().isBefore(req.getCheckIn()) || req.getCheckOut().isEqual(req.getCheckIn())) {
            throw new BookingException("Check-out must be after check-in");
        }

        long nights = ChronoUnit.DAYS.between(req.getCheckIn(), req.getCheckOut());
        BigDecimal total = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Booking booking = Booking.builder()
                .bookingReference("HB-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(user)
                .hotel(hotel)
                .room(room)
                .checkIn(req.getCheckIn())
                .checkOut(req.getCheckOut())
                .guests(req.getGuests())
                .totalAmount(total)
                .status(Booking.BookingStatus.CONFIRMED)
                .specialRequests(req.getSpecialRequests())
                .guestName(req.getGuestName())
                .guestEmail(req.getGuestEmail())
                .guestPhone(req.getGuestPhone())
                .build();

        room.setAvailableRooms(room.getAvailableRooms() - 1);
        roomRepository.save(room);

        Booking saved = bookingRepository.save(booking);
        logger.info("Booking created: {}", saved.getBookingReference());

        return toResponse(saved);
    }

    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public BookingResponse getBookingByRef(String ref) {
        Booking b = bookingRepository.findByBookingReference(ref)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + ref));
        return toResponse(b);
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new BookingException("Unauthorized to cancel this booking");
        }
        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new BookingException("Booking already cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        Room room = booking.getRoom();
        room.setAvailableRooms(room.getAvailableRooms() + 1);
        roomRepository.save(room);

        logger.info("Booking cancelled: {}", booking.getBookingReference());
        return toResponse(bookingRepository.save(booking));
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private BookingResponse toResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .bookingReference(b.getBookingReference())
                .hotelName(b.getHotel().getName())
                .hotelLocation(b.getHotel().getLocation())
                .roomType(b.getRoom().getRoomType())
                .checkIn(b.getCheckIn())
                .checkOut(b.getCheckOut())
                .guests(b.getGuests())
                .totalAmount(b.getTotalAmount())
                .status(b.getStatus().name())
                .guestName(b.getGuestName())
                .guestEmail(b.getGuestEmail())
                .createdAt(b.getCreatedAt())
                .build();
    }
}
