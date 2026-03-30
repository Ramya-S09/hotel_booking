package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingDto.*;
import com.hotel.booking.service.HotelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
@Tag(name = "Hotels", description = "Hotel search and listing APIs")
public class HotelController {

    private static final Logger logger = LoggerFactory.getLogger(HotelController.class);

    @Autowired private HotelService hotelService;

    @Operation(summary = "Get all hotels")
    @GetMapping
    public ResponseEntity<List<HotelResponse>> getAllHotels() {
        logger.info("GET /api/hotels");
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @Operation(summary = "Search hotels by city/filters")
    @PostMapping("/search")
    public ResponseEntity<List<HotelResponse>> searchHotels(@RequestBody HotelSearchRequest req) {
        logger.info("POST /api/hotels/search city={}", req.getCity());
        return ResponseEntity.ok(hotelService.searchHotels(req));
    }

    @Operation(summary = "Get hotel by ID")
    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }

    @Operation(summary = "Get available rooms for a hotel")
    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<RoomResponse>> getRooms(@PathVariable Long hotelId) {
        return ResponseEntity.ok(hotelService.getRoomsByHotel(hotelId));
    }
}
