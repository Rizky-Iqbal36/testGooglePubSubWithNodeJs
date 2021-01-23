require("dotenv").config();
const port = process.env.TOPIC_PORT;

const express = require("express");
const router = require("./src/routes/router");

const app = express();

app.use(express.json());
app.use("/api/v1/date-birth/", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
