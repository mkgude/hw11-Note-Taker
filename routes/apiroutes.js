// DEPENDECIES ===================================
const fs = require("fs");
const path = require("path");
module.exports = function (app) {
  // ability to read the file while grabbing the database json file
  fs.readFile("db/db.json", "utf8", (err, data) => {
    // if there is an error within reading the file, the file will be thrown out by using the throw syntax
    if (err) throw err;
    // calling the data parameter in the readFile
    const note = JSON.parse(data);
    // API ROUTES =================================
    // GET API ====================================
    // setting up for /api/notes get route
    app.get("api/notes", function (req, res) {
      res.JSON(note);
    });
    // POST API ====================================
    // setting up for /api/notes post route
    // DELETE API ==================================
    // setting up for /api/notes/:id
  });
};
