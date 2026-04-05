package com.hotel.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * MODEL / ENTITY CLASS
 *
 * This class represents a Hotel in our application.
 *
 * @Entity   → tells JPA to create a database TABLE for this class
 * @Table    → names the table "hotels"
 * @Data     → Lombok auto-generates getters, setters, toString, equals
 * @NoArgsConstructor → generates empty constructor (required by JPA)
 * @AllArgsConstructor → generates constructor with all fields
 */
@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {

    // @Id     → this is the primary key
    // @GeneratedValue → auto-increments (1, 2, 3, ...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hotel name - cannot be empty
    @Column(nullable = false)
    private String name;

    // Location / city
    @Column(nullable = false)
    private String location;

    // Category: luxury, beach, city, budget
    private String category;

    // Emoji icon for display
    private String emoji;

    // Badge label: "Popular", "Deal", "New"
    private String badge;

    // Star rating: 1 to 5
    private int stars;

    // Review score: e.g. "9.4"
    private String rating;

    // Number of reviews: e.g. "2.1k"
    private String reviewCount;

    // Base price per night in USD
    private int pricePerNight;

    // Comma-separated amenities: "Pool,Spa,Gym"
    private String amenities;
}
