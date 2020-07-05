const router = require("express").Router()
const validation = require('../auth/validation')
const userController = require("./user.controller")

router.post("/login", login)
router.get("/", validation, getUsers)
router.post("/", validation, createUser)
router.get("/:id", validation, getUserByUserId)
router.patch("/", validation, updateUsers)
router.delete("/", validation, deleteUser)

module.exports = router;