import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatbotWidget = () => {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm the Chitranchal travel assistant. Ask me anything about Mukteshwar, trekking routes, temples, or local food.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Something went wrong. Please try again later.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // Send message when Enter key is pressed
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }

  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window */}

      {open && (

        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-accent/30 overflow-hidden flex flex-col">

          {/* Header */}

          <div className="bg-primary px-4 py-3 flex justify-between items-center">

            <div className="flex items-center gap-2">

              <span className="text-xl">🏔️</span>

              <div>

                <p className="font-playfair text-cream font-semibold text-sm">
                  Chitranchal Assistant
                </p>

                <p className="text-cream/70 text-xs">
                  Online
                </p>

              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-cream/70 hover:text-cream text-lg"
            >
              ✕
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-72 bg-cream/30">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >

                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                  ${msg.role === "user"
                      ? "bg-primary text-cream rounded-br-none"
                      : "bg-white text-darkbrown shadow-sm rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {/* Loading Animation */}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">

                  <div className="flex gap-1">

                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-300"></span>

                  </div>

                </div>

              </div>

            )}

            <div ref={bottomRef}></div>

          </div>

          {/* Input Area */}

          <div className="p-3 border-t border-accent/20 flex gap-2 bg-white">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Mukteshwar..."
              className="flex-1 bg-cream rounded-full px-4 py-2 text-sm text-primary placeholder-darkbrown/40 focus:outline-none border border-accent/20 focus:border-accent transition-colors"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-accent text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 disabled:opacity-40"
            >
              →
            </button>

          </div>

        </div>

      )}

      {/* Toggle Button */}

      <button
        onClick={() => setOpen(!open)}
        className="bg-accent hover:bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
      >
        {open ? "✕" : "💬"}
      </button>

    </div>
  );
};

export default ChatbotWidget;