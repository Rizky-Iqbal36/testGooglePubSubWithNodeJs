const express = require("express");

const router = express.Router();
const { create: publishMessage } = require("../controller/topic-controller");

router.post("/create", publishMessage);

module.exports = router;
