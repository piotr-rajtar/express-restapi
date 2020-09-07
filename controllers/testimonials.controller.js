const Testimonial = require('../models/testimonial.model');

exports.getAllTestimonials = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandomTestimonial = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const singleTestimonial = await Testimonial.findOne().skip(rand);

    if(singleTestimonial) res.json(singleTestimonial);
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getTestimonialById = async (req, res) => {
  try {
    const singleTestimonial = await Testimonial.findById(req.params.id);

    if(singleTestimonial) res.json(singleTestimonial);
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.editTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const singleTestimonial = await Testimonial.findById(req.params.id);

    if(singleTestimonial) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteTestimonial = async (req, res) => {
  try {
    const singleTestimonial = await Testimonial.findById(req.params.id);

    if(singleTestimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
