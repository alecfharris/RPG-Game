var db = require("../models");

module.exports = function(app) {

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

  // Get high scores
  app.get('/api/high_score', function(req, res) {
    db.high_score.findAll({}).then(function(dbhighScores) {
      res.json(dbhighScores);
    });
  });


  // Create a new high score
  app.post('/api/high_score', function(req, res) {
    db.high_score.create(req.body).then(function(dbhighScores) {
      res.json(dbhighScores);
    });
  });
};
