package com.luxestay.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromoService {

    private static final Map<String, Double> CODES = Map.of(
            "LUXE10",    0.10,
            "SAVE20",    0.20,
            "FIRSTBOOK", 0.15
    );

    public record PromoResult(boolean valid, String code, double discountRate, double discountAmount, double finalAmount) {}

    public PromoResult validate(String code, Double bookingTotal) {
        if (code == null || code.isBlank()) {
            return new PromoResult(false, code, 0, 0, bookingTotal);
        }
        String upper = code.trim().toUpperCase();
        Double rate = CODES.get(upper);
        if (rate == null) {
            return new PromoResult(false, upper, 0, 0, bookingTotal);
        }
        double discount = bookingTotal * rate;
        return new PromoResult(true, upper, rate, discount, bookingTotal - discount);
    }
}
