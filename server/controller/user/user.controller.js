import User from '../../models/User.model.js';
import asyncHandler from 'express-async-handler';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).send('Users not found!');
    throw new Error('Users not found!');
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.status(200).send('User deleted!');
  } else {
    res.status(404).send('User not found!');
    throw new Error('User not found!');
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body);

  if (user) {
    res.status(200).send('User updated!');
  } else {
    res.status(404).send('User not found!');
    throw new Error('User not found!');
  }
});

export const createUser = asyncHandler(async (req, res) => {
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
});
