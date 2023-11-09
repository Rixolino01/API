var express = require('express');
var router = express.Router();

router.get('/details', function(request, response) {

  let name = request.query.name;

  response.send(name);
});

router.post('/', function(request, response) {
  response.send(request.body);
});
router.get('/', function(request, response) {
  response.send('home page');
});

module.exports = router;