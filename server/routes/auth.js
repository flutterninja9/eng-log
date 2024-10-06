import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).json({ message: 'Login failed' });
  }
});

authRouter.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default authRouter;