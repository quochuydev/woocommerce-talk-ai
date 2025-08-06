// Firestore operations for chat
import { 
  collection, 
  doc, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from './config';

// Enhanced logging utility for Firebase operations
const logFirebase = (level, operation, data, error = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[Firebase-${level.toUpperCase()}] ${timestamp} - ${operation}`;
  
  console.group(logMessage);
  if (data) {
    console.log('Data:', data);
  }
  if (error) {
    console.error('Error:', error);
  }
  console.trace('Stack trace');
  console.groupEnd();
};

// Send a message to Firestore (only text messages for now)
export const sendMessage = async (sessionId, messageData) => {
  logFirebase('info', 'Sending message', { sessionId, messageData });
  
  try {
    // Only store text messages
    if (messageData.type !== 'text') {
      logFirebase('warn', 'Non-text message not stored', { type: messageData.type });
      return;
    }
    
    const messagesRef = collection(db, `conversations/${sessionId}/messages`);
    const messageToStore = {
      ...messageData,
      timestamp: serverTimestamp(),
      storedAt: new Date().toISOString()
    };
    
    logFirebase('info', 'Adding document to Firestore', messageToStore);
    const docRef = await addDoc(messagesRef, messageToStore);
    
    logFirebase('info', 'Message stored successfully', { 
      docId: docRef.id, 
      sessionId,
      messageType: messageData.type,
      sender: messageData.sender
    });
    
  } catch (error) {
    logFirebase('error', 'Failed to send message', { sessionId, messageData }, error);
    console.error('Error sending message:', error);
    throw error;
  }
};

// Listen to messages in real-time
export const subscribeToMessages = (sessionId, callback) => {
  logFirebase('info', 'Setting up message subscription', { sessionId });
  
  const messagesRef = collection(db, `conversations/${sessionId}/messages`);
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    logFirebase('info', 'Received snapshot update', { 
      sessionId,
      docCount: snapshot.docs.length,
      hasPendingWrites: snapshot.metadata.hasPendingWrites,
      fromCache: snapshot.metadata.fromCache
    });
    
    const messages = snapshot.docs.map(doc => {
      const data = doc.data();
      const message = {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate() || new Date()
      };
      
      logFirebase('info', 'Processing message from snapshot', {
        messageId: doc.id,
        type: data.type,
        sender: data.sender,
        hasTimestamp: !!data.timestamp
      });
      
      return message;
    });
    
    logFirebase('info', 'Calling message callback', { messageCount: messages.length });
    callback(messages);
  }, (error) => {
    logFirebase('error', 'Snapshot listener error', { sessionId }, error);
    console.error('Error in message subscription:', error);
  });
};

// Create or update conversation metadata
export const updateConversation = async (sessionId, data) => {
  logFirebase('info', 'Updating conversation metadata', { sessionId, data });
  
  try {
    const conversationRef = doc(db, 'conversations', sessionId);
    const conversationData = {
      ...data,
      lastUpdated: serverTimestamp(),
      updatedAt: new Date().toISOString()
    };
    
    logFirebase('info', 'Setting conversation document', conversationData);
    await setDoc(conversationRef, conversationData, { merge: true });
    
    logFirebase('info', 'Conversation metadata updated successfully', { sessionId });
    
  } catch (error) {
    logFirebase('error', 'Failed to update conversation', { sessionId, data }, error);
    console.error('Error updating conversation:', error);
    throw error;
  }
};