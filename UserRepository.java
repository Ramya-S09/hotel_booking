package com.luxestay.service;

import com.luxestay.dto.PaymentRequest;
import com.luxestay.entity.*;
import com.luxestay.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Transactional
    public Payment process(PaymentRequest req, String userEmail) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found."));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied.");
        }

        Payment.PaymentMethod method = Payment.PaymentMethod.CARD;
        if (req.getMethod() != null) {
            try { method = Payment.PaymentMethod.valueOf(req.getMethod().toUpperCase()); }
            catch (IllegalArgumentException ignored) {}
        }

        // Simulate payment — always succeeds in this demo
        Payment payment = Payment.builder()
                .booking(booking)
                .amount(req.getAmount())
                .method(method)
                .status(Payment.PaymentStatus.SUCCESS)
                .transactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .build();

        // Mark booking as CONFIRMED after payment
        booking.setStatus(Booking.Status.CONFIRMED);
        bookingRepository.save(booking);

        return paymentRepository.save(payment);
    }

    public Payment getByBooking(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found."));
    }
}
