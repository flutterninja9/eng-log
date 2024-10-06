import axios from 'axios';
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Entry from '../models/Entry.js';

const chatRoutes = express.Router();

chatRoutes.post('/', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    // Retrieve user's entries
    const userEntries = await Entry.find({ user: userId }).sort({ date: -1 }).limit(10);

    // Prepare context from user's entries
    const context = userEntries.map(entry => `
      Date: ${entry.date}
      Title: ${entry.title}
      Category: ${entry.category}
      Content: ${entry.content}
    `).join('\n\n');

    // Prepare the prompt with user context
    const prompt = `
      User Context:
      ${context}

      User Query: ${message}

      Based on the user's history and the current query, please provide a relevant and helpful response:
    `;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2',
      prompt: prompt,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ message: 'Error processing chat request' });
  }
});

export default chatRoutes;