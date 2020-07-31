// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;
// const mainDir

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =====================================
// require route file
require("./routes/htmlroutes.js")(app);
require("./routes/apiroutes.js")(app);

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

// Basic route that sends the user to the notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});

// on notes page
// GET /api/notes
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  // read db.json file
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  // return notes as JSON
  res.json(savedNote[Number(req.params.id)]);
});
// POST /api/notes -
//    return the new note to the client.
// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  //  receive a new note to save on the request body,
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  var newNote = req.body;
  let uniqueID = savedNote.length.toString();
  newNote.id = uniqueID;
  console.log(newNote);

  // We then add the json the user sent to the character array
  savedNote.push(newNote);
  // We then displaythe JSON to the users
  fs.writeFile("./db/db.json", JSON.stringify(savedNote));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNote);
});

// DELETE /api/notes/:id
//    receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
