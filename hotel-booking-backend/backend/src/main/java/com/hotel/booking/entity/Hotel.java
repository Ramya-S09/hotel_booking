package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    private String city;
    private String country;
    private String description;
    private String imageUrl;

    @Column(precision = 3, scale = 1)
    private BigDecimal rating;

    private Integer reviewCount;
    private String amenities; // comma-separated: WiFi,Pool,Gym

    @Enumerated(EnumType.STRING)
    private HotelCategory category;

    private Boolean active = true;

    public enum HotelCategory {
        BUDGET, STANDARD, DELUXE, LUXURY
    }
}
