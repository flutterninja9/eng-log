import { api } from "../context/AuthContext";

export const sendChatMessage = async (message: string) => {
  const response = await api.post(`/chat`, { message });
  return response.data;
};