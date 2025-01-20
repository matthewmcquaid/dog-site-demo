import { expect } from 'chai';
import sinon from 'sinon';
import dbPool from '../../src/lib/db.js';
import getBreeds from '../../src/routes/getBreeds.js';

describe("GET Breeds Route", () => {

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

    it('should GET all breeds and return the result', async () => {
        
        const mockResult = [];
        dbPool.query.resolves(mockResult);

        await getBreeds(request, response);

        expect(dbPool.query.calledOnce).to.be.true;
        expect(dbPool.query.calledWith('SELECT * FROM breeds')).to.be.true;

        expect(response.json.calledOnce).to.be.true;
        expect(response.json.calledWith(mockResult)).to.be.true;
    });

    it('should return a 500 status code when there is a database error', async () => {

        dbPool.query.rejects(new Error('Database Error'));

        await getBreeds(request, response);

        expect(response.status.calledOnceWith(500)).to.be.true;
        expect(response.send.calledOnceWith('Error fetching data')).to.be.true;
    });

});
