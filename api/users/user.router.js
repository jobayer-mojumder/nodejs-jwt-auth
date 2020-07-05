const router = require("express").Router()
const validation = require('../auth/validation')
const userController = require("./user.controller")

router.post("/login", userController.login)
router.get("/", validation, userController.getUsers)
router.post("/", userController.createUser)
router.get("/:id", validation, userController.getUserByUserId)
router.put("/", validation, userController.updateUsers)
router.delete("/", validation, userController.deleteUser)

module.exports = router;