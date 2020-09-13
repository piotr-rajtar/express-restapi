const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const ticketsDayOneSold = await Seat.find({ day: 1 });
    const ticketsDayTwoSold = await Seat.find({ day: 2 });
    const ticketsDayThreeSold = await Seat.find({ day: 3 });

    const availableSeats = 50;

    const dayOneTicketsAvailable = availableSeats - ticketsDayOneSold.length;
    const dayTwoTicketsAvailable = availableSeats - ticketsDayTwoSold.length;
    const dayThreeTicketsAvailable = availableSeats - ticketsDayThreeSold.length;

    for(let concert of concerts) {
      switch(concert.day) {
        case 1:
          concert.tickets = dayOneTicketsAvailable;
          break;
        case 2:
          concert.tickets = dayTwoTicketsAvailable;
          break;
        case 3:
          concert.tickets = dayThreeTicketsAvailable;
          break;    
      }
    }

    res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertById = async (req, res) => {
  try {
    const singleConcert = await Concert.findById(req.params.id);
    const seatsTaken = await Seat.find({ day: singleConcert.day });

    const allSeats = 50;
    const availableSeats = allSeats - seatsTaken.length;

    singleConcert.tickets = availableSeats;
    

    if(singleConcert) res.json(singleConcert);
    else res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.editConcert = async (req, res) => {
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
}

exports.deleteConcert = async (req, res) => {
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
}