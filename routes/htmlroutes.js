// DEPENDECIES ===================================

const path = require("path");

// Display notes.html while using the GET METHOD
module.exports = function (app) {
  // Basic route that sends the user to the notes page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Basic route that sends the user first to the AJAX Page
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
