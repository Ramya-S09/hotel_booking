package com.hotel.booking.controller;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * CONTROLLER - REST API Layer
 *
 * The Controller receives HTTP requests from the frontend
 * and sends back HTTP responses (JSON).
 *
 * @RestController → this class handles HTTP requests & returns JSON
 * @RequestMapping → all URLs in this class start with /api/hotels
 * @CrossOrigin    → allows the React frontend (port 3000) to call this API
 *
 * HTTP Methods:
 *   GET    → read data
 *   POST   → create data
 *   PUT    → update data
 *   DELETE → delete data
 */
@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // ─────────────────────────────────────────
    // GET /api/hotels
    // GET /api/hotels?category=luxury
    // GET /api/hotels?search=azure
    // Returns: list of hotels (JSON array)
    // ─────────────────────────────────────────
    @GetMapping
    public List<Hotel> getHotels(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {

        if (category != null && !category.isEmpty()) {
            // Filter by category
            return hotelService.getHotelsByCategory(category);
        } else if (search != null && !search.isEmpty()) {
            // Search by name
            return hotelService.searchHotels(search);
        }
        // No filter - return all hotels
        return hotelService.getAllHotels();
    }

    // ─────────────────────────────────────────
    // GET /api/hotels/1
    // Returns: single hotel or 404
    // ─────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id)
                .map(ResponseEntity::ok)                   // found → 200 OK
                .orElse(ResponseEntity.notFound().build()); // not found → 404
    }

    // ─────────────────────────────────────────
    // POST /api/hotels
    // Body: hotel JSON
    // Returns: saved hotel with generated ID
    // ─────────────────────────────────────────
    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel saved = hotelService.addHotel(hotel);
        return ResponseEntity.ok(saved);
    }

    // ─────────────────────────────────────────
    // PUT /api/hotels/1
    // Body: updated hotel JSON
    // Returns: updated hotel or 404
    // ─────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        Hotel updated = hotelService.updateHotel(id, hotel);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // ─────────────────────────────────────────
    // DELETE /api/hotels/1
    // Returns: 200 OK or 404
    // ─────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable Long id) {
        boolean deleted = hotelService.deleteHotel(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Hotel deleted successfully");
    }
}
