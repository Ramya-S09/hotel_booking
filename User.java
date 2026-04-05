package com.luxestay.dto;

import com.luxestay.entity.Booking;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDTO {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String hotelCity;
    private String hotelImageUrl;
    private Long roomId;
    private String roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private Double totalAmount;
    private Double discountAmount;
    private String promoCode;
    private String status;
    private LocalDateTime createdAt;

    public static BookingDTO from(Booking b) {
        return BookingDTO.builder()
                .id(b.getId())
                .hotelId(b.getHotel().getId())
                .hotelName(b.getHotel().getName())
                .hotelCity(b.getHotel().getCity())
                .hotelImageUrl(b.getHotel().getImageUrl())
                .roomId(b.getRoom().getId())
                .roomType(b.getRoom().getType())
                .checkIn(b.getCheckIn())
                .checkOut(b.getCheckOut())
                .guests(b.getGuests())
                .totalAmount(b.getTotalAmount())
                .discountAmount(b.getDiscountAmount())
                .promoCode(b.getPromoCode())
                .status(b.getStatus().name())
                .createdAt(b.getCreatedAt())
                .build();
    }
}
