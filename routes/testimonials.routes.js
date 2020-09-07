const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');


router.route('/testimonials').get(TestimonialController.getAllTestimonials);

router.route('/testimonials/random').get(TestimonialController.getRandomTestimonial);

router.route('/testimonials/:id').get(TestimonialController.getTestimonialById);

router.route('/testimonials').post(TestimonialController.addTestimonial);

router.route('/testimonials/:id').put(TestimonialController.editTestimonial);

router.route('/testimonials/:id').delete(TestimonialController.deleteTestimonial);

module.exports = router;