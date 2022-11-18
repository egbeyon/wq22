const express = require('express')
const router = new express.Router()
const passport = require("passport");
const auth = require('../middlewares/auth')
const Entry = require('../models/entry')
const User = require('../models/user')
const Team = require('../models/teams')
// sendgrid for email npm i @sendgrid/mail
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');

// create data entry
router.post('/entry', auth.simple,
 async (req, res) => {
    // adminn should not submit field data; 
    // ***** UNCOMMENT BEFORE DEPLOYMENT ****
    // if (req.user.role !== 'guest')
    // return res.status(401).send({
    //   message: 'Only the staff on the field can create an entry'
    // });
    const entry = new Entry(req.body)
   
    try {
       
        await entry.save();
        res.status(201).send(entry);
    } catch (e) {
        res.status(400).send(e)
    }

    // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        // const emailData = {
        //     to: 'kaloraat@gmail.com',
        //     from: 'noreply@ecommerce.com',
        //     subject: `A new order is received`,
        //     html: `
        //     <p>Customer name:</p>
        //     <p>Total products: ${order.products.length}</p>
        //     <p>Total cost: ${order.amount}</p>
        //     <p>Login to dashboard to the order in detail.</p>
        // `
        // };
        // sgMail.send(emailData);
        // res.json(data);
});

// get all data entries
router.get('/entry/all', auth.simple, async (req, res) => {
    try {
        const entry = await Entry.find({})
        res.send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
});


// get all data entry for teams
router.get('/entry', auth.simple, async (req, res) => {
    try {
        const entry = await Entry.find({})
        res.send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
});

// get entry by specific team
router.get('/entry/:teamId', auth.simple, async (req, res) => {
        
        //let myTeamData = [];
        try {
            const {id} = req.params;
            const team = await Team.findById(id)
            
            // entry.map(data => {
            //     if (data.teamId === team) {
            //         myTeamData.push(data)
                    
            //     }
            // })
            // console.log(team)
            res.send(team)
        } catch (e) {
            return res.status(400).send(e)
        }
})

// get data entries by search
router.get('entry/search', auth.simple, async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const location = new RegExp(searchQuery, "i");

        const entry = await Entry.find({ $or: [ { location }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: entry });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
})


//update entry by id
router.patch('/entry/:id', auth.enhance, async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body)
    const allowedUpdates = [ 
        'latitude', 'longitude', 'location',
        'color', 'temperature', 'pH', 'conductivity',
        'chlorine', 'sulphate', 'microbe', 'remark',
    ];
    const isValidOperation = update.every((updated) => allowedUpdates.includes(updated));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' }); 
    try {
      const entry = await Entry.findById(_id)
      update.forEach((update) => (entry[update] = req.body[update]));
      await entry.save();
      if (!entry) return res.sendStatus(404);
      return res.send(entry);      
    } catch (e) {
      return res.status(400).send(e);
    }
});

// commenting on each data entry
// router.post('/:id/comment'async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const post = await PostMessage.findById(id);

//     post.comments.push(value);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.json(updatedPost);
// };)

//deleting data entry
router.delete('/entry/:id', auth.enhance, async (req, res) => {
    const _id = req.params.id;
    try {
        const entry = await Entry.findByIdAndDelete(_id);
        return !entry ? res.sendStatus(404) : res.send(entry);
    } catch (e) {
        return res.sendStatus(400);
    }
});

module.exports = router