// src/services/chatService.ts
import { LLMProvider, ChatMessage as ChatMessageType, ChatResponse } from '@/types/chat';
import { toast } from 'sonner';

const API_BASE_URL = '/api';

type RawMessage = {
  content: string;
  ai: boolean;
};


export const createThread = async (): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/thread/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name: 'Flexbo_temp' }),
  });
  if (!res.ok) throw new Error('Failed to create thread');
  const data = await res.json();
  return data.threadId;
};

export const sendPrompt = async (
  message: string,
  llmProvider: LLMProvider
): Promise<{ threadId: string; promptId: string }> => {
  try {
    let threadId = localStorage.getItem('chatThreadId');
    if (!threadId) {
      threadId = await createThread();
      localStorage.setItem('chatThreadId', threadId);
    }
    const res = await fetch(`${API_BASE_URL}/thread/${threadId}/prompt/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      // body: JSON.stringify({ message, model: llmProvider }),
      body: JSON.stringify({
        content: message,
        model: llmProvider
      }),
    });
    if (!res.ok) throw new Error('Failed to send prompt');
    const data = await res.json();
    return { threadId: data.threadId, promptId: data.promptId };
  } catch (err) {
    console.error(err);
    toast.error('Failed to send message. Please try again.');
    throw err;
  }
};




export const fetchMessages = async (threadId: string): Promise<RawMessage[]> => {
  const res = await fetch(`${API_BASE_URL}/thread/${threadId}/prompt/messages`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',

     });
  if (!res.ok) throw new Error('Failed to fetch messages');
  const data = await res.json();
  // assume data.messages is an array of { id, content, sender, timestamp }
  return data.messages;
};
