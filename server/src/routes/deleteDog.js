
'use strict';

import dbPool from './../lib/db.js'

export default async (request, response) => {

    const dogId = request.params && request.params.id

    if (dogId) {
        try {
            const result = await dbPool.query(`DELETE FROM our_dogs WHERE id = ${dogId}`);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error fetching data');
        }
    } else  {
        console.error('error: No Dog ID');
        response.status(400).send('Bad Request');
    }
   
};