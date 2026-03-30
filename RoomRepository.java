package com.luxestay.service;

import com.luxestay.dto.ReviewDTO;
import com.luxestay.dto.ReviewRequest;
import com.luxestay.entity.*;
import com.luxestay.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public List<ReviewDTO> getByHotel(Long hotelId) {
        return reviewRepository.findByHotelIdOrderByCreatedAtDesc(hotelId)
                .stream().map(ReviewDTO::from).collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO submit(Long hotelId, ReviewRequest req, String userEmail) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found."));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found."));

        Review review = Review.builder()
                .hotel(hotel)
                .user(user)
                .rating(req.getRating())
                .comment(req.getComment())
                .build();
        ReviewDTO dto = ReviewDTO.from(reviewRepository.save(review));

        // Recalculate hotel average rating
        List<Review> all = reviewRepository.findByHotelIdOrderByCreatedAtDesc(hotelId);
        double avg = all.stream().mapToInt(Review::getRating).average().orElse(0);
        hotel.setRating(Math.round(avg * 10.0) / 10.0);
        hotel.setReviewCount(all.size());
        hotelRepository.save(hotel);

        return dto;
    }

    public void delete(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
