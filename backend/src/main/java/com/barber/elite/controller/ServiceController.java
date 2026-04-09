package com.barber.elite.controller;

import com.barber.elite.dto.response.ServiceResponse;
import com.barber.elite.service.BarberServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "Serviços", description = "Serviços oferecidos pela barbearia")
public class ServiceController {

    private final BarberServiceService barberServiceService;

    @GetMapping
    @Operation(summary = "Listar serviços ativos")
    public ResponseEntity<List<ServiceResponse>> findAll() {
        return ResponseEntity.ok(barberServiceService.findAllActive());
    }
}