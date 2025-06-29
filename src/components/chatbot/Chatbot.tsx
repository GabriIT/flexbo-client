// src/components/Chatbot.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatMessage from './ChatMessage';

import { sendPrompt, fetchMessages } from '@/services/chatService';
import { ChatMessage as ChatMessageType, LLMProvider } from '@/types/chat';

type RawMessage = {
  content: string;
  ai: boolean;
};

const POLL_INTERVAL = 2000; // ms

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLLM, setSelectedLLM] = useState<LLMProvider>('llama3.2');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pollTimer, setPollTimer] = useState<number | null>(null);

  // Scroll helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // On mount: load existing thread history or show greeting
  useEffect(() => {
    const tid = localStorage.getItem('chatThreadId');
    if (tid) {
      fetchMessages(tid)
        .then((raw: RawMessage[]) => {
          const mapped = raw.map((m, idx) => ({
            id: idx.toString(),
            content: m.content,
            sender: m.ai ? 'bot' : 'user' as "user" | "bot",
            timestamp: new Date().toISOString(),
          }));
          setMessages(mapped);
        })
        .catch(console.error)
        .finally(scrollToBottom);
    } else {
      // initial greeting
      setTimeout(() => {
        setIsOpen(true);
        const initial: ChatMessageType = {
          id: 'initial',
          content:
            'What can I do for you? You can ask a question 24/7 or select a query from the tabs below.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        setMessages([initial]);
      }, 1500);
    }
  }, []);

  // Always scroll when messages or window open/close
  useEffect(scrollToBottom, [messages, isOpen]);

  // Clear polling on unmount
  useEffect(() => {
    return () => {
      if (pollTimer) {
        clearInterval(pollTimer);
      }
    };
  }, [pollTimer]);

  const handleSendMessage = async (content: string, isSuggestion = false) => {
    if (!content.trim() && !isSuggestion) return;

    // 1️⃣ Add user message locally
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    if (!isSuggestion) setInputValue('');

    // 2️⃣ Dispatch prompt to server
    setIsLoading(true);
    try {
      await sendPrompt(content, selectedLLM);

      const threadId = localStorage.getItem('chatThreadId');
      if (!threadId) throw new Error('No thread ID in localStorage');

      // clear any existing poll
      if (pollTimer) {
        clearInterval(pollTimer);
      }

      // 3️⃣ Poll for the bot reply
      const timer = window.setInterval(async () => {
        try {
          const rawHistory = await fetchMessages(threadId);
          if (rawHistory.length > messages.length) {
            const mapped = rawHistory.map((m, idx) => ({
              id: idx.toString(),
              content: m.content,
              sender: m.ai ? 'bot' : 'user' as "user" | "bot",
              timestamp: new Date().toISOString(),
            }));
            setMessages(mapped);
            setIsLoading(false);
            clearInterval(timer);
            setPollTimer(null);
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, POLL_INTERVAL);

      setPollTimer(timer);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsLoading(false);
    }
  };

  const handleLLMChange = (provider: LLMProvider) => {
    setSelectedLLM(provider);
    const sysMsg: ChatMessageType = {
      id: Date.now().toString(),
      content: `Switched to ${provider} as the AI provider.`,
      sender: 'system',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  const handleTabClick = (query: string) => {
    handleSendMessage(query, true);
  };

  const toggleChatbot = () => {
    setIsOpen(open => !open);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window bg-white animate-fade-in">
          {/* Header */}
          <div className="bg-flexbo-primary text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3 className="font-medium">Flexbo Chat Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLLM}
                onChange={e => handleLLMChange(e.target.value as LLMProvider)}
                className="text-xs bg-transparent border border-white/30 rounded px-1 py-0.5"
              >
                <option value="llama3.2" className="text-black">
                  Llama3.2
                </option>
                <option value="openai" className="text-black">
                  OpenAI
                </option>
                <option value="claude" className="text-black">
                  Claude
                </option>
              </select>
              <button
                onClick={toggleChatbot}
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg max-w-[80%] mt-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Tabs & Input */}
          <Tabs defaultValue="chat" className="border-t">
            <TabsList className="w-full justify-start p-0 h-auto overflow-x-auto bg-gray-50 rounded-none border-b">
              <TabsTrigger value="chat" className="py-1.5 px-3 text-xs data-[state=active]:bg-white">
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="py-1.5 px-3 text-xs data-[state=active]:bg-white"
                onClick={() => handleTabClick('Tell me about your packaging products')}
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="solutions"
                className="py-1.5 px-3 text-xs data-[state=active]:bg-white"
                onClick={() => handleTabClick('What packaging solutions do you offer for different industries?')}
              >
                Solutions
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="py-1.5 px-3 text-xs data-[state=active]:bg-white"
                onClick={() => handleTabClick('What certifications does your company have?')}
              >
                Certifications
              </TabsTrigger>
              <TabsTrigger
                value="quality"
                className="py-1.5 px-3 text-xs data-[state=active]:bg-white"
                onClick={() => handleTabClick('How do you ensure quality in your packaging products?')}
              >
                Quality
              </TabsTrigger>
              <TabsTrigger
                value="service"
                className="py-1.5 px-3 text-xs data-[state=active]:bg-white"
                onClick={() => handleTabClick('What customer service options are available?')}
              >
                Customer Service
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="p-3 pt-2 m-0">
              <form
                className="flex items-center space-x-2"
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
              >
                <Input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </Button>
              </form>
            </TabsContent>

            {/* Empty placeholders for other tabs */}
            <TabsContent value="products" className="p-0 m-0" />
            <TabsContent value="solutions" className="p-0 m-0" />
            <TabsContent value="certifications" className="p-0 m-0" />
            <TabsContent value="quality" className="p-0 m-0" />
            <TabsContent value="service" className="p-0 m-0" />
          </Tabs>
        </div>
      ) : (
        <Button onClick={toggleChatbot} className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
