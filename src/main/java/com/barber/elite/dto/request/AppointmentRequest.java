package com.barber.elite.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentRequest {

    @NotBlank(message = "Nome completo é obrigatório")
    private String fullName;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^\\(?\\d{2}\\)?[\\s-]?9?\\d{4}[-\\s]?\\d{4}$", message = "Telefone inválido")
    private String phone;

    @NotNull(message = "Horário é obrigatório")
    @Future(message = "O agendamento deve ser em uma data futura")
    private LocalDateTime scheduledAt;

    @NotNull(message = "Serviço é obrigatório")
    private Long serviceId;
}