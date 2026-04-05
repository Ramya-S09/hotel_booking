package com.luxestay.service;

import com.luxestay.dto.BookingDTO;
import com.luxestay.dto.BookingRequest;
import com.luxestay.entity.*;
import com.luxestay.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // Simple promo codes
    private static final Map<String, Double> PROMO_CODES = Map.of(
            "LUXE10", 0.10,
            "SAVE20", 0.20,
            "FIRSTBOOK", 0.15
    );

    @Transactional
    public BookingDTO create(BookingRequest req, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));
        Hotel hotel = hotelRepository.findById(req.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found."));
        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found."));

        if (!room.getAvailable()) {
            throw new IllegalStateException("Room is not available.");
        }

        long nights = ChronoUnit.DAYS.between(req.getCheckIn(), req.getCheckOut());
        if (nights < 1) throw new IllegalArgumentException("Check-out must be after check-in.");

        double baseAmount = room.getPricePerNight() * nights;
        double discount = 0;
        String promoCode = null;

        if (req.getPromoCode() != null && !req.getPromoCode().isBlank()) {
            String code = req.getPromoCode().toUpperCase();
            if (PROMO_CODES.containsKey(code)) {
                discount = baseAmount * PROMO_CODES.get(code);
                promoCode = code;
            }
        }

        Booking booking = Booking.builder()
                .user(user)
                .hotel(hotel)
                .room(room)
                .checkIn(req.getCheckIn())
                .checkOut(req.getCheckOut())
                .guests(req.getGuests())
                .totalAmount(baseAmount - discount)
                .discountAmount(discount)
                .promoCode(promoCode)
                .build();

        return BookingDTO.from(bookingRepository.save(booking));
    }

    public List<BookingDTO> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(BookingDTO::from).collect(Collectors.toList());
    }

    public BookingDTO getById(Long id, String userEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found."));
        // ensure user owns the booking (or is admin)
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied.");
        }
        return BookingDTO.from(booking);
    }

    @Transactional
    public BookingDTO cancel(Long id, String userEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found."));
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied.");
        }
        if (booking.getStatus() == Booking.Status.CANCELLED) {
            throw new IllegalStateException("Booking already cancelled.");
        }
        booking.setStatus(Booking.Status.CANCELLED);
        return BookingDTO.from(bookingRepository.save(booking));
    }

    // ── Admin ────────────────────────────────────────────────────────────────

    public List<BookingDTO> getAll() {
        return bookingRepository.findAll().stream()
                .map(BookingDTO::from).collect(Collectors.toList());
    }

    public BookingDTO updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found."));
        booking.setStatus(Booking.Status.valueOf(status.toUpperCase()));
        return BookingDTO.from(bookingRepository.save(booking));
    }
}
