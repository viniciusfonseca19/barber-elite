package com.barber.elite.service;

import com.barber.elite.domain.Client;
import com.barber.elite.dto.response.ClientResponse;
import com.barber.elite.exception.BusinessException;
import com.barber.elite.exception.ResourceNotFoundException;
import com.barber.elite.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    @Transactional(readOnly = true)
    public List<ClientResponse> findAll() {
        return clientRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public Client findOrCreateClient(String fullName, String phone) {
        return clientRepository.findByPhone(phone)
                .map(existing -> {
                    if (existing.getIsBlocked()) {
                        throw new BusinessException(
                                "Cliente bloqueado. Entre em contato com a barbearia.",
                                HttpStatus.FORBIDDEN
                        );
                    }
                    return existing;
                })
                .orElseGet(() -> {
                    Client newClient = Client.builder()
                            .fullName(fullName)
                            .phone(phone)
                            .isBlocked(false)
                            .build();
                    return clientRepository.save(newClient);
                });
    }

    @Transactional
    public ClientResponse blockClient(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", clientId));

        if (client.getIsBlocked()) {
            throw new BusinessException("Cliente já está bloqueado");
        }

        client.setIsBlocked(true);
        Client saved = clientRepository.save(client);
        log.info("Cliente bloqueado: id={}, phone={}", clientId, client.getPhone());
        return toResponse(saved);
    }

    @Transactional
    public ClientResponse unblockClient(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", clientId));

        client.setIsBlocked(false);
        Client saved = clientRepository.save(client);
        log.info("Cliente desbloqueado: id={}", clientId);
        return toResponse(saved);
    }

    private ClientResponse toResponse(Client client) {
        return ClientResponse.builder()
                .id(client.getId())
                .fullName(client.getFullName())
                .phone(client.getPhone())
                .isBlocked(client.getIsBlocked())
                .createdAt(client.getCreatedAt())
                .build();
    }
}