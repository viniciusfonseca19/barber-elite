package com.barber.elite.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI barberEliteOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("BarberElite API")
                        .description("Sistema de agendamentos para barbearia - API REST")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("BarberElite")
                                .email("contato@barber-elite.com")
                        )
                )
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Dev"),
                        new Server().url("http://backend:8080").description("Docker")
                ));
    }
}