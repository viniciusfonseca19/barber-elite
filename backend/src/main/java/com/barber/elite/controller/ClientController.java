package com.barber.elite.controller;

import com.barber.elite.dto.response.ClientResponse;
import com.barber.elite.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Gerenciamento de clientes (ADMIN)")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todos os clientes")
    public ResponseEntity<List<ClientResponse>> findAll() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @PatchMapping("/{id}/block")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Bloquear cliente")
    public ResponseEntity<ClientResponse> block(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.blockClient(id));
    }

    @PatchMapping("/{id}/unblock")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Desbloquear cliente")
    public ResponseEntity<ClientResponse> unblock(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.unblockClient(id));
    }
}