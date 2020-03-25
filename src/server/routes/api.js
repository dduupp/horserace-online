const { generateGameId } = require('../util');
const Game = require('../models/Game');

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

let activeGames = [];

router.get('/games', function(req, res) {
  res.send(
    activeGames.map(game => ({
      id: game.id
    }))
  );
});

router.post('/game/create', function(req, res) {
  let gameId = generateGameId();

  //    Make sure game id is unique
  while (findGameById(gameId).length) {
    gameId = generateGameId();
  }

  const newGame = new Game(gameId);

  activeGames.push(newGame);

  res.send({
    gameId: gameId
  });
});

router.post('/game/join', function(req, res) {
  const gameId = req.body.id;

  const game = findGameById(gameId);

  if (!game) {
    res.send({
      error: 'game not found'
    });
  } else {
    res.send({
      gameId: game.id
    });
  }
});

function findGameById(id) {
  return activeGames.filter(game => game.id === id);
}

module.exports = router;
