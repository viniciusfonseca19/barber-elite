package com.barber.elite.repository;

import com.barber.elite.domain.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarberServiceRepository extends JpaRepository<BarberService, Long> {

    List<BarberService> findByActiveTrue();
}