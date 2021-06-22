"use strict";
const helmet  = require('helmet');
const express = require('express');
const cds     = require('@sap/cds');
const Sdk     = require('@dynatrace/oneagent-sdk');
const proxy   = require('@sap/cds-odata-v2-adapter-proxy');
const hana    = require('@sap/hana-client');

const app = express();
const DynaT = Sdk.createInstance();

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json( { limit: '50mb' } )) // To parse the incoming requests with JSON payloads
//app.use(helmet());

require('./srv/authController')(app);
require('./srv/docusignController')(app);

app.get("/", function (req, res) {
    res.send("OK - App is Running!");
});

app.post("/", function (req, res) {
    res.send("OK - App is Running!");
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("App listening at port " + port);
});

//Inicialiização do DB
/*
var connOptions = {
    serverNode: "<endpoint>",
    encrypt: "true",
    sslValidateCertificate: "false",
    uid: "<user?",
    pwd: "<password>",
};

var dbConnection = hana.createConnection();
dbConnection.connect(connOptions, function (err) {

    if (err) 
        throw err;

    
});

dbConnection.connect(connOptions, function (err) {
    
    if (err) throw err;
    
    dbConnection.exec(
        "SELECT * FROM <Schema>.<Table>",
        function (err, result) {
        if (err) throw err;
        console.log(result[0]);
        dbConnection.disconnect();
        }
    );
});​
*/