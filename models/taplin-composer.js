/*
taplin-composer.js
Danielle Taplin
9/1/2023
composer.js for composer api
 */


//declare variables to require mongoose&create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare new composer schema with first and last name
let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

//export composer model
module.exports = mongoose.model('Composer', composerSchema);