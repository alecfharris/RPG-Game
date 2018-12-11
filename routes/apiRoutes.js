var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Get all attacks
  app.get("/api/attacks", function(req, res) {
    db.attacks.findAll({}).then(function(dbAttacks) {
      res.json(dbAttacks);
    });
  });
  // Get all characters
  app.get("/api/characters", function(req, res) {
    db.characters.findAll({}).then(function(dbcharacters) {
      res.json(dbcharacters);
    });
  });

  // // Get specific character
  //       app.get('/api/playerCharacter/:character', function (req, res) {
  //           let chosen = req.params.character;
  //           db.characters.findAll({
  //               where: {
  //                   Name: chosen
  //               }
  //           }).then(function (data) {
  //               res.json(data);
  //               console.log(data);
  //               // createPlayerCharacter(data)
    
  //           });
  //       });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
