# Google Search – Full‑stack demo aplikace

Jednoduchá full‑stack webová aplikace demonstrující práci s externími vyhledávacími API. Aplikace umožňuje vyhledat **organické výsledky z první stránky Google**, obohatit je o ilustrační obrázky a uložit do strukturovaného formátu.

---

## Funkce

* zadání klíčového slova
* získání organických výsledků z Google (bez reklam)
* automatické doplnění ilustračního obrázku ke každému výsledku
* zobrazení výsledků ve webovém rozhraní
* export výsledků do JSON souboru

---

## Technologie

### Backend

* Node.js
* Express
* TypeScript
* Google Custom Search API
* SERP API
* Jest (unit a integrační testy)

### Frontend

* React
* Vite
* TypeScript
* Jest + Testing Library

---

## Struktura projektu

```
google_search/
├─ backend/
├─ frontend/
└─ package.json
```

---

## Spuštění projektu lokálně

### Backend

```powershell
cd backend
npm install
npm run dev
```

Backend poběží na:

```
http://localhost:3001
```

Backend vyžaduje `.env` soubor s následujícími proměnnými:

```
GOOGLE_API_KEY=...
GOOGLE_CX=...
SERP_API_KEY=...
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend poběží na:

```
http://localhost:5173
```

---

## Docker

Aplikace podporuje **vývojový i produkční režim** s Dockerem.

### Vývojový režim (dev)

* Hot-reload, okamžitá viditelnost změn
* Používá lokální zdrojové soubory (volumes)

Spuštění:

```bash
./start-dev.sh
```

Backend: `http://localhost:3001`
Frontend: `http://localhost:5173`

Docker Compose soubor: `docker-compose.dev.yml`
Frontend musí být spuštěn s `--host 0.0.0.0`, aby byl přístupný z hosta.

### Produkční režim (prod)

* Optimalizovaný build
* Minifikované statické soubory a menší backend image
* Odstranění devDependencies

Spuštění:

```bash
./start-prod.sh
```

Backend: `http://localhost:3001`
Frontend: `http://localhost` (port 80)

Docker Compose soubor: `docker-compose.prod.yml`

> Poznámka: Prod build je vhodný pro nasazení na server, pro lokální vývoj stačí dev build.

---

## Testování

### Spuštění všech testů z root adresáře projektu

```powershell
npm run test:all
```

### Samostatně

**Backend**

```powershell
cd backend
npm test
```

**Frontend**

```powershell
cd frontend
npm test
```

---

## Online verze

### Frontend

Aplikace je nasazena na **Vercelu**:

```
https://peony-google-search-mock.vercel.app/
```

### Backend

Backend API běží na **Railway**:

```
https://googlesearch-production.up.railway.app
```

---

## Autor

**Jan Pivoňka**
GitHub: [https://github.com/janpivonka](https://github.com/janpivonka)
