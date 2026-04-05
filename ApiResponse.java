package com.luxestay.repository;

import com.luxestay.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query("SELECT h FROM Hotel h WHERE " +
           "(:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
           "(:minPrice IS NULL OR h.pricePerNight >= :minPrice) AND " +
           "(:maxPrice IS NULL OR h.pricePerNight <= :maxPrice) AND " +
           "(:minRating IS NULL OR h.rating >= :minRating)")
    List<Hotel> search(@Param("city") String city,
                       @Param("minPrice") Double minPrice,
                       @Param("maxPrice") Double maxPrice,
                       @Param("minRating") Double minRating);
}
