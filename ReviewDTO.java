package com.luxestay.service;

import com.luxestay.entity.Hotel;
import com.luxestay.entity.Room;
import com.luxestay.repository.HotelRepository;
import com.luxestay.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    // ── CRUD ─────────────────────────────────────────────────────────────────

    public List<Hotel> search(String city, Double minPrice, Double maxPrice, Double minRating) {
        return hotelRepository.search(city, minPrice, maxPrice, minRating);
    }

    public Hotel getById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found: " + id));
    }

    public Hotel create(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Hotel update(Long id, Hotel updated) {
        Hotel existing = getById(id);
        existing.setName(updated.getName());
        existing.setLocation(updated.getLocation());
        existing.setCity(updated.getCity());
        existing.setCountry(updated.getCountry());
        existing.setDescription(updated.getDescription());
        existing.setPricePerNight(updated.getPricePerNight());
        existing.setRating(updated.getRating());
        existing.setReviewCount(updated.getReviewCount());
        existing.setImageUrl(updated.getImageUrl());
        existing.setAmenities(updated.getAmenities());
        return hotelRepository.save(existing);
    }

    public void delete(Long id) {
        hotelRepository.deleteById(id);
    }

    // ── Rooms ────────────────────────────────────────────────────────────────

    public List<Room> getRooms(Long hotelId) {
        return roomRepository.findByHotelIdAndAvailableTrue(hotelId);
    }

    public Room addRoom(Long hotelId, Room room) {
        Hotel hotel = getById(hotelId);
        room.setHotel(hotel);
        return roomRepository.save(room);
    }

    public Room updateRoom(Long roomId, Room updated) {
        Room existing = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + roomId));
        existing.setType(updated.getType());
        existing.setPricePerNight(updated.getPricePerNight());
        existing.setCapacity(updated.getCapacity());
        existing.setDescription(updated.getDescription());
        existing.setImageUrl(updated.getImageUrl());
        existing.setAmenities(updated.getAmenities());
        existing.setAvailable(updated.getAvailable());
        return roomRepository.save(existing);
    }

    public void deleteRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }
}
