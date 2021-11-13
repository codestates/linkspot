const router = require("express").Router()

const isLoggedIn = require("../../lib/middlewares/isLoggedIn")
const { readMention } = require("./mention.controller")

// 맨션
router.get("/mention", isLoggedIn, readMention)

module.exports = router
