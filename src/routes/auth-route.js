var express = require('express');
var router = express.Router();
const DB = require('../models/db');
const UserController = require('../controllers/user-controller');
const CustomError = require('../models/custom-error');

router.post('/login', async (request, response) => {
    let { email, senha } = request.body;
    const conn = await DB.connect("pg");
    const userController = new UserController(conn, "pg");
    let logged = await userController.login(email, senha);

    response.send({
        status: 200,
        data: logged,
        message: null
    });
});

router.post('/register', async (request, response) => {
    const conn = await DB.connect("pg");
    const userController = new UserController(conn,"pg");

    let result = {
        status: 200,
        data: null,
        message: null
    };

    try{
        let registered = await userController.register(request.body);
        result.data = registered;

    }catch(error){

        if(error instanceof CustomError){
            result.status = error.code;
            result.message = error.message;
        }

    }

    response.send(result);
});


module.exports = router;