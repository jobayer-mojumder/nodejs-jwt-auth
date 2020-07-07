const UserModel = require('./user.model')
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

var userController = {

    login: (req, res) => {
        const body = req.body;
        UserModel.getUserByUserEmail(body.email, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            if (!results) {
                return res.status(401).json({
                    status: 401,
                    message: 'No user found'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    status: 200,
                    message: 'login successfully',
                    token: jsontoken
                });
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid password'
                });
            }
        });
    },



    getUsers: (req, res) => {
        UserModel.getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            return res.json({
                status: 200,
                data: results
            });
        });
    },



    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            if (!results) {
                return res.status(404).json({
                    status: 404,
                    message: 'Record not Found'
                });
            }
            results.password = undefined;
            return res.status(200).json({
                status: 200,
                data: results
            });
        });
    },



    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        UserModel.updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'updated statusfully'
            });
        });
    },



    deleteUser: (req, res) => {
        const data = req.body;
        UserModel.deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            if (!results) {
                return res.status(404).json({
                    status: 404,
                    message: 'Record Not Found'
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'user deleted statusfully'
            });
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
                    status: 500,
                    message: err.message
                });
            }
            return res.status(201).json({
                status: 201,
                data: results
            });
        });
    },

}

module.exports = userController;