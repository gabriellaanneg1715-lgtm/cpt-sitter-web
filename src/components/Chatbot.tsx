import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "Meow! I'm Chip, Gabby's cat. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    // Initialize chat session once
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are Chip, Gabby's cat. You act as a helpful assistant for 'Cape Town Sitter', a pet sitting and house sitting business run by your owner, Gabby, in Cape Town. You answer general queries about pet sitting, house sitting, dog walking, and the services provided. Be friendly, playful, and use cat-like phrases (like meow or purr) often! Keep responses concise. If someone asks for contact info, provide it underneath your message as a list. IMPORTANT: Do NOT use markdown formatting like asterisks (*). Use plain text. Format the contact details exactly like this on separate lines:\n- Phone: 066 186 3886\n- Email: gabby@capetownsitter.co.za",
        },
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session not initialized");
      }

      // Send the message using the existing chat session
      const response = await chatRef.current.sendMessage({ message: userText });
      
      const newModelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: response.text || "I'm sorry, I couldn't process that request.",
      };
      
      setMessages((prev) => [...prev, newModelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact Gabby directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-accent text-bg rounded-full shadow-lg hover:scale-105 transition-transform z-40 ${
          isOpen ? "hidden" : "flex"
        }`}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent text-bg p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={20} />
                <span className="font-semibold">Chat with Chip 🐾</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-bg/20 p-1 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-ink text-bg rounded-tr-sm"
                        : "bg-surface border border-border text-ink rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border text-ink p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-accent" />
                    <span className="text-sm text-muted">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-surface border-t border-border flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-bg border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-accent transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-accent text-bg p-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
