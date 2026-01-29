import express from "express";
import cors from "cors";
import searchRouter from "./routes/search";

export const app = express();

// Konfigurace CORS
app.use(cors({
  origin: [
    "http://localhost:5173", // Lokální vývoj
    "https://peony-google-search-mock.vercel.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Testovací endpoint pro ověření funkčnosti
app.get("/", (req, res) => {
  res.json({
    status: "Backend is running on Vercel! 🚀",
    timestamp: new Date().toISOString()
  });
});

// Zapojení routeru
app.use("/search", searchRouter);

export default app;