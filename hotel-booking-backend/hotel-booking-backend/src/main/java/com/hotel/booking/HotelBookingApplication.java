package com.hotel.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * MAIN CLASS - This is where our Spring Boot app starts.
 *
 * @SpringBootApplication does 3 things automatically:
 *   1. Scans all classes in this package for Spring components
 *   2. Sets up auto-configuration (database, web server, etc.)
 *   3. Enables component scanning
 *
 * Just run the main() method and your server starts on http://localhost:8080
 */
@SpringBootApplication
public class HotelBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBookingApplication.class, args);
        System.out.println("✅ Hotel Booking API is running!");
        System.out.println("👉 API:      http://localhost:8080/api/hotels");
        System.out.println("👉 Database: http://localhost:8080/h2-console");
    }
}
