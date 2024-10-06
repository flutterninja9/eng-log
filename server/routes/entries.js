import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Entry from '../models/Entry.js';

const entryRoutes = express.Router();

entryRoutes.get('/', authenticateToken, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user?.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

entryRoutes.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const entry = new Entry({ user: req.user?.userId, title, content, category });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(400).json({ message: 'Error creating entry' });
  }
});

entryRoutes.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.userId },
      { title, content, category },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(400).json({ message: 'Error updating entry' });
  }
});

entryRoutes.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user?.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Error deleting entry' });
  }
});

export default entryRoutes;
