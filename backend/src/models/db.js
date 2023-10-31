const mysql = require('mysql2');
const CONFIG = process.env;

class DB{

    constructor(conn=null){
        this.conn = conn;
    }

    static async connect(){
        const conn = mysql.createConnection({
            host     : CONFIG.DB_HOST,
            user     : CONFIG.DB_USER,
            password : CONFIG.DB_PSWD,
            database : CONFIG.DB_NAME
        });

        await new Promise((resolve, reject) => {
            conn.connect((err) => {
                if (err) reject(err);
                resolve();
            });
        })

        return conn;
    }

    async query(sql, params=[], print=false){
        let result = null;
        try{
            result = await new Promise((resolve, reject) => {
                let query = this.conn.query(sql, params, (err, results, fields) => {
                    if(err) reject(err);
                    resolve(results);
                });
                if(print)
                    console.log(query.sql);
            });
        }catch(error){
            console.error(error);
            result = null;
        }

        return result;
    }

    async beginTransaction(){
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    async rollback(){
        return new Promise((resolve, reject) => {
            this.conn.rollback(() => {
                resolve();
            });
        });
    }

    async commit(){
        return new Promise((resolve, reject) => {
            this.conn.commit(async (err) => {
                if (err){
                    await this.rollback();
                    reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = DB;