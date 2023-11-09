var express = require('express');
var router = express.Router();
const DB = require('../models/db');
const SchedulingController = require('../controllers/scheduling-controller');
const CustomError = require('../models/custom-error');


// essa parte deve listar todos os horários disponiveis a partir de data e hora
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
    message: "Lista atualizada"
    });
});
// esse será a operação de agendar um horário, devemos receber um json contendo Id_cliente e id_agenda e alterar a agenda_pet_shop
router.post('/reservar', async (request, response) => {
  let { id_cliente, id_agenda} = request.body ;
  
  const conn = await DB.connect();
  const schedulingController = new SchedulingController(conn);
  let conf_reserva = await schedulingController.reservar(id_cliente, id_agenda);
  

response.send({
  status: 200,
  data: conf_reserva,
  message: "Reserva realizada"
  });
})

// essa parte deve listar todos os horários disponiveis a partir de data e hora
router.get('/consultar_hora', async (request, response) => {
  let horario ={
    data: request.query.data    
  };

  const conn = await DB.connect();
  const schedulingController = new SchedulingController(conn);
  let consulta = await schedulingController.consultar_hora(horario.data);

  console.log(consulta)

response.send({
  status: 200,
  data: consulta,
  message: "Lista de horas"
  });
});

module.exports = router;