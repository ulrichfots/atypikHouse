"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Chat from '../components/Chat';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const MessagesPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="messages-page">
      <h1>Messagerie</h1>
      <div className="users-list">
        <h2>Utilisateurs</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              <img src={user.image || '/images/placeholder.jpg'} alt={user.name} width="25" height="25" />
              <span>{user.name || user.email}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        {selectedUser ? (
          <>
            <h2>Discussion avec {selectedUser.name || selectedUser.email}</h2>
            <Chat userId={selectedUser.id} />
          </>
        ) : (
          <p>Sélectionnez un utilisateur pour commencer une conversation.</p>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
