package com.luxestay.dto;

import lombok.Data;

@Data
public class PromoValidateRequest {
    private String code;
    private Double bookingTotal;
}
