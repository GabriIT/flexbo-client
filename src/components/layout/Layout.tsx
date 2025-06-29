
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
  showChatbot?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showChatbot = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {showChatbot && <Chatbot />}
    </div>
  );
};

export default Layout;
