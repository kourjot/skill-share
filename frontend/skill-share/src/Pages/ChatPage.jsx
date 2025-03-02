import React, { useEffect, useRef, useState } from 'react';
import '../Styles/ChatPage.css';
import NavBar from '@/Components/Navbar';
import axios from 'axios';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const [communityname,setcommunityname]=useState("")
    const [community,setcommunity]=useState([])

    const chats = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?' },
        { id: 2, name: 'Jane Smith', lastMessage: 'Did you get my message?' },
        { id: 3, name: 'Alex Johnson', lastMessage: 'Let’s catch up later!' }
    ];
    useEffect(()=>{
        getCommunity()
    },[])
    useEffect(() => {
        if (selectedChat) {
            getChatFromBackend(communityname);
        }
    }, [communityname]);

    ///
    async function getCommunity(){
        try{
          const token = localStorage.getItem("token");
          const responce= await axios.get("https://skill-share-c93a.onrender.com/getCommunity")
          console.log(responce.data.data)
          setcommunity(responce.data.data)
          console.log(community)
          
        }
        catch(err){
          console.log(err.message)
        }
      }

    ///
    async function handleChat() {
        const message = inputRef.current.value;
        if (!message.trim()) return;
        sendMessageToBackend(communityname,message)
    }

    async function sendMessageToBackend(name,message) {
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
                console.log("Message sent to backend successfully");
                console.log(response.status)
            } 
            else {
                console.log("Failed to send message to backend");
                console.log(response.status)
            }
        } 
        catch (err) {
            console.log("Error sending message to backend:", err.message);
            //console.log(response.status)
        }
    }

    async function getChatFromBackend(chatId) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://skill-share-c93a.onrender.com/getMessage/${chatId}`,
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
                console.log(response.data.messages)
            } else {
                console.log("Failed to fetch messages");
            }
        } catch (err) {
            console.log("Error fetching messages:", err.message);
        }
    }

    return (
        <>
            <NavBar />
            <div className="chat-container">
                <div className="chat-sidebar">
                    <h2>Chats</h2>
                    {community.map(chat => (
                        <div key={chat["_id"]}
                            className={`chat-item ${selectedChat === chat["_id"] ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedChat(chat["_id"])
                                setcommunityname(chat.name)
                                console.log(communityname)
                            }}>
                            <p className="chat-name">{chat.name}</p>
                            {/* <p className="chat-preview">{chat.lastMessage}</p> */}
                        </div>
                    ))}
                </div>
                <div className="chat-window">
                    {selectedChat ? (
                        <>
                            <div className="chat-header">Chat with {chats.find(c => c.id === selectedChat)?.name}</div>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.username === 'me' ? 'sent' : 'received'}`}>
                                    <p><strong>{msg.username}</strong></p>
                                    <p>{msg.messages}</p>
                                    {msg.image && <img src={msg.image} alt="Attachment" className="message-image" />}
                                </div>
                                ))}
                            </div>
                            <div className="message-input">
                                <input type="text" placeholder="Type a message..." ref={inputRef} />
                                <button onClick={() => { handleChat(); sendMessageToBackend(selectedChat, inputRef.current.value); }}>Send</button>
                            </div>
                        </>
                    ) : <div className="no-chat">Select a chat to start messaging</div>}
                </div>
            </div>
        </>
    );
};

export default ChatPage;
