const express = require('express');
const passport = require("passport");
const Team = require('../models/teams');
const Entry = require('../models/entry');
const auth = require('../middlewares/auth');
const User = require('../models/user');

const router = new express.Router();


// @desc Get all teams for a specific user
// @access Private
router.get('/myteams/', auth.simple, async (req, res) => {
      // const _id = req.user.id
      // const checkUser = await User.findById(_id)

    // Member projects
    let teamObj;
    await Team.find({})
      .then(teams => {
        teams.map(team => {
          team.members &&
            team.members.map(member => {
              if (member.email === req.user.email) {
                teamObj = team
              }
            });
        });
		res.json(teamObj);
      }) 
      .catch(err => console.log(err));
    })


// Create teams
router.post('/teams/create', auth.enhance, async (req, res) => {
    const team = await new Team(
      {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      members: req.body.members
    }
    );
    try {
      await team.save();
      res.status(201).send(team);
    } catch (e) {
      res.status(400).send(e);
    }
  });


//get entry by specific team
// router.get('/team/entry/:teamId', auth.simple, async (req, res) => {
  
//       try {
//         const _id = req.params.teamId
//         console.log(_id)
//         const checkTeam = await Team.findById(_id)
//         const entry = await Entry.find({teamId: _id})
//         res.send(entry);
//       } catch (e) {
//         res.status(400).send(e);
//       }
// })


// Get all teams
router.get('/teams/all', auth.simple,
	//passport.authenticate("jwt", { session: false }),
 async (req, res) => {
    try {
      const teams = await Team.find({});
	  //console.log(req.user.email)
      res.send(teams);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  // Get team by id
  router.get('/team/:id', auth.simple, async (req, res) => {
    const _id = req.params.id;
    let myTeamData = [];
    
    try {
      const team = await Team.findById(_id);
          const entry = await Entry.find({ teamId: _id})
            entry.map(data => {
              console.log(_id)
                if (data.teamId === team._id) {
                  console.log(data.teamId)
                    myTeamData.push(data)    
                }
            })
            if (!myTeamData.length) return res.sendStatus(404);
            res.json(myTeamData)
          

      if (!entry) return res.sendStatus(404);
      return res.send(entry);
    } catch (e) {
      return res.status(400).send(e);
    }
  });


  router.patch('/teams/:id', auth.enhance, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'members'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

    try {
      const team = await Team.findById(_id);
      updates.forEach((update) => (team[update] = req.body[update]));
      await team.save();
      if (!team) return res.sendStatus(404);
      return res.send(team);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  // Delete team by id
router.delete('/teams/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const team = await Team.findByIdAndDelete(_id);
    return !team ? res.sendStatus(404) : res.send(team);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router
  

  