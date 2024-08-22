import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';

interface MessageListProps {
  userId: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  isDelivered: boolean; 
  isRead: boolean; 
}

const MessageList: React.FC<MessageListProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>(userId);


  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/getMessages?userId=${userId}`);
      console.log('Messages fetched:', response.data);
      setMessages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages', error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/auth/session');
        console.log('Current user:', response.data);
        setCurrentUserId(response.data.user.id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur actuel", error);
      }
    };

    fetchCurrentUser();
    fetchMessages();
  }, [userId]);

  const markMessageAsRead = async (messageId: string) => {
    try {
      await axios.post('/api/messages/markRead', { messageId });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de lecture', error);
    }
  };

  useEffect(() => {
    messages.forEach((message) => {
      if (message.senderId === currentUserId && !message.isRead) {
        markMessageAsRead(message.id);
      }
    });
  }, [messages]);

  return (
    <div className="message-list">
      
      {messages.map((message) => {
        const isSentByCurrentUser = message.senderId !== currentUserId;

        return (
          console.log('Message:', message),
          console.log('Sender ID:', message.senderId, typeof message.senderId),
          console.log('Current User ID:', currentUserId, typeof currentUserId),
          console.log('isSentByCurrentUser:', isSentByCurrentUser),
          <div
            key={message.id}
            className={`message-${isSentByCurrentUser ? 'sent' : 'received'}`}
          >
            <div
            
              className={`p-3 rounded-lg max-w-xs ${
                isSentByCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
              {isSentByCurrentUser && (
                <div className="mt-1 text-right flex justify-end items-center gap-1">
                  {message.isRead ? (
                    <FaCheckDouble className="text-red-500" />
                  ) : message.isDelivered ? (
                    <FaCheck className="text-pink-500" />
                  ) : (
                    <FaCheck className="text-gray-500" />
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
