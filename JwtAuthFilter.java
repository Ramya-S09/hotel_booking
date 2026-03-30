package com.luxestay.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull
    private Long bookingId;
    @NotNull
    private Double amount;
    private String method; // CARD, UPI, NETBANKING, WALLET
    // Card details (not stored — just for request simulation)
    private String cardNumber;
    private String cardHolderName;
    private String expiryDate;
    private String cvv;
}
