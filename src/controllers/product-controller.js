const DB = require('../models/db');

class ProductController extends DB{

    constructor(){
        super(conn);
    }

    
}

module.exports = ProductController;