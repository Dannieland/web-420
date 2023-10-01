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
                console.log("here");
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


  router.delete('/composers/:id', async (req, res) => {
  try {
      //store requested composer ID as variable
      const composerDocId = req.params.id;

      //find and delete composer document with requested ID
      Composer.findByIdAndDelete({'_id': composerDocId}, function(err, composer) {
          if (err) {
              //if mongodb encounters an error output to console and send as response
              console.log(err);
              res.status(501).send({
                  'message': `MongoDB Exception: ${err}`
              })
          } else {
              //if document is successfully deleted output to console and send as response
              console.log(composer);
              res.json(composer);
          }
      })
  } catch (e) {
      //if server encounters error output to console and send as response
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      })
  }
})
//export finished module
module.exports = router;