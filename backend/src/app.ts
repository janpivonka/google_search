import express from "express";
import cors from "cors";
import searchRouter from "./routes/search";

export const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Povolíme localhost nebo jakoukoli subdoménu na vercel.app
    if (!origin || origin.startsWith("http://localhost") || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend is running! 🚀" });
});

app.use("/search", searchRouter);

export default app;