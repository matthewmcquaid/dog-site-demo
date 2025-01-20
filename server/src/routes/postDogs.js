'use strict';

import dbPool from './../lib/db.js'

export default async (request, response) => {

    const { name, age, breed_id } = request.body;

    try {
        const result = await dbPool.query(
          'INSERT INTO our_dogs (name, age, breed_id) VALUES ($1, $2, $3) RETURNING *',
          [name, age, breed_id]
        );
        response.json(result[0]);
      } catch (error) {
        console.error(error);
        response.status(500).send('Error inserting data');
      }
};