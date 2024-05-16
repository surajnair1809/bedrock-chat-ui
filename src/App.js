import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMessage = { text: text, author: "user" };
    setMessages((messages) => [...messages, userMessage]);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://feem2yrlwauedxurocdm5wy54a0nnprd.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brandname: "Mansung",
            message: text,
            history: messages,
          }),
        }
      );
      const data = await response.json();
      const botResponse = { text: data, author: "bot" };
      console.log("Messages", messages);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to fetch response.", author: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">Pi-InsightMate💡</header>
      <ChatWindow isLoading={isLoading} messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default App;
