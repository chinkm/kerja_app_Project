// component/chattingModule.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, User, Wrench, Phone, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import MOCK_CONTRACTORS from '../data/mockData';
const ChatComponent = () => {
    const { contractorId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // User identity (for demonstration purposes, using a static user ID)
    const [userName, setUserName] = useState(()=> {
      return localStorage.getItem('chatUserName') || '';
    }); 
    const [isNameSet, setIsNameSet] = useState(!!userName);
    
    // find the contractor by ID
    const contractor = MOCK_CONTRACTORS.find(c => c.id === parseInt(contractorId));

    // Real-time listener - load messages from Firebase 
    useEffect(() => {
        if(!contractorId) return;
        const messageRef = collection(db, 'chats', contractorId, 'messages');
        const q = query(messageRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages = [];
            snapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(newMessages);
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, [contractorId]);

    // Auto-scroll to the bottom of the chat when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 2. SEND MESSAGE to Firebase
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !userName) return; // Prevent sending empty messages

    try {
      const messageRef = collection(db, 'chats', contractorId, 'messages');
      await addDoc(messageRef, {
        text: newMessage,
        sender: userName, // Use the user's name as the sender
        timestamp: serverTimestamp(), // Firebase server timestamp for ordering
      });
      setNewMessage(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleSetName = (e) => {
      e.preventDefault();
      if (userName.trim()){
        localStorage.setItem('chatUserName', userName.trim());
        setIsNameSet(true);
      }
    };

    if (!contractor) {
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <p className="text-white">Contractor not found.</p>
          </div>
        );
      }

    // Show name input if not set
    if (!isNameSet) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-white text-xl font-bold mb-4"> Enter your name:</h2>
            <p className="text-slate-400 text-sm mb-4"> This is how others will see you in the chat.</p>
            <form onSubmit={handleSetName} className="space-y-3">
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name"
                className="bg-slate-600 text-white placeholder:text-slate-400 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                type="submit"
                disabled={!userName.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 text-white disabled: opacity-50 font-bold py-2 px-4 rounded-lg transition duration-200">
                Join Chat
              </button>
            </form>
          </div>
        </div>
        );
      }
      return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Chat Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-700 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="flex-1">
          <h3 className="text-white font-semibold">{contractor.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Online
            </span>
            <span>•</span>
            <span className="text-slate-500">You are: {userName}</span>
          </div>
        </div>
        <div className="text-xs text-slate-500 px-2 py-1 bg-slate-700 rounded-full">
          {contractor.rating}⭐
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/50">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 text-sm mt-10">
            No messages yet. Say hello!
          </div>
        )}
        {messages.map((message) => {
          const isOwnMessage = message.sender === userName;
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  isOwnMessage
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium opacity-80">
                    {message.sender}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <div className="text-[10px] mt-1 opacity-70">
                  {message.timestamp?.toDate
                    ? message.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'Just now'}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-slate-800 border-t border-slate-700 p-3">
        <div className="flex items-center gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message as ${userName}...`}
            className="flex-1 bg-slate-700 text-white rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] max-h-32"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>💬 Real‑time chat </span>
          <button
            onClick={() => {
              setUserName('');
              setIsNameSet(false);
              localStorage.removeItem('chatUserName');
            }}
            className="text-red-400 hover:text-red-300"
          >
            Change name
          </button>
        </div>
      </div>
    </div>
  );
};


export default ChatComponent;