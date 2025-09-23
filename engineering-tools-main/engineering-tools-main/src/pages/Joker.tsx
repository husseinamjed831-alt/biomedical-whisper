import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Book, Calculator, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: string;
}

const Joker: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your academic assistant. I can help you with biomedical engineering questions, study tips, and more. What would you like to know?',
      timestamp: new Date(),
      category: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    {
      icon: Heart,
      category: 'Anatomy',
      question: 'Explain the cardiac conduction system',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Calculator,
      category: 'Math',
      question: 'Help with differential equations',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Book,
      category: 'Study Tips',
      question: 'How to prepare for exams effectively',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Lightbulb,
      category: 'General',
      question: 'Career advice in biomedical engineering',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  // Sample responses database
  const responses: Record<string, string[]> = {
    cardiac: [
      'The cardiac conduction system consists of specialized cells that generate and conduct electrical impulses throughout the heart. It includes the SA node (pacemaker), AV node, Bundle of His, bundle branches, and Purkinje fibers. This system ensures coordinated contraction of the heart chambers.',
      'The SA node initiates the heartbeat, the AV node delays the impulse, and the Purkinje system distributes it to the ventricles for synchronized contraction.'
    ],
    differential: [
      'Differential equations are crucial in biomedical engineering for modeling physiological processes. They describe how biological systems change over time. Common applications include population dynamics, drug kinetics, and signal processing.',
      'Start with first-order linear equations, then move to systems of equations. Practice with real biomedical examples like pharmacokinetics and population growth models.'
    ],
    study: [
      'For effective exam preparation: 1) Create a study schedule, 2) Use active recall techniques, 3) Practice with past papers, 4) Form study groups, 5) Take regular breaks, 6) Use visual aids like mind maps.',
      'Focus on understanding concepts rather than memorization. Use the Feynman technique - explain concepts in simple terms to test your understanding.'
    ],
    career: [
      'Biomedical engineering offers diverse career paths: medical device design, pharmaceutical research, clinical engineering, regulatory affairs, and academia. Consider your interests in biology, engineering, and healthcare.',
      'Build a strong foundation in both engineering and life sciences. Gain hands-on experience through internships, research projects, and lab work. Network with professionals in your areas of interest.'
    ],
    general: [
      'I\'m here to help with any biomedical engineering questions! Feel free to ask about anatomy, physiology, circuits, mathematics, or study strategies.',
      'What specific topic would you like to explore? I can provide explanations, study tips, or help with problem-solving.'
    ]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('cardiac') || message.includes('heart') || message.includes('conduction')) {
      return responses.cardiac[Math.floor(Math.random() * responses.cardiac.length)];
    } else if (message.includes('differential') || message.includes('equation') || message.includes('math')) {
      return responses.differential[Math.floor(Math.random() * responses.differential.length)];
    } else if (message.includes('study') || message.includes('exam') || message.includes('prepare')) {
      return responses.study[Math.floor(Math.random() * responses.study.length)];
    } else if (message.includes('career') || message.includes('job') || message.includes('work')) {
      return responses.career[Math.floor(Math.random() * responses.career.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse: Message = {
      id: messages.length + 2,
      type: 'bot',
      content: getResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <Bot className="h-10 w-10 text-pink-500 mr-4" />
          Joker - Academic Assistant
        </h1>
        <p className="text-xl text-gray-600">
          Get instant help with your biomedical engineering studies
        </p>
      </div>

      {/* Quick Questions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Questions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickQuestion(item.question)}
                className={`flex items-center p-3 bg-gradient-to-r ${item.color} text-white rounded-lg hover:shadow-md transition-all duration-200 text-left`}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-xs opacity-90">{item.category}</div>
                  <div className="text-sm font-medium">{item.question}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500' 
                    : 'bg-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about biomedical engineering..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={1}
              disabled={isTyping}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Joker;