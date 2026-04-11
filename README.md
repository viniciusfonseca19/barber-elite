# ✂ BarberElite

> Sistema completo de agendamentos para barbearia — desenvolvido com Spring Boot, React e MySQL.

![Java](https://img.shields.io/badge/Java-24-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.4-6DB33F?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Como rodar com Docker](#-como-rodar-com-docker)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
- [Regras de negócio](#-regras-de-negócio)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Autor](#-autor)

---

## 💈 Sobre o projeto

O **BarberElite** é um sistema web de agendamentos desenvolvido para barbearias. Permite que clientes agendem horários de forma simples e intuitiva, enquanto o barbeiro (administrador) gerencia todos os agendamentos e clientes por meio de um painel exclusivo.

O sistema foi construído com foco em **boas práticas de desenvolvimento**, separação de responsabilidades, segurança via sessão HTTP e uma interface moderna com tema escuro e dourado.

---

## ✅ Funcionalidades

### Cliente
- Fazer login com qualquer usuário e senha
- Visualizar serviços disponíveis com preços
- Agendar horário informando nome, telefone, data, horário e serviço
- Validação em tempo real dos dados do formulário

### Administrador (Barbeiro)
- Login exclusivo com senha de administrador
- Painel com estatísticas de agendamentos e receita prevista
- Visualizar todos os agendamentos agrupados por data
- Cancelar agendamentos
- Listar, bloquear e desbloquear clientes

---

## 🚀 Tecnologias

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Java | 24 | Linguagem principal |
| Spring Boot | 4.0.4 | Framework base |
| Spring Security | 7.0.4 | Autenticação por sessão |
| Spring Data JPA | 4.0.4 | Persistência de dados |
| Hibernate | 7.2.7 | ORM |
| Flyway | 11.14.1 | Migrations do banco |
| MySQL Connector | 9.6.0 | Driver do banco |
| Lombok | 1.18.44 | Redução de boilerplate |
| SpringDoc OpenAPI | 3.0.2 | Documentação Swagger |

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | UI framework |
| React Router | 6 | Roteamento SPA |
| Vite | 5 | Bundler |
| Axios | 1.6 | Requisições HTTP |
| CSS Modules | — | Estilização isolada |

### Infra
| Tecnologia | Uso |
|---|---|
| MySQL 8 | Banco de dados |
| Docker + Docker Compose | Containerização |
| Nginx | Servidor do frontend em produção |

---

## 🏗 Arquitetura

```
barber-elite/
├── barber-elite-backend/        # API REST Spring Boot
│   ├── config/                  # SecurityConfig, OpenApiConfig
│   ├── controller/              # Endpoints REST
│   ├── service/                 # Regras de negócio
│   ├── repository/              # Acesso ao banco (JPA)
│   ├── domain/                  # Entidades e enums
│   ├── dto/                     # Request e Response DTOs
│   ├── mapper/                  # Conversão entidade ↔ DTO
│   ├── exception/               # Handler global de erros
│   ├── security/                # CustomAuthenticationProvider
│   └── resources/db/migration/  # Scripts Flyway (V1, V2, V3)
│
└── barber-elite-frontend/       # SPA React
    ├── components/              # Componentes reutilizáveis
    ├── pages/                   # Telas da aplicação
    ├── services/                # Camada de API (Axios)
    ├── hooks/                   # Hooks customizados
    ├── context/                 # AuthContext, ToastContext
    ├── utils/                   # Formatadores e validadores
    └── routes/                  # Definição de rotas
```

---

## 📦 Pré-requisitos

Para rodar **localmente** sem Docker:

- [Java 21+](https://adoptium.net/)
- [Maven 3.9+](https://maven.apache.org/)
- [Node.js 20+](https://nodejs.org/)
- [MySQL 8+](https://dev.mysql.com/downloads/)

Para rodar com **Docker**:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 💻 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barber-elite.git
cd barber-elite
```

### 2. Configure o banco de dados

Crie o banco no MySQL:

```sql
CREATE DATABASE barber_elite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure o backend

Edite o arquivo `barber-elite-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/barber_elite?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

### 4. Rode o backend

```bash
cd barber-elite-backend
./mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`.
A documentação Swagger estará em `http://localhost:8080/swagger-ui.html`.

As migrations do Flyway rodam automaticamente na primeira inicialização, criando as tabelas e inserindo os serviços padrão.

### 5. Rode o frontend

```bash
cd barber-elite-frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## 🐳 Como rodar com Docker

### Opção 1 — Tudo junto (recomendado)

Na raiz do projeto:

```bash
docker compose up --build
```

Aguarde os serviços subirem (o backend espera o MySQL estar saudável antes de iniciar). Acesse `http://localhost`.

### Opção 2 — Backend e frontend separados

```bash
# Sobe banco + backend
cd barber-elite-backend
docker compose up --build -d

# Sobe frontend (após o backend estar no ar)
cd ../barber-elite-frontend
docker compose up --build -d
```

### Derrubar os serviços

```bash
# Se usou tudo junto
docker compose down

# Se usou separado (ordem importa)
cd barber-elite-frontend && docker compose down
cd ../barber-elite-backend && docker compose down
```

---

## 🔐 Autenticação

O sistema usa autenticação baseada em **sessão HTTP** (sem JWT). A role do usuário é determinada pela senha:

| Senha | Role | Acesso |
|---|---|---|
| `barber-elite@vinidev` | `ADMIN` | Painel do barbeiro completo |
| Qualquer outra senha | `CLIENT` | Tela de agendamento |

> O usuário pode usar qualquer nome de usuário. O que determina a role é exclusivamente a senha.

---

## 🌐 Endpoints da API

| Método | Endpoint | Auth | Descrição |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | Realizar login |
| `GET` | `/api/auth/me` | Público | Dados do usuário logado |
| `POST` | `/api/auth/logout` | Autenticado | Encerrar sessão |
| `GET` | `/api/services` | Público | Listar serviços |
| `POST` | `/api/appointments` | Autenticado | Criar agendamento |
| `GET` | `/api/appointments` | ADMIN | Listar todos os agendamentos |
| `GET` | `/api/appointments/scheduled` | ADMIN | Listar agendamentos ativos |
| `PATCH` | `/api/appointments/{id}/cancel` | ADMIN | Cancelar agendamento |
| `GET` | `/api/clients` | ADMIN | Listar clientes |
| `PATCH` | `/api/clients/{id}/block` | ADMIN | Bloquear cliente |
| `PATCH` | `/api/clients/{id}/unblock` | ADMIN | Desbloquear cliente |

Documentação completa interativa disponível em `http://localhost:8080/swagger-ui.html`.

---

## 📋 Regras de negócio

### Horário de funcionamento
- **Manhã:** 09:30 às 12:00
- **Tarde:** 14:00 às 18:00
- **Dias:** Segunda a Sábado (domingo fechado)
- Intervalos de 30 minutos entre agendamentos

### Serviços disponíveis
| Serviço | Preço |
|---|---|
| Degradê | R$ 25,00 |
| Social | R$ 15,00 |
| Barba | R$ 15,00 |
| Cavanhaque | R$ 5,00 |
| Sobrancelha | R$ 5,00 |

### Validações de agendamento
- Horário deve estar dentro do expediente
- Não pode haver dois agendamentos no mesmo horário
- Cliente bloqueado não pode criar novos agendamentos
- Data deve ser futura

---

## 🗄 Banco de dados

### Entidades

```
clients
├── id (PK)
├── full_name
├── phone (unique)
├── is_blocked
└── created_at

barber_services
├── id (PK)
├── name (unique)
├── price
└── active

appointments
├── id (PK)
├── client_id (FK → clients)
├── service_id (FK → barber_services)
├── scheduled_at
├── status (SCHEDULED | CANCELLED)
└── created_at
```

### Migrations Flyway
| Versão | Arquivo | Descrição |
|---|---|---|
| V1 | `V1__create_tables.sql` | Cria as tabelas do sistema |
| V2 | `V2__seed_services.sql` | Insere os 5 serviços padrão |
| V3 | `V3__seed_admin_note.sql` | Nota sobre autenticação |

---

## 📁 Estrutura de pastas

```
barber-elite/
│
├── docker-compose.yml
│
├── barber-elite-backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/barber/elite/
│       │   ├── BarberEliteApplication.java
│       │   ├── config/
│       │   │   ├── SecurityConfig.java
│       │   │   └── OpenApiConfig.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── AppointmentController.java
│       │   │   ├── ServiceController.java
│       │   │   └── ClientController.java
│       │   ├── service/
│       │   │   ├── AppointmentService.java
│       │   │   ├── ClientService.java
│       │   │   └── BarberServiceService.java
│       │   ├── repository/
│       │   ├── domain/
│       │   ├── dto/
│       │   ├── mapper/
│       │   ├── exception/
│       │   └── security/
│       └── resources/
│           ├── application.properties
│           └── db/migration/
│               ├── V1__create_tables.sql
│               ├── V2__seed_services.sql
│               └── V3__seed_admin_note.sql
│
└── barber-elite-frontend/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── nginx.conf
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── assets/globals.css
        ├── components/
        │   ├── common/
        │   ├── layout/
        │   └── appointments/
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── ClientDashboard.jsx
        │   ├── AdminDashboard.jsx
        │   └── NotFound.jsx
        ├── services/
        ├── hooks/
        ├── context/
        ├── utils/
        └── routes/
```

---

## 👤 Autor

Desenvolvido por **Vinícius F.**

[![GitHub](https://img.shields.io/badge/GitHub-viniciusfon-181717?style=flat-square&logo=github)](https://github.com/viniciusfonseca19)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vinícius-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/vin%C3%ADcius-fonseca-026536327/)

---

> *"Código limpo não é escrito seguindo um conjunto de regras. Você não se torna um artesão de software aprendendo uma lista de heurísticas. O profissionalismo e o artesanato vêm de valores que impulsionam disciplinas."* — Robert C. Martin
