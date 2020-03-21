const { generateGameId } = require('./util');
const Game = require('./Game');

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

let activeGames = [];

router.get('/game/create', function(req, res) {
  let gameId = generateGameId();

  //    Make sure game id is unique
  while (activeGames.filter(game => game.id === gameId).length) {
    gameId = generateGameId();
  }

  const newGame = new Game(gameId);

  activeGames.push(newGame);

  res.send(newGame);
});

module.exports = router;
