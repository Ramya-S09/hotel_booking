package com.hotel.booking.service;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * SERVICE LAYER - Business Logic
 *
 * The Service layer sits between the Controller and the Repository.
 * It handles the business rules of the application.
 *
 * Flow:
 *   Frontend → Controller → Service → Repository → Database
 *
 * @Service → tells Spring this is a service component (auto-detected)
 * @Autowired → Spring automatically injects (provides) the repository
 */
@Service
public class HotelService {

    // Spring automatically creates and injects HotelRepository for us
    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Get ALL hotels from the database
     */
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    /**
     * Get a single hotel by its ID
     * Returns Optional - because the hotel might not exist
     */
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    /**
     * Get hotels filtered by category (luxury, beach, city, budget)
     */
    public List<Hotel> getHotelsByCategory(String category) {
        return hotelRepository.findByCategory(category.toLowerCase());
    }

    /**
     * Search hotels by name keyword
     */
    public List<Hotel> searchHotels(String keyword) {
        return hotelRepository.findByNameContainingIgnoreCase(keyword);
    }

    /**
     * Add a new hotel (used by admin)
     */
    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    /**
     * Update an existing hotel
     * Returns null if hotel doesn't exist
     */
    public Hotel updateHotel(Long id, Hotel updatedHotel) {
        // Check if hotel exists first
        if (!hotelRepository.existsById(id)) {
            return null;
        }
        updatedHotel.setId(id); // make sure we update, not insert
        return hotelRepository.save(updatedHotel);
    }

    /**
     * Delete a hotel by ID
     */
    public boolean deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            return false;
        }
        hotelRepository.deleteById(id);
        return true;
    }
}
