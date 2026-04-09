package com.barber.elite.repository;

import com.barber.elite.domain.Appointment;
import com.barber.elite.domain.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByOrderByScheduledAtAsc();

    List<Appointment> findByStatusOrderByScheduledAtAsc(AppointmentStatus status);

    @Query("""
        SELECT COUNT(a) > 0
        FROM Appointment a
        WHERE a.scheduledAt = :scheduledAt
          AND a.status = 'SCHEDULED'
        """)
    boolean existsScheduledAtTime(@Param("scheduledAt") LocalDateTime scheduledAt);

    @Query("""
        SELECT a FROM Appointment a
        JOIN FETCH a.client
        JOIN FETCH a.service
        ORDER BY a.scheduledAt ASC
        """)
    List<Appointment> findAllWithDetails();

    @Query("""
        SELECT a FROM Appointment a
        JOIN FETCH a.client c
        JOIN FETCH a.service
        WHERE c.id = :clientId
        ORDER BY a.scheduledAt DESC
        """)
    List<Appointment> findByClientId(@Param("clientId") Long clientId);
}