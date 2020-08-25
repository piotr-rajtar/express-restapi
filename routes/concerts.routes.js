const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(record => record.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    db.concerts.push({ 
        id: uuidv4(), 
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    });

    res.json({ message: 'ok' });
});

router.route('/concerts/:id').delete((req, res) => {
    const deletedRecord = db.concerts.find(record => record.id == req.params.id);
    const indexOfDeletedRecord = db.concerts.indexOf(deletedRecord);

    db.concerts.splice(indexOfDeletedRecord, 1);

    res.json({ message: 'ok' });
});

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    const editedRecord = db.concerts.find(record => record.id == req.params.id);
    const indexOfEditedRecord = db.concerts.indexOf(editedRecord);

    db.concerts[indexOfEditedRecord] = {
        ...editedRecord,
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    };

    res.json({ message: 'ok' });
});

module.exports = router;