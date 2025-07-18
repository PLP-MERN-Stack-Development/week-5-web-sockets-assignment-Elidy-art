import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({
  messages,
  users,
  typingUsers,
  onSendMessage,
  onTyping,
  currentUser,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onTyping(e.target.value.length > 0);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      onTyping(false);
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-users">
        <h4>Online Users</h4>
        <ul>
          {users.map((user) => (
            <li key={user.id || user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages-list">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.system ? 'system-message' : msg.sender === currentUser ? 'my-message' : 'other-message'}>
              {msg.system ? (
                <em>{msg.message}</em>
              ) : (
                <>
                  <strong>{msg.senderName || msg.sender?.username || 'You'}:</strong> {msg.content || msg.message}
                  <span className="timestamp">{new Date(msg.createdAt || msg.timestamp).toLocaleTimeString()}</span>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.map((u) => u.username).join(', ')} typing...
          </div>
        )}
        <form className="chat-input" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom; 