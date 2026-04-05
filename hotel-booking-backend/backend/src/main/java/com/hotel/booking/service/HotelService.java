package com.hotel.booking.service;

import com.hotel.booking.dto.BookingDto.*;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {

    private static final Logger logger = LoggerFactory.getLogger(HotelService.class);

    @Autowired private HotelRepository hotelRepository;
    @Autowired private RoomRepository roomRepository;

    public List<HotelResponse> searchHotels(HotelSearchRequest req) {
        logger.info("Searching hotels in city: {}", req.getCity());
        List<Hotel> hotels = hotelRepository.searchHotels(req.getCity(), req.getCategory());
        return hotels.stream().map(this::toHotelResponse).collect(Collectors.toList());
    }

    public List<HotelResponse> getAllHotels() {
        return hotelRepository.findByActiveTrue().stream()
                .map(this::toHotelResponse).collect(Collectors.toList());
    }

    public HotelResponse getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
        return toHotelResponse(hotel);
    }

    public List<RoomResponse> getRoomsByHotel(Long hotelId) {
        logger.info("Fetching rooms for hotel id: {}", hotelId);
        List<Room> rooms = roomRepository.findByHotelIdAndAvailableRoomsGreaterThanAndActiveTrue(hotelId, 0);
        return rooms.stream().map(this::toRoomResponse).collect(Collectors.toList());
    }

    public HotelResponse createHotel(Hotel hotel) {
        hotel.setActive(true);
        Hotel saved = hotelRepository.save(hotel);
        logger.info("Hotel created: {}", saved.getName());
        return toHotelResponse(saved);
    }

    private HotelResponse toHotelResponse(Hotel h) {
        List<Room> rooms = roomRepository.findByHotelIdAndActiveTrue(h.getId());
        BigDecimal minPrice = rooms.stream()
                .map(Room::getPricePerNight)
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        return HotelResponse.builder()
                .id(h.getId())
                .name(h.getName())
                .location(h.getLocation())
                .city(h.getCity())
                .country(h.getCountry())
                .description(h.getDescription())
                .imageUrl(h.getImageUrl())
                .rating(h.getRating())
                .reviewCount(h.getReviewCount())
                .amenities(h.getAmenities() != null
                        ? Arrays.asList(h.getAmenities().split(",")) : List.of())
                .category(h.getCategory() != null ? h.getCategory().name() : null)
                .startingPrice(minPrice)
                .build();
    }

    private RoomResponse toRoomResponse(Room r) {
        return RoomResponse.builder()
                .id(r.getId())
                .hotelId(r.getHotel().getId())
                .hotelName(r.getHotel().getName())
                .roomType(r.getRoomType())
                .pricePerNight(r.getPricePerNight())
                .maxGuests(r.getMaxGuests())
                .availableRooms(r.getAvailableRooms())
                .amenities(r.getAmenities() != null
                        ? Arrays.asList(r.getAmenities().split(",")) : List.of())
                .imageUrl(r.getImageUrl())
                .build();
    }
}
