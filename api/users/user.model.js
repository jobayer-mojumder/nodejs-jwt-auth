const pool = require('../../config/database')

var userModel = {

    create: (data, callBack) => {
        pool.query(
            `insert into users(firstName, lastName, email, password) 
                  values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                return callBack(error, results);
            }
        );

    },


    getUserByUserEmail: (email, callBack) => {
        pool.query(`select * from users where email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id,firstName,lastName,email from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getUsers: callBack => {
        pool.query(
            `select id,firstName,lastName,email from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    updateUser: (data, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, email=?, password=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results.affectedRows);
            }
        );
    }
};

module.exports = userModel