import express from "express";
import cors from "cors";
import searchRouter from "./routes/search";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/search", searchRouter);
