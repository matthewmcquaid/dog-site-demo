import { expect } from 'chai';
import sinon from 'sinon';
import dbPool from '../../src/lib/db.js';
import deleteDogTest from '../../src/routes/deleteDog.js';

describe('DELETE Dog Route', () => {

    let request, response, dbPoolMock;

    beforeEach(() => {

        console.error = () => {};
        request = {
            params: { id: '123' }
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

    it('should delete the dog and return the result when a valid dogId is provided', async () => {

        const mockResult = { rowCount: 1 }; 
        dbPool.query.resolves(mockResult);  

        await deleteDogTest(request, response);

        expect(dbPool.query.calledOnce).to.be.true;
        expect(dbPool.query.calledWith('DELETE FROM our_dogs WHERE id = 123')).to.be.true;

        expect(response.json.calledOnce).to.be.true;
        expect(response.json.calledWith(mockResult)).to.be.true;
    });

    it('should return a 500 status code when there is a database error', async () => {

        dbPool.query.rejects(new Error('Database Error'));

        await deleteDogTest(request, response);

        expect(response.status.calledOnceWith(500)).to.be.true;
        expect(response.send.calledOnceWith('Error fetching data')).to.be.true;


    });

    it('should return a 400 status code when no dogId is provided', async () => {
        request.params = {};

        await deleteDogTest(request, response);

        expect(response.status.calledOnceWith(400)).to.be.true;
        expect(response.send.calledOnceWith('Bad Request')).to.be.true;
    });
});