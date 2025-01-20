'use strict'

import dbPool from './../lib/db.js'

export default async (request, response) => {

    try {
        const result = await dbPool.query('SELECT * FROM breeds');
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send('Error fetching data');
    }
}