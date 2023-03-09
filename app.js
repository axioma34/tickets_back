const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const ticketsRouter = require("./routes/tickets");
const eventsRouter = require("./routes/events");


const SERVER_PORT = 3000
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use("/", indexRouter);
app.use("/ticket", ticketsRouter);
app.use("/event", eventsRouter);
app.listen(SERVER_PORT, function () {
    console.log('Server listening on *:' + SERVER_PORT)
})
