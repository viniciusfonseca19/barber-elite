# 💈 BarberElite - Sistema de Agendamento de Barbearia

Uma aplicação moderna e intuitiva para gerenciar agendamentos em barbearias, com autenticação de usuários, seleção de serviços e horários disponíveis.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.4-6DB33F?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-316192?style=flat-square&logo=postgresql)

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Endpoints da API](#-endpoints-da-api)
- [Serviços Disponíveis](#-serviços-disponíveis)
- [Validações](#-validações)
- [Fluxo de Agendamento](#-fluxo-de-agendamento)
- [Troubleshooting](#-troubleshooting)
- [Licença](#-licença)

---

## 📱 Visão Geral

**BarberElite** é uma plataforma web full-stack que permite:

✅ **Clientes** agendem serviços de forma rápida e simples  
✅ **Admins** gerenciem agendamentos e serviços  
✅ Seleção de **múltiplos tipos de corte e serviços extras**  
✅ **Validação em tempo real** de horários disponíveis  
✅ **Autenticação segura** com sessões HTTP  
✅ API RESTful bem estruturada  
✅ Interface responsiva com tema dark/gold

---

## ✅ Funcionalidades

### Para Clientes

- 🔐 **Login seguro** com autenticação por sessão
- 📋 **Dashboard de agendamento** intuitivo e responsivo
- ✂️ **Seleção de serviço** - Escolha entre Degradê ou Social
- 💁 **Serviços extras** - Adicione Barba, Cavanhaque, Sobrancelha
- 📅 **Data e hora** - Selecione data futura e horário disponível
- ✔️ **Validação em tempo real** de campos obrigatórios
- 📢 **Feedback visual** com notificações (toasts)

### Para Administradores

- 📊 **Dashboard com estatísticas**
- 📅 **Gestão de agendamentos**
- 👥 **Gerenciamento de clientes**
- 🛠️ **Controle de serviços disponíveis**
- ❌ **Cancelamento de agendamentos**

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3** - Biblioteca de UI
- **Vite 5** - Build tool rápido e moderno
- **React Router 6** - Roteamento client-side
- **Axios** - Cliente HTTP com interceptadores
- **CSS Modules** - Estilos isolados e componentizados
- **ESLint** - Análise de código

### Backend
- **Spring Boot 4.0.4** - Framework web Java
- **Java 17** - Linguagem de programação
- **Spring Data JPA** - ORM e acesso a dados
- **Spring Security** - Autenticação e autorização
- **Flyway** - Versionamento de migrations
- **PostgreSQL 17** - Banco de dados relacional
- **Lombok** - Redução de boilerplate
- **Springdoc OpenAPI** - Documentação automática da API
- **Hibernate 7.2** - Mapeamento objeto-relacional

---

## 🏗️ Arquitetura

```
elite/
├── frontend/barber-elite/              # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── appointments/           # Formulário e seletor de serviços
│   │   │   ├── common/                 # Botões, inputs, spinners
│   │   │   └── layout/                 # Navbar, rotas privadas
│   │   ├── pages/                      # LoginPage, Dashboards, NotFound
│   │   ├── context/                    # Auth, Toast
│   │   ├── hooks/                      # useAppointments, useServices, useToast
│   │   ├── services/                   # API clients (axios)
│   │   ├── utils/                      # Validadores, formatadores
│   │   └── assets/                     # Imagens e estilos globais
│   ├── package.json
│   └── vite.config.js
│
└── backend/                             # Spring Boot REST API
    ├── src/main/java/com/barber/elite/
    │   ├── controller/                 # REST Controllers
    │   ├── service/                    # Lógica de negócio
    │   ├── repository/                 # JPA Repositories
    │   ├── domain/                     # Entidades JPA
    │   ├── dto/request                 # DTOs de entrada
    │   ├── dto/response                # DTOs de saída
    │   ├── config/                     # Configurações Spring
    │   └── mapper/                     # Conversão DTO-Entity
    ├── src/main/resources/
    │   ├── application.properties       # Configurações
    │   └── db/migration/               # Flyway migrations
    └── pom.xml
```

---

## 📦 Instalação

### Pré-requisitos

#### Backend
- Java 17+
- Maven 3.6+
- PostgreSQL 12+ (ou Supabase)

#### Frontend
- Node.js 16+
- npm ou yarn

---

### Backend

1. **Navegue até a pasta backend:**
```bash
cd backend
```

2. **Configure o banco de dados** em `src/main/resources/application.properties`:
```properties
# Supabase ou PostgreSQL local
spring.datasource.url=jdbc:postgresql://seu-host:5432/seu-banco
spring.datasource.username=seu-usuario
spring.datasource.password=sua-senha

# Habilitar Flyway
spring.flyway.enabled=true
```

3. **Execute o servidor:**
```bash
mvn clean spring-boot:run
```

Backend disponível em: **http://localhost:8080**  
Documentação Swagger: **http://localhost:8080/swagger-ui.html**

---

### Frontend

1. **Navegue até a pasta frontend:**
```bash
cd frontend/barber-elite
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

Frontend disponível em: **http://localhost:5173**

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `clients` (Clientes)
```sql
CREATE TABLE clients (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    is_blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `barber_services` (Serviços)
```sql
CREATE TABLE barber_services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);
```

### Tabela: `appointments` (Agendamentos)
```sql
CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES clients(id),
    service_id BIGINT NOT NULL REFERENCES barber_services(id),
    scheduled_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 Endpoints da API

### Autenticação
```
POST   /api/auth/login              - Fazer login
POST   /api/auth/logout             - Fazer logout
```

### Serviços
```
GET    /api/services                - Listar serviços ativos
```

### Agendamentos
```
GET    /api/appointments            - Listar agendamentos do usuário
GET    /api/appointments/scheduled  - Listar agendamentos futuros
POST   /api/appointments            - Criar novo agendamento
PATCH  /api/appointments/{id}/cancel - Cancelar agendamento
```

### Exemplo de Request

```bash
# Criar agendamento
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Murillo Fonseca",
    "phone": "85987144765",
    "scheduledAt": "2026-05-19T09:30:00",
    "serviceId": 1
  }'
```

---

## 💈 Serviços Disponíveis

| Serviço | Preço | ID |
|---------|-------|-----|
| Degradê | R$ 25,00 | 1 |
| Social | R$ 15,00 | 2 |
| Barba | R$ 15,00 | 3 |
| Cavanhaque | R$ 5,00 | 4 |
| Sobrancelha | R$ 5,00 | 5 |

---

## ✔️ Validações

### Formato de Telefone
- **Padrão:** (XX) 9XXXX-XXXX ou (XX) XXXXX-XXXX
- **Dígitos:** 10-11 dígitos
- **Exemplos válidos:**
  - `(85) 98714-4765` ✅
  - `(11) 99999-9999` ✅
  - `85987144765` ✅

### Data e Hora
- **Tipo:** Data futura (não pode ser hoje ou passado)
- **Dias úteis:** Segunda a Sábado (domingo fechado)
- **Horários disponíveis:**
  - Manhã: 09:30 - 12:00 (intervalos de 30 min)
  - Tarde: 14:00 - 18:00 (intervalos de 30 min)

### Nome Completo
- **Mínimo:** 2 palavras (nome e sobrenome)
- **Máximo:** 150 caracteres

---

## 🔄 Fluxo de Agendamento

```
1. Cliente acessa dashboard
   ↓
2. Seleciona tipo de corte (Degradê ou Social) ⬅️ OBRIGATÓRIO
   ↓
3. Seleciona serviços extras (Barba, Cavanhaque, Sobrancelha) ⬅️ OPCIONAL
   ↓
4. Preenche nome completo
   ↓
5. Preenche telefone com 11 dígitos
   ↓
6. Escolhe data futura
   ↓
7. Escolhe horário disponível
   ↓
8. Clica "Confirmar agendamento"
   ↓
9. Frontend valida TODOS os campos
   ↓
10. Envia o PRIMEIRO serviço (tipo de corte) para API
    (Serviços extras são preparados para versão futura)
   ↓
11. Backend verifica disponibilidade do horário
   ↓
12. Agendamento criado com sucesso! ✅
   ↓
13. Toast de sucesso exibido
   ↓
14. Formulário limpo
```

---

## 🔐 Autenticação e Segurança

O sistema utiliza:
- **Spring Security** - Autenticação e autorização
- **Sessão HTTP** - JSESSIONID para manter usuário logado
- **CSRF Protection** - Proteção contra ataques
- **Roles** - CLIENT (cliente) e ADMIN (barbeiro)
- **Validação** - Validação de dados com Jakarta Validation

---

## 🐛 Troubleshooting

### Frontend não conecta ao backend

```bash
# Verifique se o backend está rodando
curl http://localhost:8080/api/services

# Verifique a URL da API
# Arquivo: src/services/api.js
# Deve estar: baseURL: '/api' (proxy) ou baseURL: 'http://localhost:8080/api'
```

### Serviços não aparecem

```bash
# Conecte ao banco de dados PostgreSQL
psql -h seu-host -U seu-usuario -d seu-banco

# Verifique se a tabela tem dados
SELECT * FROM barber_services;

# Verifique se está ativo
SELECT * FROM barber_services WHERE active = true;
```

### Erro 422 ao agendar

**Causa:** Horário já possui um agendamento  
**Solução:** Escolha outro horário disponível

### Erro 400 Bad Request

**Causa:** Dados inválidos ou faltando  
**Verificar:**
- Telefone com 10-11 dígitos
- Nome com 2+ palavras
- Data futura
- Horário dentro do expediente
- Tipo de corte selecionado

### Console mostra erros

1. Abra DevTools (F12)
2. Aba "Console"
3. Procure por logs com `❌`
4. Aba "Network" - verifique responses das requisições

---

## 📊 Migrations Flyway

```
db/migration/
├── V1__create_tables.sql           # Criação das tabelas
├── V2__seed_services.sql           # Inserção dos 5 serviços
└── V3__seed_admin_note.sql         # Dados iniciais de admin
```

As migrations rodam **automaticamente** ao iniciar o servidor se `spring.flyway.enabled=true`.

---

## 🎨 Design System

- **Tema:** Dark mode com acentuação dourada
- **Cores:**
  - Primária: `#C9A84C` (Gold)
  - Background Dark: `#1a1a1a`
  - Border: `#333333`
  - Texto Primary: `#ffffff`
  - Texto Secondary: `#b0b0b0`

- **Tipografia:** -sans-serif
- **Componentes:** Grid layout responsivo
- **Ícone:** ✂️ (barbershop)

---

## 📱 Responsividade

Totalmente responsivo para:
- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

---

## 🚀 Deployment

### Backend (Render.com ou similar)
1. Conecte repositório Git
2. Configure variáveis de ambiente
3. Deploy automático

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Output: `dist/`
3. Deploy da pasta `dist`

---

## 📄 Licença

MIT License © 2026 BarberElite

---

## 👤 Autor

Desenvolvido com ❤️ para BarberElite

**Versão:** 1.0.0  
**Última atualização:** Abril de 2026  
**Status:** ✅ Em produção
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
