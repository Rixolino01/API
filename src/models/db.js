const mysql = require('mysql2');
const { Client } = require('pg');
const CONFIG = process.env;

const DB_TYPES = {
    "MYSQL":"mysql",
    "POSTGRESQL":"pg"
}

class DB{

    constructor(conn=null, db_type=DB_TYPES.MYSQL){
        this.conn = conn;
        this.db_type = db_type;
    }

    static async connect(db_type=DB_TYPES.MYSQL){
        
        let conn = null;
        try{
            if(db_type == DB_TYPES.POSTGRESQL){
                conn = new Client({
                    host: CONFIG.DB_PG_HOST,
                    user: CONFIG.DB_PG_USER,
                    password: CONFIG.DB_PG_PSWD,
                    database: CONFIG.DB_PG_NAME,
                    port: CONFIG.DB_PG_PORT,
                    ssl: true
                });
                await conn.connect();
                
            }else{
                conn = mysql.createConnection({
                    host     : CONFIG.DB_HOST,
                    user     : CONFIG.DB_USER,
                    password : CONFIG.DB_PSWD,
                    database : CONFIG.DB_NAME
                });
                conn.connect((err) => {
                    if (err) throw err;
                });
            }
        }catch(err){
            console.log(err);
        }
        return conn;
    }

    async query(sql, params=[], print=false){
        let result = null;
        try{
            result = await new Promise((resolve, reject) => {
                let query = null;
                switch(this.db_type){
                    case DB_TYPES.POSTGRESQL:
                        this.conn.query(sql, params).then(result => {
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        })
                        break;
                    default:
                        query = this.conn.query(sql, params, (err, results, fields) => {
                            if(err) reject(err);
                            resolve(results);
                        });
                        if(print)
                            console.log(query.sql);
                }
            });
        }catch(error){
            console.error(error);
            result = null;
        }

        return result;
    }

    async beginTransaction(){
        return new Promise((resolve, reject) => {
            switch(this.db_type){
                case DB_TYPES.POSTGRESQL:
                    this.conn.query('BEGIN').then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    })
                    break;
                default:
                    this.conn.beginTransaction((err) => {
                        if (err) reject(err);
                        resolve();
                    });
            }
        });
    }

    async rollback(){
        return new Promise((resolve, reject) => {
            switch(this.db_type){
                case DB_TYPES.POSTGRESQL:
                    this.conn.query('ROLLBACK').then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    })
                    break;
                default:
                    this.conn.rollback(() => {
                        resolve();
                    });
            }
            
        });
    }

    async commit(){
        return new Promise((resolve, reject) => {
            switch(this.db_type){
                case DB_TYPES.POSTGRESQL:
                    this.conn.query('COMMIT').then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    })
                    break;
                default:
                    this.conn.commit(async (err) => {
                        if (err){
                            await this.rollback();
                            reject(err);
                        }
                        resolve();
                    });
            }
            
        });
    }
}

module.exports = DB;