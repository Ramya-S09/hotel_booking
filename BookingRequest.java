package com.luxestay.repository;

import com.luxestay.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHotelIdOrderByCreatedAtDesc(Long hotelId);
    boolean existsByHotelIdAndUserId(Long hotelId, Long userId);
}
