import React, { useEffect, useRef, useState } from 'react';
import '../Styles/ChatPage.css';
import NavBar from '@/Components/Navbar';
import axios from 'axios';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const [communityname, setcommunityname] = useState("");
    const [community, setCommunity] = useState([]);
    const messagesEndRef = useRef(null);

    // Fetch communities on component mount
    useEffect(() => {
        getCommunity();
    }, []);

    // Fetch messages when community name changes
    useEffect(() => {
        if (communityname) {
            getChatFromBackend(communityname);
        }
    }, [communityname]);

    // Scroll to bottom of messages when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function getCommunity() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("https://skill-share-c93a.onrender.com/getCommunity", {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.data && response.data.data) {
                setCommunity(response.data.data);
                console.log("Communities loaded:", response.data.data);
            } else {
                console.log("No communities found");
            }
        } catch (err) {
            console.log("Error fetching communities:", err.message);
        }
    }

    async function handleChat() {
        const message = inputRef.current.value;
        if (!message.trim()) return;
        
        // Add message to local state for immediate feedback
        const newMessage = {
            username: 'me',
            messages: message,
            timestamp: new Date().toISOString()
        };
        
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        // Send to backend
        await sendMessageToBackend(communityname, message);
        
        // Clear input field
        inputRef.current.value = '';
    }

    async function sendMessageToBackend(name, message) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("https://skill-share-c93a.onrender.com/postMessage",
                { name, message },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                console.log("Message sent successfully");
                // Refresh messages to show all updated content including other users' messages
                getChatFromBackend(name);
            } else {
                console.log("Failed to send message");
            }
        } catch (err) {
            console.log("Error sending message:", err.message);
        }
    }

    async function getChatFromBackend(chatName) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://skill-share-c93a.onrender.com/getMessage/${chatName}`,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                console.log("Messages fetched successfully");
                setMessages(response.data.messages);
            } else {
                console.log("Failed to fetch messages");
            }
        } catch (err) {
            console.log("Error fetching messages:", err.message);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    };

    return (
        <>
            <NavBar />
            <div className="chat-container">
                <div className="chat-sidebar">
                    <h2>Communities</h2>
                    {community.length > 0 ? (
                        community.map(chat => (
                            <div 
                                key={chat._id}
                                className={`chat-item ${selectedChat === chat._id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedChat(chat._id);
                                    setcommunityname(chat.name);
                                }}
                            >
                                <p className="chat-name">{chat.name}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-communities">No communities available</div>
                    )}
                </div>
                <div className="chat-window">
                    {selectedChat ? (
                        <>
                            <div className="chat-header">{communityname}</div>
                            <div className="messages">
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <div 
                                            key={index} 
                                            className={`message ${msg.username === 'me' ? 'sent' : 'received'}`}
                                        >
                                            <p><strong>{msg.username}</strong></p>
                                            <p>{msg.messages}</p>
                                            {msg.image && <img src={msg.image} alt="Attachment" className="message-image" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-messages">No messages yet. Start the conversation!</div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="message-input">
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    ref={inputRef}
                                    onKeyPress={handleKeyPress}
                                />
                                <button onClick={handleChat}>Send</button>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat">Select a community to start messaging</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatPage;