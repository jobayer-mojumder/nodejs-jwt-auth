const pool = require('../../config/database')

var userModel = {

    create: (userData, callBack) => {
        pool.query(
            `insert into users(firstName, lastName, email, password) 
                  values(?,?,?,?)`,
            [
                userData.first_name,
                userData.last_name,
                userData.email,
                userData.password
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


    updateUser: (userData, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, email=?, password=? where id = ?`,
            [
                userData.first_name,
                userData.last_name,
                userData.email,
                userData.password,
                userData.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    deleteUser: (userData, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [userData.id],
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