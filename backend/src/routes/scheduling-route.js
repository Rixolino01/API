var express = require('express');
var router = express.Router();
const DB = require('../models/db');
const SchedulingController = require('../controllers/scheduling-controller');
const CustomError = require('../models/custom-error');

router.get('/consultar/:data&hora', async (request, response) => {
        let agenda ={
          data: request.body.data,
          hora: request.body.hora
        };
        const conn = await DB.connect();
        const userController = new SchedulingController(conn);
        let consulta = await SchedulingController.agenda(data, hora);


  response.send({
    status: 200,
    data: consulta,
    message: null
    });
});

module.exports = router;