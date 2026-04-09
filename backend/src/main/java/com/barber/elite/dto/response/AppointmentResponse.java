package com.barber.elite.dto.response;

import com.barber.elite.domain.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Long id;
    private ClientResponse client;
    private ServiceResponse service;
    private LocalDateTime scheduledAt;
    private AppointmentStatus status;
    private LocalDateTime createdAt;
}