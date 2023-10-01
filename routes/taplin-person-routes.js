/*
taplin-person-routes.js
Danielle Taplin
9/10/23
mongoose model for person routes for API
*/

//create variables requiring express, router, and person model
const express = require('express');
const router = express.Router();
const person = require('../models/taplin-person');

router.get('/persons', async(req, res) => {
    try {
        //find all person documents from database
        person.find({}, function(err, persons) {
            //if mongodb encounters error
            if (err) {
                //output error message to console and send as response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //else, output list of all persons and send as JSON response
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        //if server encounters error, output message to console and send as response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})



router.post('/persons', async(req, res) => {
    try {
        //create new person object using request's parameters
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        }

        //await response from server
        await person.create(newPerson, function(err, person) {
            //if MongoDB encounters error
            if (err) {
                //output the error message to console and send a response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //else, output new person JSON and send it as response
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        //if the server encounters any errors, output message to console and send as response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

//export finished module
module.exports = router;