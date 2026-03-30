package com.hotel.booking;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * DATA LOADER - Seeds sample data when the app starts
 *
 * @Component → Spring detects this automatically
 * CommandLineRunner → Spring calls run() after the app starts
 *
 * This fills our H2 database with sample hotels
 * so the frontend has data to show immediately.
 */
@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public void run(String... args) {
        // Only add data if the table is empty
        if (hotelRepository.count() == 0) {
            System.out.println("🌱 Loading sample hotel data...");

            hotelRepository.save(new Hotel(null,
                    "The Azure Grand", "Maldives, South Asia",
                    "luxury", "🏝️", "Popular",
                    5, "9.4", "2.1k", 420,
                    "Pool,Spa,Dive center"));

            hotelRepository.save(new Hotel(null,
                    "Citadel Downtown", "New York, USA",
                    "city", "🌆", "Deal",
                    5, "9.1", "4.8k", 310,
                    "Gym,Bar,Concierge"));

            hotelRepository.save(new Hotel(null,
                    "Seaview Retreat", "Santorini, Greece",
                    "beach", "🌊", null,
                    4, "8.8", "1.3k", 195,
                    "Infinity pool,Breakfast,Sea view"));

            hotelRepository.save(new Hotel(null,
                    "Maple & Stone Inn", "Kyoto, Japan",
                    "city", "⛩️", "New",
                    4, "9.0", "780", 145,
                    "Onsen,Tea ceremony,Garden"));

            hotelRepository.save(new Hotel(null,
                    "Pebble Lodge", "Cape Town, South Africa",
                    "budget", "🦁", "Deal",
                    3, "8.5", "2.4k", 89,
                    "Free WiFi,Parking,Breakfast"));

            hotelRepository.save(new Hotel(null,
                    "Marina Bay Club", "Singapore",
                    "luxury", "🌃", "Popular",
                    5, "9.6", "3.7k", 390,
                    "Infinity pool,Casino,Sky bar"));

            System.out.println("✅ Sample hotels loaded! Total: " + hotelRepository.count());
        }
    }
}
