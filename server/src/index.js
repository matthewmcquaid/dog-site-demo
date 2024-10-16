import express from 'express'
import 'dotenv/config'

import bodyParser from 'body-parser';
import cors from 'cors';


import getDogs from './routes/getDogs.js';
import postDogs from './routes/postDogs.js';
import deleteDog from './routes/deleteDog.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ROUTES
app.get('/api/data', getDogs);
app.post('/api/data', postDogs);
app.delete('/api/data/:id', deleteDog);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});