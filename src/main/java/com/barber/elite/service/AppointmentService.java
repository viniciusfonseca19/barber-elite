package com.barber.elite.service;

import com.barber.elite.domain.Appointment;
import com.barber.elite.domain.BarberService;
import com.barber.elite.domain.Client;
import com.barber.elite.domain.enums.AppointmentStatus;
import com.barber.elite.dto.request.AppointmentRequest;
import com.barber.elite.dto.response.AppointmentResponse;
import com.barber.elite.exception.BusinessException;
import com.barber.elite.exception.ResourceNotFoundException;
import com.barber.elite.mapper.AppointmentMapper;
import com.barber.elite.repository.AppointmentRepository;
import com.barber.elite.repository.BarberServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {

    // Horários de funcionamento
    private static final LocalTime MORNING_START = LocalTime.of(9, 30);
    private static final LocalTime MORNING_END   = LocalTime.of(12, 0);
    private static final LocalTime AFTERNOON_START = LocalTime.of(14, 0);
    private static final LocalTime AFTERNOON_END   = LocalTime.of(18, 0);

    private final AppointmentRepository appointmentRepository;
    private final BarberServiceRepository barberServiceRepository;
    private final ClientService clientService;
    private final AppointmentMapper mapper;

    @Transactional(readOnly = true)
    public List<AppointmentResponse> findAll() {
        return appointmentRepository.findAllWithDetails()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> findScheduled() {
        return appointmentRepository.findByStatusOrderByScheduledAtAsc(AppointmentStatus.SCHEDULED)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public AppointmentResponse create(AppointmentRequest request) {
        LocalDateTime scheduledAt = request.getScheduledAt();

        validateBusinessHours(scheduledAt);
        validateNoConflict(scheduledAt);

        Client client = clientService.findOrCreateClient(request.getFullName(), request.getPhone());

        BarberService service = barberServiceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Serviço", request.getServiceId()));

        if (!service.getActive()) {
            throw new BusinessException("Serviço indisponível no momento");
        }

        Appointment appointment = Appointment.builder()
                .client(client)
                .service(service)
                .scheduledAt(scheduledAt)
                .status(AppointmentStatus.SCHEDULED)
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        log.info("Agendamento criado: id={}, cliente={}, horário={}", saved.getId(), client.getPhone(), scheduledAt);
        return mapper.toResponse(saved);
    }

    @Transactional
    public AppointmentResponse cancel(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento", appointmentId));

        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new BusinessException("Agendamento já foi cancelado");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        Appointment saved = appointmentRepository.save(appointment);
        log.info("Agendamento cancelado: id={}", appointmentId);
        return mapper.toResponse(saved);
    }

    // Validações privadas

    private void validateBusinessHours(LocalDateTime scheduledAt) {
        DayOfWeek day = scheduledAt.getDayOfWeek();
        if (day == DayOfWeek.SUNDAY) {
            throw new BusinessException("A barbearia não funciona aos domingos");
        }

        LocalTime time = scheduledAt.toLocalTime();
        boolean inMorning   = !time.isBefore(MORNING_START)   && !time.isAfter(MORNING_END);
        boolean inAfternoon = !time.isBefore(AFTERNOON_START) && !time.isAfter(AFTERNOON_END);

        if (!inMorning && !inAfternoon) {
            throw new BusinessException(
                    "Horário fora do expediente. Atendemos das 09:30 às 12:00 e das 14:00 às 18:00"
            );
        }
    }

    private void validateNoConflict(LocalDateTime scheduledAt) {
        if (appointmentRepository.existsScheduledAtTime(scheduledAt)) {
            throw new BusinessException(
                    "Já existe um agendamento para este horário. Por favor, escolha outro horário."
            );
        }
    }
}