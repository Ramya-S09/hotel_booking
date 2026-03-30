package com.luxestay.service;

import com.luxestay.entity.Booking;
import com.luxestay.repository.BookingRepository;
import com.luxestay.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoyaltyService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getAccount(String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));

        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        long completed = bookings.stream()
                .filter(b -> b.getStatus() == Booking.Status.CONFIRMED
                          || b.getStatus() == Booking.Status.COMPLETED)
                .count();

        // 100 points per booking, tier thresholds
        long points = completed * 100;
        String tier = points >= 1000 ? "PLATINUM" : points >= 500 ? "GOLD" : points >= 200 ? "SILVER" : "BRONZE";

        return Map.of(
                "userId",        user.getId(),
                "points",        points,
                "tier",          tier,
                "totalBookings", bookings.size(),
                "completedBookings", completed
        );
    }
}
