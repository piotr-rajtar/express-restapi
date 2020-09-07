const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAllConcerts);

router.route('/concerts/:id').get(ConcertController.getConcertById);

router.route('/concerts').post(ConcertController.addConcert);

router.route('/concerts/:id').put(ConcertController.editConcert);

router.route('/concerts/:id').delete(ConcertController.deleteConcert);

module.exports = router;