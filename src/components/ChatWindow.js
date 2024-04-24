import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useState } from 'react';

const ChatWindow = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMarkdownText = (text) => {
    const rawMarkup = marked(text);
    const safeHTML = DOMPurify.sanitize(rawMarkup);
    return { __html: safeHTML };
  };

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.author}`}
          dangerouslySetInnerHTML={getMarkdownText(msg.text)}
        ></div>
      ))}
      { isLoading && <div className="loading-spinner">💬</div>}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
