import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEntries = async () => {
  const response = await axios.get(`${API_URL}/entries`);
  return response.data;
};

export const createEntry = async (entryData: any) => {
  const response = await axios.post(`${API_URL}/entries`, entryData);
  return response.data;
};

export const updateEntry = async (id: string, entryData: any) => {
  const response = await axios.put(`${API_URL}/entries/${id}`, entryData);
  return response.data;
};

export const deleteEntry = async (id: string) => {
  const response = await axios.delete(`${API_URL}/entries/${id}`);
  return response.data;
};