package com.hotel.booking.repository;

import com.hotel.booking.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * REPOSITORY - Database Access Layer
 *
 * By extending JpaRepository, Spring automatically gives us:
 *   - findAll()         → get all hotels
 *   - findById(id)      → get one hotel by ID
 *   - save(hotel)       → insert or update a hotel
 *   - deleteById(id)    → delete a hotel
 *   - count()           → count all hotels
 *
 * We just declare method names and Spring writes the SQL for us!
 * JpaRepository<Hotel, Long> means:
 *   - Hotel = the entity class
 *   - Long  = the type of the primary key (id)
 */
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    // Spring reads the method name and creates:
    // SELECT * FROM hotels WHERE category = ?
    List<Hotel> findByCategory(String category);

    // SELECT * FROM hotels WHERE name LIKE %keyword%
    List<Hotel> findByNameContainingIgnoreCase(String name);

    // SELECT * FROM hotels WHERE stars >= minStars
    List<Hotel> findByStarsGreaterThanEqual(int minStars);
}
