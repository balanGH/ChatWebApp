import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css'; // Import your CSS file for styles

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState(''); /*{/** }//const [loading, setLoading] = useState(false);*/
  

  const navigate = useNavigate(); 

  const groupId = localStorage.getItem('groupId');
  const groupName = localStorage.getItem('groupName'); // Get group ID from local storage
  const userId = JSON.parse(localStorage.getItem('user')).id; // Get the logged-in user's ID
  useEffect(() => {
   // console.log("Fetching messages for userId:", userId, "and groupId:", groupId);
  
    const fetchMessages = async () => {
      if (userId && groupId) {
        try {
          const response = await fetch(`http://10.11.145.24:5000/api/getGroupChat/${userId}/${groupId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMessages(data.messages || []); // Use an empty array as fallback if no messages
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchMessages();

    // Set up interval to fetch messages every 2 seconds
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);
  }, [userId,groupId]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      const newMessage = {
        sender_id: userId, // Use logged-in user's ID
        group_id: groupId,  // Send the group ID
        message_text: messageText,
        message_type: 'text', // Set the message type
        media_url: null, // Set media URL if applicable
      };
  
      try {
        // Send the message to the backend
        const response = await fetch('http://10.11.145.24:5000/api/getGroupChat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });
  
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
  
        const data = await response.json();
        //console.log(data.messageDetails);
        // Update messages state with the sent message details from the server
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            ...newMessage, 
            message_id: data.messageDetails.message_id, 
            created_at: data.messageDetails.created_at,
            sender_name: 'Me' // You can modify this to fetch the user's name if needed
          },
        ]);
        setMessageText('');
   
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  const handleUserClick = (userId, name) => {
    // Create an object with user data
    const userData = { userId, name};
  
    // Store the object as a JSON string in localStorage
    localStorage.setItem('op_userData', JSON.stringify(userData));
  
    // Navigate to the chat page without passing the userId in the URL
    navigate('/chat');
  };
  const handleDetails = () => {
    navigate(`/groupDetails?groupId=${groupId}&userId=${userId}`);
  };
  
  return (
    <div className="chat-container">
       
      <div className="header">
        <button onClick={()=> handleDetails() } style={{ color: 'green', fontWeight: 'bold',fontSize:'25px', textAlign: 'center' }}>{groupName}</button>
      
      </div>
      <div className="messages" id="messages">
        {messages.map((message) => (
          <div key={message.message_id} className={`message ${message.sender_id === userId ? 'user' : 'opponent'}`}>
          <p style={{ color: '#007BFF', cursor: 'pointer' }}onClick={() => handleUserClick(message.sender_id,message.sender_name)}>{message.sender_name}</p> 
        <p style={{ fontSize: '1.2em' }}>{message.message_text}</p> {/* Message text with increased font size */}
          <small>{new Date(message.created_at).toLocaleTimeString()}</small> {/* Display time */}
        </div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
