import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './config/db.js';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from './controller/user/user.controller.js';

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
app.post('/api/users', createUser);

// -- update user
app.put('/api/users/:id', updateUser);

// -- delete user
app.delete('/api/users/:id', deleteUser);

// -- get all users
app.get('/api/users', getUsers);

app.listen(PORT, () => console.log(`Server is runnging on port: ${PORT}`));
