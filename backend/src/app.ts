import express from "express";
import cors from "cors";
import searchRouter from "./routes/search";

export const app = express();

// Upravený CORS pro Vercel
app.use(cors({
  origin: [
    "http://localhost:5173", // Pro lokální vývoj
    "https://peony-google-search-mock-blihn5jh0-jan-pivonkas-projects.vercel.app" // Tvoje nová URL frontendu
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Hlavní routa pro test, jestli backend žije
app.get("/", (req, res) => {
  res.json({ status: "Backend is running on Vercel! 🚀" });
});

app.use("/search", searchRouter);

export default app;