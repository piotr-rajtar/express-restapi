const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats').get(SeatController.getAllSeats);

router.route('/seats/:id').get(SeatController.getSeatById);

router.route('/seats').post(SeatController.addSeat);

router.route('/seats/:id').put(SeatController.editSeat);

router.route('/seats/:id').delete(SeatController.deleteSeat);

module.exports = router;