var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {

  let name = request.query.name;

  response.send(name);
});


module.exports = router;