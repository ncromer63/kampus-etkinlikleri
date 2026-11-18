import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    student: "2416501085",
  });
});

app.use("/events", eventRoutes);

// Beklenmeyen hata middleware'i (4 parametreli)
app.use((err, req, res, next) => {
  console.error("[hata]", err.message);
  res.status(err.status || 500).json({ error: { message: "Sunucu hatası" } });
});

export default app;
