import { Schema } from 'mongoose';
import getModel from './getModel';

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
});

export const Users = getModel('User', userSchema);
