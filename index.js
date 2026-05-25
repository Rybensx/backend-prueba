import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando 🚀",
  });
});

app.get("/tareas", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tareas");
  res.json(rows);
});

app.post("/tareas", async (req, res) => {
  const { titulo } = req.body;

  await db.query(
    "INSERT INTO tareas (titulo) VALUES (?)",
    [titulo]
  );

  res.json({
    mensaje: "Tarea agregada",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});