// Danielle Taplin
// taplin-team.js
// team model for Capstone Project
// 10/3/2023

// Declare variables 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Player schema
const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    salary: Number,
});

// Team schema
const teamSchema = new Schema({
    name: String,
    mascot: String,
    players: [playerSchema],
});

// Team model
const Team = mongoose.model('Team', teamSchema);

// Export
module.exports = Team;