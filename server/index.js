"use strict";

const express = require("express");
// const path = require("path");
const volleyball = require("volleyball");

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware

app.use("/api", require("./api")); // include our routes!

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
});

// The next line is for our database.
// const { db } = require('./server/db')
// let port = 1337;

// db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
//   .then(() => {
//     console.log('db synced')

app.portNumber = 8000;
function listen(port) {
    app.portNumber = port;
    app.listen(port, () => {
        console.log("server is running on port :" + app.portNumber);
    }).on("error", function (err) {
        if (err.errno === "EADDRINUSE") {
            console.log(
                `----- Port ${port} is busy, trying with port ${port + 1} -----`
            );
            listen(port + 1);
        } else {
            console.log(err);
        }
    });
}

listen(app.portNumber);
