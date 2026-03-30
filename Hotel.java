package com.luxestay.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReviewRequest {
    @Min(1) @Max(5)
    private Integer rating;
    @NotBlank
    private String comment;
}
