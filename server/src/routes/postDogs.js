'use strict';

import dbPool from './../lib/db.js'

export default async (request, response) => {

    const { name, age } = request.body;

    try {
        const result = await dbPool.query(
          'INSERT INTO our_dogs (name, age) VALUES ($1, $2) RETURNING *',
          [name, age]
        );
        response.json(result[0]);
      } catch (error) {
        console.error(error);
        response.status(500).send('Error inserting data');
      }
};