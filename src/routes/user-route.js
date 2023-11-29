var express = require('express');
var router = express.Router();
var DB = require('../models/db')
var UserController = require("../controllers/user-controller")

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
router.get('/clientes', async function(request, response) {
  const conn = await DB.connect("mysql")

  const userController = new UserController(conn, "mysql")
  let consulta = await userController.consulta_cliente()

  conn.end();

  response.send(consulta)
})

module.exports = router;