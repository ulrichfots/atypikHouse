import { useState } from 'react';
import axios from 'axios';

interface MessageInputProps {
  receiverId: string;
  currentUserId: string; // Identifiant de l'utilisateur connecté
  onMessageSent: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ receiverId, currentUserId, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSendMessage = async () => {
    if (!content.trim()) return;

    try {
      await axios.post('/api/messages/send', {
        receiverId,
        senderId: currentUserId, // Utiliser l'identifiant de l'utilisateur connecté comme expéditeur
        content,
      });

      setContent('');
      onMessageSent(); // Rafraîchir les messages après l'envoi
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Écrire un message..." 
        className="w-full p-2 border rounded-md" 
      />
      <button onClick={handleSendMessage} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Envoyer
      </button>
    </div>
  );
};

export default MessageInput;
