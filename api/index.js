const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
morgan.token("body", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);
// const Note = require("./models/note");
// const mongoose = require("mongoose");

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = "mongodb+srv://jomareru:<password>@cluster0.ivuudem.mongodb.net";
// mongoose.connect(url);
//TODO en la linea 15 se encuentra el connection string:
//mongodb+srv://jomareru:<password>@cluster0.ivuudem.mongodb.net
//TODO En password se debe colocar esta clave gtpEDqcu4EQs63g6---------------------------------
//TODO en la linea 18 se encuentra la manera de conectar
//TODO con mis credenciales a la base de datos
//mongodb+srv://jomareru:gtpEDqcu4EQs63g6@cluster0.ivuudem.mongodb.net/?retryWrites=true&w=majority
//todo --------------------------------------------
// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  const noteMap = notes.map((note) => note);
  response.json(noteMap);
});

app.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  // console.log(id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  // console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  // console.log("Esta es el note: " + note);
  response.json(note);
});

app.delete("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end("Nota eliminada con exito");
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  };
  notes = notes.concat(note);
  // console.log(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
