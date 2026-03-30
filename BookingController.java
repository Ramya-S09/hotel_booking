package com.luxestay.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PaymentMethod method = PaymentMethod.CARD;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PaymentStatus status = PaymentStatus.SUCCESS;

    private String transactionId;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime paidAt = LocalDateTime.now();

    public enum PaymentMethod { CARD, UPI, NETBANKING, WALLET }
    public enum PaymentStatus { SUCCESS, FAILED, PENDING, REFUNDED }
}
