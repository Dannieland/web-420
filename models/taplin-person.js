/*
taplin-person.js
Danielle Taplin
9/10/23
mongoose model 
*/

//declare variables to require mongoose and to create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare new role schema with text field
let roleSchema = new Schema({
    text: { type: String }
});

//declare dependent schema with fields for first and last name
let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

//declare person scheme with first and last name fields, roles, dependents, and birth date
let PersonSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
});


//export final person model
module.exports = mongoose.model('Person', PersonSchema);