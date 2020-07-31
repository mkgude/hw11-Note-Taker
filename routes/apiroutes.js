// DEPENDECIES ===================================
const fs = require("fs");
const path = require("path");
module.exports = function (app) {
  // API ROUTES =================================
  // GET API ====================================
  // setting up for /api/notes get route
  app.get("/api/notes", function (req, res) {
    // read db.json file
    fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      let notes = JSON.parse(data);
      console.log(notes);
      res.json(notes);
    });
  });

  // POST API ====================================
  // setting up for /api/notes post route
  // Create New Notes - takes in JSON input
  app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      database = JSON.parse(database);
      var newNote = req.body;

      //If there are no notes, you end up breaking because you can't make a new note id.
      if (database.length === 0) {
        newNote.id = 1;
      } else {
        const lastElementId = database[database.length - 1].id;
        newNote.id = lastElementId + 1;
      }
      database.push(newNote);
      database = JSON.stringify(database);

      fs.writeFile("db/db.json", database, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });

  // DELETE API ==================================
  // setting up for /api/notes/:id
  // DELETE /api/notes/:id
  app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      database = JSON.parse(database);
      //filter keeps everything for which the function in filter returns true.
      var newDatabase = database.filter((note) => {
        return note.id !== id;
      });

      newDatabase = JSON.stringify(newDatabase);
      fs.writeFile("db/db.json", newDatabase, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
};
