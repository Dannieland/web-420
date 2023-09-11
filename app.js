/*
app.js
Danielle Taplin
8/11/2023
javascript for npm dependencies
*/

//Enable strict mode
"use strict";

//Require express, mongoose, http, swagger-ui-express and swagger-jsdoc
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//Require the composer API from the routes file
const composerAPI = require('./routes/taplin-composer-routes');

//Create a variable for a MongoDB connection string
const CONN = 'mongodb+srv://web420_user:<temp>@composers.7jfs9oc.mongodb.net/';

//Connect to MongoDB and output a message stating success for failure to do so
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

//Create an app variable set to the express library
const app = express();

//Set the port
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/*.js'], //files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Use the composer API and person API
app.use('/api', composerAPI)
app.use('/api', personAPI);

app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});