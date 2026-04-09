package com.barber.elite.mapper;

import com.barber.elite.domain.BarberService;
import com.barber.elite.dto.response.ServiceResponse;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

    public ServiceResponse toResponse(BarberService service) {
        return ServiceResponse.builder()
                .id(service.getId())
                .name(service.getName())
                .price(service.getPrice())
                .build();
    }
}