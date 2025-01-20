import { expect } from 'chai';
import sinon from 'sinon';
import dbPool from '../../src/lib/db.js';
import postDogTest from '../../src/routes/postDogs.js';

describe('POST Dog Route', () => {

    let request, response;

    beforeEach(() => {

        console.error = () => {};

        request = {
            body: {
                name: 'Test Dog',
                age: 7,
                breed_id: 1
            }
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

    it('should add the dog and return the result', async () => {

        const mockResult = [{
            id: 4, 
            name: request.body.name, 
            age: request.body.age,
            breed_id: request.body.breed_id
        }]; 
        
        dbPool.query.resolves(mockResult);  

        await postDogTest(request, response);

        expect(dbPool.query.calledOnce).to.be.true;
        expect(dbPool.query.lastCall.args[0]).to.equal('INSERT INTO our_dogs (name, age, breed_id) VALUES ($1, $2, $3) RETURNING *');
        expect(dbPool.query.lastCall.args[1][0]).to.equal(request.body.name);
        expect(dbPool.query.lastCall.args[1][1]).to.equal(request.body.age);
        expect(dbPool.query.lastCall.args[1][2]).to.equal(request.body.breed_id);


        expect(response.json.calledOnce).to.be.true;
        expect(response.json.args[0][0].id).to.equal(mockResult[0].id);
        expect(response.json.args[0][0].name).to.equal(mockResult[0].name);
        expect(response.json.args[0][0].age).to.equal(mockResult[0].age);
       expect(response.json.args[0][0].breed_id).to.equal(mockResult[0].breed_id);
    });

    it('should return a 500 status code when there is a database error', async () => {
        const dbError = new Error('Database Error'); 
        dbPool.query.rejects(dbError);
        await postDogTest(request, response);

        expect(response.status.calledOnceWith(500)).to.be.true;
        expect(response.send.calledOnceWith('Error inserting data')).to.be.true;
    
    });
});