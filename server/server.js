import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import entryRoutes from './routes/entries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: '*', // Allows requests from any origin
  }
));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRouter);
app.use('/api/entries', entryRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});