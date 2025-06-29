
import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { content, sender, timestamp } = message;
  
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <div className={cn(
      'chat-message mb-3',
      sender === 'user' ? 'message-user' : 'message-bot',
      sender === 'system' && 'text-center'
    )}>
      {sender === 'system' ? (
        <div className="text-xs text-gray-500 my-2 italic">
          {content}
        </div>
      ) : (
        <>
          <div className={cn(
            'message-content',
            sender === 'user' ? 'user-message' : 'bot-message'
          )}>
            {content}
          </div>
          <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
        </>
      )}
    </div>
  );
};

export default ChatMessage;
