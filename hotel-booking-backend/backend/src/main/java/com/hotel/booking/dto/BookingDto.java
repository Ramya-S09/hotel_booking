package com.hotel.booking.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class BookingDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HotelResponse {
        private Long id;
        private String name;
        private String location;
        private String city;
        private String country;
        private String description;
        private String imageUrl;
        private BigDecimal rating;
        private Integer reviewCount;
        private List<String> amenities;
        private String category;
        private BigDecimal startingPrice;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomResponse {
        private Long id;
        private Long hotelId;
        private String hotelName;
        private String roomType;
        private BigDecimal pricePerNight;
        private Integer maxGuests;
        private Integer availableRooms;
        private List<String> amenities;
        private String imageUrl;
    }

    @Data
    public static class BookingRequest {
        @NotNull private Long hotelId;
        @NotNull private Long roomId;
        @NotNull private LocalDate checkIn;
        @NotNull private LocalDate checkOut;
        @Min(1) private Integer guests;
        private String specialRequests;
        @NotBlank private String guestName;
        @Email @NotBlank private String guestEmail;
        private String guestPhone;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookingResponse {
        private Long id;
        private String bookingReference;
        private String hotelName;
        private String hotelLocation;
        private String roomType;
        private LocalDate checkIn;
        private LocalDate checkOut;
        private Integer guests;
        private BigDecimal totalAmount;
        private String status;
        private String guestName;
        private String guestEmail;
        private LocalDateTime createdAt;
    }

    @Data
    public static class HotelSearchRequest {
        private String city;
        private LocalDate checkIn;
        private LocalDate checkOut;
        private Integer guests;
        private BigDecimal minPrice;
        private BigDecimal maxPrice;
        private String category;
    }
}
