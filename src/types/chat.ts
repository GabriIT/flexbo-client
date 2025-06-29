
export type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: string;
};

export type LLMProvider = 'llama3.2' | 'openai' | 'claude';

export interface ChatResponse {
  content: string;
  threadId?: string;
  promptId?: string;
  error?: string;
}
