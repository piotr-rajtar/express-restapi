const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const Concert = require('../models/concert.model');

router.route('/concerts').get( async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
});

router.route('/concerts/:id').get( async (req, res) => {
    try {
        const singleConcert = await Concert.findById(req.params.id);

        if(singleConcert) res.json(singleConcert);
        else res.status(404).json({ message: 'Not found' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
});

router.route('/concerts').post( async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
});

router.route('/concerts/:id').delete( async (req, res) => {
    try {
        const singleConcert = await Concert.findById(req.params.id);

        if(singleConcert) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } 
        else res.status(404).json({ message: 'Not found' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
});

router.route('/concerts/:id').put( async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

   try {
       const singleConcert = await Concert.findById(req.params.id);

       if(singleConcert) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json({ message: 'OK' });
       }
       else res.status(404).json({ message: 'Not found' }); 
   }
   catch(err) {
       res.status(500).json({ message: err });
   }
});

module.exports = router;