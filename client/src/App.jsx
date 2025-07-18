import React, { useState } from 'react';
import { useSocket } from './socket/socket';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

const App = () => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });
  const [room, setRoom] = useState('general');
  const { isConnected, messages, users, typingUsers, connect, disconnect, sendMessage, setTyping } = useSocket();

  // On login/register
  const handleAuth = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data));
    connect(data.user.username);
  };

  // On logout
  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    disconnect();
  };

  // Send message handler
  const handleSendMessage = (msg) => {
    sendMessage({ room, sender: auth.user.username, content: msg });
  };

  // Typing handler
  const handleTyping = (isTyping) => {
    setTyping(isTyping);
  };

  if (!auth) return <Login onAuth={handleAuth} />;

  return (
    <div className="app-container">
      <header>
        <h1>Socket.io Chat</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <ChatRoom
        messages={messages}
        users={users}
        typingUsers={typingUsers}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        currentUser={auth.user.username}
      />
    </div>
  );
};

export default App; 