const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(record => record.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;

    db.seats.push({
        id: uuidv4(),
        day: day,
        seat: seat,
        client: client,
        email: email,
    });

    res.json({ message: 'ok' });
});

router.route('/seats/:id').delete((req, res) => {
    const deletedRecord = db.seats.find(record => record.id == req.params.id);
    const indexOfDeletedRecord = db.seats.indexOf(deletedRecord);

    db.seats.splice(indexOfDeletedRecord, 1);

    res.json({ message: 'ok' });
});

router.route('/seats/:id').put((req, res) => {
    const {day, seat, client, email } = req.body;

    const editedRecord = db.seats.find(record => record.id == req.params.id);
    const indexOfEditedRecord = db.seats.indexOf(editedRecord);

    db.seats[indexOfEditedRecord] = {
        ...editedRecord,
        day: day,
        seat: seat,
        client: client,
        email: email,
    };

    res.json({ message: 'ok' });
});

module.exports = router;