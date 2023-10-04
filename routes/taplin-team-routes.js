// Danielle Taplin
// taplin-team-routes.js
// teams routes for capstone project
// 10/3/2023

// Require statements
const express = require('express');
const router = express.Router();
const Teams = require('../models/taplin-team');

// GET all teams - Operation: findAllTeams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Teams.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST assign player to team - Operation: assignPlayerToTeam
router.post('/teams/:id/players', async (req, res) => {
  const teamId = req.params.id;
  try {
    const team = await Teams.findById(teamId);
    if (team) {
      team.players.push({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary
      });
      await team.save();
      res.status(200).json(team);
    } else {
      res.status(401).json({ message: 'Invalid teamId' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all players by team ID - Operation: findAllPlayersByTeamId
router.get('/teams/:id/players', async (req, res) => {
  const teamId = req.params.id;
  try {
    const team = await Teams.findById(teamId);
    if (team) {
      res.status(200).json(team.players);
    } else {
      res.status(401).json({ message: 'Invalid teamId' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE team by ID - Operation: deleteTeamById
router.delete('/teams/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const deletedTeam = await Teams.findByIdAndDelete(teamId);
    if (deletedTeam) {
      res.status(200).json(deletedTeam);
    } else {
      res.status(401).json({ message: 'Invalid teamId' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// export router
module.exports = router;