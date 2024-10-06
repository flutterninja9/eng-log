import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendChatMessage } from '../api/chat';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await sendChatMessage(input);
      const aiResponse = { text: response.reply, sender: 'ai' as const };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = { text: "Sorry, I couldn't process your request. Please try again.", sender: 'ai' as const };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Chat Assistant</h1>
      <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-grow mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;