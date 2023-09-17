/*
taplin-session-routes.js
Danielle Taplin
9/16/23
API routing
Attribution: could not understand code fully did have to look around for examples/help and try different things other users tried and had success with
*/


//require express, User model, bcrypt and declare router variable and saltrounds
const express = require('express');
const router = express.Router();
const User = require('../models/taplin-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     summary: Register user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - password
 *               - emailAddress
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *     responses:
 *       '200':
 *         description: User added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */


router.post('/signup', async(req, res) => {
    try {
       
        //create promise checking if username taken
        const usernamePromise = new Promise((resolve, reject) => {
            //query database to determine if the request body username is present
            User.findOne({'username': req.body.username}, function(err, user) {
              //error occurs then reject the promise
              if (err){
                reject(err)
              };

              //username is already in use
              if (Boolean(user)) {
                
                resolve(true)
              } else {
                //if username is not already in use, return false
                resolve(false);
              }
            });
        })
        
        //assign result of promise to a variable
        let existingUser = await usernamePromise;

        //if new username is not already in use
        if (!existingUser) {
            //create hashed password variable using brcypt and request body
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

            //Create new registered user using the hashed password and request body
            const newRegisteredUser = {
                username: req.body.username,
                password: hashedPassword,
                emailAddress: req.body.emailAddress
            } 

            //wait for response
            await User.create(newRegisteredUser, function(err, user) {
                //if mongodb encounters an error during response
                if (err) {
                    //output mongodb error message to console and response
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                } else {
                    //if response passes, output new user info and send new JSON response
                    console.log(user);
                    res.json(user);
                }
            })
        } else {
            //if username already in use, response error message
            console.log('Username is already in use');
            res.status(401).send({
                'message': `Username is already in use`
            })
        }
    } catch (e) {
        //if server finds error, response error message
        console.log(e);
        res.status(500).send({
            'message': `Server Excpetion: ${e.message}`
        })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login user
 *     summary: Logs the user in
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        //query database for user with the 'username' in request body
        User.findOne({'username': req.body.username}, function(err, user) {
            //if mongodb finds an error, response error message
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                //check validity
                if (user) {
                    //check if request body password is valid; save the boolean result
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    //if valid
                    if (passwordIsValid) {
                        //push message that user is logged in and send response
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        //if invalid password, response error message
                        console.log('Invalid username and/or password');
                        res.status(401).send({
                            'message': `Invalid username and/or password`
                        })
                    }
                } else {
                    //if username is invalid, response error message
                    console.log('Invalid username and/or password');
                    res.status(401).send({
                        'message': `Invalid username and/or password`
                    })
                }
            }
        })
    } catch (e) {
        //if server encounters any errors, response error message
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

//set module export to the router 
module.exports = router;