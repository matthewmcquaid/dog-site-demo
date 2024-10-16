import postgresPackage from 'pg'
const { Pool } = postgresPackage;

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

class PostgresPool {
  constructor(config) {
    this.pool = new Pool(config);
  }

  // Query the database with the provided SQL and parameters
  async query(sql, params) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  // Execute a query without returning data (useful for INSERT, UPDATE, DELETE)
  async execute(sql, params) {
    const client = await this.pool.connect();
    try {
      await client.query(sql, params);
      return { success: true };
    } finally {
      client.release();
    }
  }

  // Close the connection pool
  async closePool() {
    await this.pool.end();
  }
};
  
const dbPool = new PostgresPool(dbConfig);

export default dbPool;