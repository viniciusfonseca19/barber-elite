package com.barber.elite.mapper;

import com.barber.elite.domain.Appointment;
import com.barber.elite.dto.response.AppointmentResponse;
import com.barber.elite.dto.response.ClientResponse;
import com.barber.elite.dto.response.ServiceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppointmentMapper {

    private final ServiceMapper serviceMapper;

    public AppointmentResponse toResponse(Appointment appointment) {
        ClientResponse clientResponse = ClientResponse.builder()
                .id(appointment.getClient().getId())
                .fullName(appointment.getClient().getFullName())
                .phone(appointment.getClient().getPhone())
                .isBlocked(appointment.getClient().getIsBlocked())
                .createdAt(appointment.getClient().getCreatedAt())
                .build();

        ServiceResponse serviceResponse = serviceMapper.toResponse(appointment.getService());

        return AppointmentResponse.builder()
                .id(appointment.getId())
                .client(clientResponse)
                .service(serviceResponse)
                .scheduledAt(appointment.getScheduledAt())
                .status(appointment.getStatus())
                .createdAt(appointment.getCreatedAt())
                .build();
    }
}