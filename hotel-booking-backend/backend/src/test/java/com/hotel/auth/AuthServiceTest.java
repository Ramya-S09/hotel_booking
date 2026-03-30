package com.hotel.auth;

import com.hotel.auth.dto.AuthDto.*;
import com.hotel.auth.entity.User;
import com.hotel.auth.exception.AuthException;
import com.hotel.auth.repository.UserRepository;
import com.hotel.auth.security.JwtUtil;
import com.hotel.auth.service.AuthService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @InjectMocks private AuthService authService;
    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtUtil jwtUtil;
    @Mock private AuthenticationManager authenticationManager;

    @Test
    void register_success() {
        RegisterRequest req = new RegisterRequest();
        req.setFullName("John Doe");
        req.setEmail("john@example.com");
        req.setPassword("password123");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(req.getPassword())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });
        when(jwtUtil.generateToken(any())).thenReturn("mock.jwt.token");

        AuthResponse res = authService.register(req);

        assertNotNull(res);
        assertEquals("john@example.com", res.getEmail());
        assertEquals("John Doe", res.getFullName());
        assertEquals("USER", res.getRole());
        assertNotNull(res.getToken());
    }

    @Test
    void register_emailAlreadyExists_throwsException() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("existing@example.com");
        req.setPassword("pass");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(true);

        assertThrows(AuthException.class, () -> authService.register(req));
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_success() {
        LoginRequest req = new LoginRequest();
        req.setEmail("john@example.com");
        req.setPassword("password123");

        User user = User.builder()
                .id(1L).email("john@example.com").fullName("John")
                .password("encoded").role(User.Role.USER).build();

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken(any())).thenReturn("mock.jwt.token");

        AuthResponse res = authService.login(req);

        assertNotNull(res.getToken());
        assertEquals("john@example.com", res.getEmail());
    }
}
