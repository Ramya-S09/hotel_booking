package com.hotel.booking;

import com.hotel.auth.entity.User;
import com.hotel.auth.repository.UserRepository;
import com.hotel.booking.dto.BookingDto.*;
import com.hotel.booking.entity.*;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.repository.*;
import com.hotel.booking.service.BookingService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @InjectMocks private BookingService bookingService;
    @Mock private BookingRepository bookingRepository;
    @Mock private HotelRepository hotelRepository;
    @Mock private RoomRepository roomRepository;
    @Mock private UserRepository userRepository;

    private User mockUser;
    private Hotel mockHotel;
    private Room mockRoom;

    @BeforeEach
    void setUp() {
        mockUser = User.builder().id(1L).email("user@test.com").fullName("Test User")
                .role(User.Role.USER).build();

        mockHotel = Hotel.builder().id(1L).name("Grand Palace")
                .location("Paris, France").city("Paris").build();

        mockRoom = Room.builder().id(1L).hotel(mockHotel).roomType("Deluxe")
                .pricePerNight(new BigDecimal("150.00"))
                .availableRooms(5).maxGuests(2).active(true).build();
    }

    @Test
    void createBooking_success() {
        BookingRequest req = new BookingRequest();
        req.setHotelId(1L); req.setRoomId(1L);
        req.setCheckIn(LocalDate.now().plusDays(1));
        req.setCheckOut(LocalDate.now().plusDays(3));
        req.setGuests(2); req.setGuestName("John"); req.setGuestEmail("john@test.com");

        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(mockUser));
        when(hotelRepository.findById(1L)).thenReturn(Optional.of(mockHotel));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(mockRoom));
        when(bookingRepository.save(any())).thenAnswer(inv -> {
            Booking b = inv.getArgument(0);
            b.setId(1L); return b;
        });

        BookingResponse res = bookingService.createBooking(req, "user@test.com");

        assertNotNull(res);
        assertEquals(new BigDecimal("300.00"), res.getTotalAmount());
        assertEquals("CONFIRMED", res.getStatus());
        verify(roomRepository).save(any(Room.class));
    }

    @Test
    void createBooking_noAvailability_throwsException() {
        mockRoom.setAvailableRooms(0);
        BookingRequest req = new BookingRequest();
        req.setHotelId(1L); req.setRoomId(1L);
        req.setCheckIn(LocalDate.now().plusDays(1));
        req.setCheckOut(LocalDate.now().plusDays(3));
        req.setGuests(1); req.setGuestName("X"); req.setGuestEmail("x@x.com");

        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(mockUser));
        when(hotelRepository.findById(1L)).thenReturn(Optional.of(mockHotel));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(mockRoom));

        assertThrows(BookingException.class,
                () -> bookingService.createBooking(req, "user@test.com"));
    }

    @Test
    void cancelBooking_success() {
        Booking booking = Booking.builder().id(1L).user(mockUser).hotel(mockHotel).room(mockRoom)
                .bookingReference("HB-TEST001").status(Booking.BookingStatus.CONFIRMED).build();

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any())).thenReturn(booking);

        BookingResponse res = bookingService.cancelBooking(1L, "user@test.com");
        assertEquals("CANCELLED", res.getStatus());
    }
}
