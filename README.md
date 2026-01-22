# Google Search – Full-Stack Application

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://peony-google-search-mock.vercel.app/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge\&logo=railway\&logoColor=white)](https://googlesearch-production.up.railway.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)

---

## 📝 Context and Project Goal

This project was developed as a **technical hiring assignment** for the company **INIZIO**.

The goal was to design and deliver a **production-ready full-stack solution** covering frontend, backend, testing strategy, Docker-based containerization, and cloud deployment.

---

## 🚀 Live Demo

**Frontend (Vercel):**
👉 [https://peony-google-search-mock.vercel.app/](https://peony-google-search-mock.vercel.app/)

**Backend API (Railway):**
👉 [https://googlesearch-production.up.railway.app](https://googlesearch-production.up.railway.app)

---

## 🏗️ Application Architecture

The project is structured into **frontend and backend layers**, each with clear responsibilities and modular design.

### 🔹 Backend

Implemented in **Node.js + TypeScript** with the following key points:

* Modular architecture: `routes / services`
* Integration with external search APIs: SERP API, Google Custom Search API
* Data enrichment and normalization pipeline
* Centralized error handling
* Unit and integration tests (Jest)
* Dockerized development and production environments

### 🔹 Frontend

Implemented in **React + TypeScript + Vite**:

* Feature-first component structure
* Application logic abstracted in custom hooks (`useSearch`, `useUI`)
* Services layer for API communication
* Tailwind CSS for rapid and consistent styling
* Component, hook, integration, and basic end-to-end tests

---

## ✨ Key Features

* Keyword-based Google search
* Retrieval of **organic results only** (no ads)
* Automatic enrichment of results with related images
* Display of results in a structured web interface
* Export results to a structured JSON file
* Desktop SPA optimized interface

---

## ⚠️ Current State and Limitations

* Fully functional frontend consuming data from backend API
* **Backend endpoints for write operations not connected yet**
* All critical features tested, ready for further enhancements
* Screenshot-based overview included for clarity

---

## 📸 Screenshots

### Home Page

![Home Page](frontend/public/images/screenshots/home-page.png)

### Search Results

![Results Page](frontend/public/images/screenshots/results-page.png)

---

## 🛠️ Tech Stack

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
* Tailwind CSS
* Jest + Testing Library

### Infrastructure

* Docker & Docker Compose (development & production)
* Railway (backend deployment)
* Vercel (frontend deployment)

---

## 📂 Project Structure

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
│  ├─ public/
│  │  └─ images/screenshots/
│  ├─ Dockerfile.dev
│  ├─ Dockerfile.prod
│  └─ jest.config.cjs
│
├─ docker-compose.yml
├─ docker-compose.prod.yml
└─ package.json
```

---

## ⚙️ Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:3001`

Environment variables required (`.env`):

```
GOOGLE_API_KEY=...
GOOGLE_CX=...
SERP_API_KEY=...
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Docker Setup

### Development Mode

* Hot reload
* Local source files via volumes

```
./start.sh
```

* Backend: `http://localhost:3001`
* Frontend: `http://localhost:5173`
* Docker Compose: `docker-compose.yml`

### Production Mode

* Optimized builds
* Minified static assets
* Development dependencies removed

```
./start-prod.sh
```

* Backend: `http://localhost:3001`
* Frontend: `http://localhost` (port 80)
* Docker Compose: `docker-compose.prod.yml`

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

Run all tests from project root:

```
npm run test:all
```

---

## 📈 Roadmap and Future Improvements

* Authentication and API rate limiting
* Caching of search results
* Centralized error handling and logging
* More extensive end-to-end testing
* CI/CD for automated deployment

---

## 👤 Author

**Jan Pivoňka**
GitHub: [https://github.com/janpivonka](https://github.com/janpivonka)
