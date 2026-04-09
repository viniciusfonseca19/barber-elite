package com.barber.elite.service;

import com.barber.elite.dto.response.ServiceResponse;
import com.barber.elite.mapper.ServiceMapper;
import com.barber.elite.repository.BarberServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberServiceService {

    private final BarberServiceRepository repository;
    private final ServiceMapper mapper;

    @Transactional(readOnly = true)
    public List<ServiceResponse> findAllActive() {
        return repository.findByActiveTrue()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}