// Cloud Functions for chat processing
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Process new messages and generate AI responses
exports.processMessage = onDocumentCreated(
  'conversations/{sessionId}/messages/{messageId}',
  async (event) => {
    const messageData = event.data.data();
    const { sessionId } = event.params;
    
    // Only process user messages
    if (messageData.sender !== 'user') {
      return;
    }

    try {
      let aiResponse = '';
      
      switch (messageData.type) {
        case 'text':
          aiResponse = await processTextMessage(messageData.content);
          break;
        case 'image':
          aiResponse = await processImageMessage(messageData);
          break;
        case 'voice':
          aiResponse = await processVoiceMessage(messageData);
          break;
        case 'file':
          aiResponse = await processFileMessage(messageData);
          break;
        default:
          aiResponse = "I received your message. How can I help you?";
      }

      // Add AI response to conversation
      await db.collection(`conversations/${sessionId}/messages`).add({
        type: 'text',
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      });

      // Update conversation metadata
      await db.doc(`conversations/${sessionId}`).set({
        lastMessage: aiResponse,
        lastMessageTime: new Date(),
        messageCount: (await db.collection(`conversations/${sessionId}/messages`).count().get()).data().count
      }, { merge: true });

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Send error response to user
      await db.collection(`conversations/${sessionId}/messages`).add({
        type: 'text',
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      });
    }
  }
);

// Generate product recommendations
exports.getProductRecommendation = onCall(async (data, context) => {
  try {
    const { query, sessionId } = data;
    
    // Mock product data (replace with your actual product API)
    const products = [
      {
        id: '1',
        title: 'Wireless Bluetooth Headphones',
        price: '$89.99',
        image: '🎧',
        rating: 4.8,
        reviews: 2156,
        url: '#'
      },
      {
        id: '2',
        title: 'Smart Fitness Watch',
        price: '$199.99',
        image: '⌚',
        rating: 4.6,
        reviews: 1834,
        url: '#'
      },
      {
        id: '3',
        title: 'Portable Bluetooth Speaker',
        price: '$49.99',
        image: '🔊',
        rating: 4.7,
        reviews: 956,
        url: '#'
      }
    ];

    // Select random product (replace with actual recommendation logic)
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    // Add product recommendation to conversation
    await db.collection(`conversations/${sessionId}/messages`).add({
      type: 'product',
      content: 'Based on your request, here\'s a product I recommend:',
      sender: 'ai',
      product: randomProduct,
      timestamp: new Date()
    });

    return { success: true, product: randomProduct };

  } catch (error) {
    console.error('Error getting product recommendation:', error);
    throw new HttpsError('internal', 'Unable to get product recommendation');
  }
});

// Helper functions for message processing
async function processTextMessage(content) {
  // Mock AI response (replace with OpenAI, Vertex AI, etc.)
  const responses = [
    "Thanks for your message! I'm here to help you with any questions about our products.",
    "I understand your request. Let me see how I can assist you.",
    "That's a great question! I'd be happy to help you with that.",
    "I can help you with that. What specific information are you looking for?",
    "Thanks for reaching out! Is there anything specific I can help you find?"
  ];
  
  // Simple keyword-based responses
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('product') || lowerContent.includes('buy') || lowerContent.includes('shop')) {
    return "I'd be happy to help you find the right products! What are you looking for?";
  }
  
  if (lowerContent.includes('price') || lowerContent.includes('cost') || lowerContent.includes('how much')) {
    return "I can help you with pricing information. Which product are you interested in?";
  }
  
  if (lowerContent.includes('help') || lowerContent.includes('support')) {
    return "I'm here to help! You can ask me about products, orders, shipping, or any other questions.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}

async function processImageMessage(messageData) {
  return `I can see the image you shared: "${messageData.fileName}". How can I help you with this image?`;
}

async function processVoiceMessage(messageData) {
  const duration = messageData.duration || 0;
  return `I received your ${duration}-second voice message. I'm currently working on voice processing capabilities. For now, could you type your message?`;
}

async function processFileMessage(messageData) {
  const fileType = messageData.fileName?.split('.').pop() || 'file';
  return `I received your ${fileType} file: "${messageData.fileName}". How can I help you with this document?`;
}