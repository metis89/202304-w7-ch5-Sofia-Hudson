import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';

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
