var express = require('express');
var router = express.Router();

require('express-ws')(router);

router.ws('/game', function(ws, res) {
  console.log('hallo');
});

module.exports = router;
