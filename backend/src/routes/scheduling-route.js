var express = require('express');
var router = express.Router();
const DB = require('../models/db');
const SchedulingController = require('../controllers/scheduling-controller');
const CustomError = require('../models/custom-error');

router.get('/consultar', async (request, response) => {
        let agenda ={
          data: request.query.data,
          hora: request.query.hora,
        };
        const conn = await DB.connect();
        const schedulingController = new SchedulingController(conn);
        let consulta = await schedulingController.consultar(agenda.data, agenda.hora);


  response.send({
    status: 200,
    data: consulta,
    message: null
    });
});

module.exports = router;