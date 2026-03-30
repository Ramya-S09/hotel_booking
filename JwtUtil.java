package com.luxestay.dto;

import com.luxestay.entity.Review;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private Long hotelId;
    private Long userId;
    private String userName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public static ReviewDTO from(Review r) {
        return ReviewDTO.builder()
                .id(r.getId())
                .hotelId(r.getHotel().getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getFirstName() + " " + r.getUser().getLastName())
                .rating(r.getRating())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
