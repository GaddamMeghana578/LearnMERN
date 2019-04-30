// Initializing the node module variables...
import User from "../models/User"; // Reference to Visitor.js
import uuid from "uuid"; // Creates unique id.
import path from "path"; // Provides utilities for working with file and directory paths.

// Find and get all the documents from the VisitorRegistration table.
module.exports = server => {
  server.get("/UserDetails", (req, res) => {
    // use mongoose to get all user data in the database
    User.find(function(err, User) {
      // if there is an error retrieving, send the error. Nothing after res.send(err) will execute.
      if (err) return res.status(500).send("Error occured");
      res.json(User); // return all the data in JSON format
    });
  });

  // Inserts the data in to the UserDetails table.
  server.post("/UserDetails", (req, res, next) => {
    var userData = req.body;
    var user = new User(userData);
    user.save(function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  });

  // Find and get a specific document from the UserDetails table by property name(UUID).
  server.get("/UserDetails/:objName", function(req, res) {
    User.findOne({ uuid: req.params.objName }, function(err, User) {
      if (err) return res.status(500).send("Error occured");
      res.json(User);
    });
  });

  // Find and Update the document from the UserDetails table by property name passed(UUID).
  server.put("/UserDetails/:objName", (req, res) => {
    User.findOneAndUpdate({ uuid: req.params.objName }, req.body, function(
      err,
      User
    ) {
      if (err) return res.status(500).send("Error occured");
      res.json(User);
    });
  });

  // Find and Remove the document from UserDetails table by the property name passed(UUID).
  server.delete("/UserDetails/:objName", function(req, res) {
    User.findOneAndRemove({ uuid: req.params.objName }, req.body, function(
      err,
      User
    ) {
      if (err) return res.status(500).send("Error occured");
      res.json(User);
    });
  });

  // Default route.
  server.get("/", function(req, res) {
    // Load the single view file(angular will handle the page changes on the front-end).
    res.sendFile(path.join(__dirname + "index.html"));
  });
};
