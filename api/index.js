require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
morgan.token("body", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);
const Note = require("./models/note");

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World</h1>");
// });

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id).then((note) => {
    response.json(note);
  });
  // console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  // console.log("Esta es el note: " + note);
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  Note.findByIdAndRemove(id, (err, result) => {
    if (err) {
      // Manejar el error si ocurre al eliminar la nota
      console.error(err);
      response.status(500).json({ error: "Error al eliminar la nota" });
    } else {
      // Verificar si se encontró y eliminó la nota exitosamente
      if (result) {
        response.status(204).end(); // 204 No Content
      } else {
        response.status(404).json({ error: "Nota no encontrada" });
      }
    }
  });
});

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note.save().then((savedNote) => {
    console.log(savedNote);
    response.json(savedNote);
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
