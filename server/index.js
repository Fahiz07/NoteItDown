import express from "express";
import cors from "cors";
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors({
  origin: 'https://note-it-down-fahiz.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

app.post("/notes", async (req, res) => {
  try {
    const { note_title, note_content } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (note_title, note_content) VALUES ($1, $2) RETURNING *",
      [note_title, note_content]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add note." });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes ORDER BY note_id DESC");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve notes." });
  }
});

app.put("/notes/:note_id", async (req, res) => {
  try {
    const { note_id } = req.params;
    const { note_title, note_content } = req.body;
    await pool.query(
      "UPDATE notes SET note_title = $1, note_content = $2 WHERE note_id = $3",
      [note_title, note_content, note_id]
    );
    res.json({ message: "Note updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update note." });
  }
});

app.delete("/notes/:note_id", async (req, res) => {
  try {
    const { note_id } = req.params;
    await pool.query("DELETE FROM notes WHERE note_id = $1", [note_id]);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete note." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
