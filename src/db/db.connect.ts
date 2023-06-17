import mongoose from 'mongoose';
import { db, passwd, user } from '../config.js';

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${passwd}@cluster0.pzctaqf.mongodb.net/${db}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
