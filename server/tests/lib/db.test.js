import { expect } from 'chai';
import sinon from 'sinon';
import postgresPackage from 'pg';
import dbPool from '../../src/lib/db.js';

const { Pool } = postgresPackage;
describe('PostgresPool', () => {
    let poolStub, clientStub;
  
    beforeEach(() => {
  
      clientStub = {
        query: sinon.stub(),
        release: sinon.stub(),
      };
      poolStub = sinon.stub(Pool.prototype, 'connect').resolves(clientStub);
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    describe('query()', () => {
      it('should execute a SQL query and return the result rows', async () => {

        const mockRows = [{ id: 1, name: 'John Doe' }];
        clientStub.query.resolves({ rows: mockRows });
  
        const result = await dbPool.query('SELECT * FROM users WHERE id = $1', [1]);
  
        expect(clientStub.query.calledOnce).to.be.true;
        expect(clientStub.query.firstCall.args).to.deep.equal(['SELECT * FROM users WHERE id = $1', [1]]);
        expect(result).to.deep.equal(mockRows);
      });
  
      it('should release the client after the query', async () => {

        clientStub.query.resolves({ rows: [] });
  
        await dbPool.query('SELECT * FROM users', []);
  
        expect(clientStub.release.calledOnce).to.be.true;
      });
    });
  
    describe('execute()', () => {
      it('should execute a SQL command and return success', async () => {

        clientStub.query.resolves();
  
        const result = await dbPool.execute('INSERT INTO users (name) VALUES ($1)', ['Jane Doe']);
  
        expect(clientStub.query.calledOnce).to.be.true;
        expect(clientStub.query.firstCall.args).to.deep.equal(['INSERT INTO users (name) VALUES ($1)', ['Jane Doe']]);
        expect(result).to.deep.equal({ success: true });
      });
  
      it('should release the client after the execution', async () => {
        clientStub.query.resolves();
  
        await dbPool.execute('DELETE FROM users WHERE id = $1', [1]);
  
        expect(clientStub.release.calledOnce).to.be.true;
      });

    });
  
    describe('closePool()', () => {
      it('should close the pool connection', async () => {
        const endStub = sinon.stub(Pool.prototype, 'end').resolves();
  
        await dbPool.closePool();
  
        expect(endStub.calledOnce).to.be.true;
      });

    });
    
  });