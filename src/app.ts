import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { userRouter } from './routers/user.router.js';
import { errorHandler } from './middleware/error.js';

const debug = createDebug('W7:App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Social network...');
});

// App.use('/sample', sampleRouter);

app.use('/user', userRouter);
app.use(errorHandler);
