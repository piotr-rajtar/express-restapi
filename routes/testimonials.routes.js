const express = require('express');
const router = express.Router();
const db = require('../db');
const uniqueRandomArray = require('unique-random-array');
const { v4: uuidv4 } = require('uuid');

const random = uniqueRandomArray(db.testimonials);

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.json(random());
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(record => record.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;

    db.testimonials.push({ 
        id: uuidv4(), 
        author: author, 
        text: text,
    });

    res.json({ message: 'ok' });
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;

    const editedRecord = db.testimonials.find(record => record.id == req.params.id);
    const indexOfEditedRecord = db.testimonials.indexOf(editedRecord);

    db.testimonials[indexOfEditedRecord] = {
        ...editedRecord,
        author: author,
        text: text,
    };

    res.json({ message: 'ok' });
});

router.route('/testimonials/:id').delete((req, res) => {
    const deletedRecord = db.testimonials.find(record => record.id == req.params.id);
    const indexOfDeletedRecord = db.testimonials.indexOf(deletedRecord);

    db.testimonials.splice(indexOfDeletedRecord, 1);

    res.json({ message: 'ok' });
});

module.exports = router;