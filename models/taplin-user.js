/*
taplin-user.js
Danielle Taplin
9/16/23
week 6 nodesecurity
*/

//declare variables requiring mongoose and create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare new user schema with username, password, and email address
let userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    emailAddress: { type: Array }
});

//export user model
module.exports = mongoose.model('User', userSchema);