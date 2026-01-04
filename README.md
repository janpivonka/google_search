# Google Search – Full-stack Application

## Context

This project was implemented as a **technical assignment during the hiring process** for the company **INIZIO**.

The goal was to design and deliver a complete full-stack solution within realistic time and scope constraints, including frontend, backend, testing, containerization, and cloud deployment.

---

## Description

A full-stack web application that retrieves **organic Google search results** using external search APIs, enriches them with illustrative images, and presents structured data in a modern web interface.

The project focuses on **API integration**, **frontend–backend separation**, **testing strategy**, and **production-ready deployment**.

---

## Features

* Keyword-based search
* Retrieval of organic Google results (no ads)
* Automatic enrichment of results with illustrative images
* Display of results in a web interface
* Export of results to a structured JSON file

---

## What was solved

* Clear separation of frontend and backend responsibilities
* Modular backend architecture (routes / services)
* Integration of external APIs (SERP API, Google Custom Search API)
* Data normalization and enrichment
* Frontend architecture based on hooks and service layers
* Environment-based configuration (dev / prod)
* Unit, integration and end-to-end testing (frontend & backend)
* Edge-case testing for critical backend services
* Dockerized development and production setup
* Cloud deployment (Railway, Vercel)

---

## Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* SERP API
* Google Custom Search API
* Jest (unit & integration tests)

### Frontend

* React
* Vite
* TypeScript
* Jest + Testing Library

### Infrastructure

* Docker & Docker Compose (dev / prod)
* Railway (backend deployment)
* Vercel (frontend deployment)

---

## Project Structure

```
google_search/
├─ backend/
│  ├─ src/
│  │  ├─ routes/
│  │  ├─ services/
│  │  └─ __tests__/
│  ├─ Dockerfile.dev
│  ├─ Dockerfile.prod
│  └─ jest.config.cjs
│
├─ frontend/
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ components/
│  │  │  ├─ hooks/
│  │  │  ├─ services/
│  │  │  └─ __tests__/
│  ├─ Dockerfile.dev
│  ├─ Dockerfile.prod
│  └─ jest.config.cjs
│
├─ docker-compose.yml
├─ docker-compose.prod.yml
└─ package.json
```

---

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:
`http://localhost:3001`

Required environment variables (`.env`):

```env
GOOGLE_API_KEY=...
GOOGLE_CX=...
SERP_API_KEY=...
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
`http://localhost:5173`

---

## Docker

The application supports **development** and **production** Docker setups.

### Development mode

* Hot-reload
* Local source files via volumes

```bash
./start.sh
```

* Backend: `http://localhost:3001`
* Frontend: `http://localhost:5173`

Docker Compose file: `docker-compose.yml`

---

### Production mode

* Optimized build
* Minified static assets
* Removed devDependencies

```bash
./start-prod.sh
```

* Backend: `http://localhost:3001`
* Frontend: `http://localhost` (port 80)

Docker Compose file: `docker-compose.prod.yml`

---

## Testing Strategy

### Backend

* Unit tests for services
* Integration tests for routes
* Edge-case testing for API logic

### Frontend

* Component tests
* Hook tests
* Integration tests
* Basic end-to-end tests

Run all tests from the project root:

```bash
npm run test:all
```

---

## Online Deployment

### Frontend

Deployed on Vercel:
[https://peony-google-search-mock.vercel.app/](https://peony-google-search-mock.vercel.app/)

### Backend

API running on Railway:
[https://googlesearch-production.up.railway.app](https://googlesearch-production.up.railway.app)

---

## What I would improve

* **Authentication and API rate limiting** – securing endpoints and preventing API abuse
* **Caching of search results** – reducing external API calls and improving performance
* **Centralized error handling and logging** – better debugging and monitoring
* **More extensive end-to-end tests** – higher confidence in production behavior
* **CI/CD pipeline for automated deployment** – automated testing and deployment on every commit

---

## Author

**Jan Pivoňka**
GitHub: [https://github.com/janpivonka](https://github.com/janpivonka)
