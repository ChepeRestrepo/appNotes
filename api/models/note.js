const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
//TODOS se crea el esquema para la DB
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});
//TODOS se eliminan el __v y el __id para evitar problemas
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
