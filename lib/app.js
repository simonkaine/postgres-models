import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import character from './controllers/character.js';
import location from './controllers/location.js';
import episode from './controllers/episode.js';
import qoutes from './controllers/qoutes.js';
import ghibli from './controllers/ghibli.js';


const app = express();

app.use(express.json());

// path and middleware
app.use('/api/character', character);
app.use('/api/location', location);
app.use('/api/episode', episode);
app.use('/api/qoutes', qoutes);
app.use('/films', ghibli);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
