// Danielle Taplin
// taplin-team-routes.js
// teams routes for capstone project
// 10/3/2023

// Declare Variables
const express = require('express');
const router = express.Router();
const Team = require('../models/taplin-team');

// Route to find all teams
router.get('/teams', async (req, res) => {
    try{
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Route to post player to team
router.post('/teams/:id/players', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, salary } = req.body;

    try {
        const team = await Team.findById(id);

        if (!team) {
            return res.status(401).json({ message: 'Invalid teamId' });
        }

        const newPlayer = { firstName, lastName, salary };
        team.players.push(newPlayer);

        const savedTeam = await team.save();
        res.status(200).json(savedTeam.players[savedTeam.players.length - 1]);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Route to find all Players on Team
router.get('/teams/:id/players', async (req, res) => {
    const { id } = req.params;

    try {
        const team = await Team.findById(id);

        if (!team) {
            return res.status(401).json({ message: 'Invalid teamId' });
        }

        res.status(200).json(team.players);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Route to delete a team
router.delete('/teams/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteTeam = await Team.findByIdAndRemove(id);

        if (!deleteTeam) {
            return res.status(401).json({ message: 'Invalid teamId' });
        }

        res.status(200).json(deleteTeam);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

module.exports = router;