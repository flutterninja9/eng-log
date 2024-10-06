import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const sendChatMessage = async (message: string) => {
  const response = await axios.post(`${API_URL}/chat`, { message });
  return response.data;
};