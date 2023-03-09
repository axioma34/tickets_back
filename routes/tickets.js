const express = require("express");
const router = express.Router()
const ticketController = require("../controllers/ticketController")
const jsonParser = express.json();

router.put("/", jsonParser, ticketController.validate);
router.post("/", jsonParser, ticketController.create);

module.exports = router
