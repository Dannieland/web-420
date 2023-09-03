/*
taplin-composer.js
Danielle Taplin
9/1/2023
composer.js for composer api
 */


//create variables requiring express, router, and composer model
const express = require('express');
const router = express.Router();
const Composer = require('../models/taplin-composer');

/**findAllComposers
  @openapi
  /api/composers:
    get:
      tags:
        - Composers
      description: API for returning an array of composer objects.
      summary: returns an array of composers in JSON format.
      responses:
        '200':
          description: Array of composers
        '500':
          description: Server Exception
        '501':
          description: MongoDB Exception*/


router.get('/composers', async(req, res) => {
    try {
        //find all composer documents from database
        Composer.find({}, function(err, composers) {
        //if MongoDB encounters error
            if (err) {
        //output an error message to the console and send it as a response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //otherwise output list of all composers and send it as JSON response
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        //if server encounters error, output message to console and send response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**findComposerById
 @openapi
  /api/composers/{id}:
    get:
      tags:
        - Composers
      description:  API for returning a composer document
      summary: returns a composer document
      parameters:
        - name: id
          in: path
          required: true
          description: Composer document id
          schema:
            type: string
      responses:
        '200':
          description: Composer document
        '500':
          description: Server exception
        '501':
          description: MongoDB Exception*/


router.get('/composers/:id', async(req, res) => {
    try {
        //find composer matching provided id parameter
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            //if MongoDB encounters an error
            if (err) {
                //output error message to console and send response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //otherwise output composer JSON to console and send response
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        //if server encounters error, output message to console and send response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**createComposer
 @openapi
  /api/composers:
    post:
      tags:
        - Composers
      name: createComposer
      description: API for adding a new composer document to MongoDB Atlas
      summary: Creates a new composer document
      requestBody:
        description: Composer information
        content:
          application/json:
            schema:
              required:
                - firstName
                - lastName
              properties:
                firstName:
                  type: string
                lastName:
                  type: string
      responses:
        '200':
          description: Composer added
        '500':
          description: Server Exception
        '501':
          description: MongoDB Exception*/


router.post('/composers', async(req, res) => {
    try {
        //create new composer object using request's parameters
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        //wait for response from server
        await Composer.create(newComposer, function(err, composer) {
            //if MongoDB encounters error
            if (err) {
                //output error message to console and send response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //otherwise output new composer JSON and send response
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        //if server encounters error, output message to console and send response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

//export finished module
module.exports = router;