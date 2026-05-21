import express from "express";
import cors from "cors";
import pino from "pino-http";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat:
          "{req.method} {req.url} {res.statusCode} - {responseTime}ms",
        hideObject: true,
      },
    },
  }),
);

//middleware
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

//test eror for backend
app.get("/test-error", (req, res) => {
  throw new Error("Simulated server error");
});

//all notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes",
  });
});

//{id} notes
app.get("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// middleware 404 {GET /profile | GET /payments}
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//middleware 500
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
