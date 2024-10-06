/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../context/AuthContext';

export const fetchEntries = async () => {
  const response = await api.get(`/entries`);
  return response.data;
};

export const createEntry = async (entryData: any) => {
  const response = await api.post(`/entries`, entryData);
  return response.data;
};

export const updateEntry = async (id: string, entryData: any) => {
  const response = await api.put(`/entries/${id}`, entryData);
  return response.data;
};

export const deleteEntry = async (id: string) => {
  const response = await api.delete(`/entries/${id}`);
  return response.data;
};