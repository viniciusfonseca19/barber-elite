<div align="center">

# ✂️ BarberElite

**Sistema de agendamento online para barbearias**

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)](https://barber-elite-eight.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)](https://barber-elite.onrender.com)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk)](https://openjdk.org)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)

[🌐 Ver site ao vivo](https://barber-elite-eight.vercel.app) · [📖 API Docs (Swagger)](https://barber-elite.onrender.com/swagger-ui/index.html)

</div>

---

## 📋 Sobre o projeto

O BarberElite é uma aplicação full stack que permite a clientes agendarem horários em uma barbearia de forma simples e rápida, sem precisar ligar ou mandar mensagem. O administrador conta com um painel completo para gerenciar agendamentos e clientes em tempo real.

**Funcionalidades principais:**

- Agendamento online com seleção de serviço, data e horário
- Validação de horários de funcionamento e conflitos de agenda
- Painel administrativo com listagem e cancelamento de agendamentos
- Bloqueio e desbloqueio de clientes
- Autenticação por sessão com dois perfis: `ADMIN` e `CLIENT`
- Documentação interativa da API via Swagger

---

## 📸 Preview

<img width="1918" height="871" alt="Captura de tela 2026-04-18 124248" src="https://github.com/user-attachments/assets/38fd1c1f-05c3-4904-a84b-b36eda977c05" />


---

## 🏗️ Arquitetura

```
Usuário
  │
  ▼
Vercel (Frontend React)
  │
  │  /api/* → proxy reverso (vercel.json)
  │
  ▼
Render (Backend Spring Boot)
  │
  ▼
PostgreSQL (Database)
```

O frontend é servido como SPA estática no Vercel. As chamadas para `/api/*` são redirecionadas via proxy do próprio Vercel para o backend no Render, mantendo o cookie de sessão no mesmo contexto de origem e evitando problemas de CORS.

---

## 🛠️ Stack

### Frontend
| Tecnologia | Uso |
|---|---|
| React 18 + Vite | Framework e bundler |
| CSS Modules | Estilização por componente |
| Axios | Chamadas HTTP |
| React Context API | Estado global de autenticação |
| Vercel | Hospedagem + proxy reverso |

### Backend
| Tecnologia | Uso |
|---|---|
| Java 17 + Spring Boot 4 | API REST |
| Spring Security | Autenticação por sessão |
| Spring Data JPA | Persistência |
| Flyway | Migrações de banco |
| PostgreSQL | Banco de dados |
| Lombok | Redução de boilerplate |
| SpringDoc (Swagger) | Documentação da API |
| Render | Hospedagem do backend |

---

## 📁 Estrutura do projeto

```
barber-elite/
├── backend/
│   ├── src/main/java/com/barber/elite/
│   │   ├── config/          # Segurança e CORS (SecurityConfig)
│   │   ├── controller/      # Endpoints REST
│   │   ├── domain/          # Entidades JPA (Appointment, Client, BarberService)
│   │   ├── dto/             # Request e Response DTOs
│   │   ├── exception/       # Tratamento global de erros
│   │   ├── mapper/          # Conversão entre entidades e DTOs
│   │   ├── repository/      # Interfaces JPA
│   │   └── service/         # Regras de negócio
│   ├── Dockerfile
│   └── pom.xml
│
└── frontend/barber-elite/
    ├── src/
    │   ├── components/      # Componentes reutilizáveis (Form, Card, Toast...)
    │   ├── context/         # AuthContext, ToastContext
    │   ├── hooks/           # useAppointments, useServices, useToast
    │   ├── pages/           # LoginPage, ClientDashboard, AdminDashboard
    │   ├── routes/          # AppRoutes com PrivateRoute
    │   ├── services/        # api.js, authService, appointmentService...
    │   └── utils/           # validators, formatters
    ├── vercel.json          # Proxy + SPA fallback
    └── vite.config.js
```

---

## 🌐 API Endpoints

### Autenticação — `público`
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Login (cria sessão) |
| `GET` | `/api/auth/me` | Dados do usuário logado |
| `POST` | `/api/auth/logout` | Encerra a sessão |

### Serviços — `público`
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/services` | Lista todos os serviços disponíveis |

### Agendamentos
| Método | Rota | Perfil | Descrição |
|---|---|---|---|
| `POST` | `/api/appointments` | `CLIENT` | Cria um novo agendamento |
| `GET` | `/api/appointments` | `ADMIN` | Lista todos os agendamentos |
| `GET` | `/api/appointments/scheduled` | `ADMIN` | Lista agendamentos ativos |
| `PATCH` | `/api/appointments/:id/cancel` | `ADMIN` | Cancela um agendamento |

### Clientes
| Método | Rota | Perfil | Descrição |
|---|---|---|---|
| `GET` | `/api/clients` | `ADMIN` | Lista todos os clientes |
| `PATCH` | `/api/clients/:id/block` | `ADMIN` | Bloqueia um cliente |
| `PATCH` | `/api/clients/:id/unblock` | `ADMIN` | Desbloqueia um cliente |

> Documentação interativa completa disponível em `/swagger-ui/index.html`

---

## ⚙️ Regras de negócio

**Horário de funcionamento**
- Segunda a sábado: 09:30–12:00 e 14:00–18:00
- Domingos: fechado

**Agendamentos**
- Não é permitido agendar em horário já ocupado
- Não é permitido agendar no passado
- Um cliente é identificado pelo número de telefone — se não existir, é criado automaticamente

**Serviços**
- Apenas serviços marcados como ativos podem ser selecionados

---

## 🚀 Rodando localmente

### Pré-requisitos
- Java 17+
- Node.js 20+
- PostgreSQL ou Docker

### Backend

```bash
cd backend

# Com Docker (recomendado)
docker-compose up -d

# Ou configure as variáveis de ambiente e rode com Maven
./mvnw spring-boot:run
```

Variáveis de ambiente necessárias:

```env
DB_URL=jdbc:postgresql://localhost:5432/barber_elite
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### Frontend

```bash
cd frontend/barber-elite
npm install
npm run dev
```

O servidor de desenvolvimento sobe em `http://localhost:5173` com proxy automático para o backend.

---

## 🔒 Perfis de acesso

| Perfil | Acesso |
|---|---|
| `CLIENT` | Realizar agendamentos |
| `ADMIN` | Painel completo — ver, cancelar agendamentos e bloquear clientes |

---

## 👤 Autor

Desenvolvido por **Vinícius Fonseca**

[![GitHub](https://img.shields.io/badge/GitHub-viniciusfonseca19-181717?style=flat-square&logo=github)](https://github.com/viniciusfonseca19)
