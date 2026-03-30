package com.hotel.auth.dto;

import jakarta.validation.constraints.*;
import lombok.*;

public class AuthDto {

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @Email(message = "Valid email is required")
        @NotBlank
        private String email;

        @NotBlank
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        private String phone;
    }

    @Data
    public static class LoginRequest {
        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthResponse {
        private String token;
        private String email;
        private String fullName;
        private String role;
        private Long userId;
    }
}
