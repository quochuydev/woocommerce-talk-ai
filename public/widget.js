(function() {
  'use strict';
  
  // TalkAI Widget Configuration
  window.TalkAI = window.TalkAI || {};
  
  const TalkAIWidget = {
    config: {
      apiKey: null,
      position: 'bottom-right',
      theme: 'pink',
      primaryColor: '#FF3988',
      widgetId: 'talkai-widget-' + Math.random().toString(36).substr(2, 9)
    },

    init: function(options) {
      if (!options || !options.apiKey) {
        console.error('TalkAI: API key is required');
        return;
      }
      
      this.config = Object.assign(this.config, options);
      this.createWidget();
      this.bindEvents();
    },

    createWidget: function() {
      // Create widget container
      const widgetContainer = document.createElement('div');
      widgetContainer.id = this.config.widgetId;
      widgetContainer.innerHTML = `
        <style>
          .talkai-widget {
            position: fixed;
            ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .talkai-button {
            width: 60px;
            height: 60px;
            background: ${this.config.primaryColor};
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(255, 57, 136, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          
          .talkai-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(255, 57, 136, 0.4);
          }
          
          .talkai-button svg {
            width: 24px;
            height: 24px;
            fill: white;
          }
          
          .talkai-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
          }
          
          .talkai-header {
            background: linear-gradient(135deg, ${this.config.primaryColor} 0%, #e11d48 100%);
            color: white;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .talkai-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
          }
          
          .talkai-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
          }
          
          .talkai-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #fafafa;
          }
          
          .talkai-message {
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }
          
          .talkai-message.user {
            flex-direction: row-reverse;
          }
          
          .talkai-message-content {
            max-width: 70%;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
          }
          
          .talkai-message.bot .talkai-message-content {
            background: white;
            border: 1px solid #e5e7eb;
          }
          
          .talkai-message.user .talkai-message-content {
            background: ${this.config.primaryColor};
            color: white;
          }
          
          .talkai-input-area {
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            background: white;
          }
          
          .talkai-input-container {
            display: flex;
            gap: 8px;
            align-items: flex-end;
          }
          
          .talkai-input {
            flex: 1;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 8px 12px;
            font-size: 14px;
            outline: none;
            resize: none;
            max-height: 100px;
          }
          
          .talkai-send {
            background: ${this.config.primaryColor};
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .talkai-send:hover {
            background: #e11d48;
          }
          
          .talkai-send svg {
            width: 16px;
            height: 16px;
            fill: white;
          }
          
          @media (max-width: 480px) {
            .talkai-chat-window {
              width: 90vw;
              height: 70vh;
              bottom: 80px;
              right: 5vw;
            }
          }
        </style>
        
        <div class="talkai-widget">
          <button class="talkai-button" onclick="TalkAIWidget.toggleChat()">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
            </svg>
          </button>
          
          <div class="talkai-chat-window" id="talkai-chat-window">
            <div class="talkai-header">
              <div>
                <h3>TalkAI Assistant</h3>
                <div style="font-size: 12px; opacity: 0.9;">Online & ready to help</div>
              </div>
              <button class="talkai-close" onclick="TalkAIWidget.closeChat()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="talkai-messages" id="talkai-messages">
              <div class="talkai-message bot">
                <div class="talkai-message-content">
                  👋 Hi! I'm your AI assistant. How can I help you today?
                </div>
              </div>
            </div>
            
            <div class="talkai-input-area">
              <div class="talkai-input-container">
                <textarea 
                  class="talkai-input" 
                  id="talkai-input" 
                  placeholder="Type your message..."
                  onkeypress="TalkAIWidget.handleKeyPress(event)"
                  rows="1"
                ></textarea>
                <button class="talkai-send" onclick="TalkAIWidget.sendMessage()">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(widgetContainer);
    },

    toggleChat: function() {
      const chatWindow = document.getElementById('talkai-chat-window');
      if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        document.getElementById('talkai-input').focus();
      } else {
        chatWindow.style.display = 'none';
      }
    },

    closeChat: function() {
      document.getElementById('talkai-chat-window').style.display = 'none';
    },

    handleKeyPress: function(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    },

    sendMessage: function() {
      const input = document.getElementById('talkai-input');
      const message = input.value.trim();
      
      if (!message) return;
      
      // Add user message to chat
      this.addMessage(message, 'user');
      input.value = '';
      
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        this.addMessage("Thanks for your message! This is a demo response. In production, this would connect to your AI backend.", 'bot');
      }, 1000);
    },

    addMessage: function(content, type) {
      const messagesContainer = document.getElementById('talkai-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `talkai-message ${type}`;
      messageDiv.innerHTML = `<div class="talkai-message-content">${content}</div>`;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    bindEvents: function() {
      // Auto-resize textarea
      const input = document.getElementById('talkai-input');
      if (input) {
        input.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });
      }
    }
  };

  // Expose TalkAI globally
  window.TalkAI = {
    init: function(options) {
      TalkAIWidget.init(options);
    }
  };

  // Auto-initialize if config is already present
  if (window.TalkAIConfig) {
    TalkAI.init(window.TalkAIConfig);
  }
})();