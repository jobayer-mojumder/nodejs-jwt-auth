const UserModel = require('./user.model')
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

var userController = {
    login: (req, res) => {
        const body = req.body;
        UserModel.getUserByUserEmail(body.email, (err, results) => {

            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: "No user found"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    message: "Invalid password"
                });
            }
        });
    },
    getUsers: (req, res) => {
        UserModel.getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        return res.status(200).json({
            message: 'Welcome'
        });
    },
    updateUsers: (req, res) => {
        return res.status(200).json({
            message: 'Welcome'
        });
    },
    deleteUser: (req, res) => {
        return res.status(200).json({
            message: 'Welcome'
        });
    },

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync();
        body.password = hashSync(body.password, salt);
        UserModel.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

}

module.exports = userController;