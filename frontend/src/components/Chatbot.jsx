import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMessage, AiOutlineClose } from 'react-icons/ai';
import ChatMessage from './ChatMessage';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your food assistant. How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const botResponses = {
    'delivery time': 'Our delivery service is available from 10 AM to 11 PM daily.',
    'track order': 'Please share your order ID, I can help you track it!',
    'payment options': 'We accept credit cards, UPI, and cash on delivery.',
    'menu': 'You can explore our menu in the "Explore" section above!',
    'opening hours': 'We\'re open every day from 8:00 AM to 11:00 PM',
    'contact': 'You can reach us at support@foodapp.com or call +1 234 567 890',
    'cancel order': 'You can cancel your order within 10 minutes of placing it. Contact support for help.',
    'refund policy': 'Refunds are processed within 5-7 business days. Please contact support for assistance.',
    'ingredients': 'We list all ingredients on the menu. Let me know if you need details on a specific item!',
    'offers': 'Check our "Deals" section for the latest offers and discounts!',
    'default': 'I can help with delivery times, order tracking, payment options, menu, and more. Ask me anything!'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

    setTimeout(() => {
      const lowerMessage = inputMessage.toLowerCase();
      const responseKey = Object.keys(botResponses).find(key => lowerMessage.includes(key));
      const response = responseKey ? botResponses[responseKey] : botResponses.default;
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl w-80 h-[500px] flex flex-col border border-gray-200">
          <div className="bg-[#f7983f] text-white rounded-t-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Food Assistant</h3>
              <p className="text-xs opacity-90">Ask me about your order</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-2xl transition-colors"
            >
              <AiOutlineClose />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <ChatMessage 
                key={index}
                message={msg.text}
                isBot={msg.isBot}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7983f]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#f7983f] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <div></div> : <div className={`bg-[#f7983f] text-white w-14 h-14 rounded-full shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center`}><AiOutlineMessage size={24}  /></div>}
      </button>
    </div>
  );
};

export default Chatbot;
