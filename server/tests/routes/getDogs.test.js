import { expect } from 'chai';
import sinon from 'sinon';
import dbPool from '../../src/lib/db.js';
import getDogTest from '../../src/routes/getDogs.js';

describe('GET Dog Route', () => {

    let request, response, dbPoolMock;

    beforeEach(() => {

        console.error = () => {};

        request = {
            params: {}
        };

        response = {
            json: sinon.spy(),          
            status: sinon.stub().returnsThis(),
            send: sinon.spy(), 
        };

        sinon.stub(dbPool, 'query');

    });

    afterEach(() => {
        sinon.restore(); 
    });

    it('should GET all dog and return the result', async () => {

        const mockResult = []; 
        dbPool.query.resolves(mockResult);  

        await getDogTest(request, response);

        expect(dbPool.query.calledOnce).to.be.true;
        expect(dbPool.query.calledWith('SELECT * FROM our_dogs')).to.be.true;

        expect(response.json.calledOnce).to.be.true;
        expect(response.json.calledWith(mockResult)).to.be.true;
    });

    it('should return a 500 status code when there is a database error', async () => {

        dbPool.query.rejects(new Error('Database Error'));

        await getDogTest(request, response);

        expect(response.status.calledOnceWith(500)).to.be.true;
        expect(response.send.calledOnceWith('Error fetching data')).to.be.true;
    });

});