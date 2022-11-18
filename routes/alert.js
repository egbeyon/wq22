const express = require('express');
const auth = require('../middlewares/auth');
const Alert = require('../models/alert');

const router = new express.Router();

// Create an alert
router.post('/alert', async (req, res) => {
  const alert = new Alert(req.body);
  try {
    await alert.save();
    res.status(201).send(alert);
  } catch (e) {
    res.status(400).send(e);
  }
}); 

// Get all alerts
router.get('/alert', auth.simple, async (req, res) => {
  try {
    const alert = await Alert.find({});
    res.send(alert);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get movie by id
router.get('/alert/:id', auth.simple, async (req, res) => {
  const _id = req.params.id;

  try {
    const alert = await Alert.findById(_id);
    if (!alert) return res.sendStatus(404);
    return res.send(alert);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
