import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
    uuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    roleId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  });

export const User = model('User', usersSchema);