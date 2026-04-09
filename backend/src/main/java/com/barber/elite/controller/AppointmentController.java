package com.barber.elite.controller;

import com.barber.elite.dto.request.AppointmentRequest;
import com.barber.elite.dto.response.AppointmentResponse;
import com.barber.elite.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "Agendamentos", description = "Criação e gestão de agendamentos")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todos os agendamentos (ADMIN)")
    public ResponseEntity<List<AppointmentResponse>> findAll() {
        return ResponseEntity.ok(appointmentService.findAll());
    }

    @GetMapping("/scheduled")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar agendamentos ativos (ADMIN)")
    public ResponseEntity<List<AppointmentResponse>> findScheduled() {
        return ResponseEntity.ok(appointmentService.findScheduled());
    }

    @PostMapping
    @Operation(summary = "Criar agendamento (CLIENT)")
    public ResponseEntity<AppointmentResponse> create(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Cancelar agendamento (ADMIN)")
    public ResponseEntity<AppointmentResponse> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.cancel(id));
    }
}