import express from "express";
import cors from "cors";
import searchRouter from "./routes/search";

export const app = express(); // Tohle klidně nech pro testy

app.use(cors());
app.use(express.json());
app.use("/search", searchRouter);

export default app; // <--- Přidej tohle pro Vercel