const router = require('express').Router()
const checkToken = require('../auth/checkToken')
const userController = require('./user.controller')

router.post('/login', userController.login)
router.get('/', checkToken, userController.getUsers)
router.post('/', userController.createUser)
router.get('/:id', checkToken, userController.getUserByUserId)
router.put('/', checkToken, userController.updateUsers)
router.delete('/', checkToken, userController.deleteUser)

module.exports = router;