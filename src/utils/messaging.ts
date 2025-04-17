import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  where, 
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

/**
 * Create or get an existing conversation between two users
 */
export const getOrCreateConversation = async (userId1: string, userId2: string): Promise<string> => {
  try {
    // Check if conversation already exists
    const conversationsRef = collection(db, 'conversations');
    
    // Try to find conversation with both users as participants
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', userId1)
    );
    
    const querySnapshot = await getDocs(q);
    let existingConversationId: string | null = null;
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      if (data.participants && data.participants.includes(userId2)) {
        existingConversationId = docSnapshot.id;
      }
    });
    
    if (existingConversationId) {
      return existingConversationId;
    }
    
    // Create new conversation if it doesn't exist
    const conversationId = `${userId1}_${userId2}`;
    await setDoc(doc(db, 'conversations', conversationId), {
      participants: [userId1, userId2],
      createdAt: serverTimestamp(),
      lastMessageTimestamp: serverTimestamp(),
      lastMessage: '',
      readBy: {
        [userId1]: true,
        [userId2]: false
      }
    });
    
    return conversationId;
  } catch (error) {
    console.error('Error in getOrCreateConversation:', error);
    throw error;
  }
};

/**
 * Send a message in a conversation
 */
export const sendMessage = async (
  conversationId: string, 
  senderId: string, 
  receiverId: string, 
  text: string
): Promise<string> => {
  try {
    // Add message to conversation subcollection
    const messageRef = await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
      senderId,
      text,
      timestamp: serverTimestamp(),
      read: false
    });
    
    // Update conversation document with last message info
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: text,
      lastMessageTimestamp: serverTimestamp(),
      lastSenderId: senderId,
      [`readBy.${senderId}`]: true,
      [`readBy.${receiverId}`]: false
    });
    
    return messageRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Mark a conversation as read by a user
 */
export const markConversationAsRead = async (
  conversationId: string, 
  userId: string
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'conversations', conversationId), {
      [`readBy.${userId}`]: true
    });
  } catch (error) {
    console.error('Error marking conversation as read:', error);
  }
};

/**
 * Format a timestamp for display
 */
export const formatMessageDate = (date: Date): string => {
  if (!date) return '';
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageDate = new Date(date);
  const messageDateNoTime = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  
  if (messageDateNoTime.getTime() === today.getTime()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (messageDateNoTime.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString();
  }
}; 