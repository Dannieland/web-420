// Danielle Taplin
// teams.js
// team script for capstone project
// 10/3/2023

const db = db.getSiblingDB('web420DB');

// Drop the existing 'teams' collection if it exists
db.teams.drop();

// Initialize a team with players
const team1 = {
    name: 'Chicago Bears',
    mascot: 'Bear',
    players: [
        {
            firstName: 'Justin',
            lastName: 'Fields',
            salary: 18871952
        },
        {
            firstName: 'Nathan',
            lastName: 'Peterman',
            salary: 990000
        },
        {
            firstName: 'Tyson',
            lastName: 'Bagent',
            salary: 906667
        },
        {
            firstName: 'DJ',
            lastName: 'Moore',
            salary: 11171316
        }
    ]
};

const team2 = {
    name: 'Cincinnati Bengals',
    mascot: 'Bengal',
    players: [
        {
            firstName: 'Joe',
            lastName: 'Burrow',
            salary: 998432
        },
        {
            firstName: 'Drew',
            lastName: 'Sample',
            salary: 4152115
        },
        {
            firstName: 'Dexton',
            lastName: 'Hill',
            salary: 1241414
        },
        {
            firstName: 'Jake',
            lastName: 'Browning',
            salary: 14151123
        }
    ]
};

const team3 = {
    name: 'Denver Broncos',
    mascot: 'Bronco',
    players: [
        {
            firstName: 'Russell Wilson',
            lastName: 'Allen',
            salary: 5242425
        },
        {
            firstName: 'Jerry',
            lastName: 'Jeudy',
            salary: 6262624
        },
        {
            firstName: 'Jaleel',
            lastName: 'McLaughlin',
            salary: 15622100
        },
        {
            firstName: 'Frank',
            lastName: 'Clark',
            salary: 143267770
        }
    ]
};

// Insert the team into the 'teams' collection
db.teams.insertOne(team1);
db.teams.insertOne(team2);
db.teams.insertOne(team3);

// Log success message
print('Database initialized with starting data.');