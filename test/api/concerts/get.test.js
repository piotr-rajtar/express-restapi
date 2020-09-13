const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    it('/ should return all concerts with correct tickets number', async () => {
        const res = await request(server).get('/api/concerts');

        const concerts = res.body;
        const concert = concerts[0];
        
        const seatsDayOne = await Seat.find({ day: 1 });

        const seatsAvailable = concert.tickets;
        const seatsDayOneCount = seatsDayOne.length;
        const seatsExpected = 50 - seatsDayOneCount;

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(seatsAvailable).to.be.equal(seatsExpected);
    });

    it('/:id should return one concert by id with correct tickets number', async () => {
        const res = await request(server).get('/api/concerts/5f5527386d89cc509478377f');

        const concert = res.body;
        
        const seatsDayOne = await Seat.find({ day: 1 });

        const seatsAvailable = concert.tickets;
        const seatsDayOneCount = seatsDayOne.length;
        const seatsExpected = 50 - seatsDayOneCount;

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(seatsAvailable).to.be.equal(seatsExpected);
    });
});