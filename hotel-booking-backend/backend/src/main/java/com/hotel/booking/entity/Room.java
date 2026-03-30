package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(nullable = false)
    private String roomType; // Single, Double, Suite, Deluxe

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerNight;

    private Integer maxGuests;
    private Integer totalRooms;
    private Integer availableRooms;
    private String amenities;
    private String imageUrl;
    private Boolean active = true;
}
