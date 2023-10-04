// Danielle Taplin
// taplin-team.js
// team model for Capstone Project
// 10/3/2023

// require mongoose and create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create player schema
const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    salary: Number,

});

// create team schema
const teamSchema = new Schema({
    name: String,
    mascot: String,
    players: [playerSchema],
});

// create model and export it
const Teams = mongoose.model('Teams', teamSchema);
module.exports = Teams;