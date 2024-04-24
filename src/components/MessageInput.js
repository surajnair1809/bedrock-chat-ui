// src/components/MessageInput.js
import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage(''); // Clear the input after sending
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="message-input">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                rows="1"
                autoFocus
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageInput;
