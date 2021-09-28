import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import character from './controllers/character.js';

const app = express();

app.use(express.json());

// path and middleware
app.use('/api/character', character);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
