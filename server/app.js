import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import connectMongoDB from './config/db.js';
import User from './models/User.model.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
// --- contenting DB
connectMongoDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// -- create new user
app.post(
  '/api/users',
  asyncHandler(async (req, res) => {
    const { name, email, date, time } = req.body;

    const user = await User.create({
      name,
      email,
      date,
      time,
    });

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).send('Invalid data.');
      throw new Error('Invalid data.');
    }
  })
);

// -- update user
app.post(
  '/api/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(200).send('User updated!');
    } else {
      res.status(404).send('User not found!');
      throw new Error('User not found!');
    }
  })
);

// -- delete user
app.delete(
  '/api/users/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      res.status(200).send('User deleted!');
    } else {
      res.status(404).send('User not found!');
      throw new Error('User not found!');
    }
  })
);

// -- get all users
app.get(
  '/api/users',
  asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).send('Users not found!');
      throw new Error('Users not found!');
    }
  })
);

app.listen(PORT, () => console.log(`Server is runnging on port: ${PORT}`));
