/*
taplin-node-shopper-routes.js
Danielle Taplin
9/22/2023
node shopper routes for composer api
 */

//create variables requiring express, router, and customer model file
const express = require('express');
const router = express.Router();
const Customer = require('../models/taplin-customer');

router.post('/customers', async(req, res) => {
    try {
        //create new customer object using requests parameters
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username
        }

        //wait for response from server
        await Customer.create(newCustomer, function(err, customer) {

            //if mongodb encounters error
            if (err) {
                //output error message to console and send as response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //otherwise output new person JSON and send as response
                console.log(customer);
                res.json(customer);
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


router.post('/customers/:username/invoices', async(req, res) => {
    try {



    
        //query database to find customer with select username
        Customer.findOne({'username': req.body.username}, function(err, customer) {
            //create new invoice object using request body
            const newInvoice = {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped,
                lineItems: req.body.lineItems
            }
            //push the new invoice onto customers invoices array
            customer.invoices.push(newInvoice)

            //call customer.save function to add new invoice to mongodb
            customer.save(function(err, updatedCustomer) {
                if (err) {
                    //if mongodb encounters error, print error and send as response
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                } else {
                    //if else print updated customer and send as response
                    console.log(updatedCustomer);
                    res.json(updatedCustomer);
                }
            })
        })
    } catch (e) {
        //if server encounters error, output message to console and send as response
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


router.get('/customers/:username/invoices', async(req, res) => {
    try {
        //find customer matching select username 
        Customer.findOne({'username': req.params.username}, function(err, customer) {
            //if mongodb encounters error
            if (err) {
                //push error message to console and send as response
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //if else push invoices array to console and send as response
                console.log(customer.invoices);
                res.json(customer.invoices);
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

//export finished node-shopper-routes module
module.exports = router;