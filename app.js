/*
app.js
Danielle Taplin
8/11/2023
javascript for npm dependencies
*/

//enable strict mode
"use strict";

//require express, mongoose, http, swagger-ui-express and swagger-jsdoc
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//require the APIs from routes file
const composerAPI = require('./routes/taplin-composer-routes');
const Composer = require('./models/taplin-composer');
const personAPI = require('./routes/taplin-person-routes');
const Person = require('./models/taplin-person');
const sessionRoutes = require('./routes/taplin-session-routes');
const User = require('./models/taplin-user');
const customerAPI = require('./routes/taplin-node-shopper-routes');
const Customer = require('./models/taplin-customer');

//create variable for MongoDB connection string
const CONN = 'mongodb+srv://web420_user:s3cret@composers.7jfs9oc.mongodb.net/web420DB';

//connect to MongoDB and output message stating success or failure to connect
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

//create an app variable set to express library
const app = express();

//set port number
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//files containing annotations for OpenAPI
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: [
        './docs/taplin-composers.yaml',
        './docs/taplin-persons.yaml',
        './docs/taplin-sessions.yaml',
        './docs/taplin-customers.yaml',
    ],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//use these APIs built in class
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', sessionRoutes);
app.use('/api', customerAPI);


// Server location
http.createServer(app).listen(port, () => {
    console.log(`Application started and listening on port ${port}`);
});