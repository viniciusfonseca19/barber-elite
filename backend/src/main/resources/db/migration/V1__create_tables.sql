-- V1__create_tables.sql
-- Criação das tabelas do BarberElite

CREATE TABLE IF NOT EXISTS clients (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    full_name   VARCHAR(150)    NOT NULL,
    phone       VARCHAR(20)     NOT NULL,
    is_blocked  BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_clients_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS barber_services (
    id      BIGINT          NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100)    NOT NULL,
    price   DECIMAL(10,2)   NOT NULL,
    active  BOOLEAN         NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY uq_barber_services_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS appointments (
    id              BIGINT      NOT NULL AUTO_INCREMENT,
    client_id       BIGINT      NOT NULL,
    service_id      BIGINT      NOT NULL,
    scheduled_at    DATETIME    NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
    created_at      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_appointments_client  FOREIGN KEY (client_id)  REFERENCES clients(id),
    CONSTRAINT fk_appointments_service FOREIGN KEY (service_id) REFERENCES barber_services(id),
    INDEX idx_appointment_scheduled_at (scheduled_at),
    INDEX idx_appointment_client_id    (client_id),
    INDEX idx_appointment_status       (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;