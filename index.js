const express = require("express");
const authRoute = require('./src/routes/auth-route');
const userRoute = require('./src/routes/user-route');
const productRoute = require('./src/routes/product-route');
const scheduleRoute = require('./src/routes/scheduling-route')
const cors = require('cors');
require('dotenv').config();
var bodyParser = require('body-parser')
const app = express();
const CONFIG = process.env;

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

//caminhos de entrada das rotas, aqui devem ser cadastradas todas as rotas
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/products',productRoute);
app.use('/scheduling',scheduleRoute);
app.listen(CONFIG.SERVER_PORT);
