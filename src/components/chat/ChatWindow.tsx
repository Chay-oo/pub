import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  questionCount: number;
  maxQuestions: number;
}

export default function ChatWindow({ 
  onClose, 
  onSendMessage, 
  messages,
  questionCount,
  maxQuestions 
}: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await onSendMessage(message);
      setMessage('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50">
      <div className="flex justify-between items-center p-4 border-b bg-indigo-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Financial Expert Chat</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.role === 'user' 
                ? 'ml-auto bg-indigo-600 text-white' 
                : 'mr-auto bg-gray-100 text-gray-800'
            } max-w-[80%] rounded-lg p-3 shadow-sm break-words whitespace-pre-wrap`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50">
        {questionCount < maxQuestions ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[40px] max-h-[100px] overflow-y-auto"
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              className={`bg-indigo-600 text-white p-2 rounded-lg flex-shrink-0 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Thank you for chatting! You've reached the maximum number of questions.
            </p>
            <p className="text-sm text-indigo-600">
              Submit your details again to continue the conversation.
            </p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2 text-center">
          {questionCount} of {maxQuestions} questions used
        </p>
      </div>
    </div>
  );
}