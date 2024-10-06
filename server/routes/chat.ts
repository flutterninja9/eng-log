import express from 'express';
import axios from 'axios';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama2',
      prompt: message,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    res.status(500).json({ message: 'Error processing chat request' });
  }
});

export default router;