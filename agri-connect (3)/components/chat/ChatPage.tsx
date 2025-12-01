import React, { useState, useRef, useEffect } from 'react';
import { Conversation } from '../../types';
import { SendIcon } from '../shared/icons/SendIcon';

const mockConversations: Conversation[] = [
    {
        id: 'convo-1',
        contact: { name: 'Samuel Lee', avatar: 'https://picsum.photos/id/1011/100/100' },
        lastMessage: 'Sure, I can give you some tips on that.',
        timestamp: '10:45 AM',
        messages: [
            { id: 1, text: 'Anyone have experience with drip irrigation for corn fields? Looking for tips to conserve water.', timestamp: '10:42 AM', sender: 'me' },
            { id: 2, text: 'Hey Alex! I\'ve used drip systems for a few seasons now. Happy to share what I\'ve learned.', timestamp: '10:44 AM', sender: 'other' },
            { id: 3, text: 'Sure, I can give you some tips on that.', timestamp: '10:45 AM', sender: 'other' },
        ]
    },
    {
        id: 'convo-2',
        contact: { name: 'Ben Carter (Marketer)', avatar: 'https://picsum.photos/id/1005/100/100' },
        lastMessage: 'Sounds good, I\'ll take the whole lot.',
        timestamp: 'Yesterday',
        messages: [
            { id: 1, text: 'Hi Ben, the first batch of tomatoes is ready. About 500 kg available.', timestamp: 'Yesterday', sender: 'me' },
            { id: 2, text: 'Excellent! Price is still $2.50/kg?', timestamp: 'Yesterday', sender: 'other' },
            { id: 3, text: 'Yes, that\'s correct.', timestamp: 'Yesterday', sender: 'me' },
            { id: 4, text: 'Sounds good, I\'ll take the whole lot.', timestamp: 'Yesterday', sender: 'other' },
        ]
    },
];

const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(mockConversations[0]?.id || null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConversation?.messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversationId) return;

        const updatedConversations = conversations.map(convo => {
            if (convo.id === selectedConversationId) {
                const newMsg = {
                    id: convo.messages.length + 1,
                    text: newMessage,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sender: 'me' as const,
                };
                return {
                    ...convo,
                    messages: [...convo.messages, newMsg],
                    lastMessage: newMsg.text,
                    timestamp: newMsg.timestamp,
                };
            }
            return convo;
        });

        setConversations(updatedConversations);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-150px)] bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            {/* Conversation List */}
            <aside className="w-1/3 border-r dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(convo => (
                        <div
                            key={convo.id}
                            onClick={() => setSelectedConversationId(convo.id)}
                            className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${selectedConversationId === convo.id ? 'bg-green-100 dark:bg-green-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <img src={convo.contact.avatar} alt={convo.contact.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="ml-4 flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-bold text-gray-800 dark:text-white truncate">{convo.contact.name}</p>
                                    <p className="text-xs text-gray-500">{convo.timestamp}</p>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Message Area */}
            <main className="w-2/3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <header className="p-4 flex items-center border-b dark:border-gray-700">
                            <img src={selectedConversation.contact.avatar} alt={selectedConversation.contact.name} className="w-10 h-10 rounded-full object-cover" />
                            <h3 className="ml-4 font-bold text-lg text-gray-800 dark:text-white">{selectedConversation.contact.name}</h3>
                        </header>
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <div className="space-y-4">
                                {selectedConversation.messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'other' && <img src={selectedConversation.contact.avatar} alt="contact" className="w-8 h-8 rounded-full object-cover" />}
                                        <div className={`max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-green-600 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'}`}>
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-200' : 'text-gray-500'}`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <footer className="p-4 border-t dark:border-gray-700">
                            <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button type="submit" className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <SendIcon />
                                </button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Select a conversation to start chatting.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatPage;
